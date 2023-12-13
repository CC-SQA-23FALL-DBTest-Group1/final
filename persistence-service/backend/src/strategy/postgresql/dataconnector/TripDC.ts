// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { Trip } from "../models";
import { DataConnector } from "./DataConnector";
export class TripDataConnector
    implements DataConnector<Trip>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<Trip[]> {
        try {
            return await this.#dataSource.manager.findBy(
                Trip,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: TR000`);
        }

    }

    async save(entity: Trip): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: TR001`);
        }

    }

    async delete(entity: Trip): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: TR003`);
        }
    }
}