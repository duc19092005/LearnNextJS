import { model, models, Schema } from "mongoose";

export interface UserRecord {
    userEmail: string;
    passwordHash: string;
    role: string;
}

const userSchema = new Schema<UserRecord>({
    userEmail: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, required: true }
});

export const userModel =
    models.User ?? model<UserRecord>("User", userSchema);