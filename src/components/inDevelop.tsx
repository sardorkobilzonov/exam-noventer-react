import React from 'react';
import { FaTools } from 'react-icons/fa';

const UnderConstruction: React.FC = () => {
  return (
    <div
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
        borderRadius: '16px',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        maxWidth: 600,
        margin: '80px auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '20px', color: '#00e5ff' }}>
        <FaTools />
      </div>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Sahifa ishlab chiqilmoqda</h1>
      <p style={{ fontSize: '16px', opacity: 0.85 }}>
        Ushbu sahifa hozirda tayyorlanmoqda. Tez orada barcha funksiyalarni ishlatishingiz mumkin bo‘ladi.
      </p>
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default UnderConstruction;
