import React, { useRef, useState, useEffect } from "react";

export default function ResizableSplitLayout({
  leftComponent,
  rightComponent,
}) {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(450);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
  
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerWidth = containerRect.width;
  
    const newLeftWidth = e.clientX - containerX;
    const ratio = newLeftWidth / containerWidth;
  
    const clampedRatio = Math.min(0.7, Math.max(0.3, ratio));
  
    setLeftWidth(containerWidth * clampedRatio);
  };  

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex w-full h-full overflow-hidden">
      <div style={{ width: leftWidth }} className="overflow-auto">
        {leftComponent}
      </div>

      <div
        onMouseDown={handleMouseDown}
        className="w-[4px] cursor-col-resize hover:bg-gray-400"
      />

      <div className="flex-1 overflow-auto">
        {rightComponent}
      </div>
    </div>
  );
}
