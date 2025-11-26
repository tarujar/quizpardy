import { useState } from 'react';
import { GAME_RULES, GAME_INFO } from './texts';

interface ControlPanelProps {
  env: 'test' | 'prod';
  onEnvChange: (env: 'test' | 'prod') => void;
  onReset: () => void;
}

const InfoTextBox = ({ title, items }: { title: string; items: string[] }) => (
  <div style={{ marginTop: 'auto', padding: '15px', background: '#333', borderRadius: '6px' }}>
  <div style={{ fontSize: '0.8rem', color: '#ccc' }}>
    <div style={{ marginBottom: '5px' }}>💡 <strong>{title}</strong></div>
    <ul style={{ justifyContent: 'left', textAlign:"left", paddingInlineStart: '20px' }}>
      {items.map((tip) => (
        <li style={{ justifyContent: 'left' }} key={tip}>{tip}</li>
      ))}
    </ul>
  </div>
</div>
)

export function ControlPanel({ env, onEnvChange, onReset }: Readonly<ControlPanelProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
        title="Settings"
      >
        ⚙️
      </button>

      {/* Slide-over panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-300px',
          width: '280px',
          height: '100vh',
          background: '#222',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.3)',
          transition: 'right 0.3s ease-in-out',
          zIndex: 999,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>Settings</h3>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Environment switcher */}
        <div style={{ color: '#fff' }}>
          <div style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#ccc' }}>
            Question Mode:
          </div>
          <button
            onClick={() => onEnvChange(env === 'test' ? 'prod' : 'test')}
            style={{
              width: '100%',
              padding: '12px',
              background: env === 'prod' ? '#28a745' : '#ffc107',
              color: env === 'prod' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {env === 'prod' ? '📋 Production Mode' : '🧪 Test Mode'}
          </button>
          <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>
            {env === 'prod' 
              ? 'Using real questions from CSV file' 
              : 'Using sample/demo questions'
            }
          </div>
        </div>

        {/* Reset button */}
        <div>
          <div style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#ccc' }}>
            Game Controls:
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset the entire game? All progress will be lost.')) {
                onReset();
                setIsOpen(false);
              }
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🔄 Reset Game
          </button>
          <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>
            Clears all players, scores, and used questions
          </div>
        </div>

        {/* Info section */}
        <InfoTextBox title="Tips" items={GAME_INFO} />
        {/* Rules section */}
        <InfoTextBox title="Pelin säännöt" items={GAME_RULES} />
      </div>

      {/* Backdrop overlay when panel is open */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            cursor: 'pointer',
            zIndex: 998,
          }}
          aria-label="Close settings panel"
        />
      )}
    </>
  );
}