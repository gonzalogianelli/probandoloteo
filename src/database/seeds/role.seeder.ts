import { DataSource } from "typeorm";
import { Role } from "../../modules/rol/entities/rol.entity.js";

export async function seedRoles(dataSource: DataSource): Promise<Role[]> {
  const repo = dataSource.getRepository(Role);

  const rolesData = [
    { nombre: "ADMIN", descripcion: "ADMIN del sistema" },
    { nombre: "VENTAS", descripcion: "Vendedor de lotes" },
    { nombre: "COBRANZA", descripcion: "Cobrador de lotes" },    
    { nombre: "CLIENTE", descripcion: "Cliente comprador de lotes" },
    { nombre: "REPORTES", descripcion: "Reporte de lotes" },    

  ];

  const roles: Role[] = [];
  for (const data of rolesData) {
    let role = await repo.findOneBy({ nombre: data.nombre });
    if (!role) {
      role = await repo.save(repo.create(data));
    }
    roles.push(role);
  }

  return roles;
}