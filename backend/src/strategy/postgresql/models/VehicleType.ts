// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column("varchar")
    name:string
}