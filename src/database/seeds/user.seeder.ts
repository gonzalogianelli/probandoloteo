import { DataSource } from "typeorm";
import { User } from "../../modules/usuario/entities/user.entity.js";
import { Role } from "../../modules/rol/entities/rol.entity.js";

export async function seedUsers(
  dataSource: DataSource,
  roles: Role[]
): Promise<User[]> {
  const repo = dataSource.getRepository(User);

  const adminRole = roles.find((r) => r.nombre === "ADMIN");
  const ventasRole = roles.find((r) => r.nombre === "VENTAS");  
  const cobranzaRole = roles.find((r) => r.nombre === "COBRANZA");
  const clientRole = roles.find((r) => r.nombre === "CLIENTE");
  const reportesRole = roles.find((r) => r.nombre === "REPORTES");  

  if (!adminRole || !clientRole || !ventasRole || !cobranzaRole || !reportesRole ) {
    throw new Error("Se requieren los roles para crear usuarios.");
  }

  const usersData = [
    {
      roleId: adminRole.id,
      nombre: "Guillermo",
      apellido: "Cascardo",
      dni: "10000001",
      email: "gcascardo@hotmail.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },
    {
      roleId: adminRole.id,
      nombre: "Felix",
      apellido: "Ros",
      dni: "10000002",
      email: "fros@hotmail.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },    
    {
      roleId: cobranzaRole.id,
      nombre: "Marcelo",
      apellido: "De Esteban",
      dni: "40000001",
      email: "mdesteban@ripsa.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    }, 
    {
      roleId: ventasRole.id,
      nombre: "Erica",
      apellido: "Fernadez",
      dni: "30000001",
      email: "efernandez@inmobiliaria.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },         
    {
      roleId: clientRole.id,
      nombre: "Juan",
      apellido: "Pérez",
      dni: "20000001",
      email: "juan.perez@email.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },   
    {
      roleId: clientRole.id,
      nombre: "Ernesto",
      apellido: "Sanz",
      dni: "20000002",
      email: "e.sanz@email.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },
    {
      roleId: clientRole.id,
      nombre: "Lorenzo",
      apellido: "Lamas",
      dni: "20000003",
      email: "l.lamas@email.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },    
    {
      roleId: clientRole.id,
      nombre: "Juan",
      apellido: "De los Palotes",
      dni: "20000004",
      email: "j.palotes@email.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },    
    {
      roleId: clientRole.id,
      nombre: "Maria",
      apellido: "Morello",
      dni: "20000005",
      email: "m.morello@email.com",
      passwordHash: "$2b$10$LEmxqJOd9qoDw6SmsA/JF.d.tGvi7/3KqPs4RW06SYm8fNFKyR.R.",
      activo: true,
    },    
  ];

  const users: User[] = [];
  for (const data of usersData) {
    let user = await repo.findOneBy({ email: data.email });
    if (!user) {
      user = await repo.save(repo.create(data));
    }
    users.push(user);
  }

  return users;
}