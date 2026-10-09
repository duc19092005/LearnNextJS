import { userSeedData } from "./user-seed-data";

export default function loginApiService(username: string, password: string) {
    const user = userSeedData.find((seedUser) => seedUser.username === username && seedUser.password === password);
    if (user) {
        return {
            status: 200,
            message: "Login Completed",
            isSuccess: true
        };
    }

    return {
        status: 401,
        message: "Invalid username or password",
        isSuccess: false
    };
}