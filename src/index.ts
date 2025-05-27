import "reflect-metadata";
import express from "express";
import { AppDataSource } from "@/data-source";
import UserRouter from "@/routes/user.routes";

import cors from "cors";

const app = express();
const PORT = process.env.port || 3001;

app.use(cors());
app.use(express.json())
app.use("/api", UserRouter);

AppDataSource.initialize().then(()=>{
    console.log("data source has been initialised!");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((error)=>{
    console.log("Error during initialising the datasource!!", error);
})