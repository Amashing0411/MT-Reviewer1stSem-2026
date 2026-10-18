import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RotateCcw, 
  Move, 
  Check, 
  X, 
  Circle, 
  Square, 
  Sparkles, 
  RefreshCw,
  Sliders,
  Eye
} from "lucide-react";
import { StudentAvatar } from "./StudentAvatar";

export function ImageCropModal({
  isOpen,
  imageSrc,
  frameId = "default",
  onSave,
  onClose,
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [guideShape, setGuideShape] = useState("circle"); // "circle" | "rounded"
  const [showFrameOverlay, setShowFrameOverlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [livePreviewUrl, setLivePreviewUrl] = useState(null);

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const VIEWPORT_SIZE = 240; // Size in CSS pixels of crop box
  const EXPORT_SIZE = 256; // Output canvas resolution

  // Reset state when opening a new image
  useEffect(() => {
    if (isOpen && imageSrc) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setRotation(0);
      setImageLoaded(false);
      setLivePreviewUrl(null);
    }
  }, [isOpen, imageSrc]);

  // Compute base scale to cover the square viewport (cover fit)
  const getBaseScale = useCallback(() => {
    if (!naturalSize.width || !naturalSize.height) return 1;
    // When rotated 90 or 270, width and height are swapped
    const isSwapped = rotation === 90 || rotation === 270;
    const effectiveWidth = isSwapped ? naturalSize.height : naturalSize.width;
    const effectiveHeight = isSwapped ? naturalSize.width : naturalSize.height;
    return VIEWPORT_SIZE / Math.min(effectiveWidth, effectiveHeight);
  }, [naturalSize, rotation]);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setNaturalSize({ width: naturalWidth, height: naturalHeight });
    setImageLoaded(true);
  };

  // Dragging / Pan handling (Mouse & Touch)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.min(Math.max(1, Number((prev + delta).toFixed(2))), 3.5));
  };

  // Reset transforms
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  };

  // Rotate 90 degrees clockwise
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    setPan({ x: 0, y: 0 }); // Recenter on rotate
  };

  // Render cropped image to high quality canvas
  const generateCroppedDataUrl = useCallback(() => {
    if (!imgRef.current || !naturalSize.width) return null;
    const canvas = document.createElement("canvas");
    canvas.width = EXPORT_SIZE;
    canvas.height = EXPORT_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const baseScale = getBaseScale();
    const scaleRatio = EXPORT_SIZE / VIEWPORT_SIZE;

    // Apply center transform
    ctx.translate(EXPORT_SIZE / 2, EXPORT_SIZE / 2);
    ctx.translate(pan.x * scaleRatio, pan.y * scaleRatio);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(baseScale * zoom * scaleRatio, baseScale * zoom * scaleRatio);

    ctx.drawImage(
      imgRef.current,
      -naturalSize.width / 2,
      -naturalSize.height / 2
    );

    return canvas.toDataURL("image/jpeg", 0.90);
  }, [naturalSize, getBaseScale, pan, rotation, zoom]);

  // Update live preview pill whenever transforms change
  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        const url = generateCroppedDataUrl();
        setLivePreviewUrl(url);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded, zoom, pan, rotation, generateCroppedDataUrl]);

  const handleApply = () => {
    const cropped = generateCroppedDataUrl();
    if (cropped && onSave) {
      onSave(cropped);
    }
  };

  if (!isOpen || !imageSrc) return null;

  const baseScale = getBaseScale();
  const totalScale = baseScale * zoom;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="double-bezel-outer w-full max-w-md max-h-[94vh] overflow-y-auto animate-scaleIn text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-4 sm:p-6 relative space-y-4 text-center">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Photo Crop & Framing Studio
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Drag to pan • Pinch or slider to zoom • Frame alignment
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-haptic p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Crop Viewport Arena */}
          <div className="flex flex-col items-center justify-center pt-1">
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              style={{ width: `${VIEWPORT_SIZE}px`, height: `${VIEWPORT_SIZE}px` }}
              className={`relative overflow-hidden bg-slate-950 border-2 select-none touch-none transition-shadow ${
                isDragging ? "cursor-grabbing ring-2 ring-blue-500/50" : "cursor-grab"
              } ${guideShape === "circle" ? "rounded-full" : "rounded-3xl"} border-blue-500/80 shadow-inner`}
            >
              {/* Subtle Canvas Checkerboard for transparency */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

              {/* Underlying Image */}
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Upload preview"
                onLoad={handleImageLoad}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${totalScale})`,
                  transformOrigin: "center center",
                  maxWidth: "none",
                  maxHeight: "none",
                }}
                className="pointer-events-none select-none transition-transform duration-75"
                draggable={false}
              />

              {/* Viewport Rule-of-Thirds Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-25">
                <div className="border-r border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-b border-white/60" />
                <div className="border-r border-white/60" />
                <div className="border-r border-white/60" />
                <div />
              </div>

              {/* Frame Overlay Guide (Visualizes how the frame will crop this photo) */}
              {showFrameOverlay && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <StudentAvatar
                      customPhoto={null}
                      avatar=""
                      frameId={frameId}
                      size="xl"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1 font-medium">
              <Move className="w-3.5 h-3.5 text-blue-500" />
              <span>Click & drag photo to center face or university seal</span>
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-left">
            
            {/* Zoom Slider & Stepper */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Zoom Level</span>
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400">
                  {zoom.toFixed(2)}×
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(1, Number((prev - 0.15).toFixed(2))))}
                  className="btn-haptic p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <input
                  type="range"
                  min="1"
                  max="3.5"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-blue-600 dark:accent-blue-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(3.5, Number((prev + 0.15).toFixed(2))))}
                  className="btn-haptic p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Actions: Rotate, Reset, Frame Guide Toggle */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs">
              <button
                type="button"
                onClick={handleRotate}
                className="btn-haptic py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
                <span>Rotate 90°</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="btn-haptic py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                <span>Recenter</span>
              </button>

              <button
                type="button"
                onClick={() => setGuideShape((prev) => (prev === "circle" ? "rounded" : "circle"))}
                className="btn-haptic py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer"
                title="Toggle Circular vs Square Shape Guide"
              >
                {guideShape === "circle" ? (
                  <>
                    <Circle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Circle</span>
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5 text-blue-500" />
                    <span>Square</span>
                  </>
                )}
              </button>
            </div>

            {/* Frame Overlay Visibility Toggle */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFrameOverlay}
                  onChange={(e) => setShowFrameOverlay(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Show live frame border while adjusting</span>
              </label>
            </div>
          </div>

          {/* Real-time Result Preview Badges */}
          {livePreviewUrl && (
            <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <StudentAvatar
                    customPhoto={livePreviewUrl}
                    frameId={frameId}
                    size="md"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                    Actual Size Preview
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    How it will appear in chats & rankings
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                256×256 HD
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-haptic flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="btn-haptic flex-2 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Apply & Set Photo</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ImageCropModal;
