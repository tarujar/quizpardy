import React from 'react';
import type { Question } from './questions';
import { DataErrorDisplay } from './DataErrorDisplay';

interface QuestionBoardProps {
  board: { [cat: string]: Question[] };
  categories: string[];
  prices: number[];
  usedQuestions: number[];
  onQuestionSelect: (question: Question) => void;
}

export function QuestionBoard({
  board,
  categories,
  prices,
  usedQuestions,
  onQuestionSelect,
}: Readonly<QuestionBoardProps>) {
  // Validate board structure
  const errors: string[] = [];
  if (!board || typeof board !== 'object') {
    errors.push('Board data is missing or not an object.');
  }
  categories.forEach(cat => {
    if (!board[cat] || !Array.isArray(board[cat])) {
      errors.push(`Category "${cat}" is missing or not an array in board data.`);
    }
  });

  // Check for missing questions per cell
  const missingCells: Array<{cat: string; price: number}> = [];
  prices.forEach((price, rowIdx) => {
    categories.forEach(cat => {
      const arr = board[cat];
      if (!arr || !arr[rowIdx]) {
        missingCells.push({cat, price});
      }
    });
  });

  if (errors.length > 0 || missingCells.length > 0) {
    return <DataErrorDisplay errors={errors} missingCells={missingCells} />;
  }

  return (
    <table
      className="jeopardy-board"
      style={{
        width: '100vw',
        height: '80vh',
        borderCollapse: 'collapse',
        margin: 0,
        tableLayout: 'fixed',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <thead>
        <tr>
          {categories.map(cat => (
            <th
              key={cat}
              style={{
                fontSize: 'clamp(1rem, 2vw, 2rem)', // responsive font size
                padding: '0.5rem',
                border: '2px solid #333',
                background: '#1e1e1e',
                color: '#fff',
                textTransform: 'uppercase',
                fontFamily: 'Oswald, Arial Narrow, Arial, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.2em',
                wordBreak: 'break-word', // allow long words to break
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
                hyphens: 'auto',
              }}
            >
              {cat}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {prices.map((price, rowIdx) => (
          <tr key={price}>
            {categories.map(cat => {
              const q = board[cat][rowIdx];
              const used = usedQuestions?.includes(q.id);
              return (
                <td key={cat + price} style={{ textAlign: 'center', border: '2px solid #333', padding: '1rem' }}>
                  <button
                    className="question-btn"
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      width: '100%',
                      background: used ? '#444' : '#222',
                      color: used ? '#888' : '#ffd700',
                      border: 'none',
                      padding: '1rem',
                      cursor: used ? 'not-allowed' : 'pointer',
                      textDecoration: used ? 'line-through' : 'none',
                    }}
                    onClick={() => !used && onQuestionSelect(q)}
                    disabled={used}
                  >
                    {price}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}