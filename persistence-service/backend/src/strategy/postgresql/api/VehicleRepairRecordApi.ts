// Written by Xingru 
// Version 1
// Last update: 2023-12-13
// Reviewed by Frederick
// Reviewed on 2023-12-13

import { Vehicle, Employee } from "../models";
import { DataConnector, VehicleRepairRecordDataConnector } from "../dataconnector";
import { VehicleRepairRecord } from "../models";

export class VehicleRepairRecordApi {
    #dataConnector: DataConnector<VehicleRepairRecord>;

    constructor(dataConnector: DataConnector<VehicleRepairRecord>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<VehicleRepairRecord> {

        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: VRR000`)
        }

        const dc = this.#dataConnector as VehicleRepairRecordDataConnector;

        let predicate = new VehicleRepairRecord();
        predicate.id = id;

        const result = await dc.get(predicate);

        if (result.length == 1) {
            return result[0];
        } else {
            throw new Error(
                `VehicleRepairRecord with ID ${id} not found. `
                + `Code: VRR001`
            );
        }
    }

    async create(
        estimatedTime: number,
        actualTime: number,
        vehicle: Vehicle,
        mechanic: Employee
    ): Promise<VehicleRepairRecord> {

        if (isNaN(estimatedTime) || estimatedTime <= 0) {
            throw new Error(
                `EstimatedTime is not valid. `
                + `Code: VRR002`
            );
        }

        if (isNaN(actualTime) || actualTime <= 0) {
            throw new Error(
                `ActualTime is not valid. `
                + `Code:VRR003`
            );
        }

        let vehicleRepairRecord = new VehicleRepairRecord();
        vehicleRepairRecord.estimatedTime = estimatedTime;
        vehicleRepairRecord.actualTime = actualTime;
        vehicleRepairRecord.vehicle = vehicle;
        vehicleRepairRecord.mechanic = mechanic;

        await this.#dataConnector.save(vehicleRepairRecord);

        return vehicleRepairRecord;

    }

    async updateByID(
        id: number,
        estimatedTime: number,
        actualTime: number,
        vehicle: Vehicle,
        mechanic: Employee
    ): Promise<VehicleRepairRecord> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: SI004`)
        }

        if (isNaN(estimatedTime) || estimatedTime <= 0) {
            throw new Error(
                `EstimatedTimeis not valid. `
                + `Code: VA006`
            );
        }

        if (isNaN(actualTime) || actualTime <= 0) {
            throw new Error(
                `ActualTime is not valid. `
                + `Code:VA007`
            );
        }

        const dc = this.#dataConnector as VehicleRepairRecordDataConnector;

        let predicate = new VehicleRepairRecord();
        predicate.id = id;

        let vehicleRepairRecords = await dc.get(predicate);

        if (vehicleRepairRecords.length != 1) {
            throw new Error(
                `VehicleRepairRecord with ID ${id} not found. `
                + `Code:VA005`
            );
        }


        let vehicleRepairRecord = vehicleRepairRecords[0];

        vehicleRepairRecord.estimatedTime = estimatedTime;
        vehicleRepairRecord.actualTime = actualTime;
        vehicleRepairRecord.vehicle = vehicle;
        vehicleRepairRecord.mechanic = mechanic;

        await dc.save(vehicleRepairRecord);

        return vehicleRepairRecord;
    }

    async deleteByID(id: number): Promise<void> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: VA008`)
        }

        const dc = this.#dataConnector as VehicleRepairRecordDataConnector;

        let predicate = new VehicleRepairRecord();
        predicate.id = id;

        let vehicleRepairRecords = await dc.get(predicate);

        if (vehicleRepairRecords.length != 1) {
            throw new Error(
                `VehicleRepairRecord with ID ${id} not found. `
                + `Code: VA009`
            );
        }


        let vehicleRepairRecord = vehicleRepairRecords[0];

        await dc.delete(vehicleRepairRecord);

    }

}