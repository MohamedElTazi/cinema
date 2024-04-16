import { DataSource, Repository } from "typeorm";
import { Salle } from "../database/entities/salle";

export interface ListSalleFilter {
    page: number
    limit: number
    capacityMax?: number
}
export interface ListSalleRequest {
    page?: number
    limit?: number
    capacityMax?: number
}
export interface UpdateSalleParams {
    capacity?: number
}
export class SalleUsecase {
    constructor(private readonly db: DataSource) { }

    async listSalle(listSalleFilter: ListSalleFilter): Promise<{ Salles: Salle[]; totalCount: number; }> {
        console.log(listSalleFilter)
        const query = this.db.createQueryBuilder(Salle, 'Salle')
        if (listSalleFilter.capacityMax) {
            query.andWhere('Salle.capacity <= :capacityMax', { capacityMax: listSalleFilter.capacityMax })
        }
        query.skip((listSalleFilter.page - 1) * listSalleFilter.limit)
        query.take(listSalleFilter.limit)

        const [Salles, totalCount] = await query.getManyAndCount()
        return {
            Salles,
            totalCount
        }
    }
    async updateSalle(salle_id: number, { capacity }: UpdateSalleParams): Promise<Salle | null> {
        const repo = this.db.getRepository(Salle)
        const Sallefound = await repo.findOneBy({ salle_id })
        if (Sallefound === null) return null

        if (capacity) {
            Sallefound.capacity = capacity
        }

        const SalleUpdate = await repo.save(Sallefound)
        return SalleUpdate
    }
}