// Written by Keerthana
// Version 1
// Last update: 2023-12-13
// Reviewed By Frederick
// Reviewed on 2023-12-13
import { TransitPoint } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class TransitPointApi {
    #dataConnector: DataConnector<TransitPoint>;

    constructor(dataConnector: DataConnector<TransitPoint>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<TransitPoint> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: TS000`)
        }
        const result = await this.#dataConnector.get(id);
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Transit Point with ID ${id} not found. Code: TS001`)
        }

    }

    async getByName(name: string): Promise<TransitPoint[]> {
        const result = await this.#dataConnector.get(name);
        return result;
    }

    async create(name: string): Promise<TransitPoint> {
        if (name.trim().length == 0) {
            throw new Error(`Name can not be empty. Code: TS005`)
        }
        let transitPoint = new TransitPoint();
        transitPoint.name = name.trim();

        await this.#dataConnector.save(transitPoint);

        return transitPoint;

    }

    async updateByID(id: number, newName: string): Promise<TransitPoint> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: TS002`)
        }
        if (newName.trim().length == 0) {
            throw new Error(`Name can not be empty. Code: TS006`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var transitPoint = result[0];
        transitPoint.name = newName.trim();

        await this.#dataConnector.save(transitPoint);

        return transitPoint;

    }

    async deleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: TS003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`Transit Point with ID ${id} not found. Code: TS004`);
        }

        const vehicleType = result[0];

        await this.#dataConnector.delete(vehicleType);

    }



}


