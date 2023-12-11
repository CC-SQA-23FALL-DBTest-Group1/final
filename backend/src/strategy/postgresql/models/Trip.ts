// Written by Frederick
// Version 2
// Last update: 2023-12-10
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Vehicle } from "./Vehicle"
import { Employee } from "./Employee"
import { TransitPoint } from "./TransitPoint"

@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Vehicle)
    vehicle: number

    @ManyToOne(() => Employee)
    driver1: number

    @ManyToOne(() => Employee, { nullable: true })
    driver2: number

    @ManyToOne(() => TransitPoint)
    from: number

    @ManyToOne(() => TransitPoint)
    to: number
}