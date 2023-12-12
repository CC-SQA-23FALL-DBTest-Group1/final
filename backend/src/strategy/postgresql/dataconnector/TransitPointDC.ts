// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { TransitPoint } from "../models";
import { DataConnector } from "./DataConnector";
export class TransitPointDataConnector implements DataConnector<TransitPoint>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }
    

    async get(predicates: Object[]): Promise<TransitPoint[]> {
        try {
            return await this.#dataSource.manager.findBy(TransitPoint, predicates);
        } catch (e) {
            throw Error(`Error occured when searching. Code: TD000`);
        }

    }

    async save(entity: TransitPoint): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: TD001`);
        }

    }

    async delete(entity: TransitPoint):Promise<void>{
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: TD003`);
        }
    }
}