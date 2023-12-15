// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Express } from "express";
import { CustomerApiRegister } from "./CustomerApiRegister";
import { VehicleApi } from "../api/VehicleApi";
import VehicleTypeApiRegister from "./VehicleTypeApiRegister";

/**
 * Register all table urls here
 */
export default class ApiRegister {
    // #express: Express;
    // #dataSource: DataSource;

    constructor(dataSource: DataSource, express: Express) {
        // this.#dataSource = dataSource;
        // this.#express = express;

        new CustomerApiRegister(dataSource, express);
        new VehicleTypeApiRegister(dataSource,express);





    }


}