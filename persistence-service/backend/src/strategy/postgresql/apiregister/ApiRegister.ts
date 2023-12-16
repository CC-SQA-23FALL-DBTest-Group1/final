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
import { TransitPointApiRegister } from "./TransitPointApiRegister";
import { ShipmentApiRegister } from "./ShipmentApiRegister";
import { TripApiRegister } from "./TripApiRegister";
import { VehicleRepairRecordApiRegister } from "./VehicleRepairRecordApiRegister";
import { ShipmentRouteApiRegister } from "./ShipmentRouteApiRegister";
import { VehicleApiRegister } from "./VehicleApiRegister";

/**
 * Register all table urls here
 */
export default class ApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        new CustomerApiRegister(dataSource, express);
        new EmployeeApiRegister(dataSource, express);
        new EmployeeVehicleTypeOperationApiRegister(dataSource, express);
        new MechanicVehicleTypeApiRegister(dataSource, express);
        new ShipmentApiRegister(dataSource, express);
        new ShipmentRouteApiRegister(dataSource, express);
        new TransitPointApiRegister(dataSource, express);
        new TripApiRegister(dataSource, express);
        new VehicleApiRegister(dataSource, express);
        new VehicleRepairRecordApiRegister(dataSource, express);
        new VehicleTypeApiRegister(dataSource, express);
    }
}