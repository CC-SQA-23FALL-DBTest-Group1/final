// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { EmployeeVehicleTypeOperation } from "../models";
import { DataConnector } from "./DataConnector";
export class EmployeeVehicleTypeOperationDataConnector
    implements DataConnector<EmployeeVehicleTypeOperation>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<EmployeeVehicleTypeOperation[]> {
        try {
            return await this.#dataSource.manager.findBy(
                EmployeeVehicleTypeOperation,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: EV000`);
        }

    }

    async save(entity: EmployeeVehicleTypeOperation): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: EV001`);
        }

    }

    async delete(entity: EmployeeVehicleTypeOperation): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: EV003`);
        }
    }
}