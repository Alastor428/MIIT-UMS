import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { ResetToken, ResetTokenSchema } from './schemas/reset-tokens.schema';
import { MailService } from 'src/services/mail.services';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),

      }),
    }),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    },
    {
      name: ResetToken.name,
      schema: ResetTokenSchema
    },
    {
      name: RefreshToken.name,
      schema: RefreshTokenSchema
    },
    { name: ResetToken.name, schema: ResetTokenSchema },
    { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]), forwardRef(() => StudentModule)],
  controllers: [AuthController],
  providers: [AuthService, MailService],
  exports: [
    AuthService, // Export AuthService if needed elsewhere
    MongooseModule, // Export MongooseModule so UserModel can be used in other modules
  ],
})
export class AuthModule { }
