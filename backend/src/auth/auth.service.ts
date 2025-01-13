import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-tokens.schema';
import { MailService } from 'src/services/mail.services';
uuidv4();



@Injectable()
export class AuthService {

  constructor(
    private jwtSerivce: JwtService,
    private mailService: MailService,
    @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>) { }


  async signup(createAuthDto: CreateAuthDto) {
    const { email, password, name, role } = createAuthDto

    // Check if email is in use
    const emailInUse = await this.UserModel.findOne({
      email,
    })

    if (emailInUse) {
      throw new BadRequestException("Email already in use");
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10); //123

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return 'new user is Added';
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    // Find if user exits by email
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong Password");
    }

    // Generate JWT tokens
    const tokens = await this.generateUserTokens(user._id);
    return {
      ...tokens,
      userId: user._id
    };
  }


  async generateUserTokens(userId) {
    const accessToken = this.jwtSerivce.sign({ userId }, { expiresIn: '24h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      message: "Success",
      accessToken,
      refreshToken
    };

  }

  // Refresh Tokens
  async refreshTokens(refreshtoken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshtoken,
      expiryDate: { $gte: new Date() },
    })
    if (!token) {
      throw new UnauthorizedException("Refresh Token is invalid");

    }
    return this.generateUserTokens(token.userId);
  }

  async storeRefreshToken(token: string, userId) {
    //Calculate 3 days for the expiryDate
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3)
    await this.RefreshTokenModel.updateOne({ userId }, { $set: { expiryDate, token } }, { upsert: true })
  }

  // Change Password
  async changePassword(userId, oldPassword: string, newPassword: string) {
    // Find the user
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not Found...");
    }

    // Compare the old password with the password in DB

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong credentials");
    }

    // Change user's password (Hash it)
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
  }

  //Forgot Password
  async forgotPassword(email: string) {
    // Check that user exists
    const user = await this.UserModel.findOne({ email });

    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);      // If user exists, generate password reset link
      const resetToken = nanoid(64);
      await this.ResetTokenModel.create({
        toekn: resetToken,
        userId: user._id,
        expiryDate: expiryDate
      })
      // Send the link to the user by email (using nodemailer)
      this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return {
      message: "If this user exists, they will receive an email"
    };

  }

  async resetPassword(newPassword: string, resetToken: string) {
    // Find a valid reset token document
    const token = await this.ResetTokenModel.findOneAndDelete({
      token: resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException(" Invalid link");
    }
    // Change user password (Hash)

    const user = await this.UserModel.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

  }

}
