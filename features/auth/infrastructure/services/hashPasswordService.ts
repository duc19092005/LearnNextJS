import { IHashPasswordService } from "../../domain/IServices/IHashPasswordService";
import bcrypt from 'bcryptjs';

export class HashPasswordService implements IHashPasswordService{
    async hashPassword(rawPassword: string): Promise<string>{
        return await bcrypt.hashSync(rawPassword)
    }
    async isValidPassword(rawPassword: string, hashPassword: string): Promise<boolean>{
        return await bcrypt.compareSync(rawPassword, hashPassword)
    }
}