import { DateTime } from "next-auth/providers/kakao";

class ProfileEntity {
    constructor(
        public username: string,
        public dayOfBirth: Date,
        public phoneNumber: string
    ) {
        if (!this.isOver18(dayOfBirth)) {
            throw new Error("Chưa đủ 18t để đăng kí")
        }
    }

    private isOver18(dob: Date): boolean {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age >= 18;
    }
}
