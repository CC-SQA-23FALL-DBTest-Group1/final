// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { VehicleType } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class VehicleTypeApi {
    #dataConnector: DataConnector<VehicleType>;

    constructor(dataConnector: DataConnector<VehicleType>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<VehicleType> {
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

    async get(predicates: Object[]): Promise<VehicleType[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(name: string): Promise<VehicleType> {

        let vehicleType = new VehicleType();
        vehicleType.name = name;

        await this.#dataConnector.save(vehicleType);

        return vehicleType;

    }

    async updateByID(id: number, newName: string): Promise<VehicleType> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VT002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var vehicleType = result[0];
        vehicleType.name = newName;

        await this.#dataConnector.save(vehicleType);

        return vehicleType;

    }

    async DeleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VT003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`Vehicle Type with ID ${id} not found. Code: VT004`);
        }

        const vehicleType = result[0];

        await this.#dataConnector.delete(vehicleType);

    }



}


