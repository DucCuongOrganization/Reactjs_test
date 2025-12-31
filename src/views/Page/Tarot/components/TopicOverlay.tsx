import React from "react";
import { TarotTopic } from "../../../types/tarot";
import { TAROT_TOPICS } from "../constants";

interface TopicOverlayProps {
  onSelect: (topic: TarotTopic) => void;
}

export const TopicOverlay: React.FC<TopicOverlayProps> = ({ onSelect }) => {
  return (
    <div className="overlay-menu">
      <h1 className="menu-title">Select a Tarot Topic</h1>
      <div className="topic-grid">
        {TAROT_TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="topic-card"
            onClick={() => onSelect(topic)}
          >
            <h3>{topic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
