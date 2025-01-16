
interface WeatherIconProps {
  icon: string;
  size?: 'small' | 'medium' | 'large';
  description?: string;
}

const sizeMap = {
  small: '@2x',
  medium: '@2x',
  large: '@4x'
};

export function WeatherIcon({ icon, size = 'medium', description }: WeatherIconProps) {
  const iconSize = sizeMap[size];
  const iconUrl = `http://openweathermap.org/img/wn/${icon}${iconSize}.png`;
  
  return (
    <img 
      src={iconUrl} 
      alt={description || 'Weather icon'} 
      className={`
        ${size === 'small' ? 'w-8 h-8' : ''}
        ${size === 'medium' ? 'w-12 h-12' : ''}
        ${size === 'large' ? 'w-16 h-16' : ''}
      `}
    />
  );
}