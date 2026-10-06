import "dotenv/config";
import "reflect-metadata";
import bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
import { Role } from "./modules/rol/entities/rol.entity.js";
import { Loteo } from "./modules/loteo/entities/loteo.entity.js";
import { Manzana } from "./modules/manzana/entities/manzana.entity.js";
import { Lote } from "./modules/lote/entities/lote.entity.js";
import { Servicio } from "./modules/servicio/entities/servicio.entity.js";
import { LoteServicio } from "./modules/lote-servicio/entities/lote-servicio.entity.js"; // 👈 AGREGADO
import { PlanPago } from "./modules/plan/entities/plan.entity.js";
import { User } from "./modules/usuario/entities/user.entity.js";
import { Venta } from "./modules/venta/entities/venta.entity.js";
import { Cuota } from "./modules/cuota/entities/cuota.entity.js";
import { MedioPago } from "./modules/medio/entities/medio.entity.js";
import { Pago } from "./modules/pago/entities/pago.entity.js";
import { PagoCuota } from "./modules/pago-cuota/entities/pago-cuota.entity.js";
import { PagoMedio } from "./modules/pago-medio/entities/pago-medio.entity.js";

const ds = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "loteo_balcarce_norte",
  entities: [
    Role,
    Loteo,
    Manzana,
    Lote,
    Servicio,
    LoteServicio,
    PlanPago,
    User,
    Venta,
    Cuota,
    MedioPago,
    Pago,
    PagoCuota,
    PagoMedio,
  ],
  synchronize: false,
});

async function main() {
  try {
    process.stdout.write("Connecting to the database...\n");
    await ds.initialize();

    const rr = ds.getRepository(Role);
    const ur = ds.getRepository(User);

    for (const [nombre, descripcion] of [
      ["ADMIN", "Acceso completo"],
      ["COBRANZA", "Gestión de cobranzas"],
      ["VENTA", "Gestión de ventas"],
      ["CLIENTE", "Acceso al perfil propio"],
    ] as const) {
      if (!(await rr.findOneBy({ nombre }))) {
        await rr.save(rr.create({ nombre, descripcion }));
      }
    }

    async function ensureUser(
      dni: string,
      pass: string,
      nombre: string,
      apellido: string,
      email: string,
      roleName: string,
    ) {
      const role = await rr.findOneByOrFail({ nombre: roleName });
      let u = await ur.findOneBy({ dni });
      if (!u) {
        u = ur.create({
          dni,
          nombre,
          apellido,
          email,
          telefono: null,
          passwordHash: await bcrypt.hash(pass, 12),
          roleId: role.id,
          clientId: null,
          activo: true,
        });
        await ur.save(u);
      }
    }

    await ensureUser(
      "10000000",
      "Admin123!",
      "ADMIN",
      "Sistema",
      "admin@balcarcenorte.com",
      "ADMIN",
    );
    await ensureUser(
      "20000000",
      "Cobranza123!",
      "Usuario",
      "Cobranzas",
      "cobranzas@balcarcenorte.com",
      "COBRANZA",
    );
    await ensureUser(
      "30000000",
      "Venta123!",
      "Usuario",
      "Ventas",
      "ventas@balcarcenorte.com",
      "VENTA",
    );
    await ensureUser(
      "31458902",
      "Cliente123!",
      "María Belén",
      "Acosta",
      "maria.acosta@email.com",
      "CLIENTE",
    );

    process.stdout.write("Seed completed.\n");
  } catch (error) {
    process.stderr.write(`Seed failed: ${String(error)}\n`);
    process.exitCode = 1;
  } finally {
    if (ds.isInitialized) {
      await ds.destroy();
    }
  }
}

main();
