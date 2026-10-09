import type { HydratedDocument } from "mongoose";
import { UserEntity } from "../../domain/entity/userEntity";
import type { UserRecord } from "../model/auth.model";

export const userMapper = {
    toDomain(document: HydratedDocument<UserRecord>): UserEntity {
        return new UserEntity(
            document._id.toString(),
            document.userEmail,
            document.passwordHash,
            document.role
        );
    }
};
