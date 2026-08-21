export interface User {
  id?: number;
  full_name: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
}

export interface Question {
  id: string;
  text: string;
  rating?: number; // creator's reference answer (1-5)
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  creatorId: number;
  creatorName?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: number; // 1-5
}

export interface Participant {
  id: string;
  name: string;
  score: number; // match percentage (0 - 100)
  answers: Answer[];
  submittedAt: string;
  ip?: string;
  location?: string;
}

export interface MatchCalculation {
  dotProduct: number;
  magnitudeA: number;
  magnitudeB: number;
  cosineScore: number;
  percentage: number;
}