import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-md p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden">
        {/* Dekorasi lingkaran background */}
                {/* Icon Hati Rusak / Halaman Hilang */}
        <div className="w-16 h-16 rounded-full bg-romantic-rose/10 dark:bg-romantic-dark-rose/15 flex items-center justify-center text-romantic-rose dark:text-romantic-dark-rose mb-1">
          <Icon icon="solar:heart-broken-bold-duotone" className="w-8 h-8" />
        </div>

        {/* Tulisan Header 404 */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl font-extralight text-romantic-rose dark:text-romantic-dark-rose">
            404
          </h1>
          <h2 className="font-serif text-xl font-light text-romantic-text dark:text-romantic-dark-text">
            Koordinat Tidak Ditemukan
          </h2>
          <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted max-w-xs">
            Halaman yang kamu cari telah berpindah dimensi atau belum pernah diinisialisasi dalam ruang vektor kami.
          </p>
        </div>

        {/* Tombol kembali */}
        <Button
          onClick={() => navigate(currentUser ? "/dashboard" : "/")}
          className="w-full mt-2"
        >
          <Icon icon="solar:home-2-bold" className="w-4 h-4 mr-1.5" />
          Kembali ke {currentUser ? "Dashboard" : "Beranda"}
        </Button>
      </Card>
    </div>
  );
}
