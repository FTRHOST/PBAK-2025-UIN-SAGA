import React, { useState, useEffect } from 'react';
import TerminalLine from './TerminalLine';
import AsciiBanner from './AsciiBanner';

const Skill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-700 mr-2">
        {children}
    </span>
);

const scriptSteps = [
    { id: 'start', type: 'command', text: './run-profile.sh' },
    { id: 'banner', type: 'banner' },
    { id: 'subtitle', type: 'output', content: <p className="text-gray-400 text-center -mt-2">by Fathir ~ A Coder's Introduction v1.0.0</p> },
    { id: 'spacer1', type: 'output', content: <p>&nbsp;</p> },
    { id: 'name', type: 'output', content: <p><span className="text-green-400">[OK]</span> User Identified....: <span className="text-cyan-300">Muhammad Fathir Al Farruq (@fathir)</span></p> },
    { id: 'location', type: 'output', content: <p><span className="text-green-400">[OK]</span> Geolocation........: <span className="text-cyan-300">Batang, Jawa Tengah</span></p> },
    { id: 'target', type: 'output', content: <p><span className="text-green-400">[OK]</span> Academic Target....: <span className="text-cyan-300">Teknologi Informasi</span></p> },
    { id: 'faculty', type: 'output', content: <p><span className="text-green-400">[OK]</span> Faculty............: <span className="text-cyan-300">Fakultas Dakwah</span></p> },
    { 
        id: 'skills', 
        type: 'output', 
        content: (
            <div className="flex items-start">
                <p className="flex-shrink-0"><span className="text-green-400">[OK]</span> Core Skills........:</p>
                <div className="flex flex-wrap ml-2">
                    <Skill>JavaScript</Skill>
                    <Skill>React</Skill>
                    <Skill>Node.js</Skill>
                    <Skill>Python</Skill>
                    <Skill>UI/UX Design</Skill>
                </div>
            </div>
        )
    },
    { id: 'objective', type: 'output', content: <p><span className="text-green-400">[OK]</span> Objective..........: <span className="text-cyan-300">"Berkembang di UIN Salatiga untuk menjadi insan yang berakal pada nilai dan siap berkontribusi bagi Indonesia Emas 2045."</span></p> },
    { id: 'spacer2', type: 'output', content: <p>&nbsp;</p> },
    { id: 'complete', type: 'output', content: <p>USER PROFILE LOADED. STATUS: <span className="text-green-400 font-bold">READY</span></p> }
];

const PROMPT = <><span className="text-cyan-400">Fathir@uin-salatiga</span><span className="text-gray-300">:</span><span className="text-blue-400">~</span><span className="text-gray-300">$</span></>;

interface TerminalProps {
    currentStep: number;
    onStepComplete: () => void;
    onScriptComplete: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ currentStep, onStepComplete, onScriptComplete }) => {
    const [lines, setLines] = useState<React.ReactNode[]>([]);
    const [isScriptRunning, setIsScriptRunning] = useState(true);

    useEffect(() => {
        if (!isScriptRunning) return;

        if(currentStep >= scriptSteps.length) {
            setIsScriptRunning(false);
            onScriptComplete();
            return;
        }

        const stepConfig = scriptSteps[currentStep];
        
        let delay;
        if (stepConfig.type === 'command') {
            delay = 600;
        } else if (stepConfig.type === 'banner') {
            delay = 300;
        } else {
            delay = 300 + Math.random() * 100;
        }

        const timer = setTimeout(() => {
            let newLine: React.ReactNode;
            let shouldAutoComplete = false;

            switch(stepConfig.type) {
                case 'command':
                    newLine = <div className="flex gap-2"><span>{PROMPT}&nbsp;</span><TerminalLine text={stepConfig.text} onFinished={onStepComplete} /></div>;
                    break;
                case 'banner':
                    newLine = <AsciiBanner onFinished={onStepComplete} />;
                    break;
                case 'output':
                    newLine = <div>{stepConfig.content}</div>;
                    shouldAutoComplete = true;
                    break;
            }

            if (newLine) {
               setLines(l => [...l, newLine]);
            }
            if (shouldAutoComplete) {
                onStepComplete();
            }
        }, delay);

         return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, isScriptRunning]);


    return (
        <div>
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
            {isScriptRunning && <span className="bg-green-400 w-2.5 h-5 inline-block ml-1 animate-pulse" aria-hidden="true"></span>}
        </div>
    );
}

export default Terminal;