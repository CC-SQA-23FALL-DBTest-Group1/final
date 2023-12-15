// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { DataConnector } from ".";
import { VehicleType } from "../models";

export class VehicleTypeDataConnector implements DataConnector<VehicleType>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: VehicleType): Promise<VehicleType[]> {
        try {

            const queryBuilder = this.#dataSource.getRepository(VehicleType)
                .createQueryBuilder(`vt`);

            if (
                predicate.id !== undefined
                && predicate.id !== null
                && predicate.id >= 1
            ) {
                queryBuilder.andWhere(`vt.id = :id`, { id: predicate.id });
            }

            if (
                predicate.name !== undefined
                && predicate.name !== null
                && predicate.name.trim() !== ''
            ) {
                queryBuilder.andWhere(`vt.name LIKE :searchTerm`, { searchTerm: `%${predicate.name.trim()}%` });
            }

            return await queryBuilder.getMany();
            
        } catch (e) {
            throw Error(`Error occured when searching. Code: VS000`)
        }

    }

    async save(entity: VehicleType): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: VS001`)
        }

    }

    async delete(entity: VehicleType): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (error) {
            throw new Error(`Error occured when removing. Code: VS003`)
        }
    }
}