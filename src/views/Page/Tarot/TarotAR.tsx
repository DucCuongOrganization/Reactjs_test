import {
  HistoryOutlined,
  MutedOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const loadScript = (src: string, integrity?: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        if (integrity) {
          script.integrity = integrity;
        }
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const setupScene = async () => {
      try {
        await Promise.all([
          loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
            "sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ=="
          ),
          loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js",
            "sha512-lIKG1kC5TMb1Kf4D6YpJWLCJpfL4RAzfRLH0xrCYSZCZoxX8MhogmKG8Pg/JfTqXDJUmOqRd+jVTA+zIOA7WXw=="
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
        dispatch(setLoading(false)); // Clear loading state on error
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
        <Tooltip title={isMuted ? "Unmute" : "Mute"}>
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
            <Tooltip title="View History">
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
