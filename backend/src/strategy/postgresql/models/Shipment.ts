// Written by Frederick
// Version 2
// Last update: 2023-12-10
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TransitPoint } from "./TransitPoint"
import { Customer } from "./Customer"

@Entity()
export class Shipment {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => TransitPoint)
    from: number

    @ManyToOne(() => TransitPoint)
    to: number

    @Column("int")
    weight: number // gram

    @Column("float")
    value: number

    @ManyToOne(() => Customer)
    customer: number
}