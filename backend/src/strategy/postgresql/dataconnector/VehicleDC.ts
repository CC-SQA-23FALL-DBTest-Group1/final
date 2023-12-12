// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { Vehicle } from "../models";
import { DataConnector } from "./DataConnector";
export class VehicleDataConnector
    implements DataConnector<Vehicle>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<Vehicle[]> {
        try {
            return await this.#dataSource.manager.findBy(
                Vehicle,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: VD000`);
        }

    }

    async save(entity: Vehicle): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: VD001`);
        }

    }

    async delete(entity: Vehicle): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: VD003`);
        }
    }
}