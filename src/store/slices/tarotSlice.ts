import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardData,
  TarotTopic,
  TarotHistoryItem,
  TarotStep,
} from "../../views/types/tarot";
import {
  getHistory,
  saveReading,
  clearHistory as clearStorageHistory,
} from "../../views/Page/Tarot/utils/historyManager";

interface TarotState {
  step: TarotStep;
  selectedTopic: TarotTopic | null;
  pickedCount: number;
  finalCards: CardData[];
  history: TarotHistoryItem[];
  showHistory: boolean;
  isMuted: boolean;
  isLoading: boolean;
}

const initialState: TarotState = {
  step: TarotStep.TOPIC,
  selectedTopic: null,
  pickedCount: 0,
  finalCards: [],
  history: getHistory(),
  showHistory: false,
  isMuted: false,
  isLoading: true,
};

export const tarotSlice = createSlice({
  name: "tarot",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<TarotStep>) => {
      state.step = action.payload;
    },
    setSelectedTopic: (state, action: PayloadAction<TarotTopic | null>) => {
      state.selectedTopic = action.payload;
    },
    setPickedCount: (state, action: PayloadAction<number>) => {
      state.pickedCount = action.payload;
    },
    setFinalCards: (state, action: PayloadAction<CardData[]>) => {
      state.finalCards = action.payload;
    },
    completeSelection: (state, action: PayloadAction<CardData[]>) => {
      state.finalCards = action.payload;
      state.step = TarotStep.RESULT;
      if (state.selectedTopic) {
        // We need to save to localStorage as a side effect (or ideally in middleware/thunk)
        // For simplicity, we can do it here but ensure we push the RESULT to state
        const newItem = saveReading(state.selectedTopic, action.payload);
        state.history.unshift(newItem);
      }
    },
    toggleHistory: (state, action: PayloadAction<boolean>) => {
      state.showHistory = action.payload;
    },
    setMute: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    resetGame: (state) => {
      state.step = TarotStep.TOPIC;
      state.selectedTopic = null;
      state.pickedCount = 0;
      state.finalCards = [];
    },
    clearAllHistory: (state) => {
      clearStorageHistory();
      state.history = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setStep,
  setSelectedTopic,
  setPickedCount,
  setFinalCards,
  completeSelection,
  toggleHistory,
  setMute,
  resetGame,
  clearAllHistory,
  setLoading,
} = tarotSlice.actions;

export default tarotSlice.reducer;
