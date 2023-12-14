// Written by Keerthana
// Version 2
// Last update: 2023-12-13
// Reviewed By Frederick
// Reviewed on 2023-12-13
import { Vehicle, VehicleType } from "../models";
import { DataConnector, VehicleDataConnector } from "../dataconnector";

export class VehicleApi {
    #dataConnector: DataConnector<Vehicle>;

    constructor(dataConnector: DataConnector<Vehicle>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Vehicle> {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: VE000`)
        }
        const dc = this.#dataConnector as VehicleDataConnector;
        let predicate = new Vehicle();
        predicate.id = id;
        const result = await dc.get(predicate);
        if (result.length == 1) {
            return result[0]
        } else {
            throw new Error(`Vehicle with ID ${id} not found. Code: VE001`);
        }

    }

    async get(predicate: Vehicle): Promise<Vehicle[]> {
        const result = await this.#dataConnector.get(predicate);
        return result;
    }

    async create(brand: string, model: string, load: number, capacity: number, 
        year: number, numberOfRepair: number, type: VehicleType): Promise<Vehicle> {

        let vehicle = new Vehicle();
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.load = load;
        vehicle.capacity = capacity;
        vehicle.year = year;
        vehicle.numberOfRepair = numberOfRepair;
        vehicle.type = type;

        await this.#dataConnector.save(vehicle);

        return vehicle;

    }

    async updateByID(id: number, brand: string, model: string, load: number, capacity: number, 
        year: number, numberOfRepair: number, type: VehicleType): Promise<Vehicle> {

        let vehicle = await this.getByID(id);
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.load = load;
        vehicle.capacity = capacity;
        vehicle.year = year;
        vehicle.numberOfRepair = numberOfRepair;
        vehicle.type = type;

        await this.#dataConnector.save(vehicle);

        return vehicle;

    }

    async deleteByID(id: number) {

        let vehicle = await this.getByID(id);

        await this.#dataConnector.delete(vehicle);

    }



}

