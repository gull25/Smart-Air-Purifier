import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AIInsight = ({ data, onApplyRecommendation }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();
  const {
    currentIndex,
    predictedIndex,
    horizonMinutes,
    confidencePercentage,
    recommendationTitle,
    recommendationMessage,
    recommendedSpeed,
    reasoningFactors,
  } = data || {};

  const handleApply = async () => {
    if (isApplied || isApplying) return;

    setIsApplying(true);
    try {
      if (onApplyRecommendation) {
        await onApplyRecommendation(recommendedSpeed || 70);
      }
      setIsApplied(true);
      setTimeout(() => {
        setIsApplied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to apply AI recommendation", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[24px]">
              psychology
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                AI Air Quality Intelligence
              </h2>
              <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-2 py-0.5 rounded-full font-bold">
                Active Neural Model v2.4
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Predictive atmospheric monitoring driven by real-time hardware
              telemetry
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-caps text-label-caps text-on-surface">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span> Engine
            Synchronized
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md p-space-md rounded-xl bg-surface-container-low mb-space-lg">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Current Index
          </span>
          <span className="font-headline-md text-headline-md text-on-surface mt-0.5">
            {currentIndex || 0}{" "}
            <span className="font-body-sm text-body-sm text-amber-600 font-semibold">
              AQI
            </span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Predicted Index
          </span>
          <span className="font-headline-md text-headline-md text-error mt-0.5">
            {predictedIndex || 0}{" "}
            <span className="font-body-sm text-body-sm text-error font-semibold">
              AQI
            </span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Prediction Horizon
          </span>
          <span className="font-headline-md text-headline-md text-on-surface mt-0.5">
            {horizonMinutes || 0}{" "}
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Minutes
            </span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Prediction Confidence
          </span>
          <span className="font-headline-md text-headline-md text-primary mt-0.5">
            {confidencePercentage || 0}%{" "}
            <span className="font-body-sm text-body-sm text-tertiary font-semibold">
              Reliable
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md pt-space-2xs">
        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            className={`px-space-lg py-2.5 rounded-xl text-on-primary font-label-md text-label-md transition-all flex items-center gap-2 shadow-sm ${isApplied ? "bg-tertiary" : "bg-primary hover:bg-primary-container"} ${isApplying ? "opacity-70 cursor-not-allowed" : ""}`}
            onClick={handleApply}
            type="button"
            disabled={isApplying}
          >
            {isApplying ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  sync
                </span>
                Applying...
              </>
            ) : !isApplied ? (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  speed
                </span>
                Apply AI Recommendation ({recommendedSpeed || 70}%)
              </>
            ) : (
              `Recommendation Applied (${recommendedSpeed || 70}%)`
            )}
          </button>
          <button
            className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-2"
            onClick={() => navigate("/fan-recommendation")}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              insights
            </span>
            View Full Prediction Analysis
          </button>
        </div>
        <details className="group cursor-pointer">
          <summary className="font-label-md text-label-md text-primary flex items-center gap-1 list-none select-none">
            <span>AI Reasoning Factors</span>
            <span className="material-symbols-outlined text-[16px] group-open:rotate-180 transition-transform">
              expand_more
            </span>
          </summary>
          <div className="absolute left-space-lg right-space-lg bottom-16 sm:static sm:mt-2 p-space-sm rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm shadow-md sm:shadow-none z-10">
            {reasoningFactors || "Processing data..."}
          </div>
        </details>
      </div>
    </div>
  );
};

export default AIInsight;
