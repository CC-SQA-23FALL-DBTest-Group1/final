// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { Employee } from "../models";
import { DataConnector } from "./DataConnector";
export class EmployeeDataConnector implements DataConnector<Employee>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }
    

    async get(predicates: Object[]): Promise<Employee[]> {
        try {
            return await this.#dataSource.manager.findBy(Employee, predicates);
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

    async delete(entity: Employee):Promise<void>{
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: ES003`);
        }
    }
}