import { DataSource } from "typeorm";
import { Servicio } from "../../modules/servicio/entities/servicio.entity.js";

export async function seedServicios(dataSource: DataSource): Promise<Servicio[]> {
  const repo = dataSource.getRepository(Servicio);

  const serviciosData = [
    { nombre: "Agua Corriente", activo: true },
    { nombre: "Luz Eléctrica", activo: true },
    { nombre: "Gas Natural", activo: true },
    { nombre: "Red Cloacal", activo: true },
    { nombre: "Alumbrado Público", activo: true },
    { nombre: "Internet / Fibra Óptica", activo: true },
    { nombre: "Asfalto", activo: true },
  ];

  const servicios: Servicio[] = [];
  for (const data of serviciosData) {
    let servicio = await repo.findOneBy({ nombre: data.nombre });
    if (!servicio) {
      servicio = await repo.save(repo.create(data));
    }
    servicios.push(servicio);
  }

  return servicios;
}