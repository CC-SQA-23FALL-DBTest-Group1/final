// Written by Frederick
// Version 1
// Last update: 2023-12-13
import { Customer, Shipment, TransitPoint, VehicleType } from "../models";
import { DataConnector } from "../dataconnector";

export class ShipmentApi {
    #dataConnector: DataConnector<Shipment>;

    constructor(dataConnector: DataConnector<Shipment>) {
        this.#dataConnector = dataConnector;
    }

    async getByID(id: number): Promise<Shipment> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: SI000`)
        }

        const result = await this.#dataConnector.get([{
            id: id
        }]);

        if (result.length == 1) {
            return result[0];
        } else {
            throw new Error(
                `Shipment with ID ${id} not found. `
                + `Code: SI001`
            );
        }
    }

    async create(
        customer: Customer,
        weight: number,
        value: number,
        from: TransitPoint,
        to: TransitPoint
    ): Promise<Shipment> {

        if (isNaN(weight) || weight < 0) {
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

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: SI004`)
        }

        if (isNaN(weight) || weight < 0) {
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

        let shipments = await this.#dataConnector.get([{
            id: id
        }]);

        if (shipments.length != 1) {
            throw new Error(
                `Shipment with ID ${id} not found. `
                + `Code: SI005`
            );
        }


        let shipment = shipments[0];

        shipment.customer = customer;
        shipment.from = from;
        shipment.to = to;
        shipment.value = value;
        shipment.weight = weight;

        await this.#dataConnector.save(shipment);

        return shipment;
    }

    async deleteByID(id: number): Promise<void> {

        if (isNaN(id) || id < 0) {
            throw new Error(`The ID is not valid. Code: SI008`)
        }

        let shipments = await this.#dataConnector.get([{
            id: id
        }]);

        if (shipments.length != 1) {
            throw new Error(
                `Shipment with ID ${id} not found. `
                + `Code: SI009`
            );
        }


        let shipment = shipments[0];

        await this.#dataConnector.delete(shipment);
        
    }

}