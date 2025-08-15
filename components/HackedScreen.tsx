import React, { useState, useEffect, useRef } from 'react';

const hackLines = [
    { type: 'output', text: 'SYSTEM ALERT: Unauthorized access detected.' },
    { type: 'output', text: '> Bypassing security protocols...' },
    { type: 'output', text: '> Access Granted. Injecting payload...' },
    { type: 'code', content: `// Infinite loop started...\n\nwhile (true) {\n  console.log("I'M READY FOR PBAK UIN SALATIGA 2025!");\n}` },
];

const HackedScreen: React.FC = () => {
    const [lines, setLines] = useState<React.ReactNode[]>([]);
    const [step, setStep] = useState(0);
    const [finalMessages, setFinalMessages] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial hack sequence
        if (step < hackLines.length) {
            const timer = setTimeout(() => {
                const lineConfig = hackLines[step];
                let newLine;
                if (lineConfig.type === 'output') {
                    newLine = <p className="text-red-500 font-bold">{lineConfig.text}</p>;
                } else if (lineConfig.type === 'code') {
                    newLine = (
                        <pre className="text-sm bg-gray-900 p-2 rounded border border-red-700">
                            <code className="text-green-400">{lineConfig.content}</code>
                        </pre>
                    );
                }
                setLines(prev => [...prev, newLine]);
                setStep(prev => prev + 1);
            }, step === 0 ? 500 : 800);
            return () => clearTimeout(timer);
        } else {
            // Start flooding after the initial sequence
            const floodTimer = setTimeout(() => {
                const interval = setInterval(() => {
                    setFinalMessages(prev => [...prev, "I'M READY FOR PBAK UIN SALATIGA 2025!"]);
                }, 100);
                 return () => clearInterval(interval);
            }, 3000); // 3-second delay
            return () => clearTimeout(floodTimer);
        }
    }, [step]);
    
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines, finalMessages]);


    return (
        <div ref={containerRef} className="bg-black text-white min-h-screen w-full font-mono flex flex-col justify-end overflow-hidden">
           <div className="p-4 sm:p-6 md:p-8">
                {lines.map((line, index) => (
                    <div key={index} className="mb-2">{line}</div>
                ))}

                {finalMessages.map((msg, index) => (
                    <p key={index} className="text-lg md:text-xl font-bold text-green-500 animate-glitch" style={{ animationDelay: `${index * 5}ms` }}>
                        {msg}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default HackedScreen;