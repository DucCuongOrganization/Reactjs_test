import React, { useEffect, useRef } from "react";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clearAllHistory,
  completeSelection,
  resetGame,
  setLoading,
  setPickedCount,
  setSelectedTopic,
  setStep,
  toggleHistory,
} from "../../../store/slices/tarotSlice";
import { TarotStep, TarotTopic } from "../../types/tarot";
import "./TarotAR.scss";
import { TarotSceneManager } from "./TarotScene";
import { HistoryModal } from "./components/HistoryModal";
import { Loader } from "./components/Loader";
import { ReadingUI } from "./components/ReadingUI";
import { ResultModal } from "./components/ResultModal";
import { TopicOverlay } from "./components/TopicOverlay";

// Load Google Fonts
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const TarotAR: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManager = useRef<TarotSceneManager | null>(null);

  const dispatch = useAppDispatch();
  const {
    step,
    selectedTopic,
    pickedCount,
    finalCards,
    history,
    showHistory,
    isLoading,
  } = useAppSelector((state: RootState) => state.tarot);

  // Use a ref to keep track of selected topic for the closure in setupScene
  const selectedTopicRef = useRef<TarotTopic | null>(null);

  // Sync ref with redux state
  useEffect(() => {
    selectedTopicRef.current = selectedTopic;
  }, [selectedTopic]);

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const setupScene = async () => {
      try {
        await Promise.all([
          loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          ),
          loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"
          ),
        ]);

        if (containerRef.current) {
          sceneManager.current = new TarotSceneManager(containerRef.current, {
            onLoadingComplete: () => dispatch(setLoading(false)),
            onCardPicked: (count) => dispatch(setPickedCount(count)),
            onSelectionComplete: (cards) => {
              dispatch(completeSelection(cards));
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize Tarot Scene:", error);
      }
    };

    setupScene();

    return () => {
      sceneManager.current?.cleanup();
    };
  }, [dispatch]);

  const handleTopicSelect = (topic: TarotTopic) => {
    dispatch(setSelectedTopic(topic));
    dispatch(setStep(TarotStep.PICKING));
    sceneManager.current?.startGame();
  };

  const handleRestart = () => {
    dispatch(resetGame());
    sceneManager.current?.reset();
  };

  const handleClearHistory = () => {
    dispatch(clearAllHistory());
  };

  return (
    <div className="tarot-container">
      {/* 3D Canvas Layer */}
      <div ref={containerRef} id="canvas-container" />

      {/* UI Overlay Layer */}
      <div id="ui-layer">
        {step === TarotStep.TOPIC && (
          <>
            <TopicOverlay onSelect={handleTopicSelect} />
            <button
              className="history-toggle-btn"
              onClick={() => dispatch(toggleHistory(true))}
              title="Xem Lịch Sử"
            >
              📜
            </button>
          </>
        )}

        {step === TarotStep.PICKING && (
          <ReadingUI
            isVisible={true}
            selectedTopic={selectedTopic}
            pickedCount={pickedCount}
          />
        )}

        {step === TarotStep.RESULT && (
          <ResultModal
            selectedTopic={selectedTopic}
            cards={finalCards}
            onRestart={handleRestart}
          />
        )}
      </div>

      <HistoryModal
        isOpen={showHistory}
        onClose={() => dispatch(toggleHistory(false))}
        history={history}
        onClear={handleClearHistory}
      />

      <Loader isLoading={isLoading} />
    </div>
  );
};

export default TarotAR;
