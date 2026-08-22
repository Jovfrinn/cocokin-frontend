import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Card from "../components/Card";
import { Input } from "../components/Input";
import Button from "../components/Button";
import RatingSlider from "../components/RatingSlider";
import { mockStorage } from "../services/mockData";
import type { Quiz, Question } from "../types";
import { quizService } from "../services/quizService";

export default function CreateQuizPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Write questions, Step 2: Answer them

  const [title, setTitle] = useState("Seberapa Sefrekuensi Kita?");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      text: "Lebih suka menghabiskan malam minggu di cafe santai daripada clubbing.",
    },
    {
      id: "q2",
      text: "Nonton film di bioskop lebih seru dibanding streaming sendirian di rumah.",
    },
    {
      id: "q3",
      text: "Lebih suka liburan naik gunung/alam daripada jalan-jalan ke mall.",
    },
    {
      id: "q4",
      text: "Komunikasi intens tiap hari lebih penting dibanding ngobrol sesekali.",
    },
    {
      id: "q5",
      text: "Membagi tagihan kencan pertama secara adil (split bill) adalah hal yang wajib.",
    },
  ]);

  const [newQuestionText, setNewQuestionText] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Authentication check
  const currentUserJson = localStorage.getItem("currentUser");
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    setQuestions([
      ...questions,
      { id: `q-${Date.now()}`, text: newQuestionText.trim() },
    ]);
    setNewQuestionText("");
    setErrorMsg(null);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length <= 5) {
      setErrorMsg("Kuisioner harus berisi minimal 5 pertanyaan.");
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleNextStep = () => {
    if (!title.trim()) {
      setErrorMsg("Judul kuisioner wajib diisi.");
      return;
    }
    if (questions.length < 5) {
      setErrorMsg("Tulis minimal 5 pertanyaan sebelum lanjut.");
      return;
    }
    // Initialize rating for step 2 if not defined
    const prepared = questions.map((q) => ({
      ...q,
      rating: q.rating || 3, // Default to neutral (3)
    }));
    setQuestions(prepared);
    setErrorMsg(null);
    setStep(2);
  };

  const handleCreatorRatingChange = (id: string, val: number) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, rating: val } : q)),
    );
  };

  const handleSubmit = async () => {
    try {
      await quizService.create({
        title: title.trim(),
        questions: questions.map((q) => ({
          text: q.text,
          rating: q.rating || 3,
        })),
      });

      navigate("/dashboard");
    } catch (err: any) {
      if (err.response) {
        setErrorMsg(err.response.data.message || "Gagal membuat kuisioner");
      } else {
        setErrorMsg("Terjadi kesalahan");
      }
    }
  };

  const handleEditQuestionText = (id: string, newText: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: newText } : q)),
    );
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 py-4">
      {/* Back to Dashboard link */}
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose transition-colors cursor-pointer"
        >
          <Icon icon="solar:arrow-left-outline" className="w-4 h-4" />
          Kembali ke Dashboard
        </button>
      </div>

      {/* Title section */}
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-light text-romantic-text dark:text-romantic-dark-text">
          Inisialisasi Vektor Preferensi
        </h1>
        <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted font-sans">
          {step === 1
            ? "Tulis 5 pertanyaan atau lebih yang ingin kamu tanyakan ke orang lain."
            : "Sekarang, jawablah pertanyaan-pertanyaan ini sebagai acuan kecocokan."}
        </p>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-semibold flex items-center gap-2 border border-red-100 dark:border-red-950/50">
          <Icon
            icon="solar:danger-bold-duotone"
            className="w-4 h-4 shrink-0 text-red-500"
          />
          {errorMsg}
        </div>
      )}

      {/* Step 1: Create Questions */}
      {step === 1 ? (
        <Card className="flex flex-col gap-6">
          <Input
            label="Judul Ruang Uji"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Seberapa sefrekuensi kita dalam kencan?"
          />

          <div className="flex flex-col gap-4 border-t border-romantic-border dark:border-romantic-dark-border pt-6">
            <h3 className="text-[11px] font-bold text-romantic-muted dark:text-romantic-dark-muted font-mono tracking-widest uppercase">
              Daftar Pertanyaan ({questions.length})
            </h3>

            <div className="flex flex-col gap-3">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-romantic-bg/60 dark:bg-romantic-dark-card/40 border border-romantic-border dark:border-romantic-dark-border"
                >
                  <span className="text-xs font-mono font-bold text-romantic-rose dark:text-romantic-dark-rose">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) =>
                      handleEditQuestionText(q.id, e.target.value)
                    }
                    className="flex-grow text-xs font-bold text-romantic-text dark:text-romantic-dark-text font-sans bg-transparent border-b border-transparent hover:border-romantic-border focus:border-romantic-rose focus:outline-none px-1 py-0.5 rounded transition-all"
                    placeholder="Tulis pertanyaan..."
                  />
                  <button
                    onClick={() => handleRemoveQuestion(q.id)}
                    className="p-1.5 text-romantic-muted hover:text-red-400 transition-colors cursor-pointer"
                    title="Hapus Pertanyaan"
                  >
                    <Icon
                      icon="solar:trash-bin-trash-bold"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add question form */}
          <div className="flex flex-col sm:flex-row gap-3 border-t border-romantic-border dark:border-romantic-dark-border pt-6">
            <Input
              placeholder="Tulis pertanyaan baru di sini..."
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddQuestion()}
              className="flex-grow"
            />
            <Button
              variant="secondary"
              onClick={handleAddQuestion}
              className="shrink-0"
            >
              <Icon icon="solar:add-circle-bold" className="w-4 h-4 mr-1.5" />
              Tambah
            </Button>
          </div>

          <div className="flex justify-end border-t border-romantic-border dark:border-romantic-dark-border pt-6">
            <Button onClick={handleNextStep}>
              Tetapkan Vektor Acuan
              <Icon
                icon="solar:arrow-right-outline"
                className="w-4 h-4 ml-1.5"
              />
            </Button>
          </div>
        </Card>
      ) : (
        /* Step 2: Answer Questions */
        <Card className="flex flex-col gap-8">
          <div className="p-4 rounded-lg bg-romantic-rose/5 dark:bg-romantic-dark-rose/5 border border-romantic-border dark:border-romantic-dark-border flex items-start gap-2.5">
            <Icon
              icon="solar:info-square-bold-duotone"
              className="w-5 h-5 text-romantic-rose dark:text-romantic-dark-rose shrink-0 mt-0.5"
            />
            <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed font-sans">
              Isilah jawaban Anda sendiri secara jujur. Jawaban Anda akan
              disimpan sebagai acuan/kunci vektor untuk dibandingkan dengan
              jawaban orang lain menggunakan model Cosine Similarity.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="flex flex-col gap-4 p-5 rounded-lg bg-romantic-bg/60 dark:bg-romantic-dark-card/30 border border-romantic-border dark:border-romantic-dark-border"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono font-bold text-romantic-rose dark:text-romantic-dark-rose mt-0.5">
                    Q{idx + 1}.
                  </span>
                  <h4 className="text-xs font-bold text-romantic-text dark:text-romantic-dark-text font-sans leading-relaxed">
                    {q.text}
                  </h4>
                </div>

                <RatingSlider
                  value={q.rating || 3}
                  onChange={(val) => handleCreatorRatingChange(q.id, val)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-romantic-border dark:border-romantic-dark-border pt-6">
            <Button variant="outline" onClick={() => setStep(1)}>
              <Icon
                icon="solar:arrow-left-outline"
                className="w-4 h-4 mr-1.5"
              />
              Revisi Pertanyaan
            </Button>
            <Button onClick={handleSubmit}>
              Terbitkan Koordinat Kita
              <Icon icon="solar:heart-bold" className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
