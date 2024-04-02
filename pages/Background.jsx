import React from 'react';

const Background = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(http://localhost:3000/background-img.webp)',
        backgroundColor: 'rgba(255, 255, 255, 0.75)', // Example: White background with 50% opacity
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1 // Ensure the background is behind other content
      }}
    />
  );
};

export default Background;