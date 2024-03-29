// Written by Frederick
// Version 3
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import {
  Customer, Employee, EmployeeVehicleTypeOperation, MechanicVehicleType,
  Shipment, ShipmentRoute, TransitPoint, Trip, Vehicle, VehicleRepairRecord,
  VehicleType
} from "./models";
import { InterData1702592349735 } from "./migrations/1702592349735-InterData";


export const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Customer, Employee, EmployeeVehicleTypeOperation,
    MechanicVehicleType, Shipment, ShipmentRoute, TransitPoint,
    Trip, Vehicle, VehicleRepairRecord, VehicleType],
  synchronize: true,
  logging: false,
  migrations: [
    InterData1702592349735
  ],
});


