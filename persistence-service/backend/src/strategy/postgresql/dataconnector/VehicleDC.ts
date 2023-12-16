// Written by Frederick
// Version 2
// Last update: 2023-12-13
import { DataSource } from "typeorm";
import { Vehicle } from "../models";
import { DataConnector } from "./DataConnector";
export class VehicleDataConnector
    implements DataConnector<Vehicle>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: Vehicle): Promise<Vehicle[]> {
        try {
            const queryBuilder = this.#dataSource.getRepository(Vehicle)
                .createQueryBuilder(`v`);
            queryBuilder.leftJoinAndSelect(`v.type`, `type`);

            if (
                predicate.id !== undefined
                && predicate.id !== null
                && predicate.id >= 1
            ) {
                queryBuilder.andWhere(`v.id = :id`, { id: predicate.id });
            }

            if (
                predicate.brand !== undefined
                && predicate.brand !== null
                && predicate.brand.trim() !== ''
            ) {
                queryBuilder.andWhere(
                    `v.brand LIKE :searchTerm1`,
                    { searchTerm1: `%${predicate.brand}%` }
                );
            }

            if (
                predicate.model !== undefined
                && predicate.model !== null
                && predicate.model.trim() !== ''
            ) {
                queryBuilder.andWhere(
                    `v.model LIKE :searchTerm2`,
                    { searchTerm2: `%${predicate.model}%` }
                );
            }

            if (
                predicate.load !== undefined
                && predicate.load !== null
                && predicate.load >= 0
            ) {
                queryBuilder.andWhere(`v.load = :load`, { load: predicate.load });
            }

            if (
                predicate.capacity !== undefined
                && predicate.capacity !== null
                && predicate.capacity >= 0
            ) {
                queryBuilder.andWhere(
                    `v.capacity = :capacity`,
                    { capacity: predicate.capacity }
                );
            }

            if (
                predicate.year !== undefined
                && predicate.year !== null
                && predicate.year >= 0
                && predicate.year <= 9999
            ) {
                queryBuilder.andWhere(`v.year = :year`, { year: predicate.year });
            }

            if (
                predicate.numberOfRepair !== undefined
                && predicate.numberOfRepair !== null
                && predicate.numberOfRepair >= 0
            ) {
                queryBuilder.andWhere(
                    `v.numberOfRepair = :numberOfRepair`,
                    { numberOfRepair: predicate.numberOfRepair }
                );
            }

            if (
                predicate.type.id !== undefined
                && predicate.type.id !== null
                && predicate.type.id >= 1
            ) {
                queryBuilder.andWhere(`v.type = :tid`, { tid: predicate.type.id });
            }

            return await queryBuilder.getMany();
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