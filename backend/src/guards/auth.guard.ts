import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenfromHeader(request);

        if (!token) {
            throw new UnauthorizedException("invalid token");
        }
        try {
            const payload = this.jwtService.verify(token);
            request.userId = payload.userId;

        } catch (e) {
            Logger.error(e.message);
            throw new UnauthorizedException("Inavlid token");
        }

        return true;
    }
    private extractTokenfromHeader(request: Request): string | undefined {
        return request.headers['authorization']?.split(' ')[1];
    }
}