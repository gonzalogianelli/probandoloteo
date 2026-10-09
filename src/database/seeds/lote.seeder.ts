import { DataSource } from "typeorm";
import { Lote, LoteEstado } from "../../modules/lote/entities/lote.entity.js";
import { Manzana } from "../../modules/manzana/entities/manzana.entity.js";
import { LoteServicio } from "../../modules/lote-servicio/entities/lote-servicio.entity.js";

export async function seedLotes(
  dataSource: DataSource,
  manzanas: Manzana[]
): Promise<Lote[]> {
  const repoLote = dataSource.getRepository(Lote);
  const repoLoteServicio = dataSource.getRepository(LoteServicio);

  const manzanaA = manzanas.find((m) => m.nombre === "Manzana A");
  const manzanaF = manzanas.find((m) => m.nombre === "Manzana F");
  if (!manzanaA || !manzanaF) {
    throw new Error("Se requiere la 'Manzana A' y 'Manzana F' para asociar los lotes.");
  }

  const lotesData = [
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-01",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 18",
      entreCalle1: "Calle 17",
      entreCalle2: "Calle 19",
      serviciosIds: [1, 2],      
    },
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-02",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [1, 2],
    },
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-03",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [1, 2],      
    },
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-04",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [1, 2],      
    },
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-05",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [1, 2],      
    },
    {
      manzanaId: manzanaF.id,
      codigo: "LOTE-01",
      largo: 50,
      ancho: 10,
      superficie: 500,
      precio: 25000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 48 e/ 53 y 55",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [3, 6],      
    },
    {
      manzanaId: manzanaF.id,
      codigo: "LOTE-02",
      largo: 50,
      ancho: 10,
      superficie: 500,
      precio: 25000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 48 e/ 53 y 55",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [1, 5],      
    },
  ];

  const lotes: Lote[] = [];

  for (const { serviciosIds, ...data } of lotesData) {
    // 1. Guardar o recuperar el Lote
    let lote = await repoLote.findOneBy({
      manzanaId: data.manzanaId,
      codigo: data.codigo,
    });

    if (!lote) {
      lote = await repoLote.save(repoLote.create(data));
    }

    // 2. Si vienen servicios, guardar la relación en LoteServicio
    if (serviciosIds && serviciosIds.length > 0) {
      for (const servicioId of serviciosIds) {
        const existeRelacion = await repoLoteServicio.findOneBy({
          loteId: lote.id,
          servicioId,
        });

        if (!existeRelacion) {
          await repoLoteServicio.save(
            repoLoteServicio.create({
              loteId: lote.id,
              servicioId,
            })
          );
        }
      }
    }

    lotes.push(lote);
  }

  return lotes;
}
/*
import { DataSource } from "typeorm";
import { Lote, LoteEstado } from "../../modules/lote/entities/lote.entity.js";
import { Manzana } from "../../modules/manzana/entities/manzana.entity.js";

export async function seedLotes(
  dataSource: DataSource,
  manzanas: Manzana[]
): Promise<Lote[]> {
  const repo = dataSource.getRepository(Lote);
  const manzanaA = manzanas.find((m) => m.nombre === "Manzana A");
  const manzanaF = manzanas.find((m) => m.nombre === "Manzana F");
  if (!manzanaA || !manzanaF) {
    throw new Error("Se requiere la 'Manzana A' para asociar los lotes.");
  }

  const lotesData = [
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-01",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
    },
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-02",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16",
      entreCalle1: "Calle 21",
      entreCalle2: "Calle 23",
      serviciosIds: [
            1,
            2
      ]      
    },
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-03",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
    },    
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-04",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
    }, 
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-05",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
    },     
    {
      manzanaId: manzanaA.id,
      codigo: "LOTE-03",
      largo: 30,
      ancho: 12.5,
      superficie: 375,
      precio: 15000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 16 e/ 18 y 20",
    }, 
    {
      manzanaId: manzanaF.id,
      codigo: "LOTE-01",
      largo: 50,
      ancho: 10,
      superficie: 500,
      precio: 25000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 48 e/ 53 y 55",
    },     
    {
      manzanaId: manzanaF.id,
      codigo: "LOTE-02",
      largo: 50,
      ancho: 10,
      superficie: 500,
      precio: 25000,
      estado: LoteEstado.LIBRE,
      direccion: "Calle 48 e/ 53 y 55",
    },         
  ];

  const lotes: Lote[] = [];
  for (const data of lotesData) {
    let lote = await repo.findOneBy({
      manzanaId: data.manzanaId,
      codigo: data.codigo,
    });
    if (!lote) {
      lote = await repo.save(repo.create(data));
    }
    lotes.push(lote);
  }

  return lotes;
}*/