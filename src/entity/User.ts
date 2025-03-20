import { Entity, PrimaryGeneratedColumn, Column ,OneToOne , JoinColumn} from "typeorm"

// import { Departement } from "./Departement"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    // @OneToOne(() => Departement)
    // @JoinColumn()
    // departement: Departement

}
