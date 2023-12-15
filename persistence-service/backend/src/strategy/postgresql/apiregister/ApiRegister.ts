// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Express } from "express";
import { CustomerApiRegister } from "./CustomerApiRegister";
import { VehicleTypeApiRegister } from "./VehicleTypeApiRegister";

/**
 * Register all table urls here
 */
export default class ApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        new CustomerApiRegister(dataSource, express);
        new VehicleTypeApiRegister(dataSource, express);



    }


}