import { PasswordDto } from './dto/password-user.dto';
/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersMessages } from './users.messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    const fname = await this.userModel
      .findOne({ firstname: body.firstname }, 'firstname')
      .exec();
    const lname = await this.userModel
      .findOne({ lastname: body.lastname }, 'lastname')
      .exec();
    if (fname && lname)
      throw new BadRequestException(UsersMessages.Exists);

    const username = await this.userModel
      .findOne({ username: body.username }, 'username')
      .exec();
    if (username) throw new BadRequestException(UsersMessages.Taken);
    try {
      const password = await hashPassword(body.password);
      const createdUser = await this.userModel.create({
        ...body,
        password,
        createdAt: new Date()
      });
      return createdUser;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(query: any): Promise<User[]> {
    const users = await this.userModel.find({ ...query }).exec();
    if (!users.length) throw new NotFoundException(UsersMessages.NotFound);
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById({ _id: id }).exec();
    if (!user) throw new NotFoundException(UsersMessages.NotFound);
    return user;
  }

  async updateById(id: string, body: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate({
      _id: id,
    }, { ...body, modifiedAt: new Date() });
    if (!updatedUser) throw new NotFoundException(UsersMessages.NotFound);
    return updatedUser;
  }

  async updatePassword(id: string, body: PasswordDto): Promise<User> {
    const password = await hashPassword(body.password);
    const updatedUser = await this.userModel.findByIdAndUpdate({
      _id: id,
    }, { password, modifiedAt: new Date() });
    if (!updatedUser) throw new NotFoundException(UsersMessages.NotFound);
    return updatedUser;
  }

  async removeById(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deletedUser) throw new NotFoundException(UsersMessages.NotFound);
    return deletedUser;
  }
}
