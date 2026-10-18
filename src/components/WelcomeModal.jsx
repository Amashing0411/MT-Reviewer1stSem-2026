import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_PRESETS, AVATAR_FRAMES, VANITY_TAGLINES, NAME_EFFECTS } from "../utils/gamification";
import { sound } from "../utils/sound";
import { StudentAvatar } from "./StudentAvatar";
import { 
  User, 
  Upload, 
  Sparkles, 
  Shield, 
  Check, 
  Camera,
  X,
  KeyRound,
  Smartphone,
  RefreshCw,
  AlertCircle,
  Lock,
  Sun,
  Moon,
  Tag,
  Award,
  Palette,
  Flame,
  CheckCircle2,
  Trash2,
  Crop
} from "lucide-react";
import confetti from "canvas-confetti";
import { ImageCropModal } from "./ImageCropModal";

const SECTION_CHOICES = [
  { id: "4A", name: "BSCPE 4A", room: "Room 109", proctor: "Joel Urriquia" },
  { id: "4B", name: "BSCPE 4B", room: "Room 108", proctor: "Luisa Tubana" },
  { id: "4C", name: "BSCPE 4C", room: "Room 107", proctor: "Rosebel Agapay" },
  { id: "4D", name: "BSCPE 4D", room: "Room 106", proctor: "Lyka Magbuhos" },
];

export function WelcomeModal({ isOpen, onClose, onSaved }) {
  const { profile, levelInfo, updateProfile, restoreProfileFromCloud, theme, setTheme } = useUser();

  const [mode, setMode] = useState("create"); // "create" | "restore"
  const [name, setName] = useState(profile.name || "");
  const [section, setSection] = useState(profile.section || "BSCPE 4D");
  const [pin, setPin] = useState(profile.pin || "");
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "🤖");
  const [customPhoto, setCustomPhoto] = useState(profile.customPhoto || null);
  const [selectedFrame, setSelectedFrame] = useState(profile.frame || "default");
  const [selectedTagline, setSelectedTagline] = useState(profile.tagline || "🎓 4th Year Candidate");
  const [customTaglineInput, setCustomTaglineInput] = useState("");
  const [selectedNameFx, setSelectedNameFx] = useState(profile.nameFx || "none");
  
  // Photo processing and saving feedback states
  const [isPhotoProcessing, setIsPhotoProcessing] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [photoSuccess, setPhotoSuccess] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageForCrop, setRawImageForCrop] = useState(null);

  // Restore tab states
  const [restoreName, setRestoreName] = useState("");
  const [restorePin, setRestorePin] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreError, setRestoreError] = useState(null);

  const fileInputRef = useRef(null);

  // Synchronize local form state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setName(profile.name || "");
      setSection(profile.section || "BSCPE 4D");
      setPin(profile.pin || "");
      setSelectedAvatar(profile.avatar || "🤖");
      setCustomPhoto(profile.customPhoto || null);
      setSelectedFrame(profile.frame || "default");
      setSelectedTagline(profile.tagline || "🎓 4th Year Candidate");
      setCustomTaglineInput("");
      setSelectedNameFx(profile.nameFx || "none");
      setIsPhotoProcessing(false);
      setPhotoError(null);
      setPhotoSuccess(null);
      setSaveSuccessMsg(null);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  // Track if any changes have been made compared to saved profile
  const hasChanges = (
    name.trim() !== (profile.name || "").trim() ||
    section !== (profile.section || "BSCPE 4D") ||
    pin.trim() !== (profile.pin || "").trim() ||
    selectedAvatar !== (profile.avatar || "🤖") ||
    Boolean(customPhoto) !== Boolean(profile.customPhoto) ||
    (customPhoto && profile.customPhoto && customPhoto !== profile.customPhoto) ||
    selectedFrame !== (profile.frame || "default") ||
    selectedNameFx !== (profile.nameFx || "none") ||
    Boolean(customTaglineInput.trim()) ||
    selectedTagline !== (profile.tagline || "🎓 4th Year Candidate")
  );

  // Handle Photo Upload: reads image and opens the interactive Crop Studio
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so selecting the same file triggers change reliably
    if (e.target) e.target.value = "";

    setPhotoError(null);
    setPhotoSuccess(null);

    if (file.size > 15 * 1024 * 1024) {
      setPhotoError("Image is too large (max 15 MB). Please choose a smaller photo.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select a valid image file (JPG, PNG, WEBP).");
      return;
    }

    setIsPhotoProcessing(true);

    const reader = new FileReader();
    reader.onerror = () => {
      setIsPhotoProcessing(false);
      setPhotoError("Failed to read image file.");
    };

    reader.onload = (uploadEvent) => {
      const rawData = uploadEvent.target.result;
      const img = new Image();
      img.onerror = () => {
        setIsPhotoProcessing(false);
        setPhotoError("Failed to decode image.");
      };

      img.onload = () => {
        // Optimize high-res camera photos to max 1280px for buttery smooth crop studio performance
        const maxDim = 1280;
        if (img.width > maxDim || img.height > maxDim) {
          const canvas = document.createElement("canvas");
          const scale = maxDim / Math.max(img.width, img.height);
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const scaledData = canvas.toDataURL("image/jpeg", 0.92);
          setRawImageForCrop(scaledData);
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

  const handleOpenCropper = () => {
    if (customPhoto) {
      setRawImageForCrop(customPhoto);
      setCropModalOpen(true);
    }
  };

  const handleCropSave = (croppedDataUrl) => {
    setCustomPhoto(croppedDataUrl);
    setCropModalOpen(false);
    setRawImageForCrop(null);
    setPhotoSuccess("Photo framed & adjusted! Click 'Save Profile' below to apply.");
    setPhotoError(null);
    try { sound?.playFlip?.(); } catch (err) {}
  };

  const handleCropClose = () => {
    setCropModalOpen(false);
    setRawImageForCrop(null);
  };

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
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setSaveSuccessMsg("✅ Profile saved & synced!");
    setTimeout(() => {
      onClose();
      if (onSaved) {
        setTimeout(() => onSaved(), 200);
      }
    }, 350);
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

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });

    onClose();
    if (onSaved) {
      setTimeout(() => onSaved(), 200);
    }
  };

  // Handle Restore by Name + PIN
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm dark:backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-7 relative space-y-4 sm:space-y-5">
          
          {/* Top action controls: Save Changes + Close button */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1.5 z-20">
            {mode === "create" && (
              <button
                type="button"
                onClick={handleSave}
                className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  hasChanges
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 ring-2 ring-emerald-500/30"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                }`}
                title="Force Save and sync profile"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">{hasChanges ? "Save Changes" : "Save Profile"}</span>
                <span className="sm:hidden">Save</span>
              </button>
            )}

            {profile.isConfigured && (
              <button
                onClick={onClose}
                className="btn-haptic p-1.5 sm:p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Header Banner */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/50 rounded-full font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>DLSP BSCPE 4th Year Arena</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {mode === "create" ? "Student Reviewer Pass" : "Restore Your Account"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              {mode === "create"
                ? "Set your student codename and 4-digit PIN to track your XP, sync to your phone, and claim your rank."
                : "Switched to your phone or new browser? Enter your Name and 4-Digit PIN to reload all your progress!"}
            </p>
          </div>

          {/* Mode Tabs: Create vs Restore */}
          <div className="grid grid-cols-2 p-1 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => { setMode("create"); setRestoreError(null); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "create"
                  ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs border border-slate-200 dark:border-slate-600"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>New / Edit Profile</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode("restore"); setRestoreError(null); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === "restore"
                  ? "bg-white dark:bg-slate-700 text-blue-900 dark:text-blue-300 shadow-xs border border-slate-200 dark:border-slate-600"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Restore Account</span>
            </button>
          </div>

          {/* TAB 1: CREATE OR EDIT PROFILE */}
          {mode === "create" && (
            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Prestige Rank & Title Progression Banner */}
              <div className="p-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900 text-white rounded-2xl border border-blue-400/30 dark:border-blue-500/30 shadow-lg space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1 bg-white/15 dark:bg-white/10 rounded-xl backdrop-blur-xs shrink-0">{levelInfo.icon}</span>
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold text-blue-100 dark:text-blue-300 uppercase tracking-wider">Level {levelInfo.level}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/25 dark:bg-amber-400/20 text-amber-200 dark:text-amber-300 font-bold border border-amber-300/40 dark:border-amber-400/30 shrink-0">
                          {levelInfo.level >= 10 ? "LEGENDARY" : levelInfo.level >= 7 ? "MASTER" : "RANKED"}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-amber-200 dark:text-amber-300 tracking-tight truncate max-w-[190px] sm:max-w-[260px]">
                        {levelInfo.title}
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right flex items-center justify-between sm:block border-t sm:border-t-0 border-white/10 pt-1.5 sm:pt-0">
                    <div className="text-[9px] text-blue-100 dark:text-slate-300 font-bold uppercase tracking-wider">Total XP</div>
                    <div className="text-xs sm:text-sm font-black text-emerald-300 dark:text-emerald-400 font-mono">
                      {(profile.xp || 0).toLocaleString()} XP
                    </div>
                  </div>
                </div>

                {/* Progress bar to next prestige rank */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-blue-100 dark:text-blue-200">
                    <span className="truncate max-w-[190px]">Next: {levelInfo.nextTitle}</span>
                    <span>{levelInfo.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-blue-950/25 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/20 dark:border-blue-400/20">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-300 via-indigo-300 to-emerald-300 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, levelInfo.percent)}%` }}
                    />
                  </div>
                  {levelInfo.xpNeeded > 0 && (
                    <div className="text-[9px] text-blue-100/90 dark:text-slate-400 text-right">
                      {levelInfo.xpNeeded.toLocaleString()} XP to level up
                    </div>
                  )}
                </div>
              </div>

              {/* Live Avatar Preview with Equipped Prestige Border */}
              <div className="flex flex-col items-center justify-center gap-2.5 py-1 text-center">
                <div className="relative group">
                  <div className="relative flex items-center justify-center p-3">
                    <StudentAvatar
                      avatar={selectedAvatar}
                      customPhoto={customPhoto}
                      frameId={selectedFrame}
                      size="xl"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPhotoProcessing}
                    className="btn-haptic absolute -bottom-1 -right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md border-2 border-white dark:border-slate-800 cursor-pointer z-20"
                    title="Upload Custom Photo"
                  >
                    {isPhotoProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                  </button>
                </div>

                {/* Photo feedback alerts */}
                {isPhotoProcessing && (
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing & cropping image...</span>
                  </div>
                )}

                {photoError && (
                  <div className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{photoError}</span>
                  </div>
                )}

                {photoSuccess && (
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{photoSuccess}</span>
                  </div>
                )}

                {/* Live Name & Vanity Tagline Preview */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 justify-center">
                    <span className={`text-base sm:text-lg font-extrabold text-slate-900 dark:text-white ${NAME_EFFECTS.find(fx => fx.id === selectedNameFx)?.cssClass || ""}`}>
                      {name || profile.name || "Student Codename"}
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-700/50">
                      {section}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs">
                      {customTaglineInput.trim() || selectedTagline || "🎓 4th Year Candidate"}
                    </span>
                  </div>
                </div>

                {/* Photo Action Controls */}
                <div className="flex items-center gap-2 text-xs flex-wrap justify-center pt-0.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPhotoProcessing}
                    className="btn-haptic px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{customPhoto ? "Change Photo (Max 15MB)" : "Upload Photo (Max 15MB)"}</span>
                  </button>

                  {customPhoto && (
                    <>
                      <button
                        type="button"
                        onClick={handleOpenCropper}
                        className="btn-haptic px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        title="Crop, Zoom, Rotate & Reframe Photo"
                      >
                        <Crop className="w-3.5 h-3.5" />
                        <span>Crop & Zoom</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCustomPhoto(null);
                          setPhotoSuccess(null);
                          setPhotoError(null);
                          try { sound?.playFlip?.(); } catch (err) {}
                        }}
                        className="btn-haptic px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
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
              </div>

              {/* Emoji Presets Grid (Always Available) */}
              <div className="space-y-1.5 text-left p-3.5 bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Codename Emojis</span>
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    {customPhoto ? "Click an emoji to switch from photo" : "Selected: " + selectedAvatar}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5 pt-0.5">
                  {AVATAR_PRESETS.map((av) => {
                    const isPicked = !customPhoto && selectedAvatar === av.emoji;
                    return (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => {
                          setSelectedAvatar(av.emoji);
                          setCustomPhoto(null);
                          setPhotoSuccess(null);
                          setPhotoError(null);
                          try { sound?.playFlip?.(); } catch (err) {}
                        }}
                        className={`p-2 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                          isPicked 
                            ? "bg-blue-100 dark:bg-blue-900/60 border-2 border-blue-600 dark:border-blue-400 shadow-xs scale-105" 
                            : "bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700"
                        }`}
                        title={av.label}
                      >
                        <span>{av.emoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prestige Avatar Border Selector */}
              <div className="space-y-1.5 text-left p-3.5 bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Prestige Avatar Frames</span>
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    Current Lv. {levelInfo.level}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 pt-1">
                  {AVATAR_FRAMES.map((f) => {
                    const isUnlocked = levelInfo.level >= f.minLevel;
                    const isEquipped = selectedFrame === f.id;

                    return (
                      <button
                        type="button"
                        key={f.id}
                        disabled={!isUnlocked}
                        onClick={() => setSelectedFrame(f.id)}
                        className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all relative ${
                          isEquipped
                            ? "bg-blue-50/80 dark:bg-blue-950/60 border-2 border-blue-600 dark:border-blue-400 ring-2 ring-blue-500/20 shadow-xs"
                            : isUnlocked
                            ? "bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
                            : "bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 opacity-60 cursor-not-allowed"
                        }`}
                        title={isUnlocked ? `Equip ${f.name}` : `Unlocks at Level ${f.minLevel}`}
                      >
                        {/* Mini Frame Visual Preview */}
                        <div className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                          {f.assetUrl ? (
                            <img src={f.assetUrl} alt="" className="w-full h-full object-contain pointer-events-none" />
                          ) : (
                            <div className={`w-5 h-5 rounded-md ${f.cssClass}`} />
                          )}
                          {isEquipped && (
                            <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center backdrop-blur-[0.5px]">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3] drop-shadow-xs" />
                            </div>
                          )}
                          {!isUnlocked && (
                            <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 flex items-center justify-center">
                              <Lock className="w-3 h-3 text-white/90" />
                            </div>
                          )}
                        </div>
                        
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 truncate w-full">
                          {f.label}
                        </span>
                        
                        <span className={`text-[9px] font-semibold ${isUnlocked ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                          {isUnlocked ? "Unlocked" : `Lv. ${f.minLevel}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animated Name Typography Effects */}
              <div className="space-y-1.5 text-left p-3.5 bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Animated Name Effects</span>
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    Current Lv. {levelInfo.level}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {NAME_EFFECTS.map((fx) => {
                    const isUnlocked = levelInfo.level >= fx.minLevel;
                    const isEquipped = selectedNameFx === fx.id;

                    return (
                      <button
                        type="button"
                        key={fx.id}
                        disabled={!isUnlocked}
                        onClick={() => setSelectedNameFx(fx.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                          isEquipped
                            ? "bg-blue-50/80 dark:bg-blue-950/60 border-2 border-blue-600 dark:border-blue-400 ring-2 ring-blue-500/20 shadow-xs"
                            : isUnlocked
                            ? "bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
                            : "bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60 cursor-not-allowed"
                        }`}
                        title={isUnlocked ? `Equip ${fx.name}` : `Unlocks at Level ${fx.minLevel}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {fx.label}
                          </span>
                          {isUnlocked ? (
                            isEquipped ? <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 stroke-[3]" /> : <Sparkles className="w-3 h-3 text-amber-500" />
                          ) : (
                            <span className="flex items-center gap-0.5 text-[9px] font-bold text-slate-400">
                              <Lock className="w-2.5 h-2.5" /> Lv.{fx.minLevel}
                            </span>
                          )}
                        </div>
                        <div className="w-full truncate">
                          <span className={`text-xs font-black ${fx.cssClass} ${fx.id === 'none' ? 'text-slate-900 dark:text-white' : ''}`}>
                            {name || profile.name || "Student Codename"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Earned Engineering Vanity Taglines */}
              <div className="space-y-1.5 text-left p-3.5 bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-500" />
                    <span>Earned Vanity Taglines</span>
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    Level-Locked
                  </span>
                </div>

                {/* Taglines Grid */}
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pt-0.5">
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
                            ? "bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
                            : "bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-800/60 opacity-60 cursor-not-allowed"
                        }`}
                        title={isUnlocked ? item.label : `Unlocks at Level ${item.minLevel}`}
                      >
                        {!isUnlocked && <Lock className="w-2.5 h-2.5 shrink-0" />}
                        <span>{item.label}</span>
                        {!isUnlocked && <span className="text-[9px] opacity-75">Lv.{item.minLevel}</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Tagline Input (Requires Level 6+) */}
                <div className="pt-1.5">
                  {levelInfo.level >= 6 ? (
                    <input
                      type="text"
                      maxLength={50}
                      placeholder="Enter custom tagline (e.g. ⚡ Top 1 Aspirant)..."
                      value={customTaglineInput}
                      onChange={(e) => setCustomTaglineInput(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Custom Tagline Creation unlocks at <strong>Level 6</strong> (DSP Frequency Master).</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Theme & Reading Comfort Mode */}
              <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Display Theme (Dark / Light Mode)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`btn-haptic py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      theme === "light"
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-2 border-amber-500 ring-2 ring-amber-400/20 shadow-xs"
                        : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>☀️ Light Mode</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`btn-haptic py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      theme === "dark"
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border-2 border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs"
                        : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>🌙 Dark Mode</span>
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Your Name / Codename
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz / Topnotcher4D"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* 4-Digit Restore PIN Field */}
              <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200/90 dark:border-amber-800/50 text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>4-Digit Sync PIN</span>
                  </label>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                    (Used to restore on phone)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 1234"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                    className="w-32 px-3 py-1.5 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 focus:border-amber-600 dark:focus:border-amber-500 rounded-lg text-sm font-mono font-black text-slate-900 dark:text-white tracking-widest text-center focus:outline-none shadow-2xs"
                  />
                  <span className="text-[10.5px] text-amber-800 dark:text-amber-300 leading-snug">
                    Save this PIN. You can download your Pass card with PIN after entering!
                  </span>
                </div>
              </div>

              {/* 4th Year Section Picker */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Select 4th Year Section
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SECTION_CHOICES.map((choice) => {
                    const isSelected = section === choice.name;
                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => setSection(choice.name)}
                        className={`p-2 rounded-xl text-left border transition-all flex flex-col gap-0.5 cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/90 dark:bg-blue-950/60 border-2 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 shadow-xs"
                            : "bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${isSelected ? "text-blue-900 dark:text-blue-300" : "text-slate-800 dark:text-slate-200"}`}>
                            {choice.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.2 rounded border border-slate-200 dark:border-slate-700">
                            {choice.room}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className={`btn-haptic w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer text-white transition-all ${
                    hasChanges
                      ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/30 ring-2 ring-emerald-500/30"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/25"
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{profile.isConfigured ? (hasChanges ? "Confirm & Force Save Profile" : "Save Profile") : "Enter Arena & Generate Reviewer Pass"}</span>
                </button>

                {!profile.isConfigured && (
                  <button
                    type="button"
                    onClick={handleStayAnon}
                    className="btn-haptic w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Stay Anonymous (Generate Anon ID)</span>
                  </button>
                )}
              </div>

              {/* Sticky Floating Save Confirmation Bar inside the modal */}
              <div className="sticky -bottom-5 sm:-bottom-7 -mx-5 sm:-mx-7 p-3 sm:p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 z-30 shadow-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${hasChanges ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                    {saveSuccessMsg || (hasChanges ? "Unsaved changes ready" : "Profile up to date")}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {profile.isConfigured && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-haptic px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSave}
                    className={`btn-haptic px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer text-white transition-all ${
                      hasChanges
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/30 ring-2 ring-emerald-400/30"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/25"
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>{hasChanges ? "Confirm & Save Changes" : "Force Save Profile"}</span>
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* TAB 2: RESTORE PROFILE FROM ANOTHER DEVICE */}
          {mode === "restore" && (
            <form onSubmit={handleRestoreSubmit} className="space-y-4 text-left">
              <div className="p-3.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-200/80 dark:border-blue-800/50 space-y-1">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Cross-Device Instant Sync</span>
                </span>
                <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-relaxed">
                  Enter the exact Name and 4-Digit PIN from your other device to download your current level, total XP, and exam stats.
                </p>
              </div>

              {restoreError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{restoreError}</span>
                </div>
              )}

              {/* Name input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Registered Student Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan Dela Cruz"
                  value={restoreName}
                  onChange={(e) => setRestoreName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              {/* PIN input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  4-Digit Restore PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  placeholder="e.g. 1234"
                  value={restorePin}
                  onChange={(e) => setRestorePin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl text-sm font-mono font-bold text-slate-900 dark:text-white tracking-widest text-center focus:outline-none"
                />
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block">
                  Check your saved Reviewer Pass image if you forgot your PIN.
                </span>
              </div>

              {/* Submit Restore */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={restoreLoading}
                  className="btn-haptic w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {restoreLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Checking Cloud Database...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Verify PIN & Restore Progress</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Privacy Note */}
          <div className="text-[10px] text-slate-400 text-center pt-1">
            🔒 Fully encrypted in your local browser & private Vercel KV cloud storage.
          </div>

        </div>
      </div>

      {/* Interactive Photo Crop & Framing Studio Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={rawImageForCrop}
        frameId={selectedFrame}
        onSave={handleCropSave}
        onClose={handleCropClose}
      />
    </div>
  );
}

export default WelcomeModal;
