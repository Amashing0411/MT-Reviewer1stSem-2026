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
  MapPin
} from "lucide-react";
import confetti from "canvas-confetti";

const SECTION_CHOICES = [
  { id: "4A", name: "BSCPE 4A", room: "Room 109", proctor: "Joel Urriquia" },
  { id: "4B", name: "BSCPE 4B", room: "Room 108", proctor: "Luisa Tubana" },
  { id: "4C", name: "BSCPE 4C", room: "Room 107", proctor: "Rosebel Agapay" },
  { id: "4D", name: "BSCPE 4D", room: "Room 106", proctor: "Lyka Magbuhos" },
];

export function WelcomeModal({ isOpen, onClose }) {
  const { profile, updateProfile } = useUser();

  const [name, setName] = useState(profile.name || "");
  const [section, setSection] = useState(profile.section || "BSCPE 4D");
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "🤖");
  const [customPhoto, setCustomPhoto] = useState(profile.customPhoto || null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle Photo Upload & Base64 Compression
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

        // Center crop image
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
    
    updateProfile({
      name: finalName,
      section: section.trim() || "BSCPE 4D",
      avatar: selectedAvatar,
      customPhoto: customPhoto,
      isAnon: false,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    onClose();
  };

  const handleStayAnon = () => {
    const anonSuffix = Math.floor(100 + Math.random() * 900);
    const shortSec = section.replace("BSCPE ", "").trim() || "4th";
    updateProfile({
      name: `${shortSec} Anon #${anonSuffix}`,
      section: section.trim() || "BSCPE 4D",
      avatar: selectedAvatar,
      customPhoto: null,
      isAnon: true,
    });

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-8 relative space-y-5 sm:space-y-6">
          
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
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>DLSP BSCPE 4th Year Arena</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Enter the Reviewer Arena
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Create your 4th year student profile to level up, earn XP, track fastest scores, and compete on the Section Leaderboard.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Avatar & Photo Picker */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block text-center">
                Select Your Avatar or Upload Photo
              </label>

              {/* Current Selected Avatar Preview */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-600/20 flex items-center justify-center">
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
                    className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md border-2 border-white transition-all cursor-pointer"
                    title="Upload Custom Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-left space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">
                    {customPhoto ? "Custom Photo Active" : "Emoji Avatar Active"}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload your photo</span>
                  </button>
                  {customPhoto && (
                    <button
                      type="button"
                      onClick={() => setCustomPhoto(null)}
                      className="text-[11px] text-rose-500 hover:underline block cursor-pointer"
                    >
                      Reset to emoji avatar
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
                <div className="grid grid-cols-6 gap-2 pt-1">
                  {AVATAR_PRESETS.map((av) => {
                    const isPicked = selectedAvatar === av.emoji;
                    return (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => setSelectedAvatar(av.emoji)}
                        className={`p-2 rounded-xl text-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
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
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Your Name / Codename
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Juan Dela Cruz / Matrix_4D"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* 4th Year Section Fast Picker */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select 4th Year Section
                </label>
                <span className="text-[11px] font-semibold text-blue-600">
                  {SECTION_CHOICES.find(s => s.name === section)?.room || "DLSP COE"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SECTION_CHOICES.map((choice) => {
                  const isSelected = section === choice.name;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => setSection(choice.name)}
                      className={`btn-haptic p-2.5 rounded-xl text-left border transition-all flex flex-col gap-0.5 cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/20 shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200/90 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-black ${isSelected ? "text-blue-900" : "text-slate-800"}`}>
                          {choice.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          {choice.room}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">
                        Mon Proctor: {choice.proctor}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="btn-haptic w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Enter Arena & Join Leaderboard</span>
              </button>

              <button
                type="button"
                onClick={handleStayAnon}
                className="btn-haptic w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/90 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>Stay Anonymous (Generate Anon ID)</span>
              </button>
            </div>
          </form>

          {/* Privacy Note */}
          <div className="text-[11px] text-slate-400 text-center">
            🔒 Saved locally in your browser — your level, XP, and stats persist automatically whenever you return!
          </div>

        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;
