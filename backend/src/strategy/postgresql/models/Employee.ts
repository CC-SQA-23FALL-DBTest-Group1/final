// Written by Frederick
// Version 1
// Last update: 2023-12-09
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    firstName: string

    @Column("varchar")
    lastName: string

    @Column({
        type: "int",
        width: 4
    })
    seniority: number
}