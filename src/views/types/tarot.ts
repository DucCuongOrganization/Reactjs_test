export interface CardData {
  name: string;
  url: string;
  topicMeanings?: Record<string, string>;
}

export interface TarotConfig {
  cardCount: number;
  radius: number;
  cardWidth: number;
  cardHeight: number;
  inspectPos: { x: number; y: number; z: number };
  inspectScale: number;
  storageScale: number;
  storageZ: number;
  storeMarginX: number;
  storeMarginTop: number;
  storeGapY: number;
  spreadLayout?: {
    cardsPerRow: number;
    cardSpacing: number;
    rowSpacing: number;
    startZ: number;
    arcHeight: number;
  };
}
export interface TarotTopic {
  id: string;
  title: string;
}

export interface TarotHistoryItem {
  id: string;
  date: string; // ISO string
  timestamp: number;
  topic: TarotTopic;
  cards: CardData[];
}

export enum TarotStep {
  TOPIC = "TOPIC",
  PICKING = "PICKING",
  RESULT = "RESULT",
}
