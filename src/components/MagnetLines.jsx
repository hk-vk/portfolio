import { useRef, useEffect, useState } from "react";
import "./MagnetLines.css";

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {}
}) {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef(null);
  const timeRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");
    
    // Set initial state
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mousePositionRef.current = { x: centerX, y: centerY };
      
      // Initial animation
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.x + itemRect.width / 2;
        const itemCenterY = itemRect.y + itemRect.height / 2;
        
        const delay = index * 10; // Staggered delay
        setTimeout(() => {
          const b = centerX - itemCenterX;
          const a = centerY - itemCenterY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const r = (Math.acos(b / c) * 180) / Math.PI * (centerY > itemCenterY ? 1 : -1);
          item.style.setProperty("--rotate", `${r + baseAngle}deg`);
          item.style.setProperty("--opacity", "1");
        }, delay);
      });
    }

    const onPointerMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      setIsHovering(true);
    };

    const onPointerLeave = () => {
      setIsHovering(false);
    };

    // Animate function for smooth movement
    const animate = (time) => {
      if (!timeRef.current) timeRef.current = time;
      const elapsed = time - timeRef.current;
      timeRef.current = time;

      // Only apply pointer-based movement when hovering
      if (isHovering) {
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.x + rect.width / 2;
          const centerY = rect.y + rect.height / 2;

          // Calculate angle with damping for smoother motion
          const b = mousePositionRef.current.x - centerX;
          const a = mousePositionRef.current.y - centerY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const targetR = (Math.acos(b / c) * 180) / Math.PI * (mousePositionRef.current.y > centerY ? 1 : -1);
          
          // Get current rotation
          const currentRotateStr = item.style.getPropertyValue("--rotate") || `${baseAngle}deg`;
          const currentRotate = parseFloat(currentRotateStr);
          
          // Smoothly interpolate rotation
          const newRotate = currentRotate + (targetR - currentRotate) * 0.05;
          item.style.setProperty("--rotate", `${newRotate}deg`);
        });
      } else {
        // Subtle breathing animation when not hovering
        const breathe = Math.sin(time * 0.001) * 5;
        
        items.forEach((item, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          const offset = (row + col) * 0.1; // Creates a wave effect
          const angle = baseAngle + breathe + Math.sin(time * 0.0005 + offset) * 8;
          
          item.style.setProperty("--rotate", `${angle}deg`);
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove);
    container.addEventListener("mouseleave", onPointerLeave);
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, [baseAngle, columns, isHovering]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        "--rotate": `${baseAngle}deg`,
        "--opacity": "0",
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        opacity: "var(--opacity)",
        transition: `opacity ${(i % total) * 5 + 300}ms ease-out`
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
} 