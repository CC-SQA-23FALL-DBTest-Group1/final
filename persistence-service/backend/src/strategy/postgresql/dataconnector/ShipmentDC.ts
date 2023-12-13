// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { Shipment } from "../models";
import { DataConnector } from "./DataConnector";
export class ShipmentDataConnector
    implements DataConnector<Shipment>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<Shipment[]> {
        try {
            return await this.#dataSource.manager.findBy(
                Shipment,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: SD000`);
        }

    }

    async save(entity: Shipment): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: SD001`);
        }

    }

    async delete(entity: Shipment): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: SD003`);
        }
    }
}