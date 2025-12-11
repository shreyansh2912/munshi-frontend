
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'icon' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'full', 
  size = 'md',
  lightMode = false
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-3xl' },
    xl: { icon: 48, text: 'text-4xl' },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  const colorPrimary = lightMode ? 'text-white' : 'text-munshi-indigo dark:text-white';
  const colorAccent = 'text-munshi-teal';
  const colorSpark = 'text-munshi-gold';

  return (
    <div className={`flex items-center gap-2.5 font-heading font-bold select-none ${className}`}>
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path 
          d="M10 20C10 12 14 6 20 2V14L14 24L10 20Z" 
          className={colorPrimary} 
          fill="currentColor"
        />
        <path 
          d="M10 20L14 24V32C14 34 13 36 10 38V20Z" 
          className={colorPrimary} 
          fill="currentColor" 
          fillOpacity="0.8"
        />
        
        <path 
          d="M30 20C30 12 26 6 20 2V14L26 24L30 20Z" 
          className={colorPrimary} 
          fill="currentColor"
        />
        <path 
          d="M30 20L26 24V32C26 34 27 36 30 38V20Z" 
          className={colorPrimary} 
          fill="currentColor" 
          fillOpacity="0.8"
        />

        <path 
          d="M20 18V36" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          className={colorAccent}
        />

        <rect 
          x="17" 
          y="11" 
          width="6" 
          height="6" 
          transform="rotate(45 20 14)" 
          className={colorSpark} 
          fill="currentColor"
        />
      </svg>

      {variant === 'full' && (
        <span className={`${textSize} tracking-tight ${lightMode ? 'text-white' : 'text-munshi-indigo dark:text-white'}`}>
          Munshi
        </span>
      )}
    </div>
  );
};
