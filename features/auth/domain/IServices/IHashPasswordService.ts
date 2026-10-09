export interface IHashPasswordService{
    hashPassword(rawPassword: string): Promise<string>;
    isValidPassword(rawPassword: string, hashPassword: string): Promise<boolean> 
}
