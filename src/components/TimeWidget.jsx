import React from 'react';
import { motion } from 'framer-motion';

const TimeWidget = ({ time, onClose }) => (
    <>
        <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        />
        <motion.div
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-72"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-background/95 backdrop-blur-xl shadow-xl ring-1 ring-border/40 rounded-2xl p-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span>🇮🇳</span>
                            <span className="text-xs font-semibold uppercase tracking-wide text-secondary">IST</span>
                        </div>
                        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {time || '--:--'}
                        </span>
                    </div>

                    <div className="h-px bg-border/20" />

                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                            <p className="text-xs text-secondary mb-0.5">Timezone</p>
                            <p className="text-xs font-semibold">Asia/Kolkata</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-secondary mb-0.5">UTC</p>
                            <p className="text-xs font-semibold">+5:30</p>
                        </div>
                    </div>

                    <motion.button
                        onClick={onClose}
                        className="w-full py-1.5 bg-primary/15 hover:bg-primary/25 text-primary text-xs font-medium rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Close
                    </motion.button>
                </div>
            </div>
        </motion.div>
    </>
);

export default TimeWidget;
