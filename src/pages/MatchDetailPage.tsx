import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import Card from "../components/Card";
import Button from "../components/Button";
import MatchPercentageBadge from "../components/MatchPercentageBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import VectorAngleVisualizer from "../components/VectorAngleVisualizer";
import { mockStorage } from "../services/mockData";
import { calculateCosineSimilarity } from "../utils/math";
import type { Quiz, Participant, MatchCalculation } from "../types";
import { quizService } from "../services/quizService";

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const participantId = searchParams.get("participantId");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [mathData, setMathData] = useState<MatchCalculation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMath, setShowMath] = useState(false);

  useEffect(() => {
    if (id && participantId) {
      const fetchData = async () => {
        try {
          // 1. Ambil detail kuis dari backend
          const qData = await quizService.getById(id);
          setQuiz(qData);

          // 2. Ambil list submission kuis dari backend
          const pList = await quizService.getSubmissions(id);
          // Cari partisipan spesifik berdasarkan ID
          const pData = pList.find((p) => p.id === participantId);

          if (pData) {
            setParticipant(pData);

            // 3. Rekalkulasi matriks spasial untuk visualisasi
            const vectorA = qData.questions.map((q) => q.rating || 3);
            const vectorB = qData.questions.map(
              (q) =>
                pData.answers.find((a) => a.questionId === q.id)?.value || 3,
            );
            const calc = calculateCosineSimilarity(vectorA, vectorB);
            setMathData(calc);
          }
        } catch (err) {
          console.error("Gagal memuat detail kecocokan:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, participantId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!quiz || !participant || !mathData) {
    return (
      <div className="max-w-md mx-auto py-12 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center">
          <Icon icon="solar:shield-warning-bold-duotone" className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-romantic-text dark:text-romantic-dark-text">
          Detail Hasil Tidak Ditemukan
        </h2>
        <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted">
          Data pencocokan tidak valid atau sudah dihapus.
        </p>
        <Button onClick={() => navigate("/dashboard")} className="mt-2">
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  // Prepare radar chart data
  const chartData = quiz.questions.map((q, idx) => {
    const creatorVal = q.rating || 3;
    const participantVal =
      participant.answers.find((a) => a.questionId === q.id)?.value || 3;

    return {
      subject: `Q${idx + 1}`,
      [quiz.creatorName || "Pembuat"]: creatorVal,
      [participant.name]: participantVal,
      fullMark: 5,
    };
  });

  const vectorA = quiz.questions.map((q) => q.rating || 3);
  const vectorB = quiz.questions.map(
    (q) => participant.answers.find((a) => a.questionId === q.id)?.value || 3,
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 py-4">
      {/* Navigation and Title */}
      <div className="flex flex-col gap-4">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose transition-colors cursor-pointer"
          >
            <Icon icon="solar:arrow-left-outline" className="w-4 h-4" />
            Kembali ke Dashboard
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl font-light text-romantic-text dark:text-romantic-dark-text">
            Analisis Resonansi Spasial
          </h1>
          <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted font-sans">
            Membandingkan arah vektor pemikiran antara{" "}
            <strong>{quiz.creatorName}</strong> dan{" "}
            <strong>{participant.name}</strong>.
          </p>
        </div>
      </div>

      {/* Overview Percentage Card & Angle Visualizer */}
      <Card className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 relative overflow-hidden">
        <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
          <span className="text-[11px] font-semibold font-mono uppercase tracking-widest text-romantic-muted dark:text-romantic-dark-muted">
            Tingkat Penyelarasan Vektor
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-romantic-text dark:text-romantic-dark-text">
            {participant.score}%
          </h2>
          <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted font-sans mt-2 leading-relaxed">
            Kedua vektor pikiran Anda berada pada penyelarasan yang sangat
            tinggi, dihitung melalui fungsi dot product ternormalisasi.
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <MatchPercentageBadge
              score={participant.score}
              className="py-2.5 px-5 font-bold text-sm"
            />
          </div>
        </div>

        <div className="flex-shrink-0 w-full max-w-[200px] flex justify-center">
          <VectorAngleVisualizer score={participant.score} size={200} />
        </div>
      </Card>

      {/* Visual Chart Card */}
      <Card className="flex flex-col gap-6">
        <h3 className="text-[11px] font-bold text-romantic-muted dark:text-romantic-dark-muted font-mono tracking-widest uppercase border-b border-romantic-border dark:border-romantic-dark-border pb-4">
          Visualisasi Perbandingan Radar (Skala 1-5)
        </h3>

        <div className="w-full h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid
                stroke="var(--color-romantic-border)"
                className="opacity-60 dark:opacity-40"
              />
              <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={11} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 5]}
                tickCount={6}
                stroke="#888"
                fontSize={9}
              />
              <Radar
                name={quiz.creatorName || "Pembuat"}
                dataKey={quiz.creatorName || "Pembuat"}
                stroke="var(--color-romantic-rose)"
                fill="var(--color-romantic-rose)"
                fillOpacity={0.25}
              />
              <Radar
                name={participant.name}
                dataKey={participant.name}
                stroke="var(--color-romantic-clay)"
                fill="var(--color-romantic-clay)"
                fillOpacity={0.3}
              />
              <Tooltip />
              <Legend
                wrapperStyle={{ fontSize: "11px", fontFamily: "sans-serif" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Question Table Breakdown */}
      <Card className="flex flex-col gap-4">
        <h3 className="text-[11px] font-bold text-romantic-muted dark:text-romantic-dark-muted font-mono tracking-widest uppercase border-b border-romantic-border dark:border-romantic-dark-border pb-4">
          Perbandingan Detail Tiap Pertanyaan
        </h3>

        <div className="flex flex-col gap-3.5">
          {quiz.questions.map((q, idx) => {
            const creatorVal = q.rating || 3;
            const participantVal =
              participant.answers.find((a) => a.questionId === q.id)?.value ||
              3;
            const diff = Math.abs(creatorVal - participantVal);

            return (
              <div
                key={q.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-romantic-bg/60 dark:bg-romantic-dark-card/30 border border-romantic-border dark:border-romantic-dark-border"
              >
                <div className="flex items-start gap-2.5 max-w-lg">
                  <span className="text-xs font-mono font-bold text-romantic-rose dark:text-romantic-dark-rose mt-0.5">
                    Q{idx + 1}
                  </span>
                  <p className="text-xs font-bold text-romantic-text dark:text-romantic-dark-text font-sans leading-relaxed">
                    {q.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-sans text-xs">
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-mono text-romantic-muted dark:text-romantic-dark-muted uppercase font-semibold">
                      Kamu
                    </span>
                    <span className="font-bold text-romantic-rose">
                      {creatorVal}
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-romantic-border dark:bg-romantic-dark-border"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-mono text-romantic-muted dark:text-romantic-dark-muted uppercase font-semibold">
                      {participant.name}
                    </span>
                    <span className="font-bold text-romantic-clay dark:text-romantic-dark-clay">
                      {participantVal}
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-romantic-border dark:bg-romantic-dark-border"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-mono text-romantic-muted dark:text-romantic-dark-muted uppercase font-semibold">
                      Selisih
                    </span>
                    <span
                      className={`font-bold ${diff === 0 ? "text-green-500" : diff >= 3 ? "text-red-400" : "text-romantic-text dark:text-romantic-dark-text"}`}
                    >
                      {diff}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Accordion Math Section */}
      <Card className="overflow-hidden border border-romantic-border dark:border-romantic-dark-border">
        <button
          onClick={() => setShowMath(!showMath)}
          className="w-full flex items-center justify-between p-5 bg-romantic-rose/5 dark:bg-romantic-dark-rose/5 cursor-pointer font-sans"
        >
          <span className="text-[11px] font-bold font-mono text-romantic-text dark:text-romantic-dark-text uppercase tracking-widest flex items-center gap-2">
            <Icon
              icon="solar:document-bold-duotone"
              className="w-5 h-5 text-romantic-rose dark:text-romantic-dark-rose"
            />
            Metodologi Penghitungan (Cosine Similarity)
          </span>
          <Icon
            icon={
              showMath
                ? "solar:alt-arrow-up-linear"
                : "solar:alt-arrow-down-linear"
            }
            className="w-5 h-5 text-romantic-muted transition-transform duration-300"
          />
        </button>

        {showMath && (
          <div className="p-6 border-t border-romantic-border dark:border-romantic-dark-border flex flex-col gap-6 bg-white dark:bg-romantic-dark-card font-sans">
            {/* Concept explanation */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-romantic-text dark:text-romantic-dark-text uppercase tracking-wide">
                Konsep Rumus
              </h4>
              <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed">
                Cosine Similarity mengukur kosinus sudut antara dua vektor
                berdimensi-N. Nilainya berkisar dari 0 (tidak mirip sama sekali)
                hingga 1 (sangat identik / searah).
              </p>

              <div className="my-3 py-3 px-4 rounded-xl bg-romantic-clay/5 dark:bg-romantic-dark-bg/50 border border-romantic-border dark:border-romantic-dark-border text-center font-serif text-lg text-romantic-text dark:text-romantic-dark-text">
                {
                  "$$\\text{Cosine Similarity} = \\frac{\\mathbf{A} \cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$"
                }
              </div>
            </div>

            {/* Vector details */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-bold text-romantic-text dark:text-romantic-dark-text uppercase tracking-wide">
                Vector Koordinat Jawaban
              </h4>
              <div className="flex flex-col gap-1.5 text-xs font-mono bg-romantic-clay/5 dark:bg-romantic-dark-bg/25 p-3 rounded-xl border border-romantic-border dark:border-romantic-dark-border">
                <p className="text-romantic-rose">
                  Vektor A (Kamu) = [{vectorA.join(", ")}]
                </p>
                <p className="text-romantic-clay dark:text-romantic-dark-clay">
                  Vektor B ({participant.name}) = [{vectorB.join(", ")}]
                </p>
              </div>
            </div>

            {/* Step breakdown */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-bold text-romantic-text dark:text-romantic-dark-text uppercase tracking-wide">
                Langkah Komputasi
              </h4>
              <div className="flex flex-col gap-2 text-xs font-mono bg-romantic-clay/5 dark:bg-romantic-dark-bg/50 p-4 rounded-xl border border-romantic-border dark:border-romantic-dark-border leading-relaxed">
                <p>
                  1. Dot Product (A &bull; B): <br />
                  &nbsp;&nbsp;&nbsp;
                  {vectorA
                    .map((a, i) => `(${a} &times; ${vectorB[i]})`)
                    .join(" + ")}{" "}
                  <br />
                  &nbsp;&nbsp;&nbsp;= {mathData.dotProduct}
                </p>

                <p className="mt-1">
                  2. Magnitude Vektor A (||A||): <br />
                  &nbsp;&nbsp;&nbsp;&radic;(
                  {vectorA.map((a) => `${a}&sup2;`).join(" + ")}) <br />
                  &nbsp;&nbsp;&nbsp;= &radic;
                  {vectorA.reduce((sum, a) => sum + a * a, 0)} ={" "}
                  {mathData.magnitudeA}
                </p>

                <p className="mt-1">
                  3. Magnitude Vektor B (||B||): <br />
                  &nbsp;&nbsp;&nbsp;&radic;(
                  {vectorB.map((b) => `${b}&sup2;`).join(" + ")}) <br />
                  &nbsp;&nbsp;&nbsp;= &radic;
                  {vectorB.reduce((sum, b) => sum + b * b, 0)} ={" "}
                  {mathData.magnitudeB}
                </p>

                <p className="mt-2 border-t border-romantic-border dark:border-romantic-dark-border pt-2">
                  4. Rasio Penyelarasan: <br />
                  &nbsp;&nbsp;&nbsp;Similarity = {mathData.dotProduct} / (
                  {mathData.magnitudeA} &times; {mathData.magnitudeB}) <br />
                  &nbsp;&nbsp;&nbsp;Similarity = {mathData.dotProduct} /{" "}
                  {Math.round(
                    mathData.magnitudeA * mathData.magnitudeB * 1000,
                  ) / 1000}{" "}
                  <br />
                  &nbsp;&nbsp;&nbsp;Similarity ={" "}
                  <strong className="text-romantic-rose dark:text-romantic-dark-rose">
                    {mathData.cosineScore}
                  </strong>
                </p>

                <p className="mt-1">
                  5. Hasil Akhir Korelasi: <br />
                  &nbsp;&nbsp;&nbsp;{mathData.cosineScore} &times; 100% ={" "}
                  <strong className="text-romantic-rose dark:text-romantic-dark-rose">
                    {mathData.percentage}% Cocok
                  </strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
