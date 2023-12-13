// Written by Frederick
// Version 1
// Last update: 2023-12-13

import { Employee, EmployeeVehicleTypeOperation, VehicleType } from "../models";
import { DataConnector, EmployeeVehicleTypeOperationDataConnector } from "../dataconnector";

export class EmployeeVehicleTypeOperationApi {
    #dataConnector: DataConnector<EmployeeVehicleTypeOperation>;

    constructor(dataConnector: DataConnector<EmployeeVehicleTypeOperation>) {
        this.#dataConnector = dataConnector;
    }

    async get(employee?: Employee, type?: VehicleType)
        : Promise<EmployeeVehicleTypeOperation[]> {

        const dataConnector = this.#dataConnector as EmployeeVehicleTypeOperationDataConnector

        const result = await dataConnector.get(employee, type);

        if (result.length >= 1) {
            return result;
        } else {
            throw new Error(
                `Combination of Employee and Vehicle Type not found. `
                + `Code: EO001`
            );
        }
    }

    async create(employee: Employee, type: VehicleType)
        : Promise<EmployeeVehicleTypeOperation> {

        if (!(employee instanceof Employee)) {
            throw new Error(
                `Employee is not valid. `
                + `Code: EO002`
            );
        }

        if (!(type instanceof VehicleType)) {
            throw new Error(
                `Old Vehicle type is not valid. `
                + `Code: EO003`
            );
        }
        

        let evto = new EmployeeVehicleTypeOperation();
        evto.employee = employee;
        evto.type = type;

        await this.#dataConnector.save(evto);

        return evto;

    }

    async update(employee: Employee, type: VehicleType, newType: VehicleType)
        : Promise<EmployeeVehicleTypeOperation> {

        const dataConnector = this.#dataConnector as EmployeeVehicleTypeOperationDataConnector

        const result = await dataConnector.get(employee, type);

        if (result.length < 1) {
            throw new Error(
                `Combination of Employee and Vehicle Type not found. `
                + `Code: EO004`
            );
        }
        else if (result.length > 1) {
            throw new Error(
                `Implimentation Error. `
                + `Code: EO005`
            );
        }

        let evto = result[0];

        await this.#dataConnector.delete(evto);

        evto = await this.create(employee,newType);

        return evto;
    }

    async delete(employee: Employee, type: VehicleType) {
        const dataConnector = this.#dataConnector as EmployeeVehicleTypeOperationDataConnector

        const result = await dataConnector.get(employee, type);

        if (result.length < 1) {
            throw new Error(
                `Combination of Employee and Vehicle Type not found. `
                + `Code: EO006`
            );
        }
        else if (result.length > 1) {
            throw new Error(
                `Implimentation Error. `
                + `Code: EO007`
            );
        }

        const evto = result[0];

        await this.#dataConnector.delete(evto);

    }

}