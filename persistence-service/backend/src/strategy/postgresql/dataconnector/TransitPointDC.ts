// Written by Frederick
// Version 2
// Last update: 2023-12-13
import { DataSource } from "typeorm";
import { TransitPoint } from "../models";
import { DataConnector } from "./DataConnector";
export class TransitPointDataConnector implements DataConnector<TransitPoint>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: TransitPoint): Promise<TransitPoint[]> {
        try {

            const queryBuilder = this.#dataSource.getRepository(TransitPoint)
                .createQueryBuilder(`tp`);

            if (
                predicate.name !== undefined
                && predicate.name !== null
                && predicate.name !== ''
            ) {
                queryBuilder.andWhere(`tp.name LIKE :searchTerm`, { searchTerm: `%${predicate.name}%` });
            }

            if (
                predicate.id !== undefined
                && predicate.id !== null
                && predicate.id >= 1
            ) {
                queryBuilder.andWhere(`tp.id = :id`, { id: predicate.id });
            }

            return await queryBuilder.getMany();

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

    async delete(entity: TransitPoint): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: TD003`);
        }
    }
}