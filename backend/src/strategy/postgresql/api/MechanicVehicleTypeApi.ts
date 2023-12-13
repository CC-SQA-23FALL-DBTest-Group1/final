// Written by Frederick
// Version 1
// Last update: 2023-12-12
import { MechanicVehicleType } from "../models";
import { DataConnector } from "../dataconnector";

export class MechanicVehicleTypeApi {
    #dataConnector: DataConnector<MechanicVehicleType>;

    constructor(dataConnector: DataConnector<MechanicVehicleType>) {
        this.#dataConnector = dataConnector;
    }



}