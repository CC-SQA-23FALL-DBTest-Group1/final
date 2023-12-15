// Written by Frederick
// Version 3
// Last update: 2023-12-15
import { DataSource } from "typeorm";
import { EmployeeVehicleTypeOperation } from "../models";
import { DataConnector } from "./DataConnector";
export class EmployeeVehicleTypeOperationDataConnector
    implements DataConnector<EmployeeVehicleTypeOperation>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: EmployeeVehicleTypeOperation): Promise<EmployeeVehicleTypeOperation[]> {
        try {
            const repo = this.#dataSource.getRepository(EmployeeVehicleTypeOperation);
            const queryBuilder = repo.createQueryBuilder(`evt`);
            queryBuilder.leftJoinAndSelect('evt.employee', 'employee');
            queryBuilder.leftJoinAndSelect('evt.type', 'type');
            
            if (
                predicate.employee?.id !== undefined
                && predicate.employee?.id !== null
                && predicate.employee?.id >= 1                
            ) {
                queryBuilder.andWhere(`evt.employee = :id`, { id: predicate.employee.id });
            }
            
            if (
                predicate.type?.id !== undefined
                && predicate.type?.id !== null
                && predicate.type?.id >= 1                
            ) {
                queryBuilder.andWhere(`evt.type = :typeid`, { typeid: predicate.type.id });
                
            }
            
            return await queryBuilder.getMany();
        } catch (e) {
            console.log(e);
            throw Error(`Error occured when searching. Code: EV000`);
        }

    }

    async save(entity: EmployeeVehicleTypeOperation): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: EV001`);
        }

    }

    async delete(entity: EmployeeVehicleTypeOperation): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: EV003`);
        }
    }
}