// Written by Frederick
// Version 2
// Last update: 2023-12-10
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";

@Entity()
export class VehicleRepairRecord {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    estimatedTime: number // days

    @Column("int")
    actualTime: number // days

    @ManyToOne(() => Vehicle)
    vehicle: Vehicle

    @ManyToOne(() => Employee)
    mechanic: Employee

}