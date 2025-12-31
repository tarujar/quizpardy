import { useState, useEffect } from 'react';
import './App.css';
import type { Question } from './questions';
import { prices, initializeQuestions, getProdCategories } from './questions';
import { GameInit } from './GameInit';
import { GamePlay, type Player } from './GamePlay';
import { ControlPanel } from './ControlPanel';



function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

function App() {
  const [env, setEnv] = useState<'test' | 'prod'>('prod');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [questionsLoaded, setQuestionsLoaded] = useState(false);
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [usedQuestions, setUsedQuestions] = useState<number[]>(() => {
      const savedUsed = getCookie('jeopardy_used');
      if (savedUsed) {
        try {
          return JSON.parse(savedUsed);
        } catch {
          // ignore
        }
      }
      return [];
    });

  // Initialize questions on app startup
  useEffect(() => {
      initializeQuestions().then((questions) => {
        setAllQuestions(questions);
      setQuestionsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const savedPlayers = getCookie('jeopardy_players');
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch {
        // ignore
      }
    }
  }, []);
  useEffect(() => {
    if (players.length > 0) {
      setCookie('jeopardy_players', JSON.stringify(players));
    }
  }, [players]);
  useEffect(() => {
    setCookie('jeopardy_used', JSON.stringify(usedQuestions));
  }, [usedQuestions]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Don't render game until questions are loaded
  if (!questionsLoaded) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>Loading questions...</div>;
  }

  const currentCategories = getProdCategories();
  const board: { [cat: string]: Question[] } = currentCategories.reduce((acc, cat) => {
    acc[cat] = allQuestions.filter((q: Question) => q.category === cat);
    return acc;
  }, {} as { [cat: string]: Question[] });
  const handleReset = () => {
    setPlayers([]);
    setSelectedQuestion(null);
    setUsedQuestions([]);
    setSelectedPlayerId(null);
    setShowAnswer(false);
    setCookie('jeopardy_players', '', -1);
    setCookie('jeopardy_used', '', -1);
  };
  const handleStartGame = (playerInputs: { name: string; emoji: string }[]) => {
    setPlayers(playerInputs.map((input, idx) => ({ id: idx, name: input.name || `Player ${idx + 1}`, emoji: input.emoji || '🙂', score: 0 })));
    setUsedQuestions([]);
    setCookie('jeopardy_used', JSON.stringify([]));
  };
  if (players.length === 0) {
    return <GameInit onStart={handleStartGame} />;
  }
  return (
    <>
    <ControlPanel 
      env={env}
      onEnvChange={setEnv}
      onReset={handleReset}
    />
    <GamePlay
      players={players}
      setPlayers={setPlayers}
      selectedQuestion={selectedQuestion}
      setSelectedQuestion={setSelectedQuestion}
      usedQuestions={usedQuestions}
      setUsedQuestions={setUsedQuestions}
      selectedPlayerId={selectedPlayerId}
      setSelectedPlayerId={setSelectedPlayerId}
      showAnswer={showAnswer}
      setShowAnswer={setShowAnswer}
      board={board}
      categories={currentCategories}
    />
    </>
  );
}

export default App;
