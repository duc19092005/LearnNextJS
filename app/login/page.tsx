import { LoginForm } from "@/features/auth/presentation/components/login-form";

type LoginPageProps = {
    searchParams: Promise<{ error?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { error } = await searchParams;

    return (
        <>
            <LoginForm authErrorCode={Array.isArray(error) ? error[0] : error} />
        </>
    )
}