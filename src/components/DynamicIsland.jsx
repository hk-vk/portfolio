import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeWidget from './TimeWidget';

const AnimatedClockSVG = ({ time }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const updateClockHands = () => {
            const now = new Date();
            const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

            const h = istTime.getHours();
            const m = istTime.getMinutes();
            const s = istTime.getSeconds();

            const hourRotation = (h >= 12 ? h - 12 : h) * 30 + m / 2 + s / 120;
            const minuteRotation = m * 6 + s / 10;
            const secondRotation = s * 6;

            if (svgRef.current) {
                const hourHand = svgRef.current.querySelector('#hand-h-use');
                const minuteHand = svgRef.current.querySelector('#hand-m-use');
                const secondHand = svgRef.current.querySelector('#hand-s-use');

                if (hourHand) hourHand.setAttribute('transform', `rotate(${hourRotation})`);
                if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minuteRotation})`);
                if (secondHand) secondHand.setAttribute('transform', `rotate(${secondRotation})`);
            }
        };

        updateClockHands();
        const interval = setInterval(updateClockHands, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <svg
            ref={svgRef}
            viewBox="-1136 -1136 2272 2272"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="w-6 h-6"
        >
            <style>{`
                #face-outline { fill: currentColor; stroke: #d3d3d3; stroke-width: 64; opacity: 0.1; }
                #face-use, #hand-h-use, #hand-m-use { fill: currentColor; stroke: none; }
                #hand-s-use { fill: #bd2420; stroke: none; }
                #center-dot { fill: currentColor; stroke: none; }
            `}</style>
            <defs>
                <path id="mark-5min" d="M -40,-1000 l 80,0 0,245 -80,0 z" />
                <path id="mark-min" d="M -15,-1000 l 30,0 0,80  -30,0 z" />
                <path id="hand-h" d="M -50,-650 l 100,0 10,890 -120,0 z" />
                <path id="hand-m" d="M -40,-950 l 80,0 10,1200 -100,0 z" />
                <g id="hand-s">
                    <path d="M -20,-550 l 30,0 7,890 -30,0 z" />
                    <path d="M   0,-750 a 105,105 0 0 1 0,210 a 105,105 0 0 1 0,-210 z" />
                </g>
                <g id="face-30d">
                    <use xlinkHref="#mark-5min" />
                    <use xlinkHref="#mark-min" transform="rotate(06)" />
                    <use xlinkHref="#mark-min" transform="rotate(12)" />
                    <use xlinkHref="#mark-min" transform="rotate(18)" />
                    <use xlinkHref="#mark-min" transform="rotate(24)" />
                </g>
                <g id="face-90d">
                    <use xlinkHref="#face-30d" />
                    <use xlinkHref="#face-30d" transform="rotate(30)" />
                    <use xlinkHref="#face-30d" transform="rotate(60)" />
                </g>
                <g id="face">
                    <use xlinkHref="#face-90d" />
                    <use xlinkHref="#face-90d" transform="rotate(90)" />
                    <use xlinkHref="#face-90d" transform="rotate(180)" />
                    <use xlinkHref="#face-90d" transform="rotate(270)" />
                </g>
            </defs>
            <circle id="face-outline" r="1104" />
            <use xlinkHref="#face" id="face-use" />
            <use xlinkHref="#hand-h" id="hand-h-use" />
            <use xlinkHref="#hand-m" id="hand-m-use" />
            <use xlinkHref="#hand-s" id="hand-s-use" />
            <circle id="center-dot" r="5" />
        </svg>
    );
};

const TimePill = ({ time, onClick }) => (
    <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-md shadow-lg ring-1 ring-border/40 rounded-full px-3 py-2 hover:ring-border/60 transition-all cursor-pointer text-xs"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
    >
        <AnimatedClockSVG time={time} />
        <span className="font-medium text-foreground">{time || '--:--'}</span>
    </motion.button>
);

const DynamicIsland = () => {
    const [time, setTime] = useState('');
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

            const hours = String(istTime.getHours()).padStart(2, '0');
            const minutes = String(istTime.getMinutes()).padStart(2, '0');

            setTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
                <AnimatePresence mode="wait">
                    {!expanded && (
                        <TimePill key="pill" time={time} onClick={() => setExpanded(true)} />
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {expanded && (
                    <TimeWidget key="widget" time={time} onClose={() => setExpanded(false)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default DynamicIsland;