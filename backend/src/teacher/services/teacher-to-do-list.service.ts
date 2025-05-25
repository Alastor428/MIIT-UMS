import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Teacher } from '../models/teacher.schema';
import { TeacherToDoListDto } from '../dto/teacherToDoList.dto';
import { User } from 'src/auth/schemas/user.schema';
// To Do List 
export class TeacherToDoListService {
    constructor(
        @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async updateToDoList(
        userId: string,
        todoListData: TeacherToDoListDto[],
    ) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found")
        }
        const objectId = new mongoose.Types.ObjectId(userId);
        const teacher = await this.teacherModel.findOne({ user: objectId });
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        // Update the todo_list
        teacher.todo_list = todoListData;

        // Save the teacher document
        await teacher.save();

        return {
            message: 'To Do List updated successfully',
            todoList: teacher.todo_list,
        };
    }

    // Get to do list
    async getToDoList(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found")
        }
        const objectId = new mongoose.Types.ObjectId(userId);
        const teacher = await this.teacherModel.findOne({ user: objectId });
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        return {
            todoList: teacher.todo_list,
        };
    }

    // Delete a task from the list
    async deleteTask(
        userId: string,
        taskTitle: string,
    ): Promise<{ message: string; todoList: any[] }> {
        // Find the teacher
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found")
        }
        const objectId = new mongoose.Types.ObjectId(userId);
        const teacher = await this.teacherModel.findOne({ user: objectId });
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        // Normalize the task title for comparison (trim whitespace and convert to lowercase)
        const normalizedTaskTitle = taskTitle.trim().toLowerCase();

        // Find the index of the task to delete
        const taskIndex = teacher.todo_list.findIndex(
            (task) => task.title.trim().toLowerCase() === normalizedTaskTitle,
        );

        if (taskIndex === -1) {
            throw new NotFoundException(`Task with title "${taskTitle}" not found`);
        }

        // Remove the task from the todo_list
        teacher.todo_list.splice(taskIndex, 1);

        // Mark the todo_list as modified
        teacher.markModified('todo_list');

        // Save the teacher document
        await teacher.save();

        return {
            message: 'Task deleted successfully',
            todoList: teacher.todo_list,
        };
    }
}