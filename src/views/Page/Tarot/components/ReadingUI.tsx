import React from "react";
import { Progress, Typography } from "antd";
import { TarotTopic } from "../../../types/tarot";

const { Title, Text } = Typography;

interface ReadingUIProps {
  isVisible: boolean;
  selectedTopic: TarotTopic | null;
  pickedCount: number;
}

export const ReadingUI: React.FC<ReadingUIProps> = ({
  isVisible,
  selectedTopic,
  pickedCount,
}) => {
  if (!isVisible) return null;

  const percent = (pickedCount / 3) * 100;

  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        width: "100%",
        maxWidth: 350,
        zIndex: 10,
      }}
    >
      <Title
        level={5}
        style={{
          color: "#fff",
          margin: 0,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          fontSize: "1rem",
        }}
      >
        {pickedCount === 3
          ? "Định mệnh đã an bài..."
          : selectedTopic?.title
          ? `Đang xem: ${selectedTopic.title}`
          : "Chọn 3 lá bài để xem định mệnh"}
      </Title>

      {pickedCount < 3 && (
        <Text
          style={{
            color: "rgba(255,255,255,0.7)",
            display: "block",
            marginTop: 4,
            fontSize: "0.8rem",
          }}
        >
          Nhấp vào các lá bài đang bay để chọn
        </Text>
      )}

      <div style={{ marginTop: 12 }}>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor={{ "0%": "#d4af37", "100%": "#fcd34d" }}
          trailColor="rgba(255,255,255,0.1)"
        />
        <div
          style={{
            color: "#d4af37",
            marginTop: 5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          {pickedCount} / 3
        </div>
      </div>
    </div>
  );
};
