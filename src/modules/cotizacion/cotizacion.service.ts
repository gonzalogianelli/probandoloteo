import { Injectable, InternalServerErrorException } from "@nestjs/common";

interface CotizacionItem {
  nombre?: string;
  casa?: string;
  venta: number | string;
}

@Injectable()
export class CotizacionService {
  async dolar() {
    const url =
      process.env.DOLAR_API_URL || "https://dolarapi.com/v1/ambito/dolares";

    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) throw new Error("Error en la respuesta de la API");

      const raw: CotizacionItem[] = await res.json();
      const wanted = ["oficial", "blue", "bolsa"];

      // 1. Extraemos los valores numéricos de venta para los tipos deseados
      const valoresVenta = wanted
        .map((tipo) => {
          const x = raw.find((v) =>
            String(v.nombre ?? v.casa)
              .toLowerCase()
              .includes(tipo),
          );
          return x ? Number(x.venta) : null;
        })
        .filter((val): val is number => val !== null && !isNaN(val));

      if (valoresVenta.length === 0) {
        throw new Error("No se encontraron cotizaciones válidas");
      }

      // 2. Obtenemos el valor máximo
      const mayorCotizacion = Math.max(...valoresVenta);

      return {
        statusCode: 200,
        message: "Cotización más alta obtenida correctamente",
        data: {
          fuente: "Ámbito Financiero",
          dolarMasAltoVenta: mayorCotizacion,
        },
      };
    } catch {
      throw new InternalServerErrorException(
        "No se pudo obtener la cotización en este momento",
      );
    }
  }
}


/*
import { Injectable, InternalServerErrorException } from "@nestjs/common";
@Injectable()
export class CotizacionService {
  async dolar() {
    const url =
      process.env.DOLAR_API_URL || "https://dolarapi.com/v1/ambito/dolares";
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) throw new Error();
      const raw: any[] = await res.json();
      const wanted = ["oficial", "blue", "bolsa"];
      const cotizaciones = wanted
        .map((tipo) => {
          const x = raw.find((v) =>
            String(v.nombre ?? v.casa)
              .toLowerCase()
              .includes(tipo),
          );
          return x
            ? {
                tipo,
                compra: Number(x.compra),
                venta: Number(x.venta),
                fechaActualizacion: x.fechaActualizacion ?? null,
              }
            : null;
        })
        .filter(Boolean);
      return {
        statusCode: 200,
        message: "Cotización obtenida correctamente",
        data: { fuente: "Ámbito Financiero vía DolarApi", cotizaciones },
      };
    } catch {
      throw new InternalServerErrorException(
        "No se pudo obtener la cotización en este momento",
      );
    }
  }
}
*/