import React from "react";
import VinylHalftonePreloader from "../ui/vinyl-halftone-preloader";

export function VinylBattleIntro({ host, guest, title, onComplete, durationMs = 2800 }) {
  // BSCPE 4th Year Cyber Arena Theme Colorway
  const battlePalette = {
    paper: "#090d16", // Deep space obsidian
    ink: "#0f172a",   // Dark slate vinyl
    glow: "#38bdf8",  // Electric Cyan
    edge: "#1e40af",  // Royal Blue edge
    spark: "#f59e0b", // Neon Amber spark
  };

  const hostName = host?.name || "Player 1";
  const guestName = guest?.name || "Opponent";

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-slate-950 animate-fadeIn select-none">
      <VinylHalftonePreloader
        durationMs={durationMs}
        enter="auto"
        palette={battlePalette}
        title="BSCPE 1v1 SHOWDOWN"
        subtitle={`${hostName} VS ${guestName}`}
        loadingWord="DUEL"
        readyWord="FIGHT"
        credits={[
          "Room 106-109 Midterm Arena",
          "BSCPE 4th Year Class of 2026",
          "Drag vinyl to scratch"
        ]}
        ringText={`SIDE A · ${hostName.toUpperCase()} VS ${guestName.toUpperCase()} · 1v1 BATTLE EXAM · `}
        stages={["SYNCING", "COIN TOSS", "GRID LOCKED", "COMMENCE"]}
        bpm={132}
        hint="Drag the record to scratch · Prepare for battle"
        height="100vh"
        onComplete={onComplete}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 pointer-events-none">
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black text-amber-400 tracking-wider animate-pulse">
              COMMENCING BATTLE
            </h1>
            <p className="text-cyan-300 font-bold tracking-widest text-sm uppercase">
              {hostName} vs {guestName}
            </p>
          </div>
        </div>
      </VinylHalftonePreloader>
    </div>
  );
}
