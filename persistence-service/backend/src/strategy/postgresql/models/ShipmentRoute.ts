// Written by Frederick
// Version 3
// Last update: 2023-12-12
import { Column, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Shipment } from "./Shipment"
import { Trip } from "./Trip"

@Entity()
export class ShipmentRoute {

    // Have to add this because of limitation of TypeORM
    // The Foreign Key with Class Data Type can not be the Primary key.
    @PrimaryGeneratedColumn()
    private id: number

    @Index()
    @ManyToOne(() => Shipment, { onDelete: 'CASCADE' })
    shipment: Shipment

    @PrimaryColumn()
    @Column("int")
    order: number

    @ManyToOne(() => Trip)
    trip: Trip
}