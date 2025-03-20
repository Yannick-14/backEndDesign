import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Creation } from "./Creation";

@Entity()
export class ImageCreation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @ManyToOne(() => Creation, (creation) => creation.images, { onDelete: "CASCADE" })
    creation: Creation;
}
