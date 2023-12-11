// Written by Frederick
// Version 2
// Last update: 2023-12-10
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm"
import { Shipment } from "./Shipment"
import { Trip } from "./Trip"

@Entity()
export class ShipmentRoute {

    @PrimaryColumn()
    @Index()
    @ManyToOne(() => Shipment)
    shipment: number

    @PrimaryColumn()
    @Column("int")
    order: number

    @ManyToOne(() => Trip)
    trip: number
}