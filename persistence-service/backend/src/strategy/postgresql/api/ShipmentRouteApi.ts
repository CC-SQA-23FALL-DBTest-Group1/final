// Written by Frederick 
// Version 4
// Last update: 2023-12-14
// Reviewed by Xingru
//version 3
// Last update: 2023-12-14

import { Shipment, ShipmentRoute, Trip } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";
import { ShipmentRouteDataConnector } from "../dataconnector";

export class ShipmentRouteApi {
    #dataConnector: DataConnector<ShipmentRoute>;

    constructor(dataConnector:
        DataConnector<ShipmentRoute>) {
        this.#dataConnector = dataConnector;
    }

    async get(predicate: ShipmentRoute): Promise<ShipmentRoute[]> {

        const dataConnector = this.#dataConnector as
            ShipmentRouteDataConnector
        const result = await dataConnector.get(predicate);

        if (result.length >= 1) {
            return result;
        } else {
            throw new Error(
                `Combination of Shipment and trip not found. `
                + `Code: SA001`
            );
        }
    }

    async create(shipment: Shipment, order: number, trip: Trip): Promise<ShipmentRoute> {

        if (isNaN(order) || order < 0) {
            throw new Error(`The order is not valid. Code: SA002`)
        }

        let shipmentRoute = new ShipmentRoute();
        shipmentRoute.shipment = shipment;
        shipmentRoute.order = order;
        shipmentRoute.trip = trip;

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async update(
        shipment: Shipment,
        order: number,
        newTrip: Trip
    ): Promise<ShipmentRoute> {

        let predicate = new ShipmentRoute();
        predicate.shipment = shipment;
        predicate.order = order;

        let srs = await this.get(predicate);

        let shipmentRoute = srs[0];
        shipmentRoute.shipment = shipment;
        shipmentRoute.order = order;
        shipmentRoute.trip = newTrip;

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async delete(shipment: Shipment, order: number) {

        let predicate = new ShipmentRoute();
        predicate.order = order;
        predicate.shipment = shipment;

        let srs = await this.get(predicate);

        let shipmentRoute = srs[0];

        await this.#dataConnector.delete(shipmentRoute);

    }

}


