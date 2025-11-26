export type Question = {
  id: number;
  category: string;
  value: number;
  question: string;
  answer: string;
  mediaUrl?: string;
};

export const categories = [
'Musiikkia discosta', 'Tunnetuimmat tanssikipaleet', 'Yleistietoa', 'Ei liity mitenkään musiikkiin', '90 luku', 'Musiikin tekniikkaa'
];

export const prices = [200, 400, 600, 800, 1000];

export const sampleQuestions: Question[] = categories.flatMap((cat, catIdx) =>
  prices.map((price, qIdx) => ({
    id: catIdx * 10 + qIdx,
    category: cat,
    value: price,
    question: `Sample question for ${cat} (${price} points)`,
    answer: `Sample answer for ${cat} (${price} points)`,
    mediaUrl: catIdx === 0 && qIdx === 0 ? '/audio/sample.mp3' : undefined,
  }))
);


// Fallback hardcoded questions (used if CSV fails to load)
const fallbackQuestions: Question[] = [
  {
    id: 1,
    category: 'Musiikkia discosta',
    value: 200,
    question: 'Tämä on testi kysymys jossa musiikkitiedosto',
    answer: 'Tässä on testi vastaus',
    mediaUrl: '/assets/game_over.wav'
  },
  // Add more fallback questions here if needed...
];

// This will be populated at runtime from CSV or fallback
let prodQuestions: Question[] = [];
let prodCategories: string[] = [];

export async function initializeQuestions(): Promise<Question[]> {
  try {
    const { loadQuestionsFromCSV } = await import('./questionImporter');
    const csvQuestions = await loadQuestionsFromCSV();
    if (csvQuestions.length > 0) {
      prodQuestions = csvQuestions;
      prodCategories = Array.from(new Set(csvQuestions.map(q => q.category)));
      return prodQuestions;
    }
  } catch (error) {
    console.warn('Failed to load CSV questions, using fallback:', error);
  }
  // Fallback: use hardcoded questions + samples
  const requiredCount = categories.length * prices.length;
  if (fallbackQuestions.length < requiredCount) {
    const prodKey = (q: Question) => `${q.category}-${q.value}`;
    const existingKeys = new Set(fallbackQuestions.map(prodKey));
    const missing = sampleQuestions.filter(q => !existingKeys.has(prodKey(q))).slice(0, requiredCount - fallbackQuestions.length);
    prodQuestions = [...fallbackQuestions, ...missing];
  } else {
    prodQuestions = fallbackQuestions;
  }
  prodCategories = [...categories];
  return prodQuestions;
}

export function getProdCategories(): string[] {
  return prodCategories.length > 0 ? prodCategories : categories;
}

// Synchronous getter for components (call initializeQuestions() first!)
export function getProdQuestions(): Question[] {
  return prodQuestions;
}

export { prodQuestions };