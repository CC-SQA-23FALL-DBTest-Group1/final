// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { ShipmentRoute } from "../models";
import { DataConnector } from "./DataConnector";
export class ShipmentRouteDataConnector
    implements DataConnector<ShipmentRoute>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<ShipmentRoute[]> {
        try {
            return await this.#dataSource.manager.findBy(
                ShipmentRoute,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: SC000`);
        }

    }

    async save(entity: ShipmentRoute): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: SC001`);
        }

    }

    async delete(entity: ShipmentRoute): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: SC003`);
        }
    }
}