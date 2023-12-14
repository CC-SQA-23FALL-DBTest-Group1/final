// Written by Keerthana
// Version 2
// Last update: 2023-12-13
// Reviewed By Frederick
// Reviewed on 2023-12-13
import { TransitPoint } from "../models";
import { DataConnector, TransitPointDataConnector } from "../dataconnector";

export class TransitPointApi {
    #dataConnector: DataConnector<TransitPoint>;

    constructor(dataConnector: DataConnector<TransitPoint>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<TransitPoint> {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: TS000`)
        }
        const dc = this.#dataConnector as TransitPointDataConnector;
        let predicate = new TransitPoint();
        predicate.id = id;
        const result = await dc.get(predicate);
        if (result.length == 1) {
            return result[0]
        } else {
            throw new Error(`Transit Point with ID ${id} not found. Code: TS001`)
        }

    }

    async getByName(name: string): Promise<TransitPoint[]> {

        const dc = this.#dataConnector as TransitPointDataConnector;
        let predicate = new TransitPoint();
        predicate.name = name.trim();

        const result = await dc.get(predicate);
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

        if (newName.trim().length == 0) {
            throw new Error(`Name can not be empty. Code: TS006`);
        }

        let transitPoint = await this.getByID(id);
        transitPoint.name = newName.trim();

        await this.#dataConnector.save(transitPoint);

        return transitPoint;

    }

    async deleteByID(id: number) {
        
        const vehicleType = await this.getByID(id);

        await this.#dataConnector.delete(vehicleType);
    }

}


