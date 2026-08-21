import type { Participant, Quiz } from "../types";
import api from "./api";

export const quizService = {
  create: async (data: {
    title: string;
    description?: string;
    questions: { text: string; rating: number }[];
  }): Promise<Quiz> => {
    const response = await api.post<Quiz>("/quizzes", data);
    return response.data;
  },

  getById: async (id: string): Promise<Quiz> => {
    const response = await api.get<Quiz>(`/quizzes/${id}`);
    return response.data;
  },

  getMyQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>("/quizzes/my");
    return response.data;
  },
  // 4. Mengirimkan Jawaban Partisipan (POST /quizzes/:id/submit)
  submit: async (
    quizId: string,
    name: string,
    answers: { questionId: string; value: number }[],
  ): Promise<any> => {
    const response = await api.post(`/quizzes/${quizId}/submit`, {
      name,
      answers,
    });
    return response.data;
  },

  getSubmissions: async (quizId: string): Promise<Participant[]> => {
    const response = await api.get<Participant[]>(
      `/quizzes/${quizId}/submissions`,
    );
    return response.data;
  },
};
