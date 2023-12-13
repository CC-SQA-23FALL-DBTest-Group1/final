// Written by Keerthana
// Version 1
// Last update: 2023-12-13
import { TransitPoint, Vehicle } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class VehicleApi {
    #dataConnector: DataConnector<Vehicle>;

    constructor(dataConnector: DataConnector<Vehicle>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Vehicle> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VE000`)
        }
        const result = await this.#dataConnector.get([{ id: id }])
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Vehicle with ID ${id} not found. Code: VE001`)
        }

    }

    async get(predicates: Object[]): Promise<Vehicle[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(brand: string, model: string, load: number, capacity: number, 
        year: number, numberOfRepair: number, type: number): Promise<Vehicle> {

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
        year: number, numberOfRepair: number, type: number): Promise<Vehicle> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VE002`)
        }

        const result = await this.#dataConnector.get([{ id: id }])

        var vehicle = result[0];
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

    async DeleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VE003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`Vehicle Type with ID ${id} not found. Code: VE004`);
        }

        const vehicle = result[0];

        await this.#dataConnector.delete(vehicle);

    }



}

