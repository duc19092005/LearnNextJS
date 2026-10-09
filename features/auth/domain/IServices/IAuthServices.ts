export interface JwtPayload{
    sub: string,
    email: string,
    role: string,
    iat? : number,
    exp?: number
}
export interface IAuthService{
    generateToken(): Promise<string>
    refreshAccessToken(refreshToken: string): Promise<string>
}