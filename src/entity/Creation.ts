import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ImageCreation } from "./ImageCreation";

@Entity()
export class Creation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false }) // ✅ Empêche les valeurs NULL
    titre: string;

    @Column({ nullable: false }) // ✅ Empêche les valeurs NULL
    description: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // ✅ Date automatique
    date_publication: Date;

    @Column({ nullable: false }) // ✅ Empêche les valeurs NULL
    lien_inspection: string;

    @OneToMany(() => ImageCreation, (imageCreation) => imageCreation.creation, { cascade: true })
    images: ImageCreation[];
}
