import { User } from '../../domain/entities/user/User';
import { IUserRepository } from '../../repositories/users/IUserRepository';
import { UserSession } from '../../../../types/user';
import { CreateUserUseCase } from '../../domain/usecases/users/CreateUserUseCase';
import { GetUserUseCase } from '../../domain/usecases/users/GetUserUseCase';
import { UpdateUserUseCase } from '../../domain/usecases/users/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../domain/usecases/users/DeleteUserUseCase';
import { UserMapper } from '../../../../infrastructure/gateways/api/UserMapper';
import { UserType } from '../../../../types/user';

export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly userMapper: UserMapper
  ) {}

  async createUser(userData: {
    email: string;
    password?: string;
    username: string;
  }): Promise<User> {
    return this.createUserUseCase.execute(userData);
  }

  async getUser(userId: string): Promise<User | null> {
    return this.getUserUseCase.execute(userId);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    return this.updateUserUseCase.execute(userId, userData);
  }

  async deleteUser(userId: string): Promise<void> {
    return this.deleteUserUseCase.execute(userId);
  }

  async getUserSession(session: UserSession): Promise<User> {
    const user = await this.getUser(session.id);
    if (!user) {
      throw new Error(`User with ID ${session.id} not found.`);
    }
    return user;
  }

  // ... other methods as needed (e.g., for community features)
}