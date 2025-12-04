const fs = require("fs");
const https = require("https");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const REPO = process.env.REPO;
const PR_NUMBER = process.env.PR_NUMBER;

if (!GITHUB_TOKEN || !OPENAI_API_KEY || !REPO || !PR_NUMBER) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const diffPath = "diff.txt";
if (!fs.existsSync(diffPath)) {
  console.error("diff.txt not found");
  process.exit(1);
}

const diff = fs.readFileSync(diffPath, "utf8");

if (!diff.trim()) {
  console.log("No changes detected in diff.txt.");
  process.exit(0);
}

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(
            new Error(`Request failed with status ${res.statusCode}: ${body}`)
          );
        }
      });
    });

    req.on("error", (err) => reject(err));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function run() {
  try {
    console.log("Sending diff to OpenAI...");

    const openAIResponse = await request(
      {
        hostname: "api.openai.com",
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an expert code reviewer. Review the provided git diff. Identify potential bugs, security issues, and improvements. Be concise and constructive. Format your response in Markdown.",
          },
          {
            role: "user",
            content: `Here is the git diff to review:\n\n${diff.substring(
              0,
              15000
            )}`,
          },
        ],
        temperature: 0.7,
      }
    );

    if (!openAIResponse.choices || openAIResponse.choices.length === 0) {
      throw new Error("Invalid response from OpenAI");
    }

    const reviewComment = openAIResponse.choices[0].message.content;
    console.log("Received review from OpenAI.");

    console.log("Posting comment to GitHub...");
    await request(
      {
        hostname: "api.github.com",
        path: `/repos/${REPO}/issues/${PR_NUMBER}/comments`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "AI-PR-Reviewer",
        },
      },
      {
        body: `### 🤖 AI Code Review\n\n${reviewComment}`,
      }
    );

    console.log("Review posted successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

run();
