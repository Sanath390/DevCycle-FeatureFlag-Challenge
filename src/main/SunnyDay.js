import React from 'react';
import '../SunnyDay.css';

export const SunnyDay = () => {
  return (
    <div className="sunny-container">
      {/* Sun */}
      <div className="sun"></div>
      
      {/* Birds */}
      {[...Array(5)].map((_, index) => (
        <div key={`bird-${index}`} className="bird-container">
          <div className="bird"></div>
        </div>
      ))}
      
      {/* Clouds */}
      {[...Array(2)].map((_, index) => (
        <div key={`cloud-${index}`} className="cloud"></div>
      ))}
    </div>
  );
};

