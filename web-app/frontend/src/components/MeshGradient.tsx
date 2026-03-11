import React from 'react';

export function MeshGradient() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Primary purple orb */}
            <div
                className="absolute animate-pulse-glow"
                style={{
                    top: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '600px',
                    background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Cyan orb - top right */}
            <div
                className="absolute animate-pulse-glow"
                style={{
                    top: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animationDelay: '2s',
                }}
            />

            {/* Purple orb - bottom left */}
            <div
                className="absolute animate-pulse-glow"
                style={{
                    bottom: '20%',
                    left: '5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    animationDelay: '4s',
                }}
            />

            {/* Amber accent - bottom right */}
            <div
                className="absolute animate-pulse-glow"
                style={{
                    bottom: '30%',
                    right: '15%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animationDelay: '1s',
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px',
                }}
            />
        </div>
    );
}

