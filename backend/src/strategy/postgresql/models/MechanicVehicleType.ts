// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { VehicleType } from "./VehicleType";

@Entity()
export class MechanicVehicleType {
    @Index()
    @ManyToOne(() => Employee)
    employee: Employee

    @Index()
    @ManyToOne(() => VehicleType)
    type: VehicleType

    @Column()
    status: boolean
}