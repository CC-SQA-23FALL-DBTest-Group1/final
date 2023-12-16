// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { DataSource } from "typeorm";
import { VehicleRepairRecord } from "../models";
import { DataConnector } from "./DataConnector";
export class VehicleRepairRecordDataConnector
    implements DataConnector<VehicleRepairRecord>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: VehicleRepairRecord): Promise<VehicleRepairRecord[]> {
        try {
            const ds = this.#dataSource
            const queryBuilder = ds.getRepository(VehicleRepairRecord)
                .createQueryBuilder(`vrr`);
            queryBuilder.leftJoinAndSelect('vrr.mechanic', 'mechanic');
            queryBuilder.leftJoinAndSelect('vrr.vehicle', 'vehicle');

            if (
                predicate.id !== undefined
                && predicate.id !== null
                && predicate.id >= 1
            ) {
                queryBuilder.andWhere(`vrr.id = :id`, { id: predicate.id });
            }

            if (
                predicate.actualTime !== undefined
                && predicate.actualTime !== null
                && predicate.actualTime >= 1
            ) {
                queryBuilder.andWhere(
                    `vrr.actualTime = :atime`,
                    { atime: predicate.actualTime }
                );
            }

            if (
                predicate.estimatedTime !== undefined
                && predicate.estimatedTime !== null
                && predicate.estimatedTime >= 1
            ) {
                queryBuilder.andWhere(
                    `vrr.estimatedTime = :etime`,
                    { etime: predicate.estimatedTime }
                );
            }

            if (
                predicate.vehicle.id !== undefined
                && predicate.vehicle.id !== null
                && predicate.vehicle.id >= 1
            ) {
                queryBuilder.andWhere(
                    `vrr.vehicle = :vid`,
                    { vid: predicate.vehicle.id }
                );
            }

            if (
                predicate.mechanic.id !== undefined
                && predicate.mechanic.id !== null
                && predicate.mechanic.id >= 1
            ) {
                queryBuilder.andWhere(
                    `vrr.mechanic = :mid`,
                    { mid: predicate.mechanic.id }
                );
            }

            return await queryBuilder.getMany();

        } catch (e) {
            throw Error(`Error occured when searching. Code: RR000`);
        }

    }

    async save(entity: VehicleRepairRecord): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: RR001`);
        }

    }

    async delete(entity: VehicleRepairRecord): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (e) {
            throw new Error(`Error occured when removing. Code: RR003`);
        }
    }
}