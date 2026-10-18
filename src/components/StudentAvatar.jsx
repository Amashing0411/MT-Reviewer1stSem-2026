import React from "react";
import { getAvatarFrame } from "../utils/gamification";

export function StudentAvatar({
  avatar = "🤖",
  customPhoto = null,
  frameId = "default",
  size = "md", // "xs" | "sm" | "md" | "lg" | "xl"
  className = "",
  onClick,
}) {
  const frame = getAvatarFrame(frameId);
  const isCircular = frame?.shape === "circle";
  const hasAsset = Boolean(frame?.assetUrl);

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-2xl",
    xl: "w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl",
  }[size] || "w-10 h-10 text-base";

  const roundedClass = isCircular 
    ? "rounded-full" 
    : (size === "xl" ? "rounded-2xl" : "rounded-xl");
    
  const innerRoundedClass = isCircular 
    ? "rounded-full" 
    : (size === "xl" ? "rounded-[14px]" : "rounded-[10px]");

  // For CSS-only frames (default, bronze, silver), apply the CSS animation/border.
  // For custom GIF asset frames, the asset IS the frame — avoid clashing square CSS box-shadows.
  const frameEffectClass = !hasAsset ? (frame?.cssClass || "avatar-frame-default") : "";

  // Optimal expansion scale factor so the frame's transparent center hole matches the avatar size
  const scale = frame?.scale || 1.65;

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
    >
      {/* Avatar Container with Background */}
      <div
        className={`w-full h-full ${roundedClass} p-0.5 flex items-center justify-center transition-all ${frameEffectClass}`}
      >
        <div
          className={`w-full h-full ${innerRoundedClass} bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xs select-none`}
        >
          {customPhoto ? (
            <img
              src={customPhoto}
              alt="Avatar"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="leading-none flex items-center justify-center">{avatar || "🤖"}</span>
          )}
        </div>
      </div>

      {/* Expanded Animated Frame Overlay */}
      {hasAsset && (
        <img
          src={frame.assetUrl}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none pointer-events-none object-contain z-10 select-none transition-transform"
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default StudentAvatar;
