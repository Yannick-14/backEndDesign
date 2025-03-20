import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Departement } from "./entity/Departement"
import { Creation } from "./entity/Creation"
import { ImageCreation } from "./entity/ImageCreation"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [User,Departement,ImageCreation,Creation],
    migrations: [],
    subscribers: [],
})
