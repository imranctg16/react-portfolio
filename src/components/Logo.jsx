import { Terminal } from 'lucide-react';

const Logo = ({ size = 'md', showText = true, name = "Alex Chen" }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Main logo container with gradient background */}
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 animate-pulse"></div>
          
          {/* Code brackets */}
          <div className="relative z-10 flex items-center justify-center">
            <span className="text-white font-bold text-xs opacity-40 absolute -left-1">{'<'}</span>
            <span className="text-white font-black text-sm">{initials}</span>
            <span className="text-white font-bold text-xs opacity-40 absolute -right-1">{'/>'}</span>
          </div>
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-bl-full opacity-60"></div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-bold text-gray-900 dark:text-white leading-tight`}>
            {name}
          </span>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium tracking-wide">
            Software Engineer
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;