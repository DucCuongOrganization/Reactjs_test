import {
  CopyOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { toBlob } from "html-to-image";
import React, { useState } from "react";
import { CardData, TarotTopic } from "../../../types/tarot";
import { READING_CONTEXTS } from "../constants";

interface ResultModalProps {
  selectedTopic: TarotTopic | null;
  cards: CardData[];
  onRestart: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  selectedTopic,
  cards,
  onRestart,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleCopyImage = async () => {
    const element = document.getElementById("result-modal");
    if (!element) return;
    setIsSharing(true);

    try {
      const blob = await toBlob(element, {
        backgroundColor: "#050505",
        filter: (node) =>
          node.tagName !== "CANVAS" &&
          !(node.classList && node.classList.contains("modal-top-actions")),
        cacheBust: true,
        skipFonts: true,
        style: {
          transform: "none",
          left: "0",
          top: "0",
          margin: "0",
          position: "static",
          width: "100%",
          height: "auto",
          maxHeight: "none",
          overflow: "visible",
        },
      });

      if (!blob) {
        setIsSharing(false);
        return;
      }

      // Copy to clipboard
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        message.success("✅ Image copied to clipboard!");
      } catch (clipboardError) {
        console.error("Clipboard error:", clipboardError);
        // Fallback: Download image
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "tarot-reading.png";
        link.click();
        URL.revokeObjectURL(link.href);
        message.info("📥 Image downloaded (clipboard unsupported)");
      }
      setIsSharing(false);
    } catch (err) {
      console.error("Failed to capture screenshot:", err);
      setIsSharing(false);
    }
  };

  return (
    <div id="result-modal" style={{ display: "block" }}>
      {/* Top Action Bar */}
      <div
        className="modal-top-actions"
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <button
          onClick={handleCopyImage}
          disabled={isSharing}
          title="Copy Image"
          style={{
            background: "transparent",
            border: "1px solid #d4af37",
            color: "#d4af37",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          {isSharing ? <LoadingOutlined /> : <CopyOutlined />}
        </button>
        <button
          onClick={onRestart}
          title="New Reading / Close"
          style={{
            background: "transparent",
            border: "1px solid #d4af37",
            color: "#d4af37",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          <ReloadOutlined />
        </button>
      </div>

      <div id="result-modal-content">
        <div className="modal-header-row">
          <div className="header-title">
            <span className="sparkle">✦</span>
            <h2>The Prophecy</h2>
            <span className="sparkle">✦</span>
          </div>

          <div className="header-topic">
            <strong>Topic:</strong> {selectedTopic?.title}
          </div>
        </div>

        <div id="final-reading">
          {cards.map((card, i) => (
            <div key={card.name + i} className="reading-section">
              <span className="reading-label">✦ {READING_CONTEXTS[i]}</span>
              <div className="reading-body">
                <img
                  src={card.url}
                  className="reading-img"
                  alt={card.name}
                  crossOrigin="anonymous"
                />
                <div className="reading-content">
                  <h3>{card.name}</h3>
                  <div className="reading-desc">
                    {selectedTopic &&
                    card.topicMeanings &&
                    card.topicMeanings[selectedTopic.id]
                      ? card.topicMeanings[selectedTopic.id]
                      : "Please select a topic to view the reading."}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
