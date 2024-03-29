// Written by Frederick
// Version 2
// Last update: 2023-12-13
import { DataSource } from "typeorm";
import { MechanicVehicleType } from "../models";
import { DataConnector } from "./DataConnector";
export class MechanicVehicleTypeDataConnector
    implements DataConnector<MechanicVehicleType>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: MechanicVehicleType): Promise<MechanicVehicleType[]> {
        try {
            const repo = this.#dataSource.getRepository(MechanicVehicleType);
            const queryBuilder = repo.createQueryBuilder(`mvt`);
            queryBuilder.leftJoinAndSelect('mvt.employee', 'employee');
            queryBuilder.leftJoinAndSelect('mvt.type', 'type');

            if (
                predicate.employee?.id !== undefined                
                && predicate.employee?.id !== null
                && predicate.employee?.id >= 1
            ) {
                queryBuilder.andWhere(`mvt.employee = :eid`, { eid: predicate.employee.id });
            }

            if (
                predicate.type?.id !== undefined
                && predicate.type?.id !== null
                && predicate.type?.id >= 1                
            ) {
                queryBuilder.andWhere(`mvt.type = :tid`, { tid: predicate.type.id });
            }

            if (
                predicate.status !== undefined
                && predicate.status !== null
            ) {
                queryBuilder.andWhere(`mvt.status = :status`, { status: predicate.status });
            }


            return await queryBuilder.getMany();


        } catch (e) {
            throw Error(`Error occured when searching. Code: MV000`);
        }

    }

    async save(entity: MechanicVehicleType): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: MV001`);
        }

    }

    async delete(entity: MechanicVehicleType): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: MV003`);
        }
    }
}