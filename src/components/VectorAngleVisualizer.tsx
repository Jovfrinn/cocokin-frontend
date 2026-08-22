import { useEffect, useState } from "react";

interface VectorAngleVisualizerProps {
  score?: number; // 0 to 100
  animate?: boolean;
  size?: number;
}

const TICKS = [0, 15, 30, 45, 60, 75, 90];

export default function VectorAngleVisualizer({
  score = 100,
  animate = false,
  size = 300,
}: VectorAngleVisualizerProps) {
  const [currentScore, setCurrentScore] = useState(score);

  useEffect(() => {
    if (animate) {
      let angle = 0;
      const interval = setInterval(() => {
        angle += 0.025;
        // Oscillate score smoothly between 40% and 98%
        const osc = 69 + Math.sin(angle) * 29;
        setCurrentScore(osc);
      }, 30);
      return () => clearInterval(interval);
    } else {
      setCurrentScore(score);
    }
  }, [score, animate]);

  // Convert score (0 - 100) to similarity (0 - 1)
  const similarity = Math.max(0, Math.min(1, currentScore / 100));
  // Compute theta in radians: cos(theta) = similarity
  const thetaRad = Math.acos(similarity);
  const thetaDeg = (thetaRad * 180) / Math.PI;

  const originX = 60;
  const originY = 195;
  const length = 148;
  const bezelR = 168;

  const vectorAX = originX + length;
  const vectorAY = originY;
  const vectorBX = originX + length * Math.cos(thetaRad);
  const vectorBY = originY - length * Math.sin(thetaRad);

  const arcRadius = 42;
  const arcAX = originX + arcRadius;
  const arcAY = originY;
  const arcBX = originX + arcRadius * Math.cos(thetaRad);
  const arcBY = originY - arcRadius * Math.sin(thetaRad);
  const arcPath = `M ${arcAX} ${arcAY} A ${arcRadius} ${arcRadius} 0 0 0 ${arcBX} ${arcBY}`;

  const rad = (d: number) => (d * Math.PI) / 180;

  // Ease the needle into a new reading instead of snapping — skip while the
  // continuous demo oscillation is driving updates every 30ms, where a CSS
  // transition would just lag behind the target instead of looking smooth.
  const settle = animate ? "" : "transition-[x2,y2,cx,cy,d] duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)]";

  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-fade-in">
      <svg
        viewBox="0 0 300 230"
        width={size}
        height={size * 0.77}
        style={{ transformOrigin: `${originX}px ${originY}px` }}
        className="overflow-visible font-sans animate-needle-in"
      >
        {/* Bezel arc — the instrument's fixed dial */}
        <path
          d={`M ${originX + bezelR} ${originY} A ${bezelR} ${bezelR} 0 0 0 ${originX} ${originY - bezelR}`}
          fill="none"
          stroke="var(--color-romantic-clay)"
          strokeWidth="1.5"
          className="opacity-30 dark:opacity-40"
        />

        {/* Degree ticks */}
        {TICKS.map((deg) => {
          const a = rad(deg);
          const inner = deg % 30 === 0 ? bezelR - 10 : bezelR - 6;
          const x1 = originX + inner * Math.cos(a);
          const y1 = originY - inner * Math.sin(a);
          const x2 = originX + bezelR * Math.cos(a);
          const y2 = originY - bezelR * Math.sin(a);
          const lx = originX + (bezelR + 14) * Math.cos(a);
          const ly = originY - (bezelR + 14) * Math.sin(a);
          return (
            <g key={deg}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-romantic-clay)"
                strokeWidth={deg % 30 === 0 ? 2 : 1}
                className="opacity-50 dark:opacity-60"
              />
              {deg % 30 === 0 && (
                <text
                  x={lx}
                  y={ly + 3}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-romantic-muted)"
                  className="select-none opacity-70"
                >
                  {deg}&deg;
                </text>
              )}
            </g>
          );
        })}

        {/* Angle arc (theta) */}
        {thetaDeg > 1 && (
          <path
            d={arcPath}
            fill="none"
            stroke="var(--color-romantic-clay)"
            strokeWidth="2.5"
            className={`opacity-90 ${settle}`}
          />
        )}

        {/* Vector A (reference / creator) */}
        <line
          x1={originX}
          y1={originY}
          x2={vectorAX}
          y2={vectorAY}
          stroke="var(--color-romantic-rose)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx={vectorAX} cy={vectorAY} r="5" fill="var(--color-romantic-rose)" />
        <text
          x={vectorAX - 14}
          y={vectorAY + 18}
          fontSize="10"
          fontWeight="700"
          fill="var(--color-romantic-rose)"
          fontFamily="var(--font-mono)"
          className="select-none uppercase tracking-widest"
        >
          A
        </text>

        {/* Vector B (respondent) */}
        <line
          x1={originX}
          y1={originY}
          x2={vectorBX}
          y2={vectorBY}
          stroke="var(--color-romantic-clay)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className={settle}
        />
        <circle cx={vectorBX} cy={vectorBY} r="5" fill="var(--color-romantic-clay)" className={settle} />
        <text
          x={vectorBX + 8}
          y={vectorBY - 6}
          fontSize="10"
          fontWeight="700"
          fill="var(--color-romantic-clay)"
          fontFamily="var(--font-mono)"
          className="select-none uppercase tracking-widest"
        >
          B
        </text>

        {/* Origin pivot */}
        <circle
          cx={originX}
          cy={originY}
          r="6"
          fill="var(--color-romantic-text)"
          className="dark:fill-romantic-dark-text"
        />
      </svg>

      {/* LCD-style readout */}
      <div className="flex items-center gap-px rounded-md border border-romantic-border dark:border-romantic-dark-border overflow-hidden font-mono text-xs">
        <span className="bg-romantic-text dark:bg-romantic-dark-text text-romantic-bg dark:text-romantic-dark-bg px-2.5 py-1.5 font-semibold">
          &theta; {Math.round(thetaDeg)}&deg;
        </span>
        <span className="bg-white dark:bg-romantic-dark-card text-romantic-muted dark:text-romantic-dark-muted px-2.5 py-1.5">
          cos&theta; {similarity.toFixed(3)}
        </span>
        <span className="bg-romantic-rose/10 dark:bg-romantic-dark-rose/10 text-romantic-rose dark:text-romantic-dark-rose px-2.5 py-1.5 font-semibold">
          {Math.round(currentScore * 10) / 10}%
        </span>
      </div>
    </div>
  );
}
