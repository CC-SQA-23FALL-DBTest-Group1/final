// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { Employee, EmployeeVehicleTypeOperation, VehicleType } from "../models";
import { DataConnector } from "./DataConnector";
export class EmployeeVehicleTypeOperationDataConnector
    implements DataConnector<EmployeeVehicleTypeOperation>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(e?: Employee, vt?: VehicleType): Promise<EmployeeVehicleTypeOperation[]> {
        try {
            const queryBuilder = this.#dataSource.getRepository(EmployeeVehicleTypeOperation)
                .createQueryBuilder(`evt`);

            if (e !== undefined && e !== null) {
                queryBuilder.where(`evt.employee = :employeeID`, { employeeID: e.id });
            }

            if (vt !== undefined && vt !== null) {
                queryBuilder.andWhere(`evt.type = :typeID`, { typeID: vt.id });
            }

            return await queryBuilder.getMany();
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