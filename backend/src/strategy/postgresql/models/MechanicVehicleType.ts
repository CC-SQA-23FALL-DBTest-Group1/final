// Written by Frederick
// Version 2
// Last update: 2023-12-10
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { Employee } from "./Employee";
import { VehicleType } from "./VehicleType";

@Entity()
export class MechanicVehicleType {
    @Index()
    @PrimaryColumn()
    @ManyToOne(() => Employee)
    employee: number

    @Index()
    @PrimaryColumn()
    @ManyToOne(() => VehicleType)
    type: number

    @Column()
    status: boolean
}