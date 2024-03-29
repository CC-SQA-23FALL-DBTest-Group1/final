// Written by Frederick and Xingru
// Version 3
// Last update: 2023-12-14
// Reviewed By Frederick
// Reviewed on 2023-12-14

import { Customer, Shipment, TransitPoint} from "../models";
import { DataConnector, ShipmentDataConnector } from "../dataconnector";

export class ShipmentApi {
    #dataConnector: DataConnector<Shipment>;

    constructor(dataConnector: DataConnector<Shipment>) {
        this.#dataConnector = dataConnector;
    }


    async getByID(id: number): Promise<Shipment> {
        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: SI000`)
        }
        const dataConnector = this.#dataConnector as ShipmentDataConnector;
        let predicate = new Shipment();
        predicate.id=id;
        const result = await dataConnector.get(predicate);
        if (result.length == 1) {
            return result[0]
        } else {
            throw new Error(`Shipment with ID ${id} not found. Code: SI001`);
        }

    }


    async get(predicates:Shipment): Promise<Shipment[]> {
        const dataConnector = this.#dataConnector as unknown as ShipmentDataConnector;
        const result = await dataConnector.get(predicates);
        return result;

    }


    async create(
        customer: Customer,
        weight: number,
        value: number,
        from: TransitPoint,
        to: TransitPoint
    ): Promise<Shipment> {

        if (isNaN(weight) || weight <= 0) {
            throw new Error(
                `Weight is not valid. `
                + `Code: SI002`
            );
        }

        if (isNaN(value) || value < 0) {
            throw new Error(
                `Value is not valid. `
                + `Code: SI003`
            );
        }

        let shipment = new Shipment();
        shipment.customer = customer;
        shipment.from = from;
        shipment.to = to;
        shipment.value = value;
        shipment.weight = weight;

        await this.#dataConnector.save(shipment);

        return shipment;

    }

    async updateByID(
        id: number,
        customer: Customer,
        weight: number,
        value: number,
        from: TransitPoint,
        to: TransitPoint
    ): Promise<Shipment> {

        if (isNaN(id) || id <= 0) {
            throw new Error(`The ID is not valid. Code: SI004`)
        }

        if (isNaN(weight) || weight <= 0) {
            throw new Error(
                `Weight is not valid. `
                + `Code: SI006`
            );
        }

        if (isNaN(value) || value < 0) {
            throw new Error(
                `Value is not valid. `
                + `Code: SI007`
            );
        }


        let shipment = await this.getByID(id);

        shipment.customer = customer;
        shipment.from = from;
        shipment.to = to;
        shipment.value = value;
        shipment.weight = weight;

        await this.#dataConnector.save(shipment);

        return shipment;
    }

    async deleteByID(id: number): Promise<void> {

        let shipment = await this.getByID(id);

        await this.#dataConnector.delete(shipment);
        
    }

}