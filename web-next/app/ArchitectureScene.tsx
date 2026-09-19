"use client";

import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";

/** CSS 3D illustration without a canvas, rendering loop, or external assets. */
export function ArchitectureScene() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="architecture-visual" data-paused={paused}>
      <div className="scene-art" aria-hidden="true">
        <div className="scene-grid" />
        <div className="scene-orbit orbit-one" />
        <div className="scene-orbit orbit-two" />
        <span className="scene-coordinate">FIG. 01 — ANATOMY OF A SYSTEM</span>
        <div className="scene-perspective">
          <div className="architecture-stack">
            {[
              ["interface", "01", "INTERFACE", "Experience & interaction"],
              ["application", "02", "APPLICATION", "Use cases & orchestration"],
              ["domain", "03", "DOMAIN", "The heart of your system"],
              ["infrastructure", "04", "INFRASTRUCTURE", "Data & external services"],
            ].map(([layer, number, title, subtitle]) => (
              <div className={`architecture-layer layer-${layer}`} key={layer}>
                <div className="layer-surface">
                  <div className="layer-heading">
                    <span>{number}</span>
                    <span className="layer-port" />
                  </div>
                  <div className="layer-symbol">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="layer-title">{title}</div>
                  <div className="layer-subtitle">{subtitle}</div>
                  <div className="layer-trace" />
                </div>
                <div className="layer-edge edge-front" />
                <div className="layer-edge edge-right" />
              </div>
            ))}
          </div>
        </div>
        <div className="scene-label label-top">
          <span /> 関心を分離する
        </div>
        <div className="scene-label label-bottom">
          <span /> 構造が、理解をつくる
        </div>
        <span className="scene-axis">X / Y / Z</span>
      </div>
      <button
        className="scene-control"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <IconPlayerPlay size={13} aria-hidden="true" />
        ) : (
          <IconPlayerPause size={13} aria-hidden="true" />
        )}
        {paused ? "アニメーションを再生" : "アニメーションを停止"}
      </button>
      <span className="scene-static-note">ARCHITECTURE IN LAYERS</span>
    </div>
  );
}
