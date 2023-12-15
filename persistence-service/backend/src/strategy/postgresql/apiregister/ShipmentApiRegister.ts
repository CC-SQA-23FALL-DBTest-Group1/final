// Written by Frederick
// Version 1
// Last update: 2023-12-15

import { DataSource } from "typeorm";
import { Express } from "express";
import { CustomerApi, ShipmentApi, TransitPointApi } from "../api";
import { CustomerDataConnector, ShipmentDataConnector, TransitPointDataConnector } from "../dataconnector";

/**
 * Register the urls related to Shipment table.
 * Give Responses with JSON.
 * All errors should be cought here.
 */
export class ShipmentApiRegister {
    #express: Express;
    #dataSource: DataSource;

    constructor(dataSource: DataSource, express: Express) {
        this.#dataSource = dataSource;
        this.#express = express;
        const dc = new ShipmentDataConnector(this.#dataSource);
        const api = new ShipmentApi(dc);

        //Default
        this.#express.get(`/shipment`, (_, res) => {
            return res.json(`Shipment`);
        });

        //Read one 
        this.#express.get(`/shipment/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const shipment = await api.getByID(parseInt(id));
                return res.json(shipment);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })



        //Create
        this.#express.post(`/shipment/new`, async (req, res) => {
            const fromID: number = req.body.from ?? 0;
            const toID: number = req.body.to ?? 0;
            const customerID: number = req.body.customerID ?? 0;
            const weight: number = req.body.weight ?? 0;
            const value: number = req.body.value ?? -1;

            if (fromID <= 0) {
                return res.json(`From is not valid`);
            }
            if (toID <= 0) {
                return res.json(`To is not valid`);
            }
            if (customerID <= 0) {
                return res.json(`Customer is not valid`);
            }
            if (weight <= 0) {
                return res.json(`Weight is not valid`);
            }
            if (value < 0) {
                return res.json(`Value is not valid`);
            }


            try {
                const cDC = new CustomerDataConnector(dataSource);
                const cAPI = new CustomerApi(cDC);
                const customer = await cAPI.getByID(customerID);

                const tDC = new TransitPointDataConnector(dataSource);
                const tAPI = new TransitPointApi(tDC);
                const toTP = await tAPI.getByID(toID);
                const fromTP = await tAPI.getByID(fromID);

                const result = await api.create(customer,weight,value,fromTP,toTP);
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Update
        this.#express.post(`/shipment/update`, async (req, res) => {
            const id: number = req.body.id ?? 0
            const fromID: number = req.body.from ?? 0;
            const toID: number = req.body.to ?? 0;
            const customerID: number = req.body.customerID ?? 0;
            const weight: number = req.body.weight ?? 0;
            const value: number = req.body.value ?? -1;
            if (id <= 0) {
                return res.json(`ID is not valid`);
            }
            if (fromID <= 0) {
                return res.json(`From is not valid`);
            }
            if (toID <= 0) {
                return res.json(`To is not valid`);
            }
            if (customerID <= 0) {
                return res.json(`Customer is not valid`);
            }
            if (weight <= 0) {
                return res.json(`Weight is not valid`);
            }
            if (value < 0) {
                return res.json(`Value is not valid`);
            }

            try {
                const cDC = new CustomerDataConnector(dataSource);
                const cAPI = new CustomerApi(cDC);
                const customer = await cAPI.getByID(customerID);

                const tDC = new TransitPointDataConnector(dataSource);
                const tAPI = new TransitPointApi(tDC);
                const toTP = await tAPI.getByID(toID);
                const fromTP = await tAPI.getByID(fromID);


                const result = await api.updateByID(id,customer,weight,value,fromTP,toTP);

                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Delete
        this.#express.post(`/shipment/delete`, async (req, res) => {
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