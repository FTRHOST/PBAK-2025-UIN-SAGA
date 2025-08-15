import React, { useState, useEffect, useRef } from 'react';
import BootingScreen from './components/BootingScreen';
import Terminal from './components/Terminal';
import HackedScreen from './components/HackedScreen';

type AppPhase = 'booting' | 'terminal' | 'hacked';

const App: React.FC = () => {
  const [appPhase, setAppPhase] = useState<AppPhase>('booting');
  const [currentStep, setCurrentStep] = useState(0);
  const terminalContainerRef = useRef<HTMLElement>(null);

  const handleStepComplete = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handleScriptComplete = () => {
    setTimeout(() => {
        setAppPhase('hacked');
    }, 1000); // Short delay for transition
  };

  useEffect(() => {
    if (terminalContainerRef.current) {
        terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [currentStep, appPhase]);

  const renderContent = () => {
    switch (appPhase) {
      case 'booting':
        return <BootingScreen onBootComplete={() => setAppPhase('terminal')} />;
      case 'hacked':
        return <HackedScreen />;
      case 'terminal':
        return (
           <div className="w-full max-w-6xl mx-auto border-2 border-gray-700 rounded-lg shadow-2xl shadow-cyan-500/10 bg-gray-900/50 backdrop-blur-sm flex flex-col h-full max-h-[90vh]">
            <header className="bg-gray-800 text-gray-300 p-3 rounded-t-lg flex items-center justify-between border-b border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-sm">Fathir@uin-salatiga: ~</span>
              <div></div>
            </header>
            
            <main ref={terminalContainerRef} className="p-4 md:p-6 text-base md:text-lg w-full flex-grow overflow-y-auto hide-scrollbar">
              <Terminal currentStep={currentStep} onStepComplete={handleStepComplete} onScriptComplete={handleScriptComplete} />
            </main>
          </div>
        );
    }
  };

  return (
    <div className="bg-black text-green-400 min-h-screen p-4 sm:p-6 md:p-8 selection:bg-green-800 selection:text-white flex items-center justify-center">
      {renderContent()}
       <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); text-shadow: -1px 0 red, 1px 0 cyan; }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); text-shadow: 1px 0 red, -1px 0 cyan; }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 0.2s infinite;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default App;