import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Departement } from "./entity/Departement";
import { Creation } from "./entity/Creation";
import { ImageCreation } from "./entity/ImageCreation";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cvdtblt2ng1s73cak2lg-a",
    port: 5432,
    username: "gestion_design_user",
    password: "OH6SqtICsF1wYp40EXillMx2UTLgtH3G",
    database: "gestion_design",
    synchronize: true,
    logging: true,
    entities: [User, Departement, ImageCreation, Creation],
    migrations: [],
    subscribers: [],
});
