// Written by Xingru
// Reviewed by Frederick
// Version 1
// Last update: 2023-12-15

import { DataSource } from "typeorm";
import { Express } from "express";
import { VehicleTypeApi, VehicleApi } from "../api";
import { VehicleTypeDataConnector, VehicleDataConnector } from "../dataconnector";

/**
 * Register the urls related to Vehicle table.
 * Give Responses with JSON.
 * All errors should be cought here.
 */
export class VehicleApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        const dc = new VehicleDataConnector(dataSource);
        const api = new VehicleApi(dc);

        //Default
        express.get(`/vehicle`, (_, res) => {
            return res.json(`Vehicle`);
        });

        //Read one 
        express.get(`/vehicle/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const Vehicle = await api.getByID(parseInt(id));
                return res.json(Vehicle);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Create
        express.post(`/Vehicle/new`, async (req, res) => {
            const brand: string = req.body.brand ?? ``
            const model: string = req.body.model ?? ``
            const load: number = req.body.load ?? -1;
            const capacity: number = req.body.capacity ?? 0;
            const year: number = req.body.year ?? -1;
            const numberOfRepair: number = req.body.numberOfRepair ?? -1;
            const typeID: number = req.body.type ?? 0;

            if (brand.length == 0) {
                return res.json(`Brand is not valid`);
            }
            if (model.length == 0) {
                return res.json(`Model is not valid`);
            }
            if (load < 0) {
                return res.json(`Load is not valid`);
            }
            if (capacity <= 0) {
                return res.json(`Capacity is not valid`);
            }
            const isInteger = Number.isInteger(year);

            if (!isInteger || !(/^\d{4}$/.test(String(year)))) {
                return res.json(`Year is not valid.`);
            }
            if (numberOfRepair < 0) {
                return res.json(`NumberOfRepair is not valid`);
            }
            if (typeID <= 0) {
                return res.json(`Type is not valid`);
            }



            try {
                const vtDC = new VehicleTypeDataConnector(dataSource);
                const vtAPI = new VehicleTypeApi(vtDC);
                const type = await vtAPI.getByID(typeID);


                const result = await api.create(
                    brand,
                    model,
                    load,
                    capacity,
                    year,
                    numberOfRepair,
                    type
                );
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Update
        express.post(`/vehicle/update`, async (req, res) => {
            const id: number = req.body.id ?? 0;
            const brand: string = req.body.brand ?? ``
            const model: string = req.body.model ?? ``
            const load: number = req.body.load ?? -1;
            const capacity: number = req.body.capacity ?? 0;
            const year: number = req.body.year ?? -1;
            const numberOfRepair: number = req.body.numberOfRepair ?? -1;
            const typeID: number = req.body.type ?? 0;

            if (brand.length == 0) {
                return res.json(`Brand is not valid`);
            }
            if (model.length == 0) {
                return res.json(`Model is not valid`);
            }
            if (load < 0) {
                return res.json(`Load is not valid`);
            }
            if (capacity <= 0) {
                return res.json(`Capacity is not valid`);
            }
            const isInteger = Number.isInteger(year);

            if (!isInteger || !(/^\d{4}$/.test(String(year)))) {
                return res.json(`Year is not valid.`);
            }
            if (numberOfRepair < 0) {
                return res.json(`NumberOfRepair is not valid`);
            }
            if (typeID <= 0) {
                return res.json(`Type is not valid`);
            }

            try {
                const vtDC = new VehicleTypeDataConnector(dataSource);
                const vtAPI = new VehicleTypeApi(vtDC);
                const type = await vtAPI.getByID(typeID);



                const result = await api.updateByID(
                    id,
                    brand,
                    model,
                    load,
                    capacity,
                    year,
                    numberOfRepair,
                    type
                );

                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Delete
        express.post(`/Vehicled/delete`, async (req, res) => {
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