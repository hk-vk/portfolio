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
    
    // Set initial state - optimized with requestAnimationFrame
    if (items.length) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mousePositionRef.current = { x: centerX, y: centerY };
      
      // Batch DOM updates for better performance
      requestAnimationFrame(() => {
        items.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemCenterX = itemRect.x + itemRect.width / 2;
          const itemCenterY = itemRect.y + itemRect.height / 2;
          
          const b = centerX - itemCenterX;
          const a = centerY - itemCenterY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const r = (Math.acos(b / c) * 180) / Math.PI * (centerY > itemCenterY ? 1 : -1);
          
          // Use CSS transforms for better performance
          item.style.cssText = `
            --rotate: ${r + baseAngle}deg;
            --opacity: 1;
            transform: rotate(var(--rotate));
            transition: opacity ${(index % 10) * 50 + 300}ms ease-out;
          `;
        });
      });
    }

    const onPointerMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      setIsHovering(true);
    };

    const onPointerLeave = () => {
      setIsHovering(false);
    };

    // Optimized animate function with throttling and reduced calculations
    let lastFrameTime = 0;
    const frameThrottle = 16.67; // ~60fps throttling
    
    const animate = (time) => {
      // Throttle animation to 60fps max
      if (time - lastFrameTime < frameThrottle) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = time;

      // Only animate when component is visible and needed
      if (!container.offsetParent) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      // Batch DOM updates for better performance
      const updates = [];
      
      if (isHovering) {
        // More efficient hover animation - reduced calculations
        items.forEach((item, index) => {
          if (index % 2 === 0) { // Only animate every other item for performance
            const rect = item.getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;

            const b = mousePositionRef.current.x - centerX;
            const a = mousePositionRef.current.y - centerY;
            const c = Math.sqrt(a * a + b * b) || 1;
            const targetR = (Math.acos(b / c) * 180) / Math.PI * (mousePositionRef.current.y > centerY ? 1 : -1);
            
            const currentRotateStr = item.style.getPropertyValue("--rotate") || `${baseAngle}deg`;
            const currentRotate = parseFloat(currentRotateStr);
            const newRotate = currentRotate + (targetR - currentRotate) * 0.08; // Faster interpolation
            
            updates.push({ item, rotate: newRotate });
          }
        });
      } else {
        // Reduced breathing animation frequency
        const breathe = Math.sin(time * 0.0008) * 3; // Reduced amplitude and frequency
        
        items.forEach((item, index) => {
          if (index % 3 === 0) { // Only animate every third item
            const row = Math.floor(index / columns);
            const col = index % columns;
            const offset = (row + col) * 0.08;
            const angle = baseAngle + breathe + Math.sin(time * 0.0003 + offset) * 4;
            
            updates.push({ item, rotate: angle });
          }
        });
      }

      // Apply all updates in a single batch
      requestAnimationFrame(() => {
        updates.forEach(({ item, rotate }) => {
          item.style.transform = `rotate(${rotate}deg)`;
        });
      });

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