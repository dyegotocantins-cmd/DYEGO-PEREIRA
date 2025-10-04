import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-24 p-4 bg-slate-700 rounded-full flex items-center justify-center shadow-lg mb-4">
        {/* Abstract knowledge/AI icon */}
        <svg 
            className="w-16 h-16 text-purple-400"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7v0A2.5 2.5 0 0 1 7 4.5v0A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0A2.5 2.5 0 0 1 14.5 7v0A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 14.5 2Z" />
            <path d="M12 11.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5v0a2.5 2.5 0 0 1 2.5-2.5Z" />
            <path d="M4.5 11.5A2.5 2.5 0 0 1 7 14v0a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5v0A2.5 2.5 0 0 1 4.5 11.5Z" />
            <path d="M19.5 11.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5v0a2.5 2.5 0 0 1 2.5-2.5Z" />
            <path d="M9.5 22a2.5 2.5 0 0 1 2.5-2.5v0a2.5 2.5 0 0 1-2.5-2.5v0a2.5 2.5 0 0 1-2.5 2.5v0A2.5 2.5 0 0 1 9.5 22Z" />
            <path d="M14.5 22a2.5 2.5 0 0 1 2.5-2.5v0a2.5 2.5 0 0 1-2.5-2.5v0a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1 2.5 2.5Z" />
            <path d="M7 4.5h5" />
            <path d="M7 14h5" />
            <path d="M12 14h5" />
            <path d="M7 4.5v5" />
            <path d="m12 7-2.5 4.5" />
            <path d="m12 16.5-2.5 3" />
            <path d="M12 16.5v-2.5" />
            <path d="m17 7-2.5 4.5" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-300">CONHECIMENTO E EDUCAÇÃO</h2>
    </div>
  );
};

export default Logo;
