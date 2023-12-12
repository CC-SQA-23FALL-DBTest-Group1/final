// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Customer } from "../models";
import { DataConnector } from "./DataConnector";
export class CustomerDataConnector implements DataConnector<Customer>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }
    

    async get(predicates: Object[]): Promise<Customer[]> {
        try {
            return await this.#dataSource.manager.findBy(Customer, predicates)
        } catch (e) {
            throw Error(`Error occured when searching. Code: CS000`)
        }

    }

    async save(entity: Customer): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: CS001`)
        }

    }

    async delete(entity: Customer):Promise<void>{
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (error) {
            throw new Error(`Error occured when removing. Code: CS003`)
        }
    }
}