import { DataSource } from "typeorm";
import { Loteo } from "../../modules/loteo/entities/loteo.entity.js";

export async function seedLoteos(dataSource: DataSource): Promise<Loteo[]> {
  const repo = dataSource.getRepository(Loteo);

  const loteosData = [
    {
      nombre: "Balcarce Norte",
      descripcion: "Desarrollo residencial en zona norte",
      ubicacion: "Balcarce, Buenos Aires",
      activo: true,
    },
    {
      nombre: "Sierra Mirador",
      descripcion: "Desarrollo residencial sobre Sierra Sur",
      ubicacion: "Balcarce, Buenos Aires",
      activo: true,
    },    
  ];

  const loteos: Loteo[] = [];
  for (const data of loteosData) {
    let loteo = await repo.findOneBy({ nombre: data.nombre });
    if (!loteo) {
      loteo = await repo.save(repo.create(data));
    }
    loteos.push(loteo);
  }

  return loteos;
}