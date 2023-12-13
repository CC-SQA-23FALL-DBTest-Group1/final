// Written by Keerthana
// Version 1
// Last update: 2023-12-13
import { Trip } from "../models";
import { DataConnector } from "../dataconnector/DataConnector";

export class TripApi {
    #dataConnector: DataConnector<Trip>;

    constructor(dataConnector: DataConnector<Trip>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Trip> {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: TR000`)
        }
        const result = await this.#dataConnector.get([{ id: id }])
        if (result.length >= 1) {
            return result[0]
        } else {
            throw new Error(`Trip with ID ${id} not found. Code: TR001`)
        }

    }

    async get(predicates: Object[]): Promise<Trip[]> {
        const result = await this.#dataConnector.get(predicates);
        return result;
    }

    async create(vehicle: number, driver1: number, 
        driver2: number, from: number, to: number): Promise<Trip> {
        
            let trip = new Trip();
            trip.vehicle = vehicle;
            trip.driver1 = driver1;
            trip.driver2 = driver2;
            trip.from = from;
            trip.to = to;
    
            await this.#dataConnector.save(trip);
    
            return trip;
    
        }

        async updateByID(id: number, vehicle: number, driver1: number, 
            driver2: number, from: number, to: number): Promise<Trip> {
    
            if (isNaN(id) || id < 0) {
                throw new Error(`The ID is not valid. Code: TR002`)
            }

            const result = await this.#dataConnector.get([{ id: id }])

            var trip = result[0];
            trip.vehicle = vehicle;
            trip.driver1 = driver1;
            trip.driver2 = driver2;
            trip.from = from;
            trip.to = to;

            await this.#dataConnector.save(trip);

            return trip;

    }

    async DeleteByID(id: number) {
        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: TR003`);
        }

        const result = await this.#dataConnector.get([{ id: id }]);

        if (result.length < 1) {
            throw new Error(`Trip with ID ${id} not found. Code: TR004`);
        }

        const trip = result[0];

        await this.#dataConnector.delete(trip);

    }



}
