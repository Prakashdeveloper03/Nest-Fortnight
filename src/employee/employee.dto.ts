export class CreateEmployeeDto {
  readonly name: string;
  readonly salary: number;
  readonly age: number;
}

export class UpdateEmployeeDto {
  readonly name?: string;
  readonly salary?: number;
  readonly age?: number;
}