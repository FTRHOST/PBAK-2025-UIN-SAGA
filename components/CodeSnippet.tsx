import React, { useState, useEffect } from 'react';

interface CodeSnippetProps {
  code: string;
  onFinished?: () => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, onFinished }) => {
    const [displayedCode, setDisplayedCode] = useState('');

    useEffect(() => {
        setDisplayedCode('');
        let i = 0;
        const intervalId = setInterval(() => {
            if(i < code.length) {
                setDisplayedCode(prev => prev + code.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
                if (onFinished) onFinished();
            }
        }, 15);

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    const highlightSyntax = (text: string) => {
        return text
            .replace(/\b(const|let|function|while|if|else|return|class|constructor|new)\b/g, '<span class="text-pink-400">$1</span>')
            .replace(/\b(console|this)\b/g, '<span class="text-cyan-400">$1</span>')
            .replace(/\b(log|forEach|displaySkills|logIdentity)\b/g, '<span class="text-yellow-300">$1</span>')
            .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-green-300">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>');
    };

    return (
        <div className="w-full text-sm md:text-base my-2">
            <pre className="whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedCode) }} />
            </pre>
        </div>
    );
}

export default CodeSnippet;