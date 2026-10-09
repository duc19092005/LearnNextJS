import { UserEntity } from "../entity/userEntity"

export interface IAuthRepository{
    findUserByEmail(email: string): Promise<UserEntity | null>
}