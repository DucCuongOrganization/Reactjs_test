import React, { useEffect, useRef } from "react";
import { Button, Tooltip } from "antd";
import {
  HistoryOutlined,
  SoundOutlined,
  MutedOutlined,
} from "@ant-design/icons";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clearAllHistory,
  completeSelection,
  resetGame,
  setLoading,
  setMute,
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
import { soundManager } from "./utils/SoundManager";

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
    isMuted,
  } = useAppSelector((state: RootState) => state.tarot);

  // Sync mute state with SoundManager
  useEffect(() => {
    soundManager.setMute(isMuted);
  }, [isMuted]);

  // Reset game state when component mounts (e.g., clicking the tab)
  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

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
            onCardPicked: (count) => {
              dispatch(setPickedCount(count));
              soundManager.playSelectSound(); // SFX: Card Pick
            },
            onSelectionComplete: (cards) => {
              dispatch(completeSelection(cards));
              soundManager.playRevealSound(); // SFX: Reveal
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

    // Start Audio
    soundManager.playSelectSound();
  };

  const handleRestart = () => {
    dispatch(resetGame());
    sceneManager.current?.reset();
  };

  const handleClearHistory = () => {
    dispatch(clearAllHistory());
  };

  const handleToggleMute = () => {
    dispatch(setMute(!isMuted));
  };

  return (
    <div className="tarot-container">
      {/* 3D Canvas Layer */}
      <div ref={containerRef} id="canvas-container" />

      {/* UI Overlay Layer */}
      <div id="ui-layer">
        {/* Sound Toggle Button */}
        <Tooltip title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}>
          <Button
            className="sound-toggle-btn"
            shape="circle"
            icon={isMuted ? <MutedOutlined /> : <SoundOutlined />}
            onClick={handleToggleMute}
          />
        </Tooltip>

        {step === TarotStep.TOPIC && (
          <>
            <TopicOverlay onSelect={handleTopicSelect} />
            <Tooltip title="Xem Lịch Sử">
              <Button
                className="history-toggle-btn"
                shape="circle"
                icon={<HistoryOutlined />}
                onClick={() => dispatch(toggleHistory(true))}
              />
            </Tooltip>
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
