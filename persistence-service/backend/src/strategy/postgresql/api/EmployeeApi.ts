// Written by Frederick
// Version 2
// Last update: 2023-12-13
import { Employee } from "../models";
import { EmployeeDataConnector, DataConnector } from "../dataconnector";

export class EmployeeApi {
    #dataConnector: DataConnector<Employee>;

    constructor(dataConnector: DataConnector<Employee>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Employee> {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: EA000`)
        }

        const dataConnector = this.#dataConnector as EmployeeDataConnector;
        let predicate = new Employee();
        predicate.id = id;
        const result = await dataConnector.get(predicate);
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Employee with ID ${id} not found. Code: EA001`)
        }

    }

    async get(predicate: Employee): Promise<Employee[]> {

        const dataConnector = this.#dataConnector as EmployeeDataConnector;
        const result = await dataConnector.get(predicate);
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
        if (employee.firstName.length == 0) {
            throw new Error(`First name can not be empty. Code: EA006`)
        }
        if (employee.lastName.length == 0) {
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

        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: EA002`)
        }
        if (seniority > 9999 || seniority < 0) {
            throw new Error(`The ID is not valid. Code: EA010`)
        }

        const dataConnector = this.#dataConnector as EmployeeDataConnector;
        let predicate = new Employee();
        predicate.id = id;
        const result = await dataConnector.get(predicate);

        var employee = result[0];
        employee.firstName = firstName.trim();
        employee.lastName = lastName.trim();
        employee.seniority = seniority;
        if (employee.firstName.length == 0) {
            throw new Error(`First name can not be empty. Code: EA008`)
        }
        if (employee.lastName.length == 0) {
            throw new Error(`Last name can not be empty. Code: EA009`)
        }

        await this.#dataConnector.save(employee);

        return employee;

    }

    async deleteByID(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: EA003`);
        }

        const dataConnector = this.#dataConnector as EmployeeDataConnector;
        let predicate = new Employee();
        predicate.id = id;
        const result = await dataConnector.get(predicate);

        if (result.length < 1) {
            throw new Error(`Employee with ID ${id} not found. Code: EA004`);
        }

        const employee = result[0];

        await this.#dataConnector.delete(employee);

    }



}


