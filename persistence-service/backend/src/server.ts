// Written by Frederick
// Version 2 , 2023-12-11
// Version 3 , 2023-12-14
import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";
import ApiRegister from "./strategy/postgresql/apiregister/ApiRegister";


(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = await postgresDataSource.initialize();
  // Temp Codes for reset database records
  const entities = datasource.entityMetadatas;

  for (const entity of entities) {
    const repository = datasource.getRepository(entity.name);
    let a = await repository.query(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE`);
  }
  // End of temp codes

  await datasource.runMigrations();

  new ApiRegister(datasource, app);

  app.get("/", (_, res) => {
    return res.send("<h1>Final Assignment - Group 1 SEC 3</h1><br>" +
      "<h2>By:<br>Yaonan Deng(Frederick)<br>Xingru Yao(Starley)<br>Keerthana Tikkisetty</h2>");
  });

  app.listen(8000, () => {
    console.log(`Final Assignment server started on 8000`);
  });
})().catch((err) => console.log(err));
