// Written by Frederick and Xingru
// Version 1
// Last update: 2023-12-11

import { Shipment, ShipmentRoute, Trip } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class ShipmentRouteApi {
    #dataConnector: DataConnector<ShipmentRoute>;

    constructor(dataConnector: DataConnector<ShipmentRoute>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<ShipmentRoute> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VT000`)
        }
        const result = await this.#dataConnector.get([{ id: id }])
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Customer with ID ${id} not found. Code: VT001`)
        }

    }

    async get(predicates: Object[]): Promise<ShipmentRoute[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(
        shipment: Shipment,
        order:number,
        trip: Trip
        ): Promise<ShipmentRoute> {

        if(order>9999 || order <0) {

            throw new Error(
                'Shipmentroute order(${order}) is not valid. Code: SR005'
            );
        }
        let shipmentRoute = new ShipmentRoute();
        shipmentRoute.shipment=shipment;
        shipmentRoute.order = order;
        shipmentRoute.trip = trip;
        if( shipmentRoute.shipment.length ==0){
            throw new Error('shipment can not be empty. Code: SR006')
        }
        if( shipmentRoute.trip.length == 0){
            throw new Error('trip can not be empty. Code: SR007')
        }

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async updateByID(
        shipment: Shipment,
        order:number,
        trip: Trip
        ): Promise<ShipmentRoute> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: SR002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var shipmentRoute = result[0];
        shipmentRoute.shipment=shipment;
        shipmentRoute.order = order;
        shipmentRoute.trip = trip;

 if( shipmentRoute.shipment.length ==0){
            throw new Error('shipment can not be empty. Code: SR008')
        }
        if( shipmentRoute.trip.length == 0){
            throw new Error('trip can not be empty. Code: SR009')
        }
        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async DeleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: SR003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`ShipmentRoute with ID ${id} not found. Code: SR004`);
        }

        const shipmentRoute = result[0];

        await this.#dataConnector.delete(shipmentRoute);

    }



}


