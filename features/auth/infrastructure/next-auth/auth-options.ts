import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUsecase } from "../../application/usecases/loginUsecase";
import { AuthRepository } from "../repositories/authRepository";
import { HashPasswordService } from "../services/hashPasswordService";

const loginUseCase = new loginUsecase(
    new AuthRepository(),
    new HashPasswordService()
)

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Email và mật khẩu",
            credentials: {
                userEmail: { label: "Email", type: "email" },
                userPassword: { label: "Mật khẩu", type: "password" },
            },
            async authorize(credentials) {
                const userEmail = credentials?.userEmail?.trim();
                const userPassword = credentials?.userPassword;

                if (!userEmail || !userPassword) {
                    return null;
                }
                return loginUseCase.excuseAsync({ userEmail, userPassword });
            },
        })
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks:{
        async jwt({ token, user })
        {
            if(user)
            {
                // Define Role in here
            }
            return token;
        },
        async session({ session, token })
        {
            if(session.user)
            {

            }
            return session;
        }
    }
};