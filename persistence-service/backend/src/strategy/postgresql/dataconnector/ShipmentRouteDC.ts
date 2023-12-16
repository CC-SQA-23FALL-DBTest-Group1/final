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


    async get(predicate: ShipmentRoute): Promise<ShipmentRoute[]> {
        try {
            const queryBuilder = this.#dataSource.getRepository
                (ShipmentRoute)
                .createQueryBuilder(`sr`);
            queryBuilder.leftJoinAndSelect(`sr.shipment`, `shipment`);
            queryBuilder.leftJoinAndSelect(`sr.trip`, `trip`);
            queryBuilder.leftJoinAndSelect(`trip.vehicle`, `vehicle`);
            queryBuilder.leftJoinAndSelect(`vehicle.type`, `type`);
            queryBuilder.leftJoinAndSelect(`trip.from`, `tfrom`);
            queryBuilder.leftJoinAndSelect(`trip.to`, `tto`);
            queryBuilder.leftJoinAndSelect(`trip.driver1`, `driver1`);
            queryBuilder.leftJoinAndSelect(`trip.driver2`, `driver2`);
            queryBuilder.leftJoinAndSelect(`shipment.customer`, `customer`);
            queryBuilder.leftJoinAndSelect(`shipment.from`, `sfrom`);
            queryBuilder.leftJoinAndSelect(`shipment.to`, `sto`);


            if (
                predicate.shipment?.id !== undefined
                && predicate.shipment?.id >= 1
                && predicate.shipment?.id !== null
            ) {
                queryBuilder.andWhere(`sr.shipment = :sid`, { sid: predicate.shipment.id });
            }

            if (
                predicate.order !== undefined
                && predicate.order >= 0
                && predicate.order !== null
            ) {
                queryBuilder.andWhere(`sr.order = :order`, { order: predicate.order });
            }

            if (
                predicate.trip?.id !== undefined
                && predicate.trip?.id >= 1
                && predicate.trip?.id !== null
            ) {
                queryBuilder.andWhere(`sr.trip = :tid`, { tid: predicate.trip.id });
            }

            return queryBuilder.getMany();


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