import React from 'react';

export const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Midnight Blue & Sapphire ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-blue-600/[0.14] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/[0.16] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-sky-500/[0.10] blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/[0.06] blur-[140px] rounded-full pointer-events-none" />
    </div>
  );
};
