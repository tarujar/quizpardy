import type { Question } from './questions';
import { CSV_PARSER_CHARACTER, QUESTIONS_CSV_PATH } from './constants';

// Simple CSV parser that works in the browser
export function parseCSV(csvText: string): Question[] {
  const lines = csvText.trim().split('\n');
  // Skip header row
  const dataLines = lines.slice(1);
  
  const questions: Question[] = [];
  
  for (const [index, line] of dataLines.entries()) {
    const values = parseCSVLine(line);
    if (values.length >= 5) {
      questions.push({
        id: Number.parseInt(values[0], 10) || index + 1,
        category: values[1].trim(),
        value: Number.parseInt(values[2], 10) || 200,
        question: values[3].trim(),
        answer: values[4].trim(),
        mediaUrl: values[5]?.trim() || undefined
      });
    }
  }
  
  return questions;
}

// Simple CSV line parser that handles quoted fields
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === CSV_PARSER_CHARACTER && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Load questions from CSV file
export async function loadQuestionsFromCSV(): Promise<Question[]> {
  try {
    const response = await fetch(QUESTIONS_CSV_PATH.replace(/^\/public\//, '/'));
    if (!response.ok) {
      throw new Error('Failed to load questions.csv');
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.warn('Could not load questions.csv:', error);
    return [];
  }
}