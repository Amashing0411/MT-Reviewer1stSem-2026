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
  Crop,
  ChevronDown,
  ChevronUp,
  ArrowRight
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
  
  // Advanced vanity customization accordion
  const [showVanityCustomization, setShowVanityCustomization] = useState(false);

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
      setShowVanityCustomization(false);
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
    setPhotoSuccess("Photo framed & adjusted! Click 'Generate Pass' to enter.");
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
    });

    setSaveSuccessMsg("✅ Reviewer Pass Generated & Synced!");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      {/* THE TWIST: Dynamic Ambient Aurora & High-Tech Engineering Grid Backdrop */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Pulsing Colored Light Orbs (Engineering Cyan, Royal Indigo, Divine Gold) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-600/25 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/5 right-1/4 w-[450px] h-[450px] bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-amber-500/15 rounded-full blur-[110px] pointer-events-none" />
        {/* Engineering Circuit Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-75" />
      </div>

      {/* CENTERED GLASS CARD (Inspired by modern high-end sign-in design) */}
      <div 
        className="relative z-10 w-full max-w-lg rounded-3xl bg-gradient-to-b from-white/12 via-slate-900/95 to-slate-950/98 backdrop-blur-2xl border border-white/20 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(59,130,246,0.3)] p-4 sm:p-8 flex flex-col items-center text-white my-auto max-h-[92dvh] overflow-y-auto scrollbar-none animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Only if profile was already set up previously) */}
        {profile.isConfigured && (
          <button
            onClick={onClose}
            className="btn-haptic absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 rounded-full transition-all cursor-pointer z-30"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* EMBLEM & COLLEGE OF ENGINEERING LOGO */}
        <div className="flex flex-col items-center text-center mb-4 sm:mb-5">
          <div className="relative group mb-2.5">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-slate-900/90 border border-white/25 shadow-2xl flex items-center justify-center p-2.5 backdrop-blur-xl">
              <img
                src="/engineering-logo.png"
                alt="College of Engineering Student Council"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-blue-500/15 border border-blue-400/30 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-300 mb-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>College of Engineering Student Council</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
            {mode === "create" ? (profile.isConfigured ? "Student Reviewer Pass" : "BSCPE Midterm Arena") : "Restore Student Pass"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mt-1 leading-relaxed">
            {mode === "create"
              ? "Official 4th Year Computer Engineering Reviewer • Room 106 to 109"
              : "Switched to your phone or new browser? Enter your Name and 4-Digit PIN."}
          </p>
        </div>

        {/* MODE TABS: CREATE PASS vs RESTORE WITH PIN */}
        <div className="w-full grid grid-cols-2 p-1 bg-white/5 border border-white/10 rounded-2xl mb-4 sm:mb-5">
          <button
            type="button"
            onClick={() => { setMode("create"); setRestoreError(null); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === "create"
                ? "bg-white/20 text-white shadow-sm border border-white/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>{profile.isConfigured ? "Edit Pass Profile" : "New Student Pass"}</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode("restore"); setRestoreError(null); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === "restore"
                ? "bg-white/20 text-white shadow-sm border border-white/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span>Restore with PIN</span>
          </button>
        </div>

        {/* TAB 1: CREATE OR EDIT PROFILE */}
        {mode === "create" && (
          <form onSubmit={handleSave} className="w-full space-y-4">
            
            {/* STEP 1: AVATAR CUSTOMIZATION FIRST! */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 flex flex-col items-center text-center relative overflow-hidden">
              <div className="text-[10.5px] font-extrabold uppercase tracking-widest text-blue-400 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>1. Customize Your Visual Avatar</span>
              </div>

              {/* Large Live Avatar Preview */}
              <div className="relative group my-3 p-3 flex items-center justify-center">
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
                  className="btn-haptic absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg border-2 border-slate-900 cursor-pointer z-30 transition-transform hover:scale-105"
                  title="Upload Custom Photo"
                >
                  {isPhotoProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                </button>
              </div>

              {/* Photo Feedback Status */}
              {isPhotoProcessing && (
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold animate-pulse mb-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading & cropping photo...</span>
                </div>
              )}

              {photoError && (
                <div className="w-full p-2 mb-2 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-1.5 text-left">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{photoError}</span>
                </div>
              )}

              {photoSuccess && (
                <div className="w-full p-2 mb-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-1.5 text-left font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{photoSuccess}</span>
                </div>
              )}

              {/* Photo Action Controls */}
              <div className="flex items-center gap-1.5 text-xs flex-wrap justify-center mb-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPhotoProcessing}
                  className="btn-haptic px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{customPhoto ? "Change Photo" : "Upload Photo (Max 15MB)"}</span>
                </button>

                {customPhoto && (
                  <>
                    <button
                      type="button"
                      onClick={handleOpenCropper}
                      className="btn-haptic px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                      title="Crop, Zoom & Center Photo"
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
                      className="btn-haptic px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
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

              {/* Codename Emojis Grid (Always Fast & 1-Tap) */}
              <div className="w-full pt-1 border-t border-white/10">
                <div className="text-[10px] text-slate-400 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Or Pick Engineering Emoji Preset:</span>
                  <span className="text-blue-300 font-bold">{customPhoto ? "Using custom photo" : selectedAvatar}</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
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
                        className={`p-1.5 sm:p-2 rounded-xl text-lg sm:text-xl flex items-center justify-center transition-all cursor-pointer ${
                          isPicked 
                            ? "bg-blue-600/40 border-2 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)] scale-105" 
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        }`}
                        title={av.label}
                      >
                        <span>{av.emoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expandable Vanity Controls (Frames, Name Effects & Taglines) */}
              <div className="w-full mt-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowVanityCustomization(!showVanityCustomization)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white py-1 px-1 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Level Rewards & Vanity Borders</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono font-bold">
                      Lv. {levelInfo.level}
                    </span>
                  </span>
                  {showVanityCustomization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showVanityCustomization && (
                  <div className="mt-3 space-y-3 animate-fadeIn text-left">
                    {/* Frames Picker */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Avatar Borders ({AVATAR_FRAMES.length} Total)
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {AVATAR_FRAMES.map((f) => {
                          const isUnlocked = levelInfo.level >= f.minLevel;
                          const isEquipped = selectedFrame === f.id;
                          return (
                            <button
                              type="button"
                              key={f.id}
                              disabled={!isUnlocked}
                              onClick={() => setSelectedFrame(f.id)}
                              className={`p-1.5 rounded-xl flex flex-col items-center gap-1 border transition-all text-center relative ${
                                isEquipped
                                  ? "bg-blue-600/30 border-blue-400 ring-2 ring-blue-400/30"
                                  : isUnlocked
                                  ? "bg-white/5 hover:bg-white/10 border-white/10 cursor-pointer"
                                  : "bg-white/2 border-white/5 opacity-40 cursor-not-allowed"
                              }`}
                              title={isUnlocked ? f.name : `Unlocks at Lv. ${f.minLevel}`}
                            >
                              <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-black/40">
                                {f.assetUrl ? (
                                  <img src={f.assetUrl} alt="" className="w-full h-full object-contain pointer-events-none" />
                                ) : (
                                  <div className={`w-4 h-4 rounded ${f.cssClass}`} />
                                )}
                              </div>
                              <span className="text-[9px] font-bold text-slate-200 truncate w-full">{f.label}</span>
                              <span className={`text-[8px] font-semibold ${isUnlocked ? "text-emerald-400" : "text-slate-500"}`}>
                                {isUnlocked ? "Equip" : `Lv.${f.minLevel}`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name Effects */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Animated Name FX
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {NAME_EFFECTS.map((fx) => {
                          const isUnlocked = levelInfo.level >= fx.minLevel;
                          const isEquipped = selectedNameFx === fx.id;
                          return (
                            <button
                              type="button"
                              key={fx.id}
                              disabled={!isUnlocked}
                              onClick={() => setSelectedNameFx(fx.id)}
                              className={`p-2 rounded-xl text-left border transition-all ${
                                isEquipped
                                  ? "bg-blue-600/30 border-blue-400 ring-1 ring-blue-400/30"
                                  : isUnlocked
                                  ? "bg-white/5 hover:bg-white/10 border-white/10 cursor-pointer"
                                  : "bg-white/2 border-white/5 opacity-40 cursor-not-allowed"
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                                <span>{fx.label}</span>
                                {!isUnlocked && <span className="text-[8px] text-slate-500">Lv.{fx.minLevel}</span>}
                              </div>
                              <div className="truncate text-[11px] font-black mt-0.5">
                                <span className={fx.cssClass}>{name || "Student"}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: STUDENT IDENTITY (NAME & SECTION) */}
            <div className="space-y-3">
              {/* Full Name Input */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Student Name / Codename</span>
                  <span className="text-[10px] text-slate-400">Required</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz / Topnotcher4D"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs sm:text-sm font-semibold text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* 4th Year Section Selector */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Select 4th Year Section & Exam Room
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SECTION_CHOICES.map((choice) => {
                    const isSelected = section === choice.name;
                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => setSection(choice.name)}
                        className={`p-2.5 rounded-xl text-left border transition-all flex flex-col gap-0.5 cursor-pointer ${
                          isSelected
                            ? "bg-blue-600/30 border-2 border-blue-400 ring-2 ring-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                            : "bg-white/5 hover:bg-white/10 border-white/15 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${isSelected ? "text-white" : "text-slate-200"}`}>
                            {choice.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-blue-200 bg-blue-900/60 px-1.5 py-0.2 rounded border border-blue-500/30">
                            {choice.room}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 truncate">
                          Proctor: {choice.proctor.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: SECURITY KEY (4-DIGIT PIN) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-left space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. 4-Digit Security & Sync PIN</span>
                </label>
                <span className="text-[10px] text-amber-200/80 font-mono font-bold">
                  Lock & Cloud Sync
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="1234"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                    className="w-32 pl-8 pr-3 py-2 bg-black/40 border border-amber-400/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-xl text-sm font-mono font-black text-amber-200 tracking-widest text-center focus:outline-none shadow-inner"
                  />
                </div>
                <span className="text-[11px] text-amber-100/90 leading-snug">
                  Save this PIN. It locks your leaderboard rank and lets you restore on your phone!
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS (SUBMIT & ENTER) */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="btn-haptic w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.6)] border border-blue-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {profile.isConfigured 
                    ? (hasChanges ? "Save Changes & Update Reviewer Pass" : "Keep Current Profile") 
                    : "Enter Midterm Arena & Generate Reviewer Pass ⚡"}
                </span>
              </button>

              {!profile.isConfigured && (
                <button
                  type="button"
                  onClick={handleStayAnon}
                  className="btn-haptic w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Stay Anonymous (Generate Random Anon Pass)</span>
                </button>
              )}
            </div>

          </form>
        )}

        {/* TAB 2: RESTORE PROFILE FROM ANOTHER DEVICE */}
        {mode === "restore" && (
          <form onSubmit={handleRestoreSubmit} className="w-full space-y-4 text-left">
            <div className="p-3.5 bg-blue-500/10 rounded-2xl border border-blue-400/25 space-y-1">
              <span className="text-xs font-bold text-blue-300 block flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Cross-Device Cloud Sync</span>
              </span>
              <p className="text-[11px] text-blue-100/90 leading-relaxed">
                Enter your exact registered Name and 4-Digit PIN to download your current level, total XP, and exam stats onto this device.
              </p>
            </div>

            {restoreError && (
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{restoreError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Registered Student Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Juan Dela Cruz"
                value={restoreName}
                onChange={(e) => setRestoreName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs sm:text-sm font-semibold text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                4-Digit Sync PIN
              </label>
              <input
                type="password"
                maxLength={6}
                required
                placeholder="••••"
                value={restorePin}
                onChange={(e) => setRestorePin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm font-mono font-bold text-amber-200 tracking-widest text-center focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={restoreLoading}
                className="btn-haptic w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-blue-400/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
              >
                {restoreLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with Vercel Cloud DB...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Verify PIN & Restore Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* SOCIAL PROOF & BATCH SOLIDARITY (INSPIRED BY REFERENCE) */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 w-full flex flex-col items-center text-center">
          <p className="text-slate-300 text-xs mb-2.5">
            Join <span className="font-bold text-white">BSCPE 4th Year Engineers</span> reviewing across Sections 4A, 4B, 4C & 4D.
          </p>
          <div className="flex items-center -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-900 flex items-center justify-center text-xs font-bold shadow-md" title="BSCPE 4A">
              ⚡
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-900 flex items-center justify-center text-xs font-bold shadow-md" title="BSCPE 4B">
              🤖
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-purple-900 flex items-center justify-center text-xs font-bold shadow-md" title="BSCPE 4C">
              💻
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-emerald-900 flex items-center justify-center text-xs font-bold shadow-md" title="BSCPE 4D">
              🛠️
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 text-[10px] font-mono font-bold text-blue-300 flex items-center justify-center shadow-md">
              +4D
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2">
            Room 106 • Room 107 • Room 108 • Room 109
          </span>
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
