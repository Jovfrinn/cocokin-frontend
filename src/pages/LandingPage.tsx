import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import Card from "../components/Card";
import VectorAngleVisualizer from "../components/VectorAngleVisualizer";

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
        <div className="flex-1 flex flex-col items-start text-left gap-8">
          <span className="px-3.5 py-1.5 rounded-full bg-romantic-rose/10 text-romantic-rose dark:bg-romantic-dark-rose/15 dark:text-romantic-dark-rose text-xs font-bold font-sans tracking-widest uppercase">
            📐 Pengukur Vektor Resonansi Hubungan
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-romantic-text dark:text-romantic-dark-text leading-[1.1]">
            Bila rasa bisa diukur, berapakah{" "}
            <span className="italic font-bold bg-gradient-to-r from-romantic-rose to-romantic-clay dark:from-romantic-dark-rose dark:to-romantic-dark-clay bg-clip-text text-transparent">
              sudut kemiripan
            </span>{" "}
            kita?
          </h1>
          <p className="text-base text-romantic-muted dark:text-romantic-dark-muted font-sans leading-relaxed max-w-lg">
            Cocokin.ai menguji resonansi kesamaan preferensi dan prinsip hidup di antara dua manusia menggunakan pendekatan ruang vektor matematika.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
        <div className="flex-1 w-full max-w-sm md:max-w-md flex items-center justify-center">
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Ambient background glows */}
            <div className="absolute inset-0 bg-romantic-rose/5 dark:bg-romantic-dark-rose/5 rounded-full blur-3xl"></div>
            
            {/* Custom Mathematical Vector Visualizer */}
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
            Menganalisis kemiripan pola pikir melalui visualisasi ruang spasial 3-langkah.
          </p>
        </div>

        {/* Asymmetric connected cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <Card className="flex flex-col items-center text-center p-8 gap-5">
            <div className="w-12 h-12 rounded-full bg-romantic-rose/10 text-romantic-rose dark:bg-romantic-dark-rose/15 dark:text-romantic-dark-rose flex items-center justify-center">
              <Icon icon="solar:notes-bold-duotone" className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-romantic-text dark:text-romantic-dark-text font-sans">
              Tentukan Preferensimu
            </h3>
            <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed font-sans">
              Tulis minimal 5 pertanyaan tentang dirimu, visi kencan, atau prinsip hidupmu, lalu tetapkan nilai acuan jawabanmu (skala 1-5).
            </p>
          </Card>

          <Card className="flex flex-col items-center text-center p-8 gap-5 md:translate-y-4">
            <div className="w-12 h-12 rounded-full bg-romantic-rose/10 text-romantic-rose dark:bg-romantic-dark-rose/15 dark:text-romantic-dark-rose flex items-center justify-center">
              <Icon icon="solar:share-bold-duotone" className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-romantic-text dark:text-romantic-dark-text font-sans">
              Bagikan Ruang Uji
            </h3>
            <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed font-sans">
              Dapatkan tautan unik kuisionermu dan bagikan ke teman dekat, pasangan, atau gebetanmu untuk mereka isi secara jujur.
            </p>
          </Card>

          <Card className="flex flex-col items-center text-center p-8 gap-5">
            <div className="w-12 h-12 rounded-full bg-romantic-rose/10 text-romantic-rose dark:bg-romantic-dark-rose/15 dark:text-romantic-dark-rose flex items-center justify-center">
              <Icon icon="solar:chart-square-bold-duotone" className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-romantic-text dark:text-romantic-dark-text font-sans">
              Ukur Kemiringan Vektor
            </h3>
            <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted leading-relaxed font-sans">
              Sistem memetakan jawaban sebagai dua vektor dimensi-N dan mengukur nilai kecocokan eksak berbasis sudut Cosine Similarity.
            </p>
          </Card>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-romantic-rose/5 dark:bg-romantic-dark-rose/5 py-14 px-8 rounded-[32px] text-center border border-romantic-border dark:border-romantic-dark-border">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <span className="text-3xl">✨</span>
          <p className="font-serif italic text-lg md:text-xl text-romantic-text dark:text-romantic-dark-text leading-relaxed">
            "Kecocokan bukan tentang memiliki kesamaan yang sempurna, melainkan bagaimana perbedaan itu saling melengkapi dalam frekuensi yang harmonis."
          </p>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-romantic-rose dark:text-romantic-dark-rose">
            Cocokin.ai Math Team
          </span>
        </div>
      </section>
    </div>
  );
}
