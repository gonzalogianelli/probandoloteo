import { User } from "../../modules/usuario/entities/user.entity.js";

export function publicUser(user: User) {
  return {
    id: user.id,
    roleId: user.roleId,
    role: user.role?.nombre ?? null,
    clientId: user.clientId,
    nombre: user.nombre,
    apellido: user.apellido,
    dni: user.dni,
    email: user.email,
    telefono: user.telefono,
  
  };
}
