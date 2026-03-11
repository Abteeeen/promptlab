interface QualityScoreRingProps {
    score: number;
    max?: number;
    size?: number;
}

export function QualityScoreRing({ score, size = 48 }: QualityScoreRingProps) {
    const circumference = 2 * Math.PI * ((size - 4) / 2);
    const strokeDashoffset = circumference - (score / 30) * circumference;

    const getScoreColor = (s: number) => {
        if (s >= 26) return '#10b981'; // emerald-500
        if (s >= 20) return '#7c3aed'; // purple-600
        if (s >= 15) return '#f59e0b'; // amber-500
        return '#ef4444'; // red-500
    };
    const getScoreLabel = (s: number) => {
        if (s >= 26) return 'Excellent';
        if (s >= 20) return 'Good';
        if (s >= 15) return 'Okay';
        return 'Needs Work';
    };

    return (
        <div className="flex items-center gap-3">
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    className="quality-ring"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                >
                    <defs>
                        <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="50%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                    </defs>

                    {/* Background ring */}
                    <circle
                        className="quality-ring-circle quality-ring-bg"
                        cx={size / 2}
                        cy={size / 2}
                        r={(size - 4) / 2}
                    />

                    {/* Progress ring */}
                    <circle
                        className="quality-ring-circle quality-ring-fill"
                        cx={size / 2}
                        cy={size / 2}
                        r={(size - 4) / 2}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset,
                        }}
                    />
                </svg>

                {/* Score text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color: getScoreColor(score) }}>
                        {score}
                    </span>
                </div>
            </div>

            <div className="flex flex-col">
                <span className="text-xs font-medium text-white/90">{getScoreLabel(score)}</span>
                <span className="text-[10px] text-white/40">/30 score</span>
            </div>
        </div>
    );
}
