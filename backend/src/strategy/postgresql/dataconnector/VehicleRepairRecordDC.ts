// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { VehicleRepairRecord } from "../models";
import { DataConnector } from "./DataConnector";
export class VehicleRepairRecordDataConnector
    implements DataConnector<VehicleRepairRecord>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<VehicleRepairRecord[]> {
        try {
            return await this.#dataSource.manager.findBy(
                VehicleRepairRecord,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: RR000`);
        }

    }

    async save(entity: VehicleRepairRecord): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: RR001`);
        }

    }

    async delete(entity: VehicleRepairRecord): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: RR003`);
        }
    }
}