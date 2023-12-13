// Written by Frederick and Xingru
// Version 2
// Last update: 2023-12-13

import { Shipment, ShipmentRoute, Trip } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class ShipmentRouteApi {
    #dataConnector: DataConnector<ShipmentRoute>;

    constructor(dataConnector: DataConnector<ShipmentRoute>) {
        this.#dataConnector = dataConnector;
    }

    async getByShipment(shipment: Shipment): Promise<ShipmentRoute[]> {

        const result = await this.#dataConnector.get([{ shipment: shipment }])

        return result;
    }

    async get(shipment: Shipment, order: number): Promise<ShipmentRoute> {
        if (isNaN(order) || order < 0) {
            throw new Error(`The order is not valid. Code: SA000`)
        }

        const result = await this.#dataConnector.get([{
            shipment: shipment,
            order: order
        }])

        if (result.length != 1) {
            throw Error(`Combination of shipment and order not found. Code: SA001`);
        }

        return result[0];
    }

    async create(shipment: Shipment, order: number, trip: Trip): Promise<ShipmentRoute> {

        if (isNaN(order) || order < 0) {
            throw new Error(`The order is not valid. Code: SA002`)
        }

        if(order>9999 || order <0) {

            throw new Error(
                'Shipmentroute order(${order}) is not valid. Code: SR005'
            );
        }
        let shipmentRoute = new ShipmentRoute();
        shipmentRoute.shipment = shipment;
        shipmentRoute.order = order;
        shipmentRoute.trip = trip;

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async update(shipment: Shipment, order: number, trip: Trip): Promise<ShipmentRoute> {

        if (isNaN(order) || order < 0) {
            throw new Error(`The order is not valid. Code: SA003`)
        }

        const result = await this.#dataConnector.get([{
            shipment: shipment,
            order: order
        }])

        if (result.length != 1) {
            throw Error(`Combination of shipment and order not found. Code: SA004`);
        }

        let shipmentRoute = result[0];
        shipmentRoute.shipment = shipment;
        shipmentRoute.order = order;
        shipmentRoute.trip = trip;

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async delete(shipment: Shipment, order: number) {
        if (isNaN(order) || order < 0) {
            throw new Error(`The order is not valid. Code: SA005`)
        }

        const result = await this.#dataConnector.get([{
            shipment: shipment,
            order: order
        }])

        if (result.length != 1) {
            throw Error(`Combination of shipment and order not found. Code: SA006`);
        }

        const shipmentRoute = result[0];

        await this.#dataConnector.delete(shipmentRoute);

    }

}


