// Written by Frederick
// Version 1
// Last update: 2023-12-15

import { DataSource } from "typeorm";
import { Express } from "express";
import { ShipmentDataConnector, ShipmentRouteDataConnector, TripDataConnector } from "../dataconnector";
import { ShipmentApi, ShipmentRouteApi, TripApi } from "../api";
import { ShipmentRoute } from "../models";


export class ShipmentRouteApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        const dc = new ShipmentRouteDataConnector(dataSource);
        const api = new ShipmentRouteApi(dc);





        //Default
        express.get(`/shipmentroute`, (_, res) => {
            return res.json(`Shipment Route`);
        });




        //Read one 
        express.get(`/shipmentroute/:shipmentID/:order`, async (req, res) => {
            const shipmentID = req.params.shipmentID.trim();
            const order = req.params.order.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(shipmentID)) {
                // if the id is not able to be a positive integer
                return res.json(`Shipment ID is not valid`);
            } else if (parseInt(shipmentID) <= 0) {
                return res.json(`Shipment ID is not valid`);
            }

            if (!regex.test(order)) {
                // if the order is not able to be a positive integer
                return res.json(`Order is not valid`);
            } else if (parseInt(order) < 0) {
                return res.json(`Order is not valid`);
            }

            try {
                const sDC = new ShipmentDataConnector(dataSource);
                const sAPI = new ShipmentApi(sDC);
                const shipment = await sAPI.getByID(parseInt(shipmentID));

                let predicate = new ShipmentRoute();
                predicate.shipment = shipment;
                predicate.order = parseInt(order);

                const result = await api.get(predicate);
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        });






        // Create
        express.post(`/shipmentroute/new`, async (req, res) => {
            const shipmentID: number = req.body.shipment ?? 0;
            const order: number = req.body.order ?? -1;
            const tripID: number = req.body.trip ?? 0;

            if (shipmentID <= 0) {
                return res.json(`Shipment is not valid`);
            }
            if (tripID <= 0) {
                return res.json(`Trip is not valid`);
            }
            if (order <= 0) {
                return res.json(`Order is not valid`);
            }

            try {
                const sDC = new ShipmentDataConnector(dataSource);
                const sAPI = new ShipmentApi(sDC);
                const shipment = await sAPI.getByID(shipmentID);

                const tDC = new TripDataConnector(dataSource);
                const tAPI = new TripApi(tDC);
                const trip = await tAPI.getByID(tripID);

                const result = await api.create(
                    shipment, order, trip
                );

                res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }
        });







        // Update
        express.post(`/shipmentroute/update`, async (req, res) => {
            const shipmentID: number = req.body.shipment ?? 0;
            const order: number = req.body.order ?? -1;
            const tripID: number = req.body.trip ?? 0;

            if (shipmentID <= 0) {
                return res.json(`Shipment is not valid`);
            }
            if (tripID <= 0) {
                return res.json(`Trip is not valid`);
            }
            if (order <= 0) {
                return res.json(`Order is not valid`);
            }

            try {
                const sDC = new ShipmentDataConnector(dataSource);
                const sAPI = new ShipmentApi(sDC);
                const shipment = await sAPI.getByID(shipmentID);

                const tDC = new TripDataConnector(dataSource);
                const tAPI = new TripApi(tDC);
                const trip = await tAPI.getByID(tripID);

                const result = await api.update(
                    shipment, order, trip
                );

                res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }
        });









        // Delete
        express.post(`/shipmentroute/delete`, async (req, res) => {
            const shipmentID: number = req.body.shipment ?? 0;
            const order: number = req.body.order ?? -1;

            if (shipmentID <= 0) {
                return res.json(`Shipment is not valid`);
            }

            if (order <= 0) {
                return res.json(`Order is not valid`);
            }

            try {
                const sDC = new ShipmentDataConnector(dataSource);
                const sAPI = new ShipmentApi(sDC);
                const shipment = await sAPI.getByID(shipmentID);

                await api.delete(shipment, order);

                res.json(`Delete Route with shipment(ID:${shipmentID}) and order at ${order}`);
            } catch (e) {
                return res.json((e as Error).message);
            }
        });



    }
}