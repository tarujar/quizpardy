import { useState, useEffect } from 'react';
import type { Player } from './GamePlay';
import { styles } from './style';

interface AnimatedPlayerScoreProps {
  player: Player;
  scoreChange?: number;
}

export function AnimatedPlayerScore({ player, scoreChange }: Readonly<AnimatedPlayerScoreProps>) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationValue, setAnimationValue] = useState(0);
  const [highlightCard, setHighlightCard] = useState(false);

  useEffect(() => {
    if (scoreChange && scoreChange !== 0) {
      setAnimationValue(scoreChange);
      setShowAnimation(true);
      setHighlightCard(true);

      // Hide animation after 2 seconds
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setAnimationValue(0);
        setHighlightCard(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [scoreChange]);

  const getCardStyle = () => {
    if (highlightCard) {
      return styles.playerCardHighlighted((scoreChange || 0) > 0);
    }
    return styles.playerCard;
  };

  return (
    <div style={getCardStyle()}>
      <div style={{ fontSize: '2rem' }}>{player.emoji}</div>
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{player.name}</div>
      <div style={{ fontSize: '1.2rem', color: '#ffd700', position: 'relative' }}>
        Score: {player.score}

        {/* Animated score change */}
        {showAnimation && (
          <div
            style={{
              ...styles.scoreAnimation,
              ...(animationValue > 0 ? styles.scoreAnimationPositive : styles.scoreAnimationNegative),
            }}
          >
            {animationValue > 0 ? '+' : ''}{animationValue}
          </div>
        )}
      </div>

      {/* CSS animation styles */}
      <style>{`
        @keyframes scoreChange {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) translateY(-20px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-40px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}