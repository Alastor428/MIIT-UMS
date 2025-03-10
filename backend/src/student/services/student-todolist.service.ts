import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Student } from '../schemas/student.schema';
import { ToDoListDto } from '../dto/todolist.dto';
import { User } from 'src/auth/schemas/user.schema';

// To Do List 
export class ToDoListService {
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async updateToDoList(
        userId: string,
        todoListData: ToDoListDto[],
    ) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        // Update the todo_list
        student.todo_list = todoListData;

        // Save the student document
        await student.save();

        return {
            message: 'To Do List updated successfully',
            todoList: student.todo_list,
        };
    }

    // Get to do list
    async getToDoList(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        return {
            todoList: student.todo_list,
        };
    }

    // Delete a task from the list
    async deleteTask(
        userId: string,
        taskTitle: string,
    ): Promise<{ message: string; todoList: any[] }> {
        // Find the student
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        // Normalize the task title for comparison (trim whitespace and convert to lowercase)
        const normalizedTaskTitle = taskTitle.trim().toLowerCase();

        // Find the index of the task to delete
        const taskIndex = student.todo_list.findIndex(
            (task) => task.title.trim().toLowerCase() === normalizedTaskTitle,
        );

        if (taskIndex === -1) {
            throw new NotFoundException(`Task with title "${taskTitle}" not found`);
        }

        // Remove the task from the todo_list
        student.todo_list.splice(taskIndex, 1);

        // Mark the todo_list as modified
        student.markModified('todo_list');

        // Save the student document
        await student.save();

        return {
            message: 'Task deleted successfully',
            todoList: student.todo_list,
        };
    }
}