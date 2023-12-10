// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column("varchar")
    name: string

    @Column("varchar")
    address: string

    @Column({
        type: "varchar",
        length: 20,
    })
    phoneNumber1: string

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
    })
    phoneNumber2: string
}