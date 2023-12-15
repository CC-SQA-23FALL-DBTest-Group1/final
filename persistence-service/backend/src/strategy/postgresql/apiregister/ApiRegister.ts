// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Express } from "express";
import { CustomerApiRegister } from "./CustomerApiRegister";
import { VehicleTypeApiRegister } from "./VehicleTypeApiRegister";
import { EmployeeApiRegister } from "./EmployeeApiRegister";
import { EmployeeVehicleTypeOperationApiRegister } from "./EmployeeVehicleTypeOperationApiRegister";
import { MechanicVehicleTypeApiRegister } from "./MechanicVehicleTypeApiRegister";

/**
 * Register all table urls here
 */
export default class ApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        new CustomerApiRegister(dataSource, express);
        new EmployeeApiRegister(dataSource, express);
        new EmployeeVehicleTypeOperationApiRegister(dataSource, express);
        new MechanicVehicleTypeApiRegister(dataSource, express);
        // new ShipmentApiR
        // new ShipmentRouteApiR
        // new TransitPointApiR
        // new TripApiR
        // new VehicleApiR
        // new VehicleRepairRecordApiR
        new VehicleTypeApiRegister(dataSource, express);
    }
}