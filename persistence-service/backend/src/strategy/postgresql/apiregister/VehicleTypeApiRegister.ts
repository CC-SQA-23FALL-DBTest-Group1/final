// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Express } from "express";
import { VehicleTypeApi } from "../api";
import { VehicleTypeDataConnector } from "../dataconnector";

/**
 * Register the urls related to Customer table.
 * Give Responses with JSON.
 * All errors should be cought here.
 */
export default class VehicleTypeApiRegister {
    #express: Express;
    #dataSource: DataSource;

    constructor(dataSource: DataSource, express: Express) {
        this.#dataSource = dataSource;
        this.#express = express;
        const dc = new VehicleTypeDataConnector(this.#dataSource);
        const api = new VehicleTypeApi(dc);

        //Default
        this.#express.get(`/vehicletype`, (_, res) => {
            return res.json(`Vehicle Type`);
        });

        //Read one customer
        this.#express.get(`/vehicletype/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const vehicleType = await api.getByID(parseInt(id));
                return res.json(vehicleType);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })

        //Read customers
        this.#express.post(`/vehicletype`, async (req, res) => {
            const name = req.body.name ?? ``;

            try {
                const vehicleTypes = await api.getByName(name.trim());
                return res.json(vehicleTypes);
            } catch (e) {
                return res.json((e as Error).message);
            }
        })

        //Create Customer
        this.#express.post(`/vehicletype/new`, async (req, res) => {
            const name: string = req.body.name?.trim() ?? ``;

            if (name.length == 0) {
                return res.json(`Name is not valid`);
            }

            try {
                const result = await api.create(name);
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Update Customer
        this.#express.post(`/vehicletype/update`, async (req, res) => {
            const id: number = req.body.id ?? 0
            const name: string = req.body.name?.trim() ?? ``

            if (id <= 0) {
                return res.json(`ID is not valid`);
            }
            if (name.length == 0) {
                return res.json(`Name is not valid`);
            }

            try {
                const result = await api.updateByID(id, name);

                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Delete Customer
        this.#express.post(`/vehicletype/delete`, async (req, res) => {
            const id: number = req.body.id ?? 0

            if (id <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                await api.deleteByID(id);

                return res.json(`Delete ID:${id}`);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


    }



}
