import { useEffect, useState } from "react";

interface VectorAngleVisualizerProps {
  score?: number; // 0 to 100
  animate?: boolean;
  size?: number;
}

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

  const originX = 70;
  const originY = 210;
  const length = 150;

  // Vector A (Base) at 0 degrees (pointing straight right)
  const vectorAX = originX + length;
  const vectorAY = originY;

  // Vector B at theta degrees (pointing up-right)
  const vectorBX = originX + length * Math.cos(thetaRad);
  const vectorBY = originY - length * Math.sin(thetaRad);

  // Arc details (Radius 50)
  const arcRadius = 45;
  const arcAX = originX + arcRadius;
  const arcAY = originY;
  const arcBX = originX + arcRadius * Math.cos(thetaRad);
  const arcBY = originY - arcRadius * Math.sin(thetaRad);

  // Large arc flag is 0 because theta <= 90 deg (arccos(0) = 90 deg, arccos(1) = 0 deg)
  const arcPath = `M ${arcAX} ${arcAY} A ${arcRadius} ${arcRadius} 0 0 0 ${arcBX} ${arcBY}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        viewBox="0 0 300 270"
        width={size}
        height={size * 0.9}
        className="text-romantic-rose dark:text-romantic-dark-rose overflow-visible font-sans"
      >
        {/* Axis Lines (Subtle grid) */}
        <line
          x1={originX - 30}
          y1={originY}
          x2={originX + length + 35}
          y2={originY}
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-15 dark:opacity-10"
        />
        <line
          x1={originX}
          y1={originY + 30}
          x2={originX}
          y2={originY - length - 30}
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-15 dark:opacity-10"
        />

        {/* Arc for Angle (Theta) */}
        {thetaDeg > 1 && (
          <path
            d={arcPath}
            fill="none"
            stroke="var(--color-romantic-clay)"
            strokeWidth="2.5"
            className="opacity-80 dark:opacity-70"
          />
        )}

        {/* Vector A (Creator) */}
        <line
          x1={originX}
          y1={originY}
          x2={vectorAX}
          y2={vectorAY}
          stroke="var(--color-romantic-rose)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx={vectorAX} cy={vectorAY} r="6" fill="var(--color-romantic-rose)" />

        {/* Vector B (Respondent) */}
        <line
          x1={originX}
          y1={originY}
          x2={vectorBX}
          y2={vectorBY}
          stroke="var(--color-romantic-clay)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx={vectorBX} cy={vectorBY} r="6" fill="var(--color-romantic-clay)" />

        {/* Origin Circle */}
        <circle
          cx={originX}
          cy={originY}
          r="8"
          fill="var(--color-romantic-text)"
          className="dark:fill-romantic-dark-text shadow"
        />

        {/* Angle Annotation Text */}
        {thetaDeg > 3 && (
          <text
            x={originX + 55}
            y={originY - 20}
            fontSize="12"
            fontWeight="bold"
            fill="var(--color-romantic-clay)"
            className="font-mono select-none"
          >
            &theta; = {Math.round(thetaDeg)}&deg;
          </text>
        )}

        {/* Label for Vector A */}
        <text
          x={vectorAX + 10}
          y={vectorAY + 4}
          fontSize="10"
          fontWeight="bold"
          fill="var(--color-romantic-rose)"
          className="select-none font-sans uppercase tracking-widest"
        >
          A
        </text>

        {/* Label for Vector B */}
        <text
          x={vectorBX + 6}
          y={vectorBY - 6}
          fontSize="10"
          fontWeight="bold"
          fill="var(--color-romantic-clay)"
          className="select-none font-sans uppercase tracking-widest"
        >
          B
        </text>

        {/* Bottom display info */}
        <text
          x="150"
          y="255"
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="currentColor"
          className="opacity-90 font-sans tracking-wide text-gray-800 dark:text-gray-100"
        >
          Kecocokan: {Math.round(currentScore * 10) / 10}% (cos &theta; = {similarity.toFixed(3)})
        </text>
      </svg>
    </div>
  );
}
