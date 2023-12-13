// Written by Frederick
// Version 3
// Last update: 2023-12-12
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TransitPoint } from "./TransitPoint"
import { Customer } from "./Customer"

@Entity()
export class Shipment {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => TransitPoint)
    from: TransitPoint

    @ManyToOne(() => TransitPoint)
    to: TransitPoint

    @Column("int")
    weight: number // gram

    @Column("float")
    value: number

    @ManyToOne(() => Customer, { onDelete: 'CASCADE' })
    customer: Customer
}