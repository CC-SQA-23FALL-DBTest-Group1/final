// Written by Frederick
// Version 1
// Last update: 2023-12-15
import { DataSource } from "typeorm";
import { Express } from "express";
import { EmployeeApi, EmployeeVehicleTypeOperationApi, TransitPointApi, TripApi, VehicleApi } from "../api";
import { EmployeeDataConnector, EmployeeVehicleTypeOperationDataConnector, TransitPointDataConnector, TripDataConnector, VehicleDataConnector } from "../dataconnector";
import { EmployeeVehicleTypeOperation } from "../models";


export class TripApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        const dc = new TripDataConnector(dataSource);
        const api = new TripApi(dc);



        //Default
        express.get(`/trip`, (_, res) => {
            return res.json(`Trip`);
        });





        //Read one
        express.get(`/trip/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const trip = await api.getByID(parseInt(id));
                return res.json(trip);
            } catch (e) {
                return res.json((e as Error).message);
            }

        });






        // Create
        express.post(`/trip/new`, async (req, res) => {
            const vehicleID: number = req.body.vehicle ?? 0;
            const driver1ID: number = req.body.driver1 ?? 0;
            const driver2ID: number = req.body.driver2 ?? 0;
            const fromID: number = req.body.from ?? 0;
            const toID: number = req.body.to ?? 0;

            if (vehicleID <= 0) {
                return res.json(`Vehicle is not valid`);
            }
            if (driver1ID <= 0) {
                return res.json(`Driver 1 is not valid`);
            }
            if (fromID <= 0) {
                return res.json(`From is not valid`);
            }
            if (toID <= 0) {
                return res.json(`To is not valid`);
            }

            try {
                const vDC = new VehicleDataConnector(dataSource);
                const vAPI = new VehicleApi(vDC)
                const vehicle = vAPI.getByID(vehicleID);

                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC)
                const employee1 = eAPI.getByID(driver1ID);

                const evtoDC = new EmployeeVehicleTypeOperationDataConnector(dataSource);
                const evtoAPI = new EmployeeVehicleTypeOperationApi(evtoDC);

                try {
                    let evto1Predicate = new EmployeeVehicleTypeOperation();
                    evto1Predicate.type = (await vehicle).type;
                    evto1Predicate.employee = await employee1;
                    await evtoAPI.get(evto1Predicate);
                } catch (e) {
                    console.log(e);
                    return res.json(
                        `Employee 1 is not eligible for operating this vehicle`
                    );
                }

                const tpDC = new TransitPointDataConnector(dataSource);
                const tpAPI = new TransitPointApi(tpDC);
                const tpFrom = tpAPI.getByID(fromID);
                const tpTo = tpAPI.getByID(toID);

                if (driver2ID) {
                    const employee2 = eAPI.getByID(driver2ID);
                    try {
                        let evto2Predicate = new EmployeeVehicleTypeOperation();
                        evto2Predicate.type = (await vehicle).type;
                        evto2Predicate.employee = await employee2;
                        await evtoAPI.get(evto2Predicate);
                    } catch (e) {
                        console.log(e);
                        return res.json(
                            `Employee 2 is not eligible for operating this vehicle`
                        );
                    }
                    return res.json(
                        await api.create(
                            await vehicle,
                            await tpFrom,
                            await tpTo,
                            await employee1,
                            await employee2
                        )
                    );
                } else {
                    return res.json(
                        await api.create(
                            await vehicle,
                            await tpFrom,
                            await tpTo,
                            await employee1
                        )
                    );
                }
            } catch (e) {
                console.log(e);
                return res.json((e as Error).message);
            }

        });






        // Update
        express.post(`/trip/update`, async (req, res) => {
            const tripID: number = req.body.id ?? 0;
            const vehicleID: number = req.body.vehicle ?? 0;
            const driver1ID: number = req.body.driver1 ?? 0;
            const driver2ID: number = req.body.driver2 ?? 0;
            const fromID: number = req.body.from ?? 0;
            const toID: number = req.body.to ?? 0;
            if (tripID <= 0) {
                return res.json(`Trip is not valid`);
            }
            if (vehicleID <= 0) {
                return res.json(`Vehicle is not valid`);
            }
            if (driver1ID <= 0) {
                return res.json(`Driver 1 is not valid`);
            }
            if (fromID <= 0) {
                return res.json(`From is not valid`);
            }
            if (toID <= 0) {
                return res.json(`To is not valid`);
            }

            try {
                const vDC = new VehicleDataConnector(dataSource);
                const vAPI = new VehicleApi(vDC)
                const vehicle = vAPI.getByID(vehicleID);

                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC)
                const employee1 = eAPI.getByID(driver1ID);

                const evtoDC = new EmployeeVehicleTypeOperationDataConnector(dataSource);
                const evtoAPI = new EmployeeVehicleTypeOperationApi(evtoDC);

                try {
                    let evto1Predicate = new EmployeeVehicleTypeOperation();
                    evto1Predicate.type = (await vehicle).type;
                    evto1Predicate.employee = await employee1;
                    await evtoAPI.get(evto1Predicate);
                } catch (e) {
                    console.log(e);
                    return res.json(
                        `Employee 1 is not eligible for operating this vehicle`
                    );
                }

                const tpDC = new TransitPointDataConnector(dataSource);
                const tpAPI = new TransitPointApi(tpDC);
                const tpFrom = tpAPI.getByID(fromID);
                const tpTo = tpAPI.getByID(toID);

                if (driver2ID) {
                    const employee2 = eAPI.getByID(driver2ID);
                    try {
                        let evto2Predicate = new EmployeeVehicleTypeOperation();
                        evto2Predicate.type = (await vehicle).type;
                        evto2Predicate.employee = await employee2;
                        await evtoAPI.get(evto2Predicate);
                    } catch (e) {
                        console.log(e);
                        return res.json(
                            `Employee 2 is not eligible for operating this vehicle`
                        );
                    }

                    return res.json(
                        await api.updateByID(
                            tripID,
                            await vehicle,
                            await tpFrom,
                            await tpTo,
                            await employee1,
                            await employee2
                        )
                    );
                } else {
                    return res.json(
                        await api.updateByID(
                            tripID,
                            await vehicle,
                            await tpFrom,
                            await tpTo,
                            await employee1
                        )
                    );
                }
            } catch (e) {
                console.log(e);
                return res.json((e as Error).message);
            }

        });







        // Delete
        express.post(`/trip/delete`, async (req, res) => {
            const tripID: number = req.body.id ?? 0;
            if (tripID <= 0) {
                return res.json(`Trip is not valid`);
            }
            try {

                api.deleteByID(tripID);

                return res.json(`Delete ID:${tripID}`);

            } catch (e) {
                console.log(e);
                return res.json((e as Error).message);
            }

        });

    }

}