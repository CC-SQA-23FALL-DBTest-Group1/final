// Written by Frederick
// Version 2
// Last update: 2023-12-13
import { Employee, MechanicVehicleType, VehicleType } from "../models";
import { DataConnector, MechanicVehicleTypeDataConnector } from "../dataconnector";

export class MechanicVehicleTypeApi {
    #dataConnector: DataConnector<MechanicVehicleType>;

    constructor(dataConnector: DataConnector<MechanicVehicleType>) {
        this.#dataConnector = dataConnector;
    }

    async get(predicate: MechanicVehicleType)
        : Promise<MechanicVehicleType[]> {


        const dc = this.#dataConnector as MechanicVehicleTypeDataConnector;
        const result = await dc.get(predicate);

        if (result.length >= 1) {
            return result;
        } else {
            throw new Error(
                `Combination of Mechanic and Vehicle Type not found. `
                + `Code: MA001`
            );
        }
    }

    async create(employee: Employee, type: VehicleType, status: boolean)
        : Promise<MechanicVehicleType> {

        if (!(employee instanceof Employee)) {
            throw new Error(
                `Employee is not valid. `
                + `Code: MA002`
            );
        }

        if (!(type instanceof VehicleType)) {
            throw new Error(
                `Vehicle type is not valid. `
                + `Code: MA003`
            );
        }

        let mvt = new MechanicVehicleType();
        mvt.employee = employee;
        mvt.type = type;
        mvt.status = status;

        await this.#dataConnector.save(mvt);

        return mvt;

    }

    async update(employee: Employee, type: VehicleType, newStatus: boolean)
        : Promise<MechanicVehicleType> {

        
        let predicate = new MechanicVehicleType();
        predicate.employee = employee;
        predicate.type = type;

        let mvts = await this.get(predicate);

        if (mvts.length < 1) {
            throw new Error(
                `Combination of Mechanic and Vehicle Type not found. `
                + `Code: MA004`
            );
        }
        else if (mvts.length > 1) {
            throw new Error(
                `Implimentation Error. `
                + `Code: MA005`
            );
        }

        let mvt = mvts[0];

        mvt.status = newStatus;

        await this.#dataConnector.save(mvt);

        return mvt;
    }

    async delete(employee: Employee, type: VehicleType) {


        
        let predicate = new MechanicVehicleType();
        predicate.employee = employee;
        predicate.type = type;

        let mvts = await this.get(predicate);

        if (mvts.length < 1) {
            throw new Error(
                `Combination of Mechanic and Vehicle Type not found. `
                + `Code: MA006`
            );
        }
        else if (mvts.length > 1) {
            throw new Error(
                `Implimentation Error. `
                + `Code: MA007`
            );
        }

        const mvt = mvts[0];

        await this.#dataConnector.delete(mvt);

    }

}