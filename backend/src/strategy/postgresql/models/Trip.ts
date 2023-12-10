// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Vehicle } from "./Vehicle"
import { Employee } from "./Employee"
import { TransitPoint } from "./TransitPoint"

@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Vehicle)
    vehicle: Vehicle

    @ManyToOne(() => Employee)
    driver1: Employee

    @ManyToOne(() => Employee, { nullable: true })
    driver2: Employee

    @ManyToOne(() => TransitPoint)
    from: TransitPoint

    @ManyToOne(() => TransitPoint)
    to: TransitPoint
}