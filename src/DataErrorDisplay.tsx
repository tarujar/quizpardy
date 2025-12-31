import React from 'react';

export interface DataErrorDisplayProps {
  errors: string[];
  missingCells: Array<{cat: string; price: number}>;
}

export function DataErrorDisplay({ errors, missingCells }: DataErrorDisplayProps) {
  return (
    <div style={{ color: '#dc3545', background: '#222', padding: '2rem', borderRadius: 8, margin: '2rem auto', maxWidth: 600 }}>
      <h2>Data Error</h2>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
      {missingCells.length > 0 && (
        <div>
          <strong>Missing questions for:</strong>
          <ul>
            {missingCells.map((cell, i) => (
              <li key={i}>{cell.cat} ({cell.price} points)</li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ marginTop: '1rem', color: '#fff' }}>
        Please check your data source (CSV or code) and ensure all categories and prices have a valid question.
      </div>
    </div>
  );
}
