// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Entity, Index, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { VehicleType } from "./VehicleType";

@Entity()
export class EmployeeVehicleTypeOperation {
    @Index()
    @ManyToOne(() => Employee)
    employee: Employee

    @ManyToOne(() => VehicleType)
    type: VehicleType
}