// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { Employee, MechanicVehicleType, VehicleType } from "../models";
import { DataConnector } from "../dataconnector";

export class MechanicVehicleTypeApi {
    #dataConnector: DataConnector<MechanicVehicleType>;

    constructor(dataConnector: DataConnector<MechanicVehicleType>) {
        this.#dataConnector = dataConnector;
    }

    async get(employee: Employee, vehicleType: VehicleType)
        : Promise<MechanicVehicleType[]> {

        const result = await this.#dataConnector.get([{}]);

        return result;
    }

}