import { Teacher } from '../models/teacher.model';

export class GetAllTeachersDto {
  totalCount: number;
  teachers: Teacher[];
}
