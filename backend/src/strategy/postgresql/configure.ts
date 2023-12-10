import { DataSource } from "typeorm";
import {
  Customer, Employee, EmployeeVehicleTypeOperation, MechanicVehicleType,
  Shipment, ShipmentRoute, TransitPoint, Trip, Vehicle, VehicleRepairRecord,
  VehicleType
} from "./models";


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
  migrations: [],
});
