import React, { useState, useEffect } from 'react';
import type { Question } from './questions';
import { QuestionElement } from './QuestionElement';
import { QuestionBoard } from './QuestionBoard';
import { AnimatedPlayerScore } from './AnimatedPlayerScore';
import { styles } from './style';

export type Player = {
  id: number;
  name: string;
  emoji: string;
  score: number;
};

interface GamePlayProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  selectedQuestion: Question | null;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  usedQuestions: number[];
  setUsedQuestions: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPlayerId: number | null;
  setSelectedPlayerId: React.Dispatch<React.SetStateAction<number | null>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  board: { [cat: string]: Question[] };
  categories: string[];
  prices: number[];
}

export function GamePlay({
  players,
  setPlayers,
  selectedQuestion,
  setSelectedQuestion,
  usedQuestions,
  setUsedQuestions,
  selectedPlayerId,
  setSelectedPlayerId,
  showAnswer,
  setShowAnswer,
  board,
  categories,
  prices,
}: Readonly<GamePlayProps>) {
  // Track score changes for animations
  const [scoreChanges, setScoreChanges] = useState<{ [playerId: number]: number }>({});

  // Clear score change animation after timeout
  useEffect(() => {
    const hasActiveChanges = Object.values(scoreChanges).some(change => change !== 0);
    if (hasActiveChanges) {
      const timer = setTimeout(() => {
        setScoreChanges({});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [scoreChanges]);

  const updatePlayerScore = (playerId: number, scoreChange: number) => {
    setPlayers(ps => ps.map(p => 
      p.id === playerId ? { ...p, score: p.score + scoreChange } : p
    ));
    setScoreChanges(prev => ({ ...prev, [playerId]: scoreChange }));
    setSelectedPlayerId(null);
  };
  return (
    <div className="jeopardy-container" style={{  display:"flex", flexDirection:"column", gap: '1rem',  }}>
    
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: '1rem' }}>
        {players.map(p => (
          <AnimatedPlayerScore 
            key={p.id} 
            player={p} 
            scoreChange={scoreChanges[p.id] || 0}
          />
        ))}
      </div>
      {selectedQuestion === null ? (
        <QuestionBoard
          board={board}
          categories={categories}
          prices={prices}
          usedQuestions={usedQuestions}
          onQuestionSelect={setSelectedQuestion}
        />
      ) : (
        <div className="question-view" style={{ textAlign: 'center', marginTop: '2rem', backgroundColor:"#444", padding:"2rem", borderRadius: 12 }}>
          <QuestionElement question={selectedQuestion} />
          {!showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              style={styles.goldButton}
            >
              Show Answer
            </button>
          )}
          {showAnswer && (
            <>
              <div className="answer" style={{ fontSize: '4rem', fontWeight:600, color: '#0ae53dff', margin: '1rem 0' }}>
                 {selectedQuestion.answer}
              </div>
              <div style={{ margin: '2rem 0' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Valitse pelaaja jonka pisteisiin vaikutetaan:</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                  {players.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlayerId(p.id)}
                      style={styles.playerButton(selectedPlayerId === p.id)}
                    >
                      {p.emoji} {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: '1rem' }}>
                <button
                  onClick={() => {
                    if (selectedPlayerId !== null) {
                      updatePlayerScore(selectedPlayerId, selectedQuestion.value);
                    }
                  }}
                  style={styles.awardButton}
                  disabled={selectedPlayerId === null}
                >
                  + {selectedQuestion.value}
                </button>
                <button
                  onClick={() => {
                    if (selectedPlayerId !== null) {
                      updatePlayerScore(selectedPlayerId, -selectedQuestion.value);
                    }
                  }}
                  style={styles.deductButton}
                  disabled={selectedPlayerId === null}
                >
                  - {selectedQuestion.value}
                </button>
              </div>
            </>
          )}
          <button onClick={() => {
            setSelectedQuestion(null);
            setUsedQuestions((prev) => {
              const updated = selectedQuestion ? [...prev, selectedQuestion.id] : prev;
              return updated;
            });
            setSelectedPlayerId(null);
            setShowAnswer(false);
          }} style={styles.goldButton}>
            Back to Board
          </button>
        </div>
      )}
    </div>
  );
}
