// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { VehicleType } from "./VehicleType"

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    brand: string

    @Column({type: "varchar"})
    model: string

    @Column({type: "int", default: 0})
    load: number //gram

    @Column({ type: "int"})
    capacity: number //gram

    @Column({ type: "int", width: 4 })
    year: number

    @Column({ type: "int"})
    numberOfRepair: number

    @ManyToOne(() => VehicleType)
    type: VehicleType
}