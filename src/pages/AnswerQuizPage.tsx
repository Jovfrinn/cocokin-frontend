import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Card from "../components/Card";
import { Input } from "../components/Input";
import Button from "../components/Button";
import RatingSlider from "../components/RatingSlider";
import MatchPercentageBadge from "../components/MatchPercentageBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import { mockStorage } from "../services/mockData";
import { calculateCosineSimilarity } from "../utils/math";
import type { Participant, Quiz } from "../types";
import { quizService } from "../services/quizService";

export default function AnswerQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [participantName, setParticipantName] = useState("");
  const [currentIdx, setCurrentIdx] = useState(-1); // -1: Name input, 0 to N-1: Questions, N: Success screen
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [matchResult, setMatchResult] = useState<number | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);

  // Fetch Quiz
  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        try {
          const data = await quizService.getById(id);
          setQuiz(data);
        } catch (error) {
          console.error(error);
          setQuiz(null);
        } finally {
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!quiz) {
    return (
      <div className="max-w-md mx-auto py-12 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center">
          <Icon icon="solar:shield-warning-bold-duotone" className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-romantic-text dark:text-romantic-dark-text">
          Ruang Uji Tidak Ditemukan
        </h2>
        <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted">
          Link kuisioner ini mungkin salah atau ruang uji telah dihapus.
        </p>
        <Button onClick={() => navigate("/")} className="mt-2">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  const handleStart = () => {
    if (!participantName.trim()) return;
    setCurrentIdx(0);
  };

  const handleAnswerChange = (questionId: string, val: number) => {
    setAnswers({
      ...answers,
      [questionId]: val,
    });
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleSubmitAnswers();
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      setCurrentIdx(-1);
    }
  };

  const handleSubmitAnswers = async () => {
    setSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(([qId, val]) => ({
        questionId: qId,
        value: val,
      }));

      const result = await quizService.submit(
        quiz.id,
        participantName.trim(),
        formattedAnswers,
      );

      setMatchResult(result.score);
      setParticipantId(result.id);
      setCurrentIdx(quiz.questions.length);
    } catch (err) {
      console.error("Gagal mengirim jawaban:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent =
    currentIdx >= 0
      ? Math.round(((currentIdx + 1) / quiz.questions.length) * 100)
      : 0;

  // Render Step 0: Name Screen
  if (currentIdx === -1) {
    return (
      <div className="max-w-md mx-auto py-8">
        <Card className="p-8 flex flex-col gap-6 relative overflow-hidden">
                    <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-romantic-rose/10 dark:bg-romantic-dark-rose/15 flex items-center justify-center text-romantic-rose dark:text-romantic-dark-rose">
              <Icon icon="solar:heart-lock-bold-duotone" className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-light text-romantic-text dark:text-romantic-dark-text mt-2">
              Ukur Resonansi Vektor
            </h2>
            <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed">
              Kamu akan menyelaraskan frekuensi pada ruang uji{" "}
              <strong>"{quiz.title}"</strong> yang dirancang oleh{" "}
              <strong>{quiz.creatorName || "Seseorang"}</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-romantic-border dark:border-romantic-dark-border pt-6">
            <Input
              label="Siapa namamu?"
              placeholder="Anonim..."
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
            />

            <Button
              onClick={handleStart}
              disabled={!participantName.trim()}
              className="w-full"
            >
              Masuki Ruang Uji
              <Icon icon="solar:play-bold" className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Render Step N: Success / Results Screen
  if (currentIdx === quiz.questions.length && matchResult !== null) {
    return (
      <div className="max-w-md mx-auto py-8">
        <Card className="p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-romantic-rose/10 dark:bg-romantic-dark-rose/15 flex items-center justify-center text-romantic-rose dark:text-romantic-dark-rose">
            <Icon
              icon="solar:emoji-funny-bold-duotone"
              className="w-8 h-8 animate-bounce"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl font-light text-romantic-text dark:text-romantic-dark-text">
              Vektor Terkorelasi!
            </h2>
            <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted">
              Data jawabanmu telah berhasil dipetakan ke dalam model referensi{" "}
              {quiz.creatorName || "Pembuat"}.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-semibold font-mono uppercase tracking-widest text-romantic-muted dark:text-romantic-dark-muted">
              Kecocokan Spasial
            </span>
            <MatchPercentageBadge
              score={matchResult}
              className="text-lg py-2.5 px-6 font-extrabold"
            />
          </div>

          <div className="border-t border-romantic-border dark:border-romantic-dark-border w-full pt-6 flex flex-col gap-3">
            <Button
              onClick={() =>
                navigate(`/match/${quiz.id}?participantId=${participantId}`)
              }
              className="w-full"
            >
              Bedah Sudut & Matriks
              <Icon icon="solar:chart-bold" className="w-4 h-4 ml-1.5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              Buat Ruang Uji Baru
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Render Question Answering Step
  const currentQuestion = quiz.questions[currentIdx];
  const currentValue = answers[currentQuestion.id] || 3;

  return (
    <div className="max-w-2xl mx-auto py-4 flex flex-col gap-6">
      {/* Progress Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[11px] font-semibold font-mono text-romantic-muted dark:text-romantic-dark-muted uppercase tracking-widest">
          <span>
            Dimensi {currentIdx + 1} dari {quiz.questions.length}
          </span>
          <span>{progressPercent}% Penyelarasan</span>
        </div>
        <div className="w-full h-1.5 bg-romantic-rose/10 dark:bg-romantic-dark-rose/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-romantic-rose to-romantic-clay dark:from-romantic-dark-rose dark:to-romantic-dark-clay transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      {submitting ? (
        <Card className="p-8">
          <LoadingSpinner className="my-8" />
        </Card>
      ) : (
        <Card className="p-8 flex flex-col gap-8 relative">
          <div className="flex items-start gap-3">
            <span className="text-xs font-mono font-bold text-romantic-rose dark:text-romantic-dark-rose mt-0.5">
              Q{currentIdx + 1}.
            </span>
            <h3 className="text-sm font-bold text-romantic-text dark:text-romantic-dark-text font-sans leading-relaxed">
              {currentQuestion.text}
            </h3>
          </div>

          <div className="py-4 border-t border-b border-romantic-border dark:border-romantic-dark-border">
            <RatingSlider
              value={currentValue}
              onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleBack}>
              <Icon
                icon="solar:arrow-left-outline"
                className="w-4 h-4 mr-1.5"
              />
              Kembali
            </Button>

            <Button onClick={handleNext}>
              {currentIdx === quiz.questions.length - 1 ? (
                <>
                  Kirim Koordinat Vektor
                  <Icon icon="solar:heart-bold" className="w-4 h-4 ml-1.5" />
                </>
              ) : (
                <>
                  Lanjut
                  <Icon
                    icon="solar:arrow-right-outline"
                    className="w-4 h-4 ml-1.5"
                  />
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
