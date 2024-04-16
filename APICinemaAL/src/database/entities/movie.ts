import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movie" })
export class Movie {
    @PrimaryGeneratedColumn()
    movie_id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    duration: number

    @Column()
    genre: string

    constructor(id: number, title: string, description: string, duration: number, genre: string) {
        this.movie_id = id
        this.title = title
        this.description = description
        this.duration = duration
        this.genre = genre
    }
}