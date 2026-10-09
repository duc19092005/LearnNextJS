import { UserEntity } from "../../domain/entity/userEntity";
import { IAuthRepository } from "../../domain/IRepository/IAuthRepository";
import { userMapper } from "../mappers/user.mapper";
import { userModel } from "../model/auth.model";

export class AuthRepository implements IAuthRepository {
    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const userDocument = await userModel.findOne({
            userEmail: email
        }).select("+passwordHash");

        if (!userDocument) {
            return null
        }

        return userMapper.toDomain(userDocument);
    }
}