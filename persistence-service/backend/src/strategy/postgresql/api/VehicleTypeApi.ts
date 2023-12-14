// Written by Frederick
// Version 2
// Last update: 2023-12-12
import { VehicleType } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";
import { VehicleTypeDataConnector } from "../dataconnector";

export class VehicleTypeApi {
    #dataConnector: DataConnector<VehicleType>;

    constructor(dataConnector: DataConnector<VehicleType>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<VehicleType> {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: VT000`)
        }

        const dc = this.#dataConnector as VehicleTypeDataConnector;
        let predicate = new VehicleType();
        predicate.id = id;

        const result = await dc.get(predicate);

        if (result.length == 1) {
            return result[0]
        } else {
            throw new Error(`Customer with ID ${id} not found. Code: VT001`)
        }

    }

    async getByName(name: string): Promise<VehicleType[]> {
        const dc = this.#dataConnector as VehicleTypeDataConnector;
        let predicate = new VehicleType();
        predicate.name = name.trim();
        const result = await dc.get(predicate);
        return result;
    }

    async create(name: string): Promise<VehicleType> {
        if (name.trim().length == 0) {
            throw new Error(`Name can not be empty. Code: VT005`)
        }
        let vehicleType = new VehicleType();
        vehicleType.name = name.trim();

        await this.#dataConnector.save(vehicleType);

        return vehicleType;

    }

    async updateByID(id: number, newName: string): Promise<VehicleType> {

        if (newName.trim().length == 0) {
            throw new Error(`Name can not be empty. Code: VT006`)
        }

        let vehicleType = await this.getByID(id);

        vehicleType.name = newName.trim();

        await this.#dataConnector.save(vehicleType);

        return vehicleType;

    }

    async deleteByID(id: number) {

        let vehicleType = await this.getByID(id);

        await this.#dataConnector.delete(vehicleType);

    }



}


