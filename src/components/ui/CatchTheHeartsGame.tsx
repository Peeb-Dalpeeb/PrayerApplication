import { useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';

interface FallingObject {
  id: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  type: 'heart' | 'star';
  rotation: number;
  rotationSpeed: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

export default function CatchTheHeartsGame() {
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState<FallingObject[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    // Use an object to hold mutable ref-like values that we don't need UI updates for.
    let lastSpawnTime = performance.now();
    let lastTime = performance.now();

    const updateGame = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Spawn every 500ms for a fun, fast-paced minigame
      if (time - lastSpawnTime > 500) {
        lastSpawnTime = time;
        const newObj: FallingObject = {
          id: Math.random().toString(),
          x: Math.random() * 80 + 10, // 10% to 90% wide so it stays on screen
          y: -10, // Starts above screen
          speed: Math.random() * 20 + 20, // 20% to 40% of screen height per second
          size: Math.random() * 24 + 48, // 48px to 72px (big enough for easy tapping)
          type: Math.random() > 0.8 ? 'star' : 'heart', // 20% chance for a bonus star
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 200, // Slowly tumble
        };
        setObjects((prev) => [...prev, newObj]);
      }

      setObjects((prev) =>
        prev
          .map((obj) => ({
            ...obj,
            y: obj.y + obj.speed * (deltaTime / 1000),
            rotation: obj.rotation + obj.rotationSpeed * (deltaTime / 1000),
          }))
          .filter((obj) => obj.y < 120) // Clean up objects that fall completely off screen
      );

      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * (deltaTime / 1000),
            y: p.y + p.vy * (deltaTime / 1000),
            life: p.life - (deltaTime / 1000) * 1.5,
          }))
          .filter((p) => p.life > 0)
      );

      animationFrameId = requestAnimationFrame(updateGame);
    };

    animationFrameId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleCatch = (id: string, type: 'heart' | 'star', x: number, y: number) => {
    setScore((s) => s + (type === 'star' ? 5 : 1));
    setObjects((prev) => prev.filter((obj) => obj.id !== id));

    const color = type === 'star' ? 'bg-yellow-400' : 'bg-rose-500';
    const newParticles: Particle[] = Array.from({ length: 8 }).map(() => ({
      id: Math.random().toString(),
      x,
      y,
      // Create an explosion effect using random velocities outward from center
      vx: (Math.random() - 0.5) * 60,
      vy: (Math.random() - 0.5) * 60,
      life: 1.0,
      color,
      size: Math.random() * 8 + 6,
    }));
    
    setParticles((prev) => [...prev, ...newParticles]);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50 via-blue-100 to-blue-200">
      {/* Informative Header / Scoreboard */}
      <div className="absolute top-16 z-10 flex w-full flex-col items-center px-6 text-center pointer-events-none">
        <h2 className="text-3xl font-extrabold text-blue-700 drop-shadow-sm">
          Waking up server...
        </h2>
        <p className="mt-3 max-w-sm text-lg font-medium text-blue-900/70">
          We use a free backend that sleeps after inactivity. Help us wake it up by catching hearts!
        </p>

        <div className="mt-8 flex items-center justify-center rounded-full bg-white/80 px-8 py-3 shadow-lg backdrop-blur-md border border-white/50">
          <span className="text-3xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Particles Canvas */}
      <div className="absolute inset-0 top-0 mx-auto w-full max-w-xl overflow-hidden pointer-events-none z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full shadow-sm ${p.color}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.life,
              transform: `translate(-50%, -50%) scale(${p.life * 1.5})`,
              transition: 'transform 0.05s linear',
            }}
          />
        ))}
      </div>

      {/* The Falling Objects Canvas */}
      <div className="absolute inset-0 top-0 mx-auto w-full max-w-xl overflow-hidden pointer-events-none">
        {objects.map((obj) => (
          <button
            key={obj.id}
            onPointerDown={(e) => {
              // onPointerDown ensures rapid tap detection before a full click event registers
              e.preventDefault();
              handleCatch(obj.id, obj.type, obj.x, obj.y);
            }}
            className="absolute z-20 touch-none outline-none focus:outline-none pointer-events-auto transition-transform active:scale-50"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: `translate(-50%, -50%) rotate(${obj.rotation}deg)`,
              padding: '20px', // Larger hit area
            }}
          >
            {obj.type === 'heart' ? (
              <Heart
                size={obj.size}
                className="fill-rose-400 text-rose-500 drop-shadow-lg"
              />
            ) : (
              <Star
                size={obj.size}
                className="fill-yellow-300 text-yellow-400 drop-shadow-lg"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
