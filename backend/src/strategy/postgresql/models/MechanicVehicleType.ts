// Written by Frederick
// Version 3
// Last update: 2023-12-12
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { VehicleType } from "./VehicleType";

@Entity()
@Index(["employee", "type"], { unique: true })
export class MechanicVehicleType {
    // Have to add this because of limitation of TypeORM
    // The Foreign Key with Class Data Type can not be the Primary key.
    @PrimaryGeneratedColumn()
    private id: number 

    // @PrimaryColumn()
    @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
    employee: Employee;

    // @PrimaryColumn()
    @ManyToOne(() => VehicleType, { onDelete: 'CASCADE' })
    type: VehicleType;

    @Column()
    status: boolean;
}