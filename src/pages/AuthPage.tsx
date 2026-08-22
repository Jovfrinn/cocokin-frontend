import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icon } from "@iconify/react";
import Card from "../components/Card";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { userService } from "../services/userService";

const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const registerSchema = z.object({
  full_name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
  username: z
    .string()
    .min(3, { message: "Username minimal 3 karakter" })
    .regex(/^[a-z0-9_]+$/, {
      message: "Hanya huruf kecil, angka, dan underscore (_)",
    }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tab = searchParams.get("tab") || "login";
  const isLogin = tab === "login";

  // Check if user is already logged in OR has just logged in via Google OAuth redirect
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (tokenParam && userParam) {
      try {
        const decodedUser = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem("access_token", decodeURIComponent(tokenParam));
        localStorage.setItem("currentUser", JSON.stringify(decodedUser));
        navigate("/dashboard");
        return;
      } catch (err) {
        console.error("Gagal men-decode data login Google", err);
      }
    }

    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, searchParams]);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegisterForm,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    try{
      const responseData = await userService.login(data.email, data.password);

      if (!responseData || !responseData.access_token) {
        setErrorMsg("Email atau password salah.")
        return;
      }

      localStorage.setItem("access_token", responseData.access_token);
      localStorage.setItem("currentUser", JSON.stringify(responseData.user));
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg('Gagal menyambung ke server')
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await userService.register({
        full_name: data.full_name,
        username: data.username,
        email: data.email,
        password: data.password,
      })

      setSuccessMsg("Pendaftaran berhasil! Silahkan masuk.");
      setSearchParams({tab: 'login'});
      resetRegisterForm();
    } catch(err: any){
      const message = err.response?.data?.message || "Gagal mendaftar. Pastikan backend menyala.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTab = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSearchParams({ tab: isLogin ? "register" : "login" });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md p-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Decorative background circle */}
                <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-full bg-romantic-rose/10 dark:bg-romantic-dark-rose/15 flex items-center justify-center text-romantic-rose dark:text-romantic-dark-rose mb-1">
            <Icon icon="solar:lock-password-bold-duotone" className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-light text-romantic-text dark:text-romantic-dark-text">
            {isLogin ? "Selamat Datang Kembali" : "Gabung Cocokin.ai"}
          </h2>
          <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted">
            {isLogin
              ? "Masuk untuk melihat hasil kuisionermu"
              : "Daftar gratis untuk mulai membuat kuisioner"}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-semibold flex items-center gap-2 border border-red-100 dark:border-red-950/50">
            <Icon
              icon="solar:danger-bold-duotone"
              className="w-4 h-4 shrink-0 text-red-500"
            />
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-500 text-xs font-semibold flex items-center gap-2 border border-green-100 dark:border-green-950/50">
            <Icon
              icon="solar:check-circle-bold-duotone"
              className="w-4 h-4 shrink-0 text-green-500"
            />
            {successMsg}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(onLogin)} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              error={loginErrors.email?.message}
              {...loginRegister("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={loginErrors.password?.message}
              {...loginRegister("password")}
            />
            <Button type="submit" isLoading={isLoading} className="mt-2 w-full">
              Masuk
            </Button>
          </form>
        ) : (
          <form
            onSubmit={handleRegisterSubmit(onRegister)}
            className="flex flex-col gap-4"
          >
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Ahmad Suherman"
              error={registerErrors.full_name?.message}
              {...registerRegister("full_name")}
            />
            <Input
              label="Username"
              type="text"
              placeholder="ahmads"
              error={registerErrors.username?.message}
              {...registerRegister("username")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              error={registerErrors.email?.message}
              {...registerRegister("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={registerErrors.password?.message}
              {...registerRegister("password")}
            />
            <Button type="submit" isLoading={isLoading} className="mt-2 w-full">
              Daftar Sekarang
            </Button>
          </form>
        )}

        {/* Google OAuth Login Button */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-romantic-muted/50 my-1 justify-center">
            <span className="h-[1px] bg-romantic-border dark:bg-romantic-dark-border w-1/4"></span>
            <span className="font-mono text-[9px] uppercase tracking-widest">atau</span>
            <span className="h-[1px] bg-romantic-border dark:bg-romantic-dark-border w-1/4"></span>
          </div>

          <Button
            variant="outline"
            onClick={() => window.location.href = "http://localhost:3000/auth/google"}
            className="w-full flex items-center justify-center gap-2 border-romantic-border dark:border-romantic-dark-border text-romantic-text dark:text-romantic-dark-text hover:bg-romantic-rose/5"
          >
            <Icon icon="logos:google-icon" className="w-4 h-4 shrink-0" />
            {isLogin ? "Masuk dengan Google" : "Daftar dengan Google"}
          </Button>
        </div>

        <div className="text-center mt-2 border-t border-romantic-border dark:border-romantic-dark-border pt-4">
          <button
            onClick={toggleTab}
            className="text-xs font-bold text-romantic-rose hover:text-romantic-rose-hover dark:text-romantic-dark-rose dark:hover:text-romantic-dark-rose-hover hover:underline cursor-pointer"
          >
            {isLogin
              ? "Belum punya akun? Daftar di sini"
              : "Sudah punya akun? Masuk di sini"}
          </button>
        </div>
      </Card>
    </div>
  );
}
