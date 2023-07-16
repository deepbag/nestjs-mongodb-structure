import { JwtService } from "@nestjs/jwt";

export class JwtItem {
  constructor(private readonly jwtService: JwtService) {}

  async _generateTokenGlobal(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async _generateTokenWithValidity(
    payload: any,
    expiry: string | number
  ): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: expiry });
  }

  async _verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
