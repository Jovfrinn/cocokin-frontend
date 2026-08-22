import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Card from "../components/Card";
import Button from "../components/Button";
import MatchPercentageBadge from "../components/MatchPercentageBadge";
import EmptyState from "../components/EmptyState";
import Avatar from "../components/Avatar";
import type { Quiz, Participant } from "../types";
import { quizService } from "../services/quizService";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Read current user
  const currentUserJson = localStorage.getItem("currentUser");
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const data = await quizService.getMyQuizzes();
        setQuizzes(data);
        if (data.length > 0) {
          setSelectedQuizId(data[0].id);
        }
      } catch (err) {
        console.error("Gagal mengambil kuis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [navigate]);
  // 2. Ambil list pengisi kuis ketika kuis yang dipilih berubah
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (selectedQuizId) {
        try {
          const data = await quizService.getSubmissions(selectedQuizId);
          setParticipants(data);
        } catch (err) {
          console.error("Gagal mengambil data partisipan:", err);
        }
      } else {
        setParticipants([]);
      }
    };
    fetchSubmissions();
  }, [selectedQuizId]);

  if (!currentUser) return null;

  const handleCopyLink = (quizId: string) => {
    const link = `${window.location.origin}/quiz/${quizId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(quizId);
    setTimeout(() => setCopiedId(null), 2000);
  };


  const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId);

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-romantic-border dark:border-romantic-dark-border pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl font-light text-romantic-text dark:text-romantic-dark-text">
            Halo, {currentUser.full_name}!
          </h1>
          <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted font-sans">
            Kelola ruang uji koordinatmu dan pantau siapa saja yang paling
            sefrekuensi denganmu.
          </p>
        </div>
        <Button onClick={() => navigate("/quiz/create")} className="shrink-0">
          <Icon icon="solar:add-circle-bold" className="w-4 h-4 mr-1.5" />
          Inisialisasi Vektor Baru
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <EmptyState
          title="Belum Ada Vektor Aktif"
          description="Kamu belum memiliki ruang koordinat preferensi. Buat sekarang dan bagikan link koordinatnya untuk menguji keselarasan!"
          actionText="Inisialisasi Vektor Pertama"
          onAction={() => navigate("/quiz/create")}
          className="my-8"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quizzes List (Left Column) */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-romantic-muted dark:text-romantic-dark-muted font-mono tracking-widest uppercase">
              Ruang Koordinat Aktif ({quizzes.length})
            </h3>
            <div className="flex flex-col gap-3">
              {quizzes.map((quiz) => {
                const isSelected = quiz.id === selectedQuizId;
                const respCount = (quiz as any).submissions?.length || 0;
                return (
                  <div
                    key={quiz.id}
                    onClick={() => setSelectedQuizId(quiz.id)}
                    className={`p-5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-romantic-dark-card border-romantic-rose dark:border-romantic-dark-rose shadow-[0_1px_2px_rgba(33,27,44,0.04)]"
                        : "bg-white/50 dark:bg-romantic-dark-card/50 border-romantic-border dark:border-romantic-dark-border hover:border-romantic-rose dark:hover:border-romantic-dark-rose"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-romantic-text dark:text-romantic-dark-text line-clamp-1 font-sans">
                          {quiz.title}
                        </h4>
                        <span className="text-[11px] text-romantic-muted dark:text-romantic-dark-muted font-mono mt-0.5 inline-block">
                          Diaktifkan{" "}
                          {new Date(quiz.createdAt).toLocaleDateString("id-ID")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-t border-romantic-border dark:border-romantic-dark-border pt-3">
                        <span className="text-[11px] font-semibold text-romantic-muted dark:text-romantic-dark-muted flex items-center gap-1.5">
                          <Icon
                            icon="solar:users-group-two-rounded-linear"
                            className="w-4 h-4 text-romantic-rose dark:text-romantic-dark-rose"
                          />
                          {respCount} Resonansi
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(quiz.id);
                          }}
                          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1.5 rounded-md border transition-all cursor-pointer font-mono ${
                            copiedId === quiz.id
                              ? "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:border-green-900/50"
                              : "bg-transparent border-romantic-rose/30 text-romantic-rose hover:bg-romantic-rose/5 dark:border-romantic-dark-rose/30 dark:text-romantic-dark-rose"
                          }`}
                        >
                          {copiedId === quiz.id ? "Copied!" : "Salin Link"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiz Results Panel (Right Column) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-romantic-muted dark:text-romantic-dark-muted font-mono tracking-widest uppercase">
              Matriks Analisis Resonansi
            </h3>

            {selectedQuiz && (
              <Card className="flex flex-col gap-6">
                <div>
                  <h2 className="font-serif text-2xl font-light text-romantic-text dark:text-romantic-dark-text">
                    {selectedQuiz.title}
                  </h2>
                  <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted mt-1.5 font-sans leading-relaxed">
                    Bagikan tautan berikut agar orang lain bisa memetakan
                    vektornya:{" "}
                    <span className="underline select-all text-romantic-rose dark:text-romantic-dark-rose font-mono font-semibold break-all">
                      {window.location.origin}/quiz/{selectedQuiz.id}
                    </span>
                  </p>
                </div>

                <div className="border-t border-romantic-border dark:border-romantic-dark-border pt-6">
                  {participants.length === 0 ? (
                    <EmptyState
                      icon="solar:users-group-two-rounded-bold-duotone"
                      title="Belum Ada Resonansi"
                      description="Belum ada orang yang memetakan vektornya di ruang ini. Sebarkan tautan koordinatmu untuk melihat hasil!"
                      actionText="Salin Link Koordinat"
                      onAction={() => handleCopyLink(selectedQuiz.id)}
                    />
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="text-[11px] font-bold text-romantic-muted dark:text-romantic-dark-muted font-mono uppercase tracking-widest pl-1">
                        Daftar Penyelarasan ({participants.length})
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {participants.map((participant) => (
                          <div
                            key={participant.id}
                            className="p-4 rounded-lg bg-romantic-bg/60 dark:bg-romantic-dark-card/40 border border-romantic-border dark:border-romantic-dark-border flex items-center justify-between gap-3 hover:border-romantic-rose dark:hover:border-romantic-dark-rose transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar name={participant.name} size="sm" />
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-romantic-text dark:text-romantic-dark-text font-sans">
                                  {participant.name}
                                </span>
                                <span className="text-[11px] text-romantic-muted dark:text-romantic-dark-muted font-mono">
                                  {new Date(
                                    participant.submittedAt,
                                  ).toLocaleDateString("id-ID")}
                                  {participant.location && ` • ${participant.location}`}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1.5">
                              <MatchPercentageBadge score={participant.score} />
                              <button
                                onClick={() =>
                                  navigate(
                                    `/match/${selectedQuiz.id}?participantId=${participant.id}`,
                                  )
                                }
                                className="text-[11px] font-semibold text-romantic-rose hover:text-romantic-rose-hover dark:text-romantic-dark-rose dark:hover:text-romantic-dark-rose-hover flex items-center gap-0.5 uppercase tracking-wider cursor-pointer font-mono"
                              >
                                Analisis
                                <Icon
                                  icon="solar:arrow-right-outline"
                                  className="w-3.5 h-3.5"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
