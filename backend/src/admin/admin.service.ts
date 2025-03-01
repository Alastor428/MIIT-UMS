import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>
  ) { }
  async createAdmin(userId: string, createAdminDto: CreateAdminDto) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("Wrong Credentials")
    }

    const newAdmin = new this.adminModel({
      user: new Types.ObjectId(userId),
      ...createAdminDto
    })
    await newAdmin.save();


    try {
      await newAdmin.save();
      return {
        success: true,
        message: 'Admin Created Successfully',
      };
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error);
    }
  }

  async findAdminByUserId(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User NOT FOUND")
    }
    const objectId = new mongoose.Types.ObjectId(userId);
    const admin = await this.adminModel.findOne({ user: objectId }).populate({
      path: "user",
      select: 'name email'
    });
    return {
      message: "Success",
      admin
    }
  }

  // Find an Admin by email
  async findAdminByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException("Wrong Credentials");
    }
    const admin = await this.adminModel
      .findOne({ user: user._id })
      .populate({
        path: 'user',
        select: 'name email role ',
      });
    if (!admin) {
      throw new NotFoundException('Admin with this email is not found');
    }
    return admin;
  }

  // Get Admins based on the admin role
  async findAdminbyAdminRole(adminRole: string) {
    const admins = await this.adminModel.find({ adminRole })
      .populate({
        path: 'user',
        select: 'name email role'
      });
    if (!admins) {
      throw new NotFoundException("Admins Not Found");
    }
    if (admins.length == 0) {
      throw new NotFoundException("Admins Not Found wiht this admin role")
    }
    return admins
  }

  async getAllAdmins() {
    return await this.adminModel.find().exec();
  }

  async deleteAdmin(adminId: string) {
    const admin = await this.adminModel.findById(adminId)
    if (!admin) {
      throw new NotFoundException("Admin with this Id is Not Found");
    }
    const deletedAdmin = await this.adminModel.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      throw new NotFoundException("Admin Not Found")
    }
    const user = await this.userModel.findByIdAndDelete(admin.user._id)
    if (!user) {
      console.log("User not Found")
    } else {
      console.log(user)
    }

    return {
      message: "Success",
      deletedAdmin
    }
  }
  async findOne(id: string) {
    return await this.adminModel.findById(id)
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    try {
      const updatedAdmin = await this.adminModel.findByIdAndUpdate(
        id,
        { $set: updateAdminDto },
        { new: true, runValidators: true }
      ).populate({
        path: "user",
        select: "name email role",
      });

      return {
        success: true,
        message: "Admin updated successfully",
        updatedAdmin,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to update admin");
    }
  }

}
