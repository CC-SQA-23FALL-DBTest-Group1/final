// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { Employee } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class EmployeeApi {
    #dataConnector: DataConnector<Employee>;

    constructor(dataConnector: DataConnector<Employee>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Employee> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: EA000`)
        }
        const result = await this.#dataConnector.get([{ id: id }])
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Employee with ID ${id} not found. Code: EA001`)
        }

    }

    async get(predicates: Object[]): Promise<Employee[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(
        firstName: string,
        lastName: string,
        seniority: number
    ): Promise<Employee> {

        if (seniority > 9999 || seniority < 0) {
            throw new Error(
                `Employee's seniority(${seniority}) is not valid. Code: EA005`
            );
        }
        let employee = new Employee();
        employee.firstName = firstName.trim();
        employee.lastName = lastName.trim();
        employee.seniority = seniority;
        if(employee.firstName.length == 0){
            throw new Error(`First name can not be empty. Code: EA006`)
        }
        if(employee.lastName.length == 0){
            throw new Error(`Last name can not be empty. Code: EA007`)
        }

        await this.#dataConnector.save(employee);

        return employee;

    }

    async updateByID(
        id: number,
        firstName: string,
        lastName: string,
        seniority: number
    ): Promise<Employee> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: EA002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var employee = result[0];
        employee.firstName = firstName.trim();
        employee.lastName = lastName.trim();
        employee.seniority = seniority;
        if(employee.firstName.length == 0){
            throw new Error(`First name can not be empty. Code: EA008`)
        }
        if(employee.lastName.length == 0){
            throw new Error(`Last name can not be empty. Code: EA009`)
        }

        await this.#dataConnector.save(employee);

        return employee;

    }

    async deleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: EA003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`Employee with ID ${id} not found. Code: EA004`);
        }

        const employee = result[0];

        await this.#dataConnector.delete(employee);

    }



}


