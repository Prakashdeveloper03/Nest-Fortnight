import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  private readonly collection;

  constructor() {
    this.collection = new MongoClient('mongodb://localhost:27017/')
      .db('hrms')
      .collection('employees');
  }

  async findAll() {
    const cursor = this.collection.find({});
    return await cursor.toArray();
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const result = await this.collection.insertOne(createEmployeeDto);
    return await this.collection.findOne({ _id: result.insertedId });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const objId = new ObjectId(id);
    const result = await this.collection.findOneAndUpdate(
      { _id: objId },
      { $set: updateEmployeeDto },
      { returnDocument: 'after' },
    );
    if (!result.value) {
      throw new NotFoundException('Employee not found');
    }
    return result.value;
  }

  async remove(id: string) {
    const objId = new ObjectId(id);
    const result = await this.collection.deleteOne({ _id: objId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Employee not found');
    }
    return { message: 'Record deleted' };
  }
}
