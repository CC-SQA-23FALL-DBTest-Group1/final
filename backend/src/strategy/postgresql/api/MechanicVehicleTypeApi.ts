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

    async get(employee: Employee, type: VehicleType)
        : Promise<MechanicVehicleType[]> {

        const result = await this.#dataConnector.get([{
            employee: employee,
            type: type
        }]);

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

    async update(employee: Employee, type: VehicleType, status: boolean)
        : Promise<MechanicVehicleType> {

        let mvts = await this.#dataConnector.get([{
            employee: employee,
            type: type
        }]);

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

        mvt.status = status;

        await this.#dataConnector.save(mvt);

        return mvt;
    }

    async delete(employee: Employee, type: VehicleType) {
        const mvts = await this.#dataConnector.get([{
            employee: employee,
            type: type
        }]);

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