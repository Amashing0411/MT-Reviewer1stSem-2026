import React, { useState, useRef } from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_PRESETS } from "../utils/gamification";
import { 
  User, 
  Upload, 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Check, 
  Camera,
  X,
  KeyRound,
  Smartphone,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";

const SECTION_CHOICES = [
  { id: "4A", name: "BSCPE 4A", room: "Room 109", proctor: "Joel Urriquia" },
  { id: "4B", name: "BSCPE 4B", room: "Room 108", proctor: "Luisa Tubana" },
  { id: "4C", name: "BSCPE 4C", room: "Room 107", proctor: "Rosebel Agapay" },
  { id: "4D", name: "BSCPE 4D", room: "Room 106", proctor: "Lyka Magbuhos" },
];

export function WelcomeModal({ isOpen, onClose, onSaved }) {
  const { profile, updateProfile, restoreProfileFromCloud } = useUser();

  const [mode, setMode] = useState("create"); // "create" | "restore"
  const [name, setName] = useState(profile.name || "");
  const [section, setSection] = useState(profile.section || "BSCPE 4D");
  const [pin, setPin] = useState(profile.pin || "");
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "🤖");
  const [customPhoto, setCustomPhoto] = useState(profile.customPhoto || null);
  
  // Restore tab states
  const [restoreName, setRestoreName] = useState("");
  const [restorePin, setRestorePin] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreError, setRestoreError] = useState(null);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle Photo Upload & Compression
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 160;
        canvas.width = size;
        canvas.height = size;

        const minDim = Math.min(img.width, img.height);
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
        setCustomPhoto(compressedBase64);
      };
      img.src = uploadEvent.target.result;
    };
    reader.readAsDataURL(file);
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
      pin: finalPin,
      isAnon: false,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    onClose();
    if (onSaved) {
      setTimeout(() => onSaved(), 200);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-7 relative space-y-4 sm:space-y-5">
          
          {/* Close button if profile already configured */}
          {profile.isConfigured && (
            <button
              onClick={onClose}
              className="btn-haptic absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Header Banner */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>DLSP BSCPE 4th Year Arena</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              {mode === "create" ? "Student Reviewer Pass" : "Restore Your Account"}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              {mode === "create"
                ? "Set your student codename and 4-digit PIN to track your XP, sync to your phone, and claim your rank."
                : "Switched to your phone or new browser? Enter your Name and 4-Digit PIN to reload all your progress!"}
            </p>
          </div>

          {/* Mode Tabs: Create vs Restore */}
          <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => { setMode("create"); setRestoreError(null); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "create"
                  ? "bg-white text-blue-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>New / Edit Profile</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode("restore"); setRestoreError(null); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === "restore"
                  ? "bg-white text-blue-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
              <span>Restore Account</span>
            </button>
          </div>

          {/* TAB 1: CREATE OR EDIT PROFILE */}
          {mode === "create" && (
            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Avatar & Photo Picker */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block text-center">
                  Select Avatar or Upload Photo
                </label>

                <div className="flex items-center justify-center gap-4">
                  <div className="relative group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
                      <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                        {customPhoto ? (
                          <img src={customPhoto} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl">{selectedAvatar}</span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm border border-white cursor-pointer"
                      title="Upload Photo"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-left space-y-0.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{customPhoto ? "Change photo" : "Upload photo"}</span>
                    </button>
                    {customPhoto && (
                      <button
                        type="button"
                        onClick={() => setCustomPhoto(null)}
                        className="text-[11px] text-rose-500 hover:underline block cursor-pointer"
                      >
                        Reset to emoji
                      </button>
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

                {/* Emoji Grid */}
                {!customPhoto && (
                  <div className="grid grid-cols-6 gap-1.5 pt-0.5">
                    {AVATAR_PRESETS.map((av) => {
                      const isPicked = selectedAvatar === av.emoji;
                      return (
                        <button
                          type="button"
                          key={av.id}
                          onClick={() => setSelectedAvatar(av.emoji)}
                          className={`p-1.5 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                            isPicked 
                              ? "bg-blue-50 border-2 border-blue-600 shadow-xs scale-105" 
                              : "bg-slate-50 hover:bg-slate-100 border border-slate-200/80"
                          }`}
                          title={av.label}
                        >
                          <span>{av.emoji}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
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
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 4-Digit Restore PIN Field */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    <span>4-Digit Sync PIN</span>
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold">
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
                    className="w-32 px-3 py-1.5 bg-white border border-amber-300 focus:border-amber-600 rounded-lg text-sm font-mono font-black text-slate-900 tracking-widest text-center focus:outline-none"
                  />
                  <span className="text-[10.5px] text-amber-800 leading-snug">
                    Save this PIN. You will get a downloadable Pass card image after entering!
                  </span>
                </div>
              </div>

              {/* 4th Year Section Picker */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
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
                            ? "bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/20 shadow-xs"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200/90 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${isSelected ? "text-blue-900" : "text-slate-800"}`}>
                            {choice.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                            {choice.room}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 space-y-2">
                <button
                  type="submit"
                  className="btn-haptic w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Enter Arena & Generate Reviewer Pass</span>
                </button>

                <button
                  type="button"
                  onClick={handleStayAnon}
                  className="btn-haptic w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/90 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Stay Anonymous (Generate Anon ID)</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: RESTORE PROFILE FROM ANOTHER DEVICE */}
          {mode === "restore" && (
            <form onSubmit={handleRestoreSubmit} className="space-y-4 text-left">
              <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200/80 space-y-1">
                <span className="text-xs font-bold text-blue-900 block flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>Cross-Device Instant Sync</span>
                </span>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Enter the exact Name and 4-Digit PIN from your other device to download your current level, total XP, and exam stats.
                </p>
              </div>

              {restoreError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{restoreError}</span>
                </div>
              )}

              {/* Name input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Registered Student Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan Dela Cruz"
                  value={restoreName}
                  onChange={(e) => setRestoreName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              {/* PIN input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  4-Digit Restore PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  placeholder="e.g. 1234"
                  value={restorePin}
                  onChange={(e) => setRestorePin(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-sm font-mono font-bold text-slate-900 tracking-widest text-center focus:outline-none"
                />
                <span className="text-[10.5px] text-slate-400 block">
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
    </div>
  );
}

export default WelcomeModal;
