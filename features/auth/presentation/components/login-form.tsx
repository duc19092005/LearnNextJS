"use client";

import { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { useRouter } from "next/navigation";

const authErrorMessages: Record<string, string> = {
    AccessDenied: "Bạn đã từ chối quyền truy cập. Vui lòng thử lại.",
    Configuration: "Đăng nhập bên thứ ba chưa được cấu hình đầy đủ.",
    OAuthAccountNotLinked: "Email này đã được đăng ký bằng phương thức đăng nhập khác.",
    OAuthCallback: "Không thể hoàn tất xác thực với nhà cung cấp. Vui lòng thử lại.",
    OAuthSignin: "Không thể bắt đầu đăng nhập bên thứ ba. Vui lòng thử lại.",
};

const loginSchema = z.object({
    email: z.string().email("Email không đúng định dạng"),
    password: z.string().min(8, "Mật khẩu ít nhất 8 kí tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ authErrorCode }: { authErrorCode?: string }) {
    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(() =>
        authErrorCode
            ? authErrorMessages[authErrorCode] ?? "Đăng nhập bên thứ ba thất bại. Vui lòng thử lại."
            : null
    );

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (inputData: LoginFormValues) => {
        setLoading(true);
        setServerError(null);

        const result = await signIn("credentials", {
            email: inputData.email,
            password: inputData.password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setServerError("Tài khoản hoặc mật khẩu không chính xác");
        } else {
            router.push("/dashboard");
        }
    };

    const handleSocialLogin = async (provider: "google" | "github") => {
        setLoading(true);
        setServerError(null);
        try {
            await signIn(provider, { callbackUrl: "/dashboard" });
        } catch {
            setServerError("Không thể đăng nhập bằng nhà cung cấp này. Vui lòng thử lại.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>

            {serverError && (
                <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded text-center">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    placeholder="user@example.com"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <Input
                    label="Mật khẩu"
                    placeholder="••••••••"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
            </form>

            <div className="mt-4 flex gap-2">
                <button onClick={() => handleSocialLogin("google")} disabled={isLoading} className="w-full py-2 border rounded">Google</button>
                <button onClick={() => handleSocialLogin("github")} disabled={isLoading} className="w-full py-2 border rounded">Github</button>
            </div>
        </div>
    );
}