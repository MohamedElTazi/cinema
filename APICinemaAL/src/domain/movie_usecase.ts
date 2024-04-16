import { DataSource, Repository } from "typeorm";
import { Movie } from "../database/entities/movie";

export interface ListMovieFilter {
    page: number
    limit: number
    durationMax: number
}
export interface ListMovieRequest {
    page?: number
    limit?: number
    durationMax?: number
}
export interface UpdateMovieParams {
    duration?: number
}
export class MovieUsecase {
    constructor(private readonly db: DataSource) { }

    async listSalle(listMovieFilter: ListMovieFilter): Promise<{ Movies: Movie[]; totalCount: number; }> {
        console.log(listMovieFilter)
        const query = this.db.createQueryBuilder(Movie, 'Movie')
        if (listMovieFilter.durationMax) {
            query.andWhere('Movie.duration <= :durationMax', { durationMax: listMovieFilter.durationMax })
        }
        query.skip((listMovieFilter.page - 1) * listMovieFilter.limit)
        query.take(listMovieFilter.limit)

        const [Movies, totalCount] = await query.getManyAndCount()
        return {
            Movies,
            totalCount
        }
    }
    async updateMovie(movie_id: number, { duration }: UpdateMovieParams): Promise<Movie | null> {
        const repo = this.db.getRepository(Movie)
        const Moviefound = await repo.findOneBy({ movie_id })
        if (Moviefound === null) return null

        if (duration) {
            Moviefound.duration = duration
        }

        const MovieUpdate = await repo.save(Moviefound)
        return MovieUpdate
    }
}