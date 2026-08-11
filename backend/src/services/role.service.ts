import { v4 as uuidv4 } from 'uuid';
import { RoleRepository } from '../repositories/role.repository.js';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto/role.dto.js';

export class RoleService {
  private roleRepository = new RoleRepository();

  async createRole(dto: CreateRoleDTO) {
    const existingRole = await this.roleRepository.findByName(dto.name);
    if (existingRole) throw new Error('Nama role sudah digunakan');

    const id = uuidv4();
    return await this.roleRepository.create(id, dto);
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }

  async getRoleById(uuid: string) {
    const role = await this.roleRepository.findById(uuid);
    if (!role) throw new Error('Role tidak ditemukan');
    return role;
  }

  async updateRole(uuid: string, dto: UpdateRoleDTO) {
    if (dto.name) {
      const existingRole = await this.roleRepository.findByName(dto.name);
      if (existingRole && existingRole.uuid !== uuid) {
        throw new Error('Nama role sudah digunakan oleh role lain');
      }
    }

    const updated = await this.roleRepository.update(uuid, dto);
    if (!updated) throw new Error('Role tidak ditemukan');
    return updated;
  }

  async deleteRole(uuid: string) {
    const isDeleted = await this.roleRepository.delete(uuid);
    if (!isDeleted) throw new Error('Role tidak ditemukan');
    return true;
  }
}