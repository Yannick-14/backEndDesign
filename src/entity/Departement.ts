import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Departement {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    departe: string

}
