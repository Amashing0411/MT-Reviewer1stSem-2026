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
  ChevronUp,
  Award,
  Flame,
  Tag,
  Palette,
  Sun,
  Moon,
  Trash2,
  Lock,
  ArrowLeft
} from "lucide-react";
import confetti from "canvas-confetti";
import { ImageCropModal } from "./ImageCropModal";

const SECTIONS = [
  { id: "4A", name: "BSCPE 4A", room: "Room 109", proctor: "Joel Urriquia" },
  { id: "4B", name: "BSCPE 4B", room: "Room 108", proctor: "Luisa Tubana" },
  { id: "4C", name: "BSCPE 4C", room: "Room 107", proctor: "Rosebel Agapay" },
  { id: "4D", name: "BSCPE 4D", room: "Room 106", proctor: "Lyka Magbuhos" },
];

export function WelcomeModal({ isOpen, onClose, onSaved }) {
  const { profile, levelInfo, updateProfile, restoreProfileFromCloud, theme, setTheme } = useUser();

  // Wizard steps for unconfigured users: 1 = Name/Section/PIN, 2 = Avatar (Netflix style), 3 = Restore
  const [signupStep, setSignupStep] = useState(1);
  const [isRestoring, setIsRestoring] = useState(false);

  // Form states
  const [name, setName] = useState(profile.name || "");
  const [section, setSection] = useState(profile.section || "BSCPE 4D");
  const [pin, setPin] = useState(profile.pin || "");
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "/avatars/bean-female-debugging.jpg");
  const [customPhoto, setCustomPhoto] = useState(profile.customPhoto || null);
  const [selectedFrame, setSelectedFrame] = useState(profile.frame || "default");
  const [selectedNameFx, setSelectedNameFx] = useState(profile.nameFx || "none");
  const [selectedTagline, setSelectedTagline] = useState(profile.tagline || "🎓 4th Year Candidate");
  const [customTaglineInput, setCustomTaglineInput] = useState("");

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
      setSelectedAvatar(profile.avatar || "/avatars/bean-female-debugging.jpg");
      setCustomPhoto(profile.customPhoto || null);
      setSelectedFrame(profile.frame || "default");
      setSelectedNameFx(profile.nameFx || "none");
      setSelectedTagline(profile.tagline || "🎓 4th Year Candidate");
      setCustomTaglineInput("");
      setIsPhotoProcessing(false);
      setPhotoError(null);
      setRestoreError(null);
      setSignupStep(1);
      setIsRestoring(false);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const isConfigured = Boolean(profile.isConfigured);

  // Track if changes have been made in Edit Mode
  const hasChanges = (
    name.trim() !== (profile.name || "").trim() ||
    section !== (profile.section || "BSCPE 4D") ||
    pin.trim() !== (profile.pin || "").trim() ||
    selectedAvatar !== (profile.avatar || "/avatars/bean-female-debugging.jpg") ||
    Boolean(customPhoto) !== Boolean(profile.customPhoto) ||
    (customPhoto && profile.customPhoto && customPhoto !== profile.customPhoto) ||
    selectedFrame !== (profile.frame || "default") ||
    selectedNameFx !== (profile.nameFx || "none") ||
    Boolean(customTaglineInput.trim()) ||
    selectedTagline !== (profile.tagline || "🎓 4th Year Candidate")
  );

  // Photo Upload Handler with Auto-scaling and Crop Studio
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

  const handleOpenCropper = () => {
    if (customPhoto) {
      setRawImageForCrop(customPhoto);
      setCropModalOpen(true);
    }
  };

  // Complete Onboarding or Save Changes
  const handleSave = (e) => {
    e?.preventDefault();
    const finalName = name.trim() || `Student #${Math.floor(100 + Math.random() * 900)}`;
    const finalPin = pin.trim() ? pin.trim().slice(0, 6) : String(Math.floor(1000 + Math.random() * 9000));
    const finalTagline = customTaglineInput.trim() || selectedTagline || "🎓 4th Year Candidate";

    updateProfile({
      name: finalName,
      section: section.trim() || "BSCPE 4D",
      avatar: selectedAvatar,
      customPhoto: customPhoto,
      frame: selectedFrame,
      tagline: finalTagline,
      nameFx: selectedNameFx,
      pin: finalPin,
      isAnon: false,
    });

    try { sound?.playCorrect?.(); } catch (err) {}
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.55 } });

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

  // =========================================================================
  // SCENARIO A: USER IS ALREADY CONFIGURED -> SHOW PURE EDIT PROFILE STUDIO
  // =========================================================================
  if (isConfigured) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl pointer-events-none" />
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div 
          className="relative z-10 w-full max-w-lg rounded-3xl bg-white/95 dark:bg-slate-950/98 backdrop-blur-2xl border border-slate-200 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3),0_0_40px_rgba(59,130,246,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.3)] p-5 sm:p-7 flex flex-col text-slate-800 dark:text-white my-auto max-h-[92dvh] overflow-y-auto scrollbar-none animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/20 p-1 flex items-center justify-center shrink-0">
                <img src="/engineering-logo.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">Cadet Profile & Prestige Studio</h3>
                <span className="text-[11px] text-blue-600 dark:text-blue-300 font-semibold">Customize your borders, name effects & credentials</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-haptic p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 rounded-full transition-all cursor-pointer shrink-0"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            
            {/* 1. Prestige Level & Title Banner */}
            <div className="p-3.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 dark:from-blue-900/90 dark:via-indigo-900/80 dark:to-slate-900/90 text-white rounded-2xl border border-blue-500/30 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1 bg-white/10 rounded-xl backdrop-blur-xs">{levelInfo.icon}</span>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider">Level {levelInfo.level}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                        {levelInfo.level >= 10 ? "LEGENDARY" : levelInfo.level >= 7 ? "MASTER" : "RANKED"}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-amber-300 tracking-tight">
                      {levelInfo.title}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-300 dark:text-slate-400 font-bold uppercase tracking-wider">Total XP</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-400 font-mono">
                    {(profile.xp || 0).toLocaleString()} XP
                  </div>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-blue-200">
                  <span className="truncate max-w-[200px]">Next: {levelInfo.nextTitle}</span>
                  <span>{levelInfo.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/15">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(4, levelInfo.percent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Live Avatar Showcase & Photo Actions */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 flex flex-col items-center text-center">
              <div className="relative group my-2 p-3 flex items-center justify-center">
                <StudentAvatar
                  avatar={selectedAvatar}
                  customPhoto={customPhoto}
                  frameId={selectedFrame}
                  size="xl"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPhotoProcessing}
                  className="btn-haptic absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg border-2 border-white dark:border-slate-900 cursor-pointer z-30 transition-transform hover:scale-105"
                  title="Upload Custom Photo"
                >
                  {isPhotoProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                </button>
              </div>

              {/* Photo Feedback */}
              {photoError && (
                <div className="w-full p-2 mb-2 bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 dark:border-rose-500/40 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-1.5 text-left">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{photoError}</span>
                </div>
              )}

              {/* Photo Action Controls */}
              <div className="flex items-center gap-1.5 text-xs flex-wrap justify-center mb-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPhotoProcessing}
                  className="btn-haptic px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-200 dark:border-blue-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{customPhoto ? "Change Photo" : "Upload Custom Photo (Max 15MB)"}</span>
                </button>

                {customPhoto && (
                  <>
                    <button
                      type="button"
                      onClick={handleOpenCropper}
                      className="btn-haptic px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 dark:text-indigo-200 dark:border-indigo-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Crop className="w-3.5 h-3.5" />
                      <span>Crop & Zoom</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCustomPhoto(null);
                        setPhotoError(null);
                        try { sound?.playFlip?.(); } catch (err) {}
                      }}
                      className="btn-haptic px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 dark:text-rose-200 dark:border-rose-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Character Avatar Image Picker */}
              <div className="w-full pt-2 border-t border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-1.5 text-left">
                  Preset Character Avatars:
                </span>
                <div className="grid grid-cols-6 gap-1.5">
                  {AVATAR_PRESETS.map((av) => {
                    const isPicked = !customPhoto && (selectedAvatar === av.image || selectedAvatar === av.id);
                    return (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => {
                          setSelectedAvatar(av.image);
                          setCustomPhoto(null);
                          setPhotoError(null);
                          try { sound?.playFlip?.(); } catch (err) {}
                        }}
                        className={`p-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group ${
                          isPicked 
                            ? "bg-blue-100 border-2 border-blue-600 shadow-sm scale-105 dark:bg-blue-600/40 dark:border-blue-400 dark:shadow-[0_0_12px_rgba(59,130,246,0.6)]" 
                            : "bg-white hover:bg-slate-100 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10"
                        }`}
                        title={`${av.label} — ${av.desc}`}
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                          <img 
                            src={av.image} 
                            alt={av.label} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                          />
                        </div>
                        <span className="text-[7.5px] font-bold text-slate-700 dark:text-slate-300 truncate w-full mt-1 text-center">
                          {av.label.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. PRESTIGE AVATAR FRAMES (ALL 12 BORDERS RESTORED!) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-left space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Prestige Avatar Frames</span>
                </label>
                <span className="text-[10px] text-blue-600 dark:text-blue-300 font-bold font-mono">
                  Level {levelInfo.level} Cadet
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {AVATAR_FRAMES.map((f) => {
                  const isUnlocked = levelInfo.level >= f.minLevel;
                  const isEquipped = selectedFrame === f.id;

                  return (
                    <button
                      type="button"
                      key={f.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        setSelectedFrame(f.id);
                        try { sound?.playFlip?.(); } catch (err) {}
                      }}
                      className={`p-1.5 rounded-xl flex flex-col items-center gap-1 border transition-all text-center relative ${
                        isEquipped
                          ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/30 shadow-xs dark:bg-blue-600/35 dark:border-blue-400 dark:ring-2 dark:ring-blue-400/30 dark:shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                          : isUnlocked
                          ? "bg-white hover:bg-slate-100 border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 cursor-pointer"
                          : "bg-slate-100/60 border-slate-200/60 opacity-40 dark:bg-white/2 dark:border-white/5 cursor-not-allowed"
                      }`}
                      title={isUnlocked ? `Equip ${f.name}` : `Unlocks at Level ${f.minLevel}`}
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-200/60 dark:bg-black/40">
                        {f.assetUrl ? (
                          <img src={f.assetUrl} alt="" className="w-full h-full object-contain pointer-events-none" />
                        ) : (
                          <div className={`w-5 h-5 rounded ${f.cssClass}`} />
                        )}
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Lock className="w-3 h-3 text-white/80" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-800 dark:text-slate-200 truncate w-full">{f.label}</span>
                      <span className={`text-[8.5px] font-semibold ${isUnlocked ? (isEquipped ? "text-blue-600 dark:text-blue-300 font-black" : "text-emerald-600 dark:text-emerald-400") : "text-slate-400 dark:text-slate-500"}`}>
                        {isEquipped ? "Equipped" : isUnlocked ? "Equip" : `Lv.${f.minLevel}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. ANIMATED NAME EFFECTS (RESTORED!) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-left space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Animated Name Typography FX</span>
                </label>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Visual Text Animations
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5">
                {NAME_EFFECTS.map((fx) => {
                  const isUnlocked = levelInfo.level >= fx.minLevel;
                  const isEquipped = selectedNameFx === fx.id;

                  return (
                    <button
                      type="button"
                      key={fx.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        setSelectedNameFx(fx.id);
                        try { sound?.playFlip?.(); } catch (err) {}
                      }}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        isEquipped
                          ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500/30 dark:bg-blue-600/35 dark:border-blue-400 dark:ring-blue-400/30"
                          : isUnlocked
                          ? "bg-white hover:bg-slate-100 border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 cursor-pointer"
                          : "bg-slate-100/60 border-slate-200/60 opacity-40 dark:bg-white/2 dark:border-white/5 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        <span>{fx.label}</span>
                        {!isUnlocked && <span className="text-[8.5px] text-slate-400 dark:text-slate-500 flex items-center gap-0.5"><Lock className="w-2.5 h-2.5" /> Lv.{fx.minLevel}</span>}
                      </div>
                      <div className="truncate text-xs font-black mt-1">
                        <span className={`${fx.cssClass} ${!fx.cssClass ? "text-slate-900 dark:text-white" : ""}`}>{name || profile.name || "Student"}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. EARNED VANITY TAGLINES (RESTORED!) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-left space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span>Vanity Taglines</span>
                </label>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Level-Locked</span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pt-0.5">
                {VANITY_TAGLINES.map((item) => {
                  const isUnlocked = levelInfo.level >= item.minLevel;
                  const isSelected = selectedTagline === item.label && !customTaglineInput;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        if (isUnlocked) {
                          setSelectedTagline(item.label);
                          setCustomTaglineInput("");
                        }
                      }}
                      className={`text-[10.5px] px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-xs"
                          : isUnlocked
                          ? "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/15 dark:text-slate-200 dark:border-white/10 cursor-pointer"
                          : "bg-slate-100/60 text-slate-400 border border-slate-200/60 opacity-40 dark:bg-white/2 dark:text-slate-500 dark:border-white/5 cursor-not-allowed"
                      }`}
                    >
                      {!isUnlocked && <Lock className="w-2.5 h-2.5 shrink-0" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Tagline Creator */}
              {levelInfo.level >= 6 ? (
                <input
                  type="text"
                  maxLength={50}
                  placeholder="Enter custom tagline (e.g. ⚡ Top 1 Aspirant)..."
                  value={customTaglineInput}
                  onChange={(e) => setCustomTaglineInput(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/15 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              ) : (
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                  <Lock className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                  <span>Custom Taglines unlock at <strong>Level 6</strong> (DSP Frequency Master).</span>
                </div>
              )}
            </div>

            {/* 6. CREDENTIALS & SECTION SETTINGS */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-left space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Student Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-slate-200 dark:border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  4th Year Section
                </label>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                  {SECTIONS.map((sec) => {
                    const isSelected = section === sec.name;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setSection(sec.name)}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white shadow font-black"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        }`}
                      >
                        {sec.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>4-Digit Security PIN</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                  className="w-32 px-3 py-1.5 bg-amber-50 dark:bg-black/40 border border-amber-300 dark:border-amber-400/40 rounded-xl text-sm font-mono font-bold text-amber-900 dark:text-amber-200 tracking-wider text-center focus:outline-none"
                />
              </div>

              {/* Theme Toggle */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Display Theme</span>
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      theme === "light" 
                        ? "bg-amber-100 border-amber-400 text-amber-800 dark:bg-amber-500/30 dark:border-amber-400 dark:text-amber-200 shadow-xs" 
                        : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      theme === "dark" 
                        ? "bg-indigo-100 border-indigo-400 text-indigo-800 dark:bg-indigo-500/30 dark:border-indigo-400 dark:text-indigo-200 shadow-xs" 
                        : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>
            </div>

            {/* 7. SAVE BUTTONS */}
            <div className="pt-2 sticky -bottom-5 sm:-bottom-7 -mx-5 sm:-mx-7 p-3 sm:p-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2 z-30">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {hasChanges ? "⚠️ Unsaved changes ready" : "✅ Profile is up to date"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-haptic px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-haptic px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>

          </form>
        </div>

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

  // =========================================================================
  // SCENARIO B: FIRST TIME SIGN-UP -> STEP-BY-STEP PROCEDURAL FLOW (NETFLIX STYLE)
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Dynamic Ambient Background Twist */}
      <div className="fixed inset-0 bg-[#0c0e12]/85 backdrop-blur-xl pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-600/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      {/* CENTERED GLASS CARD */}
      <div 
        className="relative z-10 w-full max-w-sm sm:max-w-md rounded-3xl bg-gradient-to-b from-white/12 via-slate-900/90 to-[#0e1015] backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(59,130,246,0.25)] p-6 sm:p-8 flex flex-col items-center text-white my-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
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

        {/* RESTORE ACCOUNT SUB-VIEW */}
        {isRestoring ? (
          <form onSubmit={handleRestoreSubmit} className="w-full flex flex-col gap-3.5 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Restore Student Pass</h2>
            <p className="text-xs text-slate-400 mb-2">
              Enter your registered Name & 4-Digit PIN to reload your rank.
            </p>

            {restoreError && (
              <div className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-left">
                {restoreError}
              </div>
            )}

            <div className="w-full relative text-left">
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

            <div className="w-full relative text-left">
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

            <button
              type="submit"
              disabled={restoreLoading}
              className="btn-haptic w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-full shadow-lg shadow-blue-600/30 transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              {restoreLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>{restoreLoading ? "Checking Cloud..." : "Verify & Restore Pass"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRestoring(false)}
              className="text-xs text-slate-400 hover:text-white underline pt-1 cursor-pointer"
            >
              ← Back to New Registration
            </button>
          </form>
        ) : signupStep === 1 ? (
          /* STEP 1: IDENTITY (NAME, SECTION, PIN) */
          <div className="w-full flex flex-col gap-3.5">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Step 1: Your Identity</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                College of Engineering • Room 106–109
              </p>
            </div>

            {/* Name Input */}
            <div className="w-full relative text-left">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Student Name / Codename"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10 transition-all shadow-inner"
              />
            </div>

            {/* 4th Year Section Picker */}
            <div className="w-full text-left">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                <span>Select Section:</span>
                <span className="text-blue-400 font-mono">
                  {section === "BSCPE 4A" ? "Room 109" : section === "BSCPE 4B" ? "Room 108" : section === "BSCPE 4C" ? "Room 107" : "Room 106"}
                </span>
              </div>
              <div className="w-full grid grid-cols-4 gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
                {SECTIONS.map((sec) => {
                  const isSelected = section === sec.name;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSection(sec.name)}
                      className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black scale-102"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {sec.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4-Digit Security PIN */}
            <div className="w-full relative text-left">
              <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={6}
                placeholder="4-Digit PIN (e.g. 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-amber-200 placeholder-slate-400 text-xs sm:text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/40 border border-white/10 transition-all shadow-inner"
              />
            </div>

            {/* Advance to Step 2 Button */}
            <button
              type="button"
              onClick={() => {
                if (!name.trim()) {
                  setName(`Student #${Math.floor(100 + Math.random() * 900)}`);
                }
                setSignupStep(2);
                try { sound?.playFlip?.(); } catch (err) {}
              }}
              className="btn-haptic w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <span>Next: Choose Avatar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Option: Restore or Anon */}
            <div className="w-full text-center space-y-1 pt-1">
              <button
                type="button"
                onClick={() => setIsRestoring(true)}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Already have an account? <span className="underline text-blue-400">Restore with PIN</span>
              </button>
              <div>
                <button
                  type="button"
                  onClick={handleStayAnon}
                  className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Skip & continue as Anonymous
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: CHOOSE AVATAR (NETFLIX STYLE) */
          <div className="w-full flex flex-col gap-3.5 text-center animate-fadeIn">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Who's Reviewing?</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pick your arena profile, <span className="text-blue-300 font-bold">{name || "Cadet"}</span>!
              </p>
            </div>

            {/* Current Active Preview (Large Netflix Profile Tile) */}
            <div className="flex items-center justify-center py-1">
              <div className="relative group p-2">
                <StudentAvatar
                  avatar={selectedAvatar}
                  customPhoto={customPhoto}
                  frameId={selectedFrame}
                  size="xl"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-haptic absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg border-2 border-slate-900 cursor-pointer"
                  title="Upload Custom Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CHARACTER AVATAR GRID (6 Illustrated Engineering Bean Avatars + Custom Photo) */}
            <div className="w-full p-2.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-52 overflow-y-auto pr-0.5 scrollbar-thin">
                {/* 1. Dedicated Custom Photo Tile */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer min-h-[88px] ${
                    customPhoto
                      ? "bg-blue-600/40 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)] scale-102"
                      : "bg-white/5 hover:bg-white/15 border-white/10 text-blue-300"
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center mb-1 border border-blue-400/30">
                    <Upload className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[9.5px] font-bold">My Photo</span>
                  <span className="text-[7.5px] text-slate-400">Custom Upload</span>
                </button>

                {/* 6 Illustrated Character Avatars */}
                {AVATAR_PRESETS.map((av) => {
                  const isPicked = !customPhoto && (selectedAvatar === av.image || selectedAvatar === av.id);
                  return (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => {
                        setSelectedAvatar(av.image);
                        setCustomPhoto(null);
                        try { sound?.playFlip?.(); } catch (err) {}
                      }}
                      className={`p-1.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer min-h-[88px] relative overflow-hidden group ${
                        isPicked
                          ? "bg-blue-600/40 border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-102"
                          : "bg-white/5 hover:bg-white/15 border-white/10"
                      }`}
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-slate-900 border border-white/15 mb-1 shadow-inner">
                        <img 
                          src={av.image} 
                          alt={av.label} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200" 
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-200 truncate w-full text-center">{av.label}</span>
                      <span className="text-[7.5px] text-slate-400 truncate w-full text-center">{av.desc?.split(" ")[0] || "Engineer"}</span>
                    </button>
                  );
                })}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Finish & Enter Arena Button */}
            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={handleSave}
                className="btn-haptic w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-600/35 transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Enter Midterm Arena ⚡</span>
                <Check className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => setSignupStep(1)}
                className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Name & Section</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Social Proof at the Bottom */}
      <div className="relative z-10 mt-5 flex flex-col items-center text-center">
        <p className="text-slate-400 text-xs mb-2">
          Join <span className="font-semibold text-white">BSCPE 4th Year Engineers</span> reviewing for Midterms.
        </p>
        <div className="flex -space-x-2">
          {AVATAR_PRESETS.slice(0, 4).map((av) => (
            <div key={av.id} className="w-7 h-7 rounded-full border-2 border-[#0c0e12] overflow-hidden bg-slate-900 shadow-sm">
              <img src={av.image} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

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
