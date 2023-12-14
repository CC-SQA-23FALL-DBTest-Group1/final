// Written by Frederick
// Version 2
// Last update: 2023-12-11
import { Customer } from "../models";
import { CustomerDataConnector, DataConnector } from "../dataconnector";

export class CustomerApi {
    #dataConnector: DataConnector<Customer>;

    constructor(dataConnector: DataConnector<Customer>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Customer> {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: CG000`)
        }
        const dataConnector = this.#dataConnector as CustomerDataConnector;
        let predicate = new Customer();
        predicate.id = id;
        const result = await dataConnector.get(predicate)
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Customer with ID ${id} not found. Code: CG001`)
        }

    }

    async get(predicates: Customer): Promise<Customer[]> {
        const dataConnector = this.#dataConnector as CustomerDataConnector;
        const result = await dataConnector.get(predicates);
        return result;
    }

    async create(name: string, address: string, phoneNumber1: string,
        phoneNumber2: string): Promise<Customer> {

        var customer = new Customer();
        customer.name = name.trim();
        customer.address = address.trim();
        customer.phoneNumber1 = phoneNumber1.trim();
        customer.phoneNumber2 = phoneNumber2.trim();

        if(customer.name.length == 0) {
            throw new Error(`Name can not be empty. Code: CU005`);
        }
        if(customer.address.length == 0) {
            throw new Error(`Address can not be empty. Code: CU006`);
        }
        if(customer.phoneNumber1.length == 0) {
            throw new Error(`Phone Number 1 can not be empty. Code: CU007`);
        }
        if(customer.phoneNumber2.length == 0) {
            throw new Error(`Phone Number 2 can not be empty. Code: CU008`);
        }

        await this.#dataConnector.save(customer);

        return customer;

    }

    async updateByID(id: number, name: string, address: string,
        phoneNumber1: string, phoneNumber2?: string): Promise<Customer> {

        let customer = await this.getByID(id);
        customer.name = name.trim();
        customer.address = address.trim();
        customer.phoneNumber1 = phoneNumber1.trim();
        customer.phoneNumber2 = phoneNumber2?.trim() ?? null;;

        if(customer.name.length == 0) {
            throw new Error(`Name can not be empty. Code: CU009`);
        }
        if(customer.address.length == 0) {
            throw new Error(`Address can not be empty. Code: CU010`);
        }
        if(customer.phoneNumber1.length == 0) {
            throw new Error(`Phone Number 1 can not be empty. Code: CU011`);
        }

        await this.#dataConnector.save(customer);

        return customer;

    }

    async deleteByID(id:number){
        
        let customer = await this.getByID(id);

        await this.#dataConnector.delete(customer);

    }



}


