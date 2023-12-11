// Written by Frederick
// Version 2
// Last update: 2023-12-10
import { Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { Employee } from "./Employee";
import { VehicleType } from "./VehicleType";

@Entity()
export class EmployeeVehicleTypeOperation {
    @Index()
    @PrimaryColumn()
    @ManyToOne(() => Employee)
    employee: number

    @PrimaryColumn()
    @ManyToOne(() => VehicleType)
    type: number
}