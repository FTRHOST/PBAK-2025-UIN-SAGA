import React, { useState, useEffect } from 'react';

const bannerText = `
███████╗ █████╗ ████████╗██╗  ██╗██╗██████╗ 
██╔════╝██╔══██╗╚══██╔══╝██║  ██║██║██╔══██╗
█████╗  ███████║   ██║   ███████║██║██████╔╝
██╔══╝  ██╔══██║   ██║   ██╔══██║██║██╔══██╗
██║     ██║  ██║   ██║   ██║  ██║██║██║  ██║
╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
`;

interface AsciiBannerProps {
  onFinished?: () => void;
}

const AsciiBanner: React.FC<AsciiBannerProps> = ({ onFinished }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        // Trim leading newline to start animation immediately
        const textToAnimate = bannerText.trimStart(); 
        const intervalId = setInterval(() => {
            if (i < textToAnimate.length) {
                setDisplayedText(textToAnimate.substring(0, i + 1));
                i++;
            } else {
                clearInterval(intervalId);
                if (onFinished) onFinished();
            }
        }, 4); // Slower typing for banner

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-center">
            <pre className="text-red-400 font-bold text-xs md:text-sm leading-tight md:leading-snug">
                {displayedText}
            </pre>
        </div>
    );
};

export default AsciiBanner;