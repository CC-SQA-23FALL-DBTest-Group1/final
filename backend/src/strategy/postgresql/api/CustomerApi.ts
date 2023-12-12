// Written by Frederick
// Version 2
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Customer } from "../models/Customer";
import { DataConnector } from "../configure";

export default class CustomerApi {
    #dataConnector: CustomerDataConnector;

    constructor(dataConnector: CustomerDataConnector) {
        this.#dataConnector = dataConnector;
    }

    async getCustomerByID(id: number): Promise<Customer> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: CG000`)
        }
        const result = await this.#dataConnector.get([{ id: id }])
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Customer with ID ${id} not found. Code: CG001`)
        }

    }

    async getCustomers(predicates: Object[]): Promise<Customer[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(name: string, address: string, phoneNumber1: string,
        phoneNumber2: string): Promise<Customer> {

        var customer = new Customer();
        customer.name = name;
        customer.address = address;
        customer.phoneNumber1 = phoneNumber1;
        customer.phoneNumber2 = phoneNumber2

        await this.#dataConnector.save(customer);

        return customer;

    }

    async updateByID(id: number, name: string, address: string,
        phoneNumber1: string, phoneNumber2: string): Promise<Customer> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: CU002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var customer = result[0];
        customer.name = name;
        customer.address = address;
        customer.phoneNumber1 = phoneNumber1;
        customer.phoneNumber2 = phoneNumber2;

        await this.#dataConnector.save(customer);

        return customer;

    }



}


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
}