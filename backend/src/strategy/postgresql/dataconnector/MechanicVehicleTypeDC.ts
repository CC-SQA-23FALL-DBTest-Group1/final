// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { MechanicVehicleType } from "../models";
import { DataConnector } from "./DataConnector";
export class MechanicVehicleTypeDataConnector
    implements DataConnector<MechanicVehicleType>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicates: Object[]): Promise<MechanicVehicleType[]> {
        try {
            return await this.#dataSource.manager.findBy(
                MechanicVehicleType,
                predicates
            );
        } catch (e) {
            throw Error(`Error occured when searching. Code: MV000`);
        }

    }

    async save(entity: MechanicVehicleType): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: MV001`);
        }

    }

    async delete(entity: MechanicVehicleType): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: MV003`);
        }
    }
}