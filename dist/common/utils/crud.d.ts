import { ObjectLiteral, Repository } from "typeorm";
export declare function resolveOrder<T extends ObjectLiteral>(repository: Repository<T>, orderby?: string): Record<string, "ASC" | "DESC"> | undefined;
export declare function ensureUpdateData(data: object): void;
