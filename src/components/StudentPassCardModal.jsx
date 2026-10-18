import React, { useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { createSyncUrl, AVATAR_FRAMES, NAME_EFFECTS } from "../utils/gamification";
import { StudentAvatar } from "./StudentAvatar";
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  KeyRound, 
  ExternalLink 
} from "lucide-react";
import confetti from "canvas-confetti";

export function StudentPassCardModal({ isOpen, onClose }) {
  const { profile, levelInfo } = useUser();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const pin = profile.pin || "0000";
  const studentName = profile.name || "Student Reviewer";
  const section = profile.section || "BSCPE 4D";

  // Generate high-resolution ID card PNG and download
  const handleDownloadImage = () => {
    setIsGenerating(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = 800;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient (Deep Navy/Slate to Cyber Indigo)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#090D16");
    bgGradient.addColorStop(0.5, "#0F172A");
    bgGradient.addColorStop(1, "#1E1B4B");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Card Outer Border & Glow
    ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Header Background Bar
    ctx.fillStyle = "rgba(30, 58, 138, 0.45)";
    ctx.fillRect(20, 20, width - 40, 80);

    // Header Institution Text
    ctx.fillStyle = "#F8FAFC";
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillText("DALUBHASAAN NG LUNGSOD NG SAN PABLO", 40, 52);

    ctx.fillStyle = "#93C5FD";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("COLLEGE OF ENGINEERING • BSCPE MIDTERM EXAMINATION 2026", 40, 76);

    // Top Right Badge
    ctx.fillStyle = "#22C55E";
    ctx.beginPath();
    ctx.arc(width - 55, 58, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#E2E8F0";
    ctx.font = "bold 12px monospace";
    ctx.fillText("OFFICIAL PASS", width - 160, 62);

    // Left Column: Avatar Box
    ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
    ctx.strokeStyle = "rgba(96, 165, 250, 0.5)";
    ctx.lineWidth = 2;
    ctx.fillRect(40, 125, 120, 120);
    ctx.strokeRect(40, 125, 120, 120);

    // Draw Emoji Avatar
    ctx.font = "64px 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(profile.avatar || "🤖", 100, 210);
    ctx.textAlign = "left";

    // Level Badge under avatar
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
    ctx.fillRect(40, 260, 120, 32);
    ctx.fillStyle = "#60A5FA";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`LVL ${levelInfo.level}`, 100, 281);
    ctx.textAlign = "left";

    // Center Details: Name & Section
    ctx.fillStyle = "#64748B";
    ctx.font = "bold 11px 'Inter', sans-serif";
    ctx.fillText("REGISTERED STUDENT / CODENAME", 185, 145);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 28px 'Inter', sans-serif";
    ctx.fillText(studentName.length > 22 ? studentName.slice(0, 20) + "..." : studentName, 185, 180);

    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 15px 'Inter', sans-serif";
    ctx.fillText(`SECTION: ${section}  •  ${levelInfo.title}`, 185, 210);

    if (profile.tagline) {
      ctx.fillStyle = "#FBBF24";
      ctx.font = "bold 13px 'Inter', sans-serif";
      ctx.fillText(profile.tagline, 185, 233);
      ctx.fillStyle = "#94A3B8";
      ctx.font = "12px 'Inter', sans-serif";
      ctx.fillText(`TOTAL SCORE: ${(profile.xp || 0).toLocaleString()} XP  •  STATUS: VERIFIED CANDIDATE`, 185, 252);
    } else {
      ctx.fillStyle = "#94A3B8";
      ctx.font = "13px 'Inter', sans-serif";
      ctx.fillText(`TOTAL SCORE: ${(profile.xp || 0).toLocaleString()} XP  •  STATUS: VERIFIED CANDIDATE`, 185, 235);
    }

    // Big PIN Security Box (Bottom Right)
    const pinBoxX = 185;
    const pinBoxY = 265;
    const pinBoxW = width - pinBoxX - 40;
    const pinBoxH = 145;

    ctx.fillStyle = "rgba(2, 6, 23, 0.75)";
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 2;
    ctx.fillRect(pinBoxX, pinBoxY, pinBoxW, pinBoxH);
    ctx.strokeRect(pinBoxX, pinBoxY, pinBoxW, pinBoxH);

    ctx.fillStyle = "#F59E0B";
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillText("🔒 CROSS-DEVICE RESTORE PIN", pinBoxX + 20, pinBoxY + 30);

    // Large PIN Display [ 1  2  3  4 ]
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px monospace";
    ctx.fillText(`[ ${pin.split("").join("  ")} ]`, pinBoxX + 20, pinBoxY + 82);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillText("Keep this image in your gallery! Enter this PIN to restore progress on your phone.", pinBoxX + 20, pinBoxY + 118);

    // Bottom Footer
    ctx.fillStyle = "#475569";
    ctx.font = "11px monospace";
    ctx.fillText(`DLSP-COE-MIDTERM-2026 • ISSUED: ${new Date().toLocaleDateString()}`, 40, 440);

    // Download Image
    setTimeout(() => {
      const imageUri = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `DLSP_Reviewer_Pass_${studentName.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
      downloadLink.href = imageUri;
      downloadLink.click();
      setIsGenerating(false);

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }, 150);
  };

  // Copy 1-Tap Device Link for Phone
  const handleCopySyncLink = async () => {
    try {
      const syncUrl = createSyncUrl(profile);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(syncUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = syncUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (e) {
      console.error("Failed to copy sync link", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm dark:backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-7 relative space-y-5">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn-haptic absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/50 rounded-full font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Official Student Pass & Device Sync</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Save Your Reviewer Pass
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Download this pass to your photo gallery so you never forget your 4-digit PIN when switching between your laptop and phone!
            </p>
          </div>

          {/* Visual Digital ID Badge Preview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-blue-500/30 space-y-4">
            
            {/* Institution Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] sm:text-xs font-black tracking-wider text-slate-300 block">
                  DALUBHASAAN NG LUNGSOD NG SAN PABLO
                </span>
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">
                  College of Engineering • BSCPE 2026
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            {/* Profile Row */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="p-1.5 sm:p-2 mx-0.5 shrink-0 flex items-center justify-center">
                <StudentAvatar
                  avatar={profile.avatar}
                  customPhoto={profile.customPhoto}
                  frameId={profile.frame}
                  size="lg"
                />
              </div>

              <div className="space-y-0.5 min-w-0 flex-1 truncate">
                <span className="text-xs text-slate-400 font-semibold block">Student Reviewer</span>
                <h4 className={`text-base sm:text-lg font-bold truncate ${NAME_EFFECTS.find(fx => fx.id === profile.nameFx)?.cssClass || "text-white"}`}>
                  {studentName}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-blue-300 font-semibold">
                  <span className="bg-blue-900/60 px-2 py-0.2 rounded border border-blue-700/50">
                    {section}
                  </span>
                  <span>{levelInfo.title}</span>
                  <span className="text-amber-400">⚡ {(profile.xp || 0).toLocaleString()} XP</span>
                </div>
                {profile.tagline && (
                  <div className="pt-0.5">
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {profile.tagline}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Large PIN Highlight Banner */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center justify-center sm:justify-start gap-1">
                  <KeyRound className="w-3 h-3" />
                  <span>Your 4-Digit Restore PIN</span>
                </span>
                <p className="text-[10px] text-slate-400">
                  Required to restore this account on your phone
                </p>
              </div>

              <div className="px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/60 font-mono text-2xl font-black text-amber-300 tracking-[0.25em]">
                {pin}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="btn-haptic w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? "Generating PNG..." : "Download Pass to Photos / Gallery (.png)"}</span>
            </button>

            <button
              onClick={handleCopySyncLink}
              className="btn-haptic w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/90 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Smartphone className="w-3.5 h-3.5 text-blue-600" />}
              <span>{copiedLink ? "Sync Link Copied to Clipboard!" : "Copy 1-Tap Sync Link for Phone"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
            >
              Continue to Reviewer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentPassCardModal;
