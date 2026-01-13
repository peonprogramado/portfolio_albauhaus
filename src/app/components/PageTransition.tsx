'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
    isVisible: boolean;
    progress: number;
}

export default function PageTransition({ isVisible, progress }: PageTransitionProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9998] flex items-center justify-center bg-black"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="mb-6"
                        >
                            <span
                                className="text-[80px] md:text-[100px] font-black text-white leading-none tracking-tighter"
                                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                            >
                                {Math.floor(progress)}%
                            </span>
                        </motion.div>

                        <div className="w-[200px] h-[2px] bg-white/20 overflow-hidden mx-auto">
                            <motion.div
                                className="h-full bg-white origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: progress / 100,
                                    transition: { duration: 0.1, ease: "linear" }
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
