import { DataSource } from "typeorm";
import { Manzana } from "../../modules/manzana/entities/manzana.entity.js";
import { Loteo } from "../../modules/loteo/entities/loteo.entity.js";

export async function seedManzanas(
  dataSource: DataSource,
  loteos: Loteo[]
): Promise<Manzana[]> {
  const repo = dataSource.getRepository(Manzana);
  const loteoPrincipal = loteos[0];
  const loteoProximo = loteos[1];

  if (!loteoPrincipal || !loteoProximo) {
    throw new Error("Se requiere al menos un loteo para asociar las manzanas.");
  }


  const manzanasData = [
    {
      loteoId: loteoPrincipal.id,
      nombre: "Manzana A",
      circunscripcion: "I",
      seccion: "A",
      callePar1: "Calle 16",
      callePar2: "Calle 18",
    },
    {
      loteoId: loteoPrincipal.id,
      nombre: "Manzana B",
      circunscripcion: "I",
      seccion: "A",
      callePar1: "Calle 18",
      callePar2: "Calle 20",
    },
    {
      loteoId: loteoPrincipal.id,
      nombre: "Manzana C",
      circunscripcion: "I",
      seccion: "A",
      callePar1: "Calle 20",
      callePar2: "Calle 22",
    },    
    {
      loteoId: loteoProximo.id,
      nombre: "Manzana F",
      circunscripcion: "X",
      seccion: "C",
      callePar1: "Calle 53",
      callePar2: "Calle 55",
    },    
    {
      loteoId: loteoProximo.id,
      nombre: "Manzana G",
      circunscripcion: "X",
      seccion: "C",
      callePar1: "Calle 55",
      callePar2: "Calle 57",
    },        
  ];

  const manzanas: Manzana[] = [];
  for (const data of manzanasData) {
    let manzana = await repo.findOneBy({
      loteoId: data.loteoId,
      nombre: data.nombre,
    });
    if (!manzana) {
      manzana = await repo.save(repo.create(data));
    }
    manzanas.push(manzana);
  }

  return manzanas;
}