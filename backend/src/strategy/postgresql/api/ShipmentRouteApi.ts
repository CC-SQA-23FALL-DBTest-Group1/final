// Written by Frederick and Xingru
// Version 1
// Last update: 2023-12-11

import { ShipmentRoute } from "../models";
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

    async create(name: string): Promise<ShipmentRoute> {

        let shipmentRoute = new ShipmentRoute();
        shipmentRoute.name = name;

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async updateByID(id: number, newName: string): Promise<ShipmentRoute> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VT002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var shipmentRoute = result[0];
        shipmentRoute.name = newName;

        await this.#dataConnector.save(shipmentRoute);

        return shipmentRoute;

    }

    async DeleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VT003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`Vehicle Type with ID ${id} not found. Code: VT004`);
        }

        const shipmentRoute = result[0];

        await this.#dataConnector.delete(shipmentRoute);

    }



}


