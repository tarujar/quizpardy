import React from 'react';

const emojiList = [
  // Food
  '🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🥞', '🧇',
  '🍳', '🥚', '🧀', '🥨', '🥯', '🥗', '🥙', '🧆',
  '🍣', '🍤', '🍱', '🍛', '🍜', '🍝', '🍚', '🍙',
  '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🧁', '🍰',
  '🍫', '🍬', '🍭', '🍮', '🍯', '🥜', '🌰', '🥥',
  // Animals
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
  '🐧', '🐦', '🐤', '🦆', '🦉', '�', '🐺', '🐗',
  '🐴', '🦄', '🐌', '🐞', '🐢',
  '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', '🦀', '🐠',
  '🐟', '🐬', '🐳', '🦈', '🐊', '🐅', '🐆', '🐘',
  '🦏', '🦛', '🦒',  '🦥', '🦦',  '🦔',
  // Other fun
  '🦩', '🤖', '🎃', '🦕', '🦖', '🦩',
  '🦚', '🦜', '🦢', '🦔',
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😙', '😚', '😋', '😜', '🤪', '😝',
  '🤑', '🤗', '🤩', '🥳', '😎', '🤓', '🧐', '😏',
  '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
  '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨',
  '😰', '😥', '😓', '🤔', '🤭', '🤫', '🤥', '😶',
];

export type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
  onClose?: () => void;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 16px #0003', maxWidth: 400 }}>
        <h3 style={{ marginBottom: 16 }}>Select an Emoji</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
          {emojiList.map(emoji => (
            <button
              key={emoji}
              style={{ fontSize: '2rem', padding: 8, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => { onSelect(emoji); if (onClose) onClose(); }}
            >
              {emoji}
            </button>
          ))}
        </div>
        {onClose && (
          <button style={{ marginTop: 16, fontSize: '1rem', padding: '0.5rem 1.5rem', borderRadius: 8, border: 'none', background: '#eee', cursor: 'pointer' }} onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
