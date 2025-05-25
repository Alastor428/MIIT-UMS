import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, adminSchema } from './schemas/admin.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Admin.name, schema: adminSchema
  }]),
  forwardRef(() => AuthModule)
  ],
  controllers: [
    AdminController],
  providers: [AdminService],
  exports: [MongooseModule, AdminService]
})
export class AdminModule { }
