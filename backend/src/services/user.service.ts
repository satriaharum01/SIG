import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository.js';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto.js';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(dto: CreateUserDTO) {
    // Validasi apakah username / email sudah terpakai
    const existingUser = await this.userRepository.findByUsernameOrEmail(dto.username);
    if (existingUser) throw new Error('Username sudah digunakan');

    if (dto.email) {
      const existingEmail = await this.userRepository.findByUsernameOrEmail(dto.email);
      if (existingEmail) throw new Error('Email sudah digunakan');
    }

    const uuid = uuidv4();
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return await this.userRepository.create(uuid, dto, hashedPassword);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserByUuid(uuid: string) {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) throw new Error('User tidak ditemukan');
    return user;
  }

  async updateUser(uuid: string, dto: UpdateUserDTO) {
    let hashedPassword: string | undefined;

    if (dto.password) {
      hashedPassword = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.userRepository.update(uuid, dto, hashedPassword);
    if (!updated) throw new Error('User tidak ditemukan');
    return updated;
  }

  async deleteUser(uuid: string) {
    const isDeleted = await this.userRepository.softDelete(uuid);
    if (!isDeleted) throw new Error('User tidak ditemukan');
    return true;
  }
}