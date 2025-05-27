import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port : 3306,
    username : "matt",
    password : "matt",
    database : "matt",
    synchronize : true,
    logging : true,
    entities : [User],
    migrations : [],
    subscribers : []
})