import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  salary: number;

  @ApiProperty()
  age: number;
}

export class UpdateEmployeeDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  salary?: number;

  @ApiProperty()
  age?: number;
}
