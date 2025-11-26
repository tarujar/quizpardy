import { useState } from 'react';
import { EmojiPicker } from './EmojiPicker';
import { styles } from './style';
import { MAX_PLAYER_COUNT, DEFAULT_PLAYER_COUNT } from './constants';

interface InitProps {
  onStart: (players: { name: string; emoji: string }[]) => void;
  defaultPlayerCount?: number;
}

export function GameInit({ onStart, defaultPlayerCount = DEFAULT_PLAYER_COUNT }: Readonly<InitProps>) {
  const [playerCount, setPlayerCount] = useState(defaultPlayerCount);
  const [playerInputs, setPlayerInputs] = useState<{ name: string; emoji: string }[]>(Array.from({ length: defaultPlayerCount }, () => ({ name: '', emoji: '' })));
  const [emojiPickerOpenIdx, setEmojiPickerOpenIdx] = useState<number | null>(null);

  const handlePlayerInputChange = (idx: number, field: 'name' | 'emoji', value: string) => {
    setPlayerInputs(inputs => inputs.map((input, i) => i === idx ? { ...input, [field]: value } : input));
  };
  const handleEmojiSelect = (idx: number, emoji: string) => {
    handlePlayerInputChange(idx, 'emoji', emoji);
    setEmojiPickerOpenIdx(null);
  };
  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayerInputs(inputs => {
      const arr = [...inputs];
      while (arr.length < count) arr.push({ name: '', emoji: '' });
      return arr.slice(0, count);
    });
  };

  return (
    <div className="init-view" style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#222', borderRadius: 16, color: '#fff' }}>
      <h2 style={{ marginBottom: '1rem' }}>Set Up Players</h2>
      <label style={{ fontSize: '1.2rem' }}>
        Number of players:
        <select
          value={playerCount}
          onChange={e => handlePlayerCountChange(Number(e.target.value))}
          className="player-count-select"
          style={styles.playerCountSelect}
        >
          {Array.from({ length: MAX_PLAYER_COUNT - 1 }, (_, i) => i + 2).map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <div style={{ marginTop: '1.5rem' }}>
        {playerInputs.map((input, idx) => (
          <div key={`player-input-${idx}`} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setEmojiPickerOpenIdx(idx)}
              aria-label="Select emoji"
            >
              {input.emoji || '🙂'}
            </button>
            <input
              type="text"
              placeholder={`Player ${idx + 1} name`}
              value={input.name}
              onChange={e => handlePlayerInputChange(idx, 'name', e.target.value)}
              style={{ fontSize: '1.2rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #888', width: 120 }}
            />
            {emojiPickerOpenIdx === idx && (
              <EmojiPicker onSelect={emoji => handleEmojiSelect(idx, emoji)} onClose={() => setEmojiPickerOpenIdx(null)} />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => onStart(playerInputs)}
        style={styles.goldButton}
      >
        Start Game
      </button>
    </div>
  );
}
