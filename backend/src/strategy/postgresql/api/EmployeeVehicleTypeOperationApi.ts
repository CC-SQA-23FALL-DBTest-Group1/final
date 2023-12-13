// Written by Keerthana
// Version 1
// Last update: 2023-12-12
import { EmployeeVehicleTypeOperation } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class EmployeeVehicleTypeOperationApi {
    #dataConnector: DataConnector<EmployeeVehicleTypeOperation>;

    constructor(dataConnector: DataConnector<EmployeeVehicleTypeOperation>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<EmployeeVehicleTypeOperation> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: EV000`)
        }
        const result = await this.#dataConnector.get([{ id: id }])
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`EmployeeVehicleTypeOperation with ID ${id} not found. Code: EV001`)
        }

    }

    async get(predicates: Object[]): Promise<EmployeeVehicleTypeOperation[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(employee: number,type: number): Promise<EmployeeVehicleTypeOperation> {

        let employeeVehicleTypeOperation = new EmployeeVehicleTypeOperation();
        employeeVehicleTypeOperation.employee = employee;
        employeeVehicleTypeOperation.type = type;

        await this.#dataConnector.save(employeeVehicleTypeOperation);

        return employeeVehicleTypeOperation;

    }

    async updateByID(id: number, employee: number,type: number): Promise<EmployeeVehicleTypeOperation> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: EV002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var employeeVehicleTypeOperation = result[0];
        employeeVehicleTypeOperation.employee = employee;
        employeeVehicleTypeOperation.type = type;

        await this.#dataConnector.save(employeeVehicleTypeOperation);

        return employeeVehicleTypeOperation;

    }

    async DeleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: EV003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`EmployeeVehicleTypeOperation with ID ${id} not found. Code: EV004`);
        }

        const employeeVehicleTypeOperation = result[0];

        await this.#dataConnector.delete(employeeVehicleTypeOperation);

    }

        


}
