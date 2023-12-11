// Written by Frederick
// Version 2
// Last update: 2023-12-11
import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";


(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = await postgresDataSource.initialize();


  app.get("/", (_, res) => {
    return res.send("<h1>Final Assignment - Group 1 SEC 3</h1><br>"+
    "<h2>By:<br>Yaonan Deng(Frederick)<br>Xingru Yao(Starley)<br>Keerthana Tikkisetty</h2>");
  });

  app.listen(8000, () => {
    console.log(`Final Assignment server started on 8000`);
  });
})().catch((err) => console.log(err));
