interface WeatherBackgroundProps {
  weather: "clear" | "cloudy" | "rain" | "snow" | "storm" | "night";
}

export function WeatherBackground({ weather }: WeatherBackgroundProps) {
  const backgrounds = {
    clear: "bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600",
    cloudy: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
    rain: "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800",
    snow: "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300",
    storm: "bg-gradient-to-br from-slate-800 via-slate-900 to-black",
    night: "bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-950",
  };

  return (
    <>
      <div
        className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${backgrounds[weather]}`}
      />

      <div className="absolute inset-0 overflow-hidden">
        {weather === "rain" && <RainEffect />}
        {weather === "snow" && <SnowEffect />}
        {(weather === "clear" || weather === "cloudy") && <CloudEffect />}
        {weather === "storm" && <LightningEffect />}
      </div>
    </>
  );
}

function RainEffect() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function SnowEffect() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snow-flake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function CloudEffect() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="cloud"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${20 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 30}s`,
          }}
        />
      ))}
    </div>
  );
}

function LightningEffect() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="lightning" />
    </div>
  );
}
