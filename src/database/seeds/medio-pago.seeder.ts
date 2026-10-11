import { DataSource } from "typeorm";
import { MedioPago } from "../../modules/medio/entities/medio.entity.js";

export async function seedMediosPago(
  dataSource: DataSource
): Promise<MedioPago[]> {
  const repo = dataSource.getRepository(MedioPago);

  const mediosData = [
    { nombre: "Efectivo"},
    { nombre: "Transferencia bancaria"},
    { nombre: "Tarjeta de Débito"},
    { nombre: "Tarjeta de Crédito"},
    { nombre: "Deposito Bancario"},    
    { nombre: "Mercado Pago"},
    { nombre: "Bitcoin / Cripto"},
    { nombre: "Dolar Cripto USDT/USDC"},    
    { nombre: "Dolar Billete"},    
    { nombre: "Cheque"},
  ];

  const medios: MedioPago[] = [];

  for (const data of mediosData) {
    let medio = await repo.findOneBy({ nombre: data.nombre });
    if (!medio) {
      medio = await repo.save(repo.create(data));
    }
    medios.push(medio);
  }

  return medios;
}