import { Teacher } from '../models/teacher.schema';

export class GetAllTeachersDto {
  totalCount: number;
  teachers: Teacher[];
}
