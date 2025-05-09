"use client";
import { useEffect } from "react";

export default function CursorSparkle() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sparkle = document.createElement("div");
      sparkle.style.position = "fixed";
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.width = "8px";
      sparkle.style.height = "8px";
      sparkle.style.borderRadius = "50%";
      sparkle.style.background = "#f5c542";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "9999";
      sparkle.style.boxShadow = "0 0 10px #f5c542";
      sparkle.style.opacity = "0.8";
      sparkle.style.transition = "all 0.3s ease-out";

      document.body.appendChild(sparkle);
      setTimeout(() => {
        sparkle.style.opacity = "0";
        sparkle.remove();
      }, 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}