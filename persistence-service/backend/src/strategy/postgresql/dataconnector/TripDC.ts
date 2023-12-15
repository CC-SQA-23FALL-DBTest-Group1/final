// Written by Frederick
// Version 2
// Last update: 2023-12-15
import { Brackets, DataSource } from "typeorm";
import { Trip } from "../models";
import { DataConnector } from "./DataConnector";
export class TripDataConnector
    implements DataConnector<Trip>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: Trip): Promise<Trip[]> {
        try {
            const queryBuilder = this.#dataSource.getRepository(Trip)
                .createQueryBuilder(`t`);
            queryBuilder.leftJoinAndSelect('t.vehicle', 'vehicle');
            queryBuilder.leftJoinAndSelect('t.to', 'to');
            queryBuilder.leftJoinAndSelect('t.from', 'from');
            queryBuilder.leftJoinAndSelect('t.driver1', 'driver1');
            queryBuilder.leftJoinAndSelect('t.driver2', 'driver2');


            if (
                predicate.id !== undefined
                && predicate.id !== null
                && predicate.id >= 1
            ) {
                queryBuilder.andWhere(`t.id = :tid`, { tid: predicate.id });
            }

            if (
                predicate.vehicle.id !== undefined
                && predicate.vehicle.id !== null
                && predicate.vehicle.id >= 1
            ) {
                queryBuilder.andWhere(`t.vehicle = :vid`, { vid: predicate.vehicle.id });
            }

            if (
                predicate.from.id !== undefined
                && predicate.from.id !== null
                && predicate.from.id >= 1
            ) {
                queryBuilder.andWhere(`t.from = :fid`, { fid: predicate.from.id });
            }

            if (
                predicate.to.id !== undefined
                && predicate.to.id !== null
                && predicate.to.id >= 1
            ) {
                queryBuilder.andWhere(`t.to = :oid`, { oid: predicate.to.id });
            }

            if (
                predicate.driver1.id !== undefined
                && predicate.driver1.id !== null
                && predicate.driver1.id >= 1
            ) {
                queryBuilder.andWhere(
                    new Brackets(qb => {
                        qb.where('t.driver1 = :d1id', { d1id: predicate.driver1.id })
                            .orWhere('t.driver2 = :d2id', { d2id: predicate.driver1.id });
                    })
                );
            }

            if (
                predicate.driver2 !== undefined
                && predicate.driver2 !== null
                && predicate.driver2.id !== undefined
                && predicate.driver2.id !== null
                && predicate.driver2.id >= 1
            ) {
                queryBuilder.andWhere(
                    new Brackets(qb => {
                        qb.where('t.driver1 = :r1id', { r1id: predicate.driver2!.id })
                            .orWhere('t.driver2 = :r2id', { r2id: predicate.driver2!.id });
                    })
                );
            }

            return await queryBuilder.getMany();

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