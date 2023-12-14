// Written by Frederick
// Version 2
// Last update: 2023-12-13
import { DataSource } from "typeorm";
import { Employee } from "../models";
import { DataConnector } from "./DataConnector";
export class EmployeeDataConnector implements DataConnector<Employee>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: Employee): Promise<Employee[]> {
        try {
            const queryBuilder = this.#dataSource.getRepository(Employee)
                .createQueryBuilder(`e`);

                if (
                    predicate.id !== undefined                    
                    && predicate.id !== null
                    && predicate.id >= 1
                ) {
                    queryBuilder.andWhere(`e.id = :id`, { id: predicate.id });
                }
    
                if (
                    predicate.firstName !== undefined   
                    && predicate.firstName !== null
                    && predicate.firstName !== ''
                ) {
                    queryBuilder.andWhere(`c.firstName LIKE :searchTerm`, { searchTerm: `%${predicate.firstName}%` });
                }

                if (
                    predicate.lastName !== undefined
                    && predicate.lastName !== null
                    && predicate.lastName !== ''                    
                ) {
                    queryBuilder.andWhere(`c.lastName LIKE :searchTerm`, { searchTerm: `%${predicate.lastName}%` });
                }

                if (
                    predicate.seniority !== undefined
                    && predicate.seniority !== null
                    && predicate.seniority > 0
                    && predicate.seniority < 9999                    
                ) {
                    queryBuilder.andWhere(`c.seniority = :searchTerm`, { searchTerm: `%${predicate.seniority}%` });
                }

                return await queryBuilder.getMany();

        } catch (e) {
            throw Error(`Error occured when searching. Code: ES000`);
        }

    }

    async save(entity: Employee): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: ES001`);
        }

    }

    async delete(entity: Employee): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: ES003`);
        }
    }
}