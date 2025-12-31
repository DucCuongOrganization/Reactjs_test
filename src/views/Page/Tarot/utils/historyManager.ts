import { TarotHistoryItem, TarotTopic, CardData } from "../../../types/tarot";

const STORAGE_KEY = "tarot_reading_history";
const MAX_HISTORY_ITEMS = 50; // Limit to last 50 readings

export const saveReading = (
  topic: TarotTopic,
  cards: CardData[]
): TarotHistoryItem => {
  const newItem: TarotHistoryItem = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    topic,
    cards,
  };

  const currentHistory = getHistory();
  const updatedHistory = [newItem, ...currentHistory].slice(
    0,
    MAX_HISTORY_ITEMS
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save tarot history:", error);
  }

  return newItem;
};

export const getHistory = (): TarotHistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);

    // Migration: Convert old items with 'date' property to timestamp-only format
    return items.map((item: any) => {
      // If item has 'date' but no 'timestamp', convert date to timestamp
      if (item.date && !item.timestamp) {
        return {
          ...item,
          timestamp: new Date(item.date).getTime(),
        };
      }
      // Remove 'date' property if it exists (for items that have both)
      const { date, ...rest } = item;
      return rest as TarotHistoryItem;
    });
  } catch (error) {
    console.error("Failed to load tarot history:", error);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
