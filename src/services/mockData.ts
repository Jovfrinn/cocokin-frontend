import type { Quiz, Participant } from "../types";

const INITIAL_QUIZZES: Quiz[] = [
  {
    id: "quiz-love-1",
    title: "Seberapa Sefrekuensi Kita?",
    description: "Kuisioner santai untuk menguji kecocokan hobi, visi kencan, dan preferensi komunikasi kita.",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    creatorId: 1,
    creatorName: "Ahmad",
    questions: [
      { id: "q1", text: "Lebih suka menghabiskan malam minggu di cafe santai daripada clubbing.", rating: 5 },
      { id: "q2", text: "Nonton film di bioskop lebih seru dibanding streaming sendirian di rumah.", rating: 4 },
      { id: "q3", text: "Lebih suka liburan naik gunung/alam daripada jalan-jalan ke mall.", rating: 5 },
      { id: "q4", text: "Komunikasi intens tiap hari lebih penting dibanding ngobrol sesekali.", rating: 3 },
      { id: "q5", text: "Membagi tagihan kencan pertama secara adil (split bill) adalah hal yang wajib.", rating: 4 }
    ]
  }
];

const INITIAL_PARTICIPANTS: Record<string, Participant[]> = {
  "quiz-love-1": [
    {
      id: "part-1",
      name: "Siti Nur",
      score: 96.5,
      submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
      answers: [
        { questionId: "q1", value: 5 },
        { questionId: "q2", value: 4 },
        { questionId: "q3", value: 4 },
        { questionId: "q4", value: 3 },
        { questionId: "q5", value: 5 }
      ]
    },
    {
      id: "part-2",
      name: "Rian",
      score: 84.2,
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
      answers: [
        { questionId: "q1", value: 4 },
        { questionId: "q2", value: 3 },
        { questionId: "q3", value: 5 },
        { questionId: "q4", value: 5 },
        { questionId: "q5", value: 3 }
      ]
    },
    {
      id: "part-3",
      name: "Dewi",
      score: 62.8,
      submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
      answers: [
        { questionId: "q1", value: 2 },
        { questionId: "q2", value: 1 },
        { questionId: "q3", value: 3 },
        { questionId: "q4", value: 2 },
        { questionId: "q5", value: 1 }
      ]
    }
  ]
};

export const mockStorage = {
  getQuizzes: (): Quiz[] => {
    const data = localStorage.getItem("mock_quizzes");
    if (!data) {
      localStorage.setItem("mock_quizzes", JSON.stringify(INITIAL_QUIZZES));
      return INITIAL_QUIZZES;
    }
    return JSON.parse(data);
  },
  
  saveQuiz: (quiz: Quiz) => {
    const quizzes = mockStorage.getQuizzes();
    quizzes.unshift(quiz); // Newest first
    localStorage.setItem("mock_quizzes", JSON.stringify(quizzes));
  },
  
  getQuizById: (id: string): Quiz | undefined => {
    const quizzes = mockStorage.getQuizzes();
    return quizzes.find((q) => q.id === id);
  },
  
  getParticipants: (quizId: string): Participant[] => {
    const data = localStorage.getItem(`mock_participants_${quizId}`);
    if (!data) {
      const initial = INITIAL_PARTICIPANTS[quizId] || [];
      localStorage.setItem(`mock_participants_${quizId}`, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },
  
  saveParticipant: (quizId: string, participant: Participant) => {
    const participants = mockStorage.getParticipants(quizId);
    participants.push(participant);
    localStorage.setItem(`mock_participants_${quizId}`, JSON.stringify(participants));
  }
};
