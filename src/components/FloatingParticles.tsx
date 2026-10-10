import React from 'react';

export const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Very subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-rose-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
};
