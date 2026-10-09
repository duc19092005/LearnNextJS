interface UserSeed {
    userId: string;
    username: string;
    userRole: string;
    password: string;
}

export const userSeedData: UserSeed[] = [
    {
        userId: "1",
        username: "admin",
        userRole: "admin",
        password: "admin123"
    },
    {
        userId: "2",
        username: "user1",
        userRole: "user",
        password: "user123"
    }
];