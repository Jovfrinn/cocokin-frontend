import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import VectorAngleVisualizer from "../components/VectorAngleVisualizer";

const STEPS = [
  {
    n: "01",
    title: "Tentukan Preferensimu",
    body: "Tulis minimal 5 pertanyaan tentang dirimu, visi kencan, atau prinsip hidupmu, lalu tetapkan nilai acuan jawabanmu (skala 1–5).",
  },
  {
    n: "02",
    title: "Bagikan Ruang Uji",
    body: "Dapatkan tautan unik kuisionermu dan bagikan ke teman dekat, pasangan, atau gebetanmu untuk mereka isi secara jujur.",
  },
  {
    n: "03",
    title: "Ukur Kemiringan Vektor",
    body: "Sistem memetakan jawaban sebagai dua vektor dimensi-N dan mengukur nilai kecocokan eksak berbasis sudut Cosine Similarity.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("currentUser");
  const user = userJson ? JSON.parse(userJson) : null;

  const handleCTA = () => {
    if (user) {
      navigate("/quiz/create");
    } else {
      navigate("/login?tab=register");
    }
  };

  return (
    <div className="flex flex-col gap-20 py-8 md:py-16">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col items-start text-left gap-7">
          <span className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-romantic-clay/40 dark:border-romantic-dark-clay/40 text-romantic-clay dark:text-romantic-dark-clay text-[11px] font-mono font-semibold tracking-widest uppercase">
            Instrumen Pengukur Resonansi
          </span>
          <h1 className="animate-fade-up [animation-delay:80ms] font-serif text-5xl md:text-6xl font-light tracking-tight text-romantic-text dark:text-romantic-dark-text leading-[1.08]">
            Bila rasa bisa diukur, berapakah{" "}
            <em className="not-italic font-semibold text-romantic-rose dark:text-romantic-dark-rose">
              sudut kemiripan
            </em>{" "}
            kita?
          </h1>
          <p className="animate-fade-up [animation-delay:160ms] text-base text-romantic-muted dark:text-romantic-dark-muted font-sans leading-relaxed max-w-lg">
            Cocokin.ai menguji resonansi kesamaan preferensi dan prinsip hidup di antara dua manusia menggunakan pendekatan ruang vektor matematika.
          </p>
          <div className="animate-fade-up [animation-delay:240ms] flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button size="lg" onClick={handleCTA} className="w-full sm:w-auto">
              Mulai Uji Vektor Kita
            </Button>
            <a href="#cara-kerja" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                Cara Kerja Pendekatan
              </Button>
            </a>
          </div>
        </div>

        {/* Visual Section (Signature Cosine Visual) */}
        <div className="animate-fade-in [animation-delay:200ms] flex-1 w-full max-w-sm md:max-w-md flex items-center justify-center">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-romantic-rose/[0.05] dark:bg-romantic-dark-rose/[0.05] rounded-full blur-3xl"></div>
            <VectorAngleVisualizer animate={true} size={360} />
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="flex flex-col gap-12 scroll-mt-20">
        <div className="text-center flex flex-col gap-3">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-romantic-text dark:text-romantic-dark-text">
            Metodologi Penyelarasan
          </h2>
          <p className="text-sm text-romantic-muted dark:text-romantic-dark-muted max-w-sm mx-auto">
            Menganalisis kemiripan pola pikir melalui tiga langkah pengukuran.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-romantic-border dark:bg-romantic-dark-border rounded-xl overflow-hidden border border-romantic-border dark:border-romantic-dark-border">
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              style={{ animationDelay: `${idx * 120}ms` }}
              className="animate-fade-up flex flex-col gap-4 p-8 bg-white dark:bg-romantic-dark-card transition-all duration-300 hover:bg-romantic-rose/[0.03] dark:hover:bg-romantic-dark-rose/[0.05]"
            >
              <span className="font-mono text-sm font-semibold text-romantic-rose dark:text-romantic-dark-rose">
                {step.n}
              </span>
              <h3 className="text-base font-bold text-romantic-text dark:text-romantic-dark-text font-sans">
                {step.title}
              </h3>
              <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed font-sans">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="animate-fade-up relative py-14 px-8 rounded-xl text-center border border-romantic-border dark:border-romantic-dark-border bg-romantic-text dark:bg-romantic-dark-card">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-romantic-dark-clay">
            Catatan Lapangan
          </span>
          <p className="font-serif italic text-lg md:text-xl text-romantic-dark-text leading-relaxed">
            "Kecocokan bukan tentang memiliki kesamaan yang sempurna, melainkan bagaimana perbedaan itu saling melengkapi dalam frekuensi yang harmonis."
          </p>
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-romantic-dark-rose">
            Cocokin.ai Math Team
          </span>
        </div>
      </section>
    </div>
  );
}
