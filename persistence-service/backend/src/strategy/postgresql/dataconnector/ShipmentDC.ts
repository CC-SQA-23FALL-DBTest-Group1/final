// Written by Frederick
// Version 1
// Last update: 2023-12-12
//Reviewed by Xingru
//Version 2
// Last update: 2023-12-13
import { DataSource } from "typeorm";
import { Shipment } from "../models";
import { DataConnector } from "./DataConnector";

export class ShipmentDataConnector
    implements DataConnector<Shipment>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: Shipment): Promise<Shipment[]> {

        try {

            const queryBuilder = this.#dataSource.getRepository(Shipment)
                .createQueryBuilder(`s`);
            queryBuilder.leftJoinAndSelect('s.customer', 'customer');
            queryBuilder.leftJoinAndSelect('s.to', 'to');
            queryBuilder.leftJoinAndSelect('s.from', 'from');

            if (predicate &&
                predicate.id !== undefined
                && predicate.id !== null
                && predicate.id >= 1
            ) {
                queryBuilder.andWhere(`s.id = :sid`, { sid: predicate.id });

            }
            if (
                predicate.from?.id !== undefined
                && predicate.from?.id !== null
                && predicate.from?.id >= 1
            ) {
                queryBuilder.andWhere(`s.from = :fid`, { fid: predicate.from.id });
            }

            if (
                predicate.to?.id !== undefined
                && predicate?.to.id !== null
                && predicate?.to.id >= 1
            ) {
                queryBuilder.andWhere(`s.to = :tid`, { tid: predicate.to.id });
            }

            if (
                predicate.weight !== undefined
                && predicate.weight !== null
                && predicate.weight >= 1
            ) {
                queryBuilder.andWhere(`s.weight = :weight`, { weight: predicate.weight });
            }

            if (
                predicate.value !== undefined
                && predicate.value !== null
                && predicate.value >= 0
            ) {
                queryBuilder.andWhere(`s.value = :value`, { value: predicate.value });
            }

            if (
                predicate.customer?.id !== undefined
                && predicate.customer?.id !== null
                && predicate.customer?.id >= 1
            ) {
                queryBuilder.andWhere(`s.customer = :cid`, { cid: predicate.customer.id });
            }

            return await queryBuilder.getMany();

        } catch (e) {
            console.log(e)
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