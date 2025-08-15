import React, { useState, useEffect } from 'react';

const bootLines = [
  '[INFO] Starting BIOS...',
  '[INFO] Memory Test: 65536K OK',
  '[INFO] Detecting IDE drives...',
  '[INFO] Found HDD: VBOX_HARDDISK_1.0',
  '[ OK ] Booting from Hard Disk...',
  ' ',
  'Loading Linux kernel...',
  '[ OK ] Started Kernel.',
  '[ OK ] Mounted /root filesystem.',
  '[ OK ] Reached target Basic System.',
  '[ OK ] Started Network Manager.',
  '[ OK ] Started User Login Service.',
  ' ',
  'Fathir OS v20.25 (Petwir)',
];

interface BootingScreenProps {
  onBootComplete: () => void;
}

const BootingScreen: React.FC<BootingScreenProps> = ({ onBootComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < bootLines.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootLines[step]]);
        setStep(prev => prev + 1);
      }, Math.random() * 150 + 50);
      return () => clearTimeout(timer);
    } else {
        const loginTimer = setTimeout(() => {
            setLines(prev => [...prev, 'login: Fathir']);
        }, 500);
        const completeTimer = setTimeout(onBootComplete, 1500);
        return () => {
            clearTimeout(loginTimer);
            clearTimeout(completeTimer);
        }
    }
  }, [step, onBootComplete]);

  return (
    <div className="bg-black text-white min-h-screen p-4 font-mono">
      {lines.map((line, index) => (
        <p key={index} className={line.startsWith('[ OK ]') ? 'text-green-400' : ''}>
          {line}
        </p>
      ))}
       <span className="bg-white w-2 h-4 inline-block ml-1 animate-pulse" aria-hidden="true"></span>
    </div>
  );
};

export default BootingScreen;
