import { IAuthRepository } from "../../domain/IRepository/IAuthRepository";
import { loginReqDto } from "../../domain/dtos/request/loginRequest";
import { IHashPasswordService } from "../../domain/IServices/IHashPasswordService";

export type AuthenticateUser = {
    id: string,
    email: string,
    role: string
}
export class loginUsecase{
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly hashPasswordService: IHashPasswordService
    ) {}

    public async excuseAsync(req: loginReqDto) : Promise<AuthenticateUser | null>
    {
        const user = await this.authRepository.findUserByEmail(req.userEmail);
        if (!user) {
            return null;
        }

        const isValidPassword = await this.hashPasswordService.isValidPassword(
            req.userPassword,
            user.passwordHash
        );
        if (!isValidPassword) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
}