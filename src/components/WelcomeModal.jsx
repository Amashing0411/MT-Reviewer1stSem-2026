import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_PRESETS, AVATAR_FRAMES, VANITY_TAGLINES, NAME_EFFECTS } from "../utils/gamification";
import { sound } from "../utils/sound";
import { StudentAvatar } from "./StudentAvatar";
import { 
  User, 
  Upload, 
  Sparkles, 
  Check, 
  Camera,
  X, 
  KeyRound, 
  Smartphone, 
  RefreshCw, 
  AlertCircle, 
  Crop,
  ArrowRight,
  Shield,
  Sliders,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import confetti from "canvas-confetti";
import { ImageCropModal } from "./ImageCropModal";

const SECTIONS = ["4A", "4B", "4C", "4D"];
const TOP_EMOJIS = ["⚡", "🤖", "💻", "🧠", "🛠️", "🚀"];

export function WelcomeModal({ isOpen, onClose, onSaved }) {
  const { profile, levelInfo, updateProfile, restoreProfileFromCloud } = useUser();

  const [mode, setMode] = useState("create"); // "create" | "restore"
  const [name, setName] = useState(profile.name || "");
  const [section, setSection] = useState(profile.section || "BSCPE 4D");
  const [pin, setPin] = useState(profile.pin || "");
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "⚡");
  const [customPhoto, setCustomPhoto] = useState(profile.customPhoto || null);
  const [selectedFrame, setSelectedFrame] = useState(profile.frame || "default");
  const [selectedNameFx, setSelectedNameFx] = useState(profile.nameFx || "none");
  const [selectedTagline, setSelectedTagline] = useState(profile.tagline || "🎓 4th Year Candidate");

  // Advanced edit accordion (only shown when editing existing profile)
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Photo processing and crop studio states
  const [isPhotoProcessing, setIsPhotoProcessing] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageForCrop, setRawImageForCrop] = useState(null);

  // Restore states
  const [restoreName, setRestoreName] = useState("");
  const [restorePin, setRestorePin] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreError, setRestoreError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName(profile.name || "");
      setSection(profile.section || "BSCPE 4D");
      setPin(profile.pin || "");
      setSelectedAvatar(profile.avatar || "⚡");
      setCustomPhoto(profile.customPhoto || null);
      setSelectedFrame(profile.frame || "default");
      setSelectedNameFx(profile.nameFx || "none");
      setSelectedTagline(profile.tagline || "🎓 4th Year Candidate");
      setIsPhotoProcessing(false);
      setPhotoError(null);
      setRestoreError(null);
      setShowAdvanced(false);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  // Photo Upload Handler with Crop Studio
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (e.target) e.target.value = "";
    setPhotoError(null);

    if (file.size > 15 * 1024 * 1024) {
      setPhotoError("Image exceeds 15 MB limit.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file (JPG, PNG, WEBP).");
      return;
    }

    setIsPhotoProcessing(true);
    const reader = new FileReader();
    reader.onerror = () => {
      setIsPhotoProcessing(false);
      setPhotoError("Failed to read image.");
    };

    reader.onload = (uploadEvent) => {
      const rawData = uploadEvent.target.result;
      const img = new Image();
      img.onerror = () => {
        setIsPhotoProcessing(false);
        setPhotoError("Failed to decode image.");
      };
      img.onload = () => {
        const maxDim = 1280;
        if (img.width > maxDim || img.height > maxDim) {
          const canvas = document.createElement("canvas");
          const scale = maxDim / Math.max(img.width, img.height);
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setRawImageForCrop(canvas.toDataURL("image/jpeg", 0.92));
        } else {
          setRawImageForCrop(rawData);
        }
        setIsPhotoProcessing(false);
        setCropModalOpen(true);
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };

  const handleCropSave = (croppedDataUrl) => {
    setCustomPhoto(croppedDataUrl);
    setCropModalOpen(false);
    setRawImageForCrop(null);
    try { sound?.playFlip?.(); } catch (err) {}
  };

  const handleSave = (e) => {
    e?.preventDefault();
    const finalName = name.trim() || `Student #${Math.floor(100 + Math.random() * 900)}`;
    const finalPin = pin.trim() ? pin.trim().slice(0, 6) : String(Math.floor(1000 + Math.random() * 9000));
    
    updateProfile({
      name: finalName,
      section: section.trim() || "BSCPE 4D",
      avatar: selectedAvatar,
      customPhoto: customPhoto,
      frame: selectedFrame,
      tagline: selectedTagline,
      nameFx: selectedNameFx,
      pin: finalPin,
      isAnon: false,
    });

    try { sound?.playCorrect?.(); } catch (err) {}
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    setTimeout(() => {
      onClose();
      if (onSaved) setTimeout(() => onSaved(), 200);
    }, 250);
  };

  const handleStayAnon = () => {
    const anonSuffix = Math.floor(100 + Math.random() * 900);
    const shortSec = section.replace("BSCPE ", "").trim() || "4th";
    const anonPin = String(Math.floor(1000 + Math.random() * 9000));

    updateProfile({
      name: `${shortSec} Anon #${anonSuffix}`,
      section: section.trim() || "BSCPE 4D",
      avatar: selectedAvatar,
      customPhoto: null,
      frame: "default",
      tagline: "Anonymous Candidate",
      nameFx: "none",
      pin: anonPin,
      isAnon: true,
    });

    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    onClose();
    if (onSaved) setTimeout(() => onSaved(), 200);
  };

  const handleRestoreSubmit = async (e) => {
    e.preventDefault();
    if (!restoreName.trim()) {
      setRestoreError("Please enter your registered student name.");
      return;
    }
    setRestoreLoading(true);
    setRestoreError(null);

    const res = await restoreProfileFromCloud(restoreName.trim(), restorePin.trim());
    setRestoreLoading(false);

    if (res.ok) {
      onClose();
    } else {
      setRestoreError(res.error || "Failed to restore profile. Check your Name and 4-Digit PIN.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* THE TWIST: Ambient Aurora Glows & Engineering Grid Backdrop */}
      <div className="fixed inset-0 bg-[#0d0f14]/85 backdrop-blur-xl pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-600/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      {/* CENTERED GLASS CARD (Inspired by modern clean sign-in) */}
      <div 
        className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/12 via-slate-900/90 to-[#0e1015] backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(59,130,246,0.25)] p-6 sm:p-7 flex flex-col items-center text-white my-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Optional Close Button if already configured */}
        {profile.isConfigured && (
          <button
            onClick={onClose}
            className="btn-haptic absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* LOGO EMBLEM */}
        <div className="relative group mb-3">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/90 border border-white/20 shadow-xl flex items-center justify-center p-2 backdrop-blur-xl">
            <img
              src="/engineering-logo.png"
              alt="College of Engineering"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* TITLE & SUBTITLE */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight text-center">
          {mode === "create" ? "BSCPE Midterm Arena" : "Restore Student Pass"}
        </h2>
        <p className="text-xs text-slate-400 text-center mt-0.5 mb-4">
          {mode === "create" 
            ? "College of Engineering • Room 106–109" 
            : "Enter Name and 4-Digit PIN to reload rank"}
        </p>

        {/* TAB 1: NEW / EDIT PASS */}
        {mode === "create" && (
          <form onSubmit={handleSave} className="w-full flex flex-col gap-3.5">
            
            {/* 1. AVATAR CUSTOMIZATION (Clean, visual 1-row centerpiece) */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="relative shrink-0">
                <StudentAvatar
                  avatar={selectedAvatar}
                  customPhoto={customPhoto}
                  frameId={selectedFrame}
                  size="md"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPhotoProcessing}
                  className="btn-haptic absolute -bottom-1 -right-1 p-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow border border-slate-900 cursor-pointer"
                  title="Upload Photo"
                >
                  {isPhotoProcessing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Camera className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Choose Avatar:</span>
                  {customPhoto && (
                    <button
                      type="button"
                      onClick={() => setCustomPhoto(null)}
                      className="text-rose-400 hover:underline text-[10px]"
                    >
                      Reset Photo
                    </button>
                  )}
                </div>
                {/* 6 Top Emojis + Photo Button */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                  {TOP_EMOJIS.map((emoji) => {
                    const isSelected = !customPhoto && selectedAvatar === emoji;
                    return (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => {
                          setSelectedAvatar(emoji);
                          setCustomPhoto(null);
                          try { sound?.playFlip?.(); } catch (err) {}
                        }}
                        className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 border border-blue-400 text-white scale-110 shadow-sm"
                            : "bg-white/5 hover:bg-white/15 text-slate-300"
                        }`}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2 h-7 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-blue-300 border border-white/10 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Upload className="w-2.5 h-2.5" />
                    <span>Photo</span>
                  </button>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {photoError && (
              <div className="text-xs text-rose-400 text-left bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
                {photoError}
              </div>
            )}

            {/* 2. STUDENT NAME INPUT */}
            <div className="w-full relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Student Name / Codename"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10 transition-all shadow-inner"
              />
            </div>

            {/* 3. SECTION PICKER (Compact 4-Pill Segmented Row) */}
            <div className="w-full">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                <span>Select 4th Year Section:</span>
                <span className="text-blue-400 font-mono">
                  {section === "BSCPE 4A" ? "Room 109" : section === "BSCPE 4B" ? "Room 108" : section === "BSCPE 4C" ? "Room 107" : "Room 106"}
                </span>
              </div>
              <div className="w-full grid grid-cols-4 gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
                {SECTIONS.map((sec) => {
                  const isSelected = section === `BSCPE ${sec}`;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setSection(`BSCPE ${sec}`)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black scale-102"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. SECURITY & RESTORE PIN */}
            <div className="w-full relative">
              <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={6}
                placeholder="4-Digit Security PIN (e.g. 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 text-amber-200 placeholder-slate-400 text-xs sm:text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/40 border border-white/10 transition-all shadow-inner"
              />
            </div>

            {/* ADVANCED VANITY SETTINGS (Only shown when already configured or toggled) */}
            {profile.isConfigured && (
              <div className="w-full pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 hover:text-slate-200 py-1 px-1 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3 h-3 text-amber-400" />
                    <span>Equipped Frames & Name FX (Lv. {levelInfo.level})</span>
                  </span>
                  {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showAdvanced && (
                  <div className="mt-2 p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-2 animate-fadeIn text-left">
                    <span className="text-[10px] font-bold text-slate-400 block">Avatar Frames</span>
                    <div className="grid grid-cols-4 gap-1">
                      {AVATAR_FRAMES.map((f) => {
                        const isUnlocked = levelInfo.level >= f.minLevel;
                        const isEquipped = selectedFrame === f.id;
                        return (
                          <button
                            type="button"
                            key={f.id}
                            disabled={!isUnlocked}
                            onClick={() => setSelectedFrame(f.id)}
                            className={`p-1 rounded-lg text-center text-[9px] font-bold border transition-all ${
                              isEquipped ? "bg-blue-600/40 border-blue-400 text-white" : isUnlocked ? "bg-white/5 border-white/10 text-slate-300" : "opacity-30 border-transparent text-slate-500"
                            }`}
                          >
                            {f.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. PRIMARY ENTER BUTTON */}
            <div className="pt-1">
              <button
                type="submit"
                className="btn-haptic w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{profile.isConfigured ? "Save & Enter Arena" : "Enter Midterm Arena"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* SECONDARY LINKS */}
            <div className="w-full text-center space-y-1 pt-0.5">
              <button
                type="button"
                onClick={() => setMode("restore")}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Already have a PIN? <span className="underline text-blue-400">Restore Account</span>
              </button>

              {!profile.isConfigured && (
                <div>
                  <button
                    type="button"
                    onClick={handleStayAnon}
                    className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    Or continue as Anonymous
                  </button>
                </div>
              )}
            </div>

          </form>
        )}

        {/* TAB 2: RESTORE FORM */}
        {mode === "restore" && (
          <form onSubmit={handleRestoreSubmit} className="w-full flex flex-col gap-3">
            {restoreError && (
              <div className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-left">
                {restoreError}
              </div>
            )}

            <div className="w-full relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Registered Student Name"
                value={restoreName}
                onChange={(e) => setRestoreName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10"
              />
            </div>

            <div className="w-full relative">
              <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                maxLength={6}
                required
                placeholder="4-Digit PIN"
                value={restorePin}
                onChange={(e) => setRestorePin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 text-amber-200 placeholder-slate-400 text-xs sm:text-sm font-mono font-bold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-white/10"
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={restoreLoading}
                className="btn-haptic w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-full shadow-lg shadow-blue-600/30 transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {restoreLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Checking Cloud...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Verify PIN & Restore</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setMode("create")}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                ← Back to New Pass Creation
              </button>
            </div>
          </form>
        )}

      </div>

      {/* USER COUNT & AVATARS AT THE BOTTOM (Directly from reference) */}
      <div className="relative z-10 mt-5 flex flex-col items-center text-center">
        <p className="text-slate-400 text-xs mb-2">
          Join <span className="font-semibold text-white">BSCPE 4th Year Engineers</span> reviewing for Midterms.
        </p>
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full border-2 border-[#0d0f14] bg-blue-900 flex items-center justify-center text-[11px] shadow-sm">
            ⚡
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-[#0d0f14] bg-indigo-900 flex items-center justify-center text-[11px] shadow-sm">
            🤖
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-[#0d0f14] bg-purple-900 flex items-center justify-center text-[11px] shadow-sm">
            💻
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-[#0d0f14] bg-emerald-900 flex items-center justify-center text-[11px] shadow-sm">
            🛠️
          </div>
        </div>
      </div>

      {/* Interactive Photo Crop & Framing Studio Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={rawImageForCrop}
        frameId={selectedFrame}
        onSave={handleCropSave}
        onClose={() => { setCropModalOpen(false); setRawImageForCrop(null); }}
      />
    </div>
  );
}

export default WelcomeModal;
