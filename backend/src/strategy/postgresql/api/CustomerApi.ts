// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Customer } from "../models/Customer";
import { DataConnector } from "../configure";

export default class CustomerApi {
    #dataConnector: CustomerDataConnector;

    constructor(dataConnector: CustomerDataConnector) {
        this.#dataConnector = dataConnector;
    }

    async getCustomerByID(id: number) {
        if (isNaN(id) || id < 0 ) {
            return Error(`The id is not valid.`)
        }
        const result = await this.#dataConnector.get({ id: id })
        if (result instanceof Error) {
            return result
        }
        return result[0]
    }



}


export class CustomerDataConnector implements DataConnector<Customer>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }

    async get(predicate: Object): Promise<Customer[] | Error> {
        try {
            return await this.#dataSource.manager.findBy(Customer, predicate)
        } catch (e) {
            return Error(`Error occured when searching. Code: CS000`)
        }

    }

    async save(entity: Customer): Promise<void | Error> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            return Error(`Error occured when saving. Code: CS001`)
        }

    }
}