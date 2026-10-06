import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

// Entidades
import { Role } from "../../modules/rol/entities/rol.entity.js";
import { User } from "../../modules/usuario/entities/user.entity.js";
import { Loteo } from "../../modules/loteo/entities/loteo.entity.js";
import { Manzana } from "../../modules/manzana/entities/manzana.entity.js";
import { Lote } from "../../modules/lote/entities/lote.entity.js";
import { Servicio } from "../../modules/servicio/entities/servicio.entity.js";
import { LoteServicio } from "../../modules/lote-servicio/entities/lote-servicio.entity.js";

// Seeders
import { seedRoles } from "./role.seeder.js";
import { seedLoteos } from "./loteo.seeder.js";
import { seedUsers } from "./user.seeder.js";
import { seedManzanas } from "./manzana.seeder.js";
import { seedLotes } from "./lote.seeder.js";
import { seedServicios } from "./servicio.seeder.js";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "loteo_balcarce_norte",
  entities: [Role, User, Loteo, Manzana, Lote, Servicio, LoteServicio],
  synchronize: false,
});

async function run() {
  console.log("🔌 Conectando a la base de datos...");
  await AppDataSource.initialize();

  try {
    console.log("🌱 Iniciando ejecución ordenada de seeders...\n");

    console.log("1/6 Ejecutando Seeder de Roles...");
    const roles = await seedRoles(AppDataSource);

    console.log("2/6 Ejecutando Seeder de Loteos...");
    const loteos = await seedLoteos(AppDataSource);

    console.log("3/6 Ejecutando Seeder de Usuarios...");
    await seedUsers(AppDataSource, roles);

    console.log("4/6 Ejecutando Seeder de Manzanas...");
    const manzanas = await seedManzanas(AppDataSource, loteos);

    console.log("5/6 Ejecutando Seeder de Lotes...");
    await seedLotes(AppDataSource, manzanas);

    console.log("6/6 Ejecutando Seeder de Servicios...");
    await seedServicios(AppDataSource);    

    console.log("\n✅ ¡Todos los seeders se ejecutaron con éxito!");
  } catch (error) {
    console.error("❌ Error ejecutando los seeders:", error);
    process.exitCode = 1;
  } finally {
    await AppDataSource.destroy();
    console.log("🔌 Conexión cerrada.");
  }
}

run();