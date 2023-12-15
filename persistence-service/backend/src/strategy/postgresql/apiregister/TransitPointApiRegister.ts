// Written by Frederick and Xingru
// Version 1
// Last update: 2023-12-15
import { DataSource } from "typeorm";
import { Express } from "express";
import { TransitPointApi } from "../api";
import { TransitPointDataConnector } from "../dataconnector";

/**
 * Register the urls related to TransitPointtable.
 * Give Responses with JSON.
 * All errors should be cought here.
 */
export class TransitPointApiRegister {
    #express: Express;
    #dataSource: DataSource;

    constructor(dataSource: DataSource, express: Express) {
        this.#dataSource = dataSource;
        this.#express = express;
        const dc = new TransitPointDataConnector(this.#dataSource);
        const api = new TransitPointApi(dc);

        //Default
        this.#express.get(`/transitpoint`, (_, res) => {
            return res.json(`TransitPoint`);
        });

        //Read one TransitPoint
        this.#express.get(`/transitpoint/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const transitPoint = await api.getByID(parseInt(id));
                return res.json(transitPoint);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })

        //Read transitPoint
        this.#express.post(`/transitpoint`, async (req, res) => {
            const name = req.body.name ?? ``;

            try {
                const transitPoints = await api.getByName(name.trim());
                return res.json(transitPoints);
            } catch (e) {
                return res.json((e as Error).message);
            }
        })

        //Create TransitPoint
        this.#express.post(`/transitpoint/new`, async (req, res) => {
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


        //Update Transitpoint
        this.#express.post(`/transitpoint/update`, async (req, res) => {
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


        //Delete Transitpoint
        this.#express.post(`/transitpoint/delete`, async (req, res) => {
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
