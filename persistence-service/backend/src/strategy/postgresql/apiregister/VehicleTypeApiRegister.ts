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
        const dataConnector = new VehicleTypeDataConnector(this.#dataSource);
        const api = new VehicleTypeApi(dataConnector);

        //Read one customer
        this.#express.get(`/vehicletype/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
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
        this.#express.get(`/vehicletype`, async (req, res) => {
            const name = req.query.name ?? null

            try {
                const vehicleTypes = await api.getByName([{
                    name: name,
                }
                ]);
                return res.json(vehicleTypes);
            } catch (e) {
                return res.json((e as Error).message);
            }
        })

        //Create Customer
        this.#express.post(`/vehicletype/new`, async (req, res) => {
            const name: string = req.body.name?.trim() ?? null

            /**
             * 
             * Space for Validations
             * 
             */


            try {
                const result = await api.create(name);
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Update Customer
        this.#express.post(`/customer/update`, async (req, res) => {
            const id: string = req.body.name?.trim() ?? null
            const name: string = req.body.name?.trim() ?? null
            const address: string = req.body.address?.trim() ?? null
            const phoneNumber1: string = req.body.phoneNumber1?.trim() ?? null
            const phoneNumber2: string = req.body.phoneNumber2?.trim() ?? null

            /**
             * 
             * Space for Validations
             * 
             */


    

            try {
                const result = await api.updateByID(parseInt(id),name);

                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Delete Customer
        this.#express.post(`/customer/delete`, async (req, res) => {
            const id: string = req.body.name?.trim() ?? null

            /**
             * 
             * Space for Validations
             * 
             */



            try {
                await api.deleteByID(parseInt(id));

                return res.json(`Delete ID:${id}`);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


    }



}
