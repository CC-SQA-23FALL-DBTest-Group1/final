// Written by Frederick
// Version 2
// Last update: 2023-12-12
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
        if (name.trim().length == 0){
            throw new Error(`Name can not be empty. Code: VT005`)
        }
        let vehicleType = new VehicleType();
        vehicleType.name = name.trim();

        await this.#dataConnector.save(vehicleType);

        return vehicleType;

    }

    async updateByID(id: number, newName: string): Promise<VehicleType> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VT002`)
        }
        if (newName.trim().length == 0){
            throw new Error(`Name can not be empty. Code: VT006`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var vehicleType = result[0];
        vehicleType.name = newName.trim();

        await this.#dataConnector.save(vehicleType);

        return vehicleType;

    }

    async deleteByID(id: number) {
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


