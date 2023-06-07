import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
    if (!token) throw new UnauthorizedException({message:'Token Tidak ADA!!!!!!!!'})
    try {
      
        await this.jwtService.verifyAsync(token, {
          secret: process.env.ACCESS_TOKEN_RAHASIA,
        });
    } catch (error) {
        throw new UnauthorizedException({message: 'Token Tidak Valid!!'})
    }
    return true;
  }
}
