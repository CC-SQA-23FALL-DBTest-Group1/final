// Written by Frederick
// Version 1
// Last update: 2023-12-15
import { DataSource } from "typeorm";
import { Express } from "express";
import { EmployeeDataConnector, MechanicVehicleTypeDataConnector, VehicleDataConnector, VehicleRepairRecordDataConnector } from "../dataconnector";
import { EmployeeApi, MechanicVehicleTypeApi, VehicleApi, VehicleRepairRecordApi } from "../api";
import { MechanicVehicleType } from "../models";

export class VehicleRepairRecordApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        const dc = new VehicleRepairRecordDataConnector(dataSource);
        const api = new VehicleRepairRecordApi(dc);



        //Default
        express.get(`/vrr`, (_, res) => {
            return res.json(`Vehicle Repair Record`);
        });


        //Read one
        express.get(`/vrr/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const vrr = await api.getByID(parseInt(id));
                return res.json(vrr);
            } catch (e) {
                return res.json((e as Error).message);
            }

        });





        //Create
        express.post(`/vrr/new`, async (req, res) => {
            const estimatedTime: number = req.body.estimatedTime ?? 0;
            const actualTime: number = req.body.actualTime ?? 0;
            const vehicleID: number = req.body.vehicle ?? 0;
            const mechanicID: number = req.body.mechanic ?? 0;

            if (estimatedTime <= 0) {
                return res.json(`Estimated Time is not valid`);
            }
            if (actualTime <= 0) {
                return res.json(`Actual Time is not valid`);
            }
            if (vehicleID <= 0) {
                return res.json(`vehicle is not valid`);
            }
            if (mechanicID <= 0) {
                return res.json(`Mechanic is not valid`);
            }


            try {
                const vDC = new VehicleDataConnector(dataSource);
                const vAPI = new VehicleApi(vDC);
                const vehicle = await vAPI.getByID(vehicleID);

                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC);
                const employee = await eAPI.getByID(mechanicID);

                const mDC = new MechanicVehicleTypeDataConnector(dataSource);
                const mAPI = new MechanicVehicleTypeApi(mDC);
                try {
                    const predicate = new MechanicVehicleType();
                    predicate.employee = employee;
                    predicate.type = vehicle.type;
                    const mvt = (await mAPI.get(predicate))[0];
                    if(!mvt.status){
                        return res.json(`Lisence is not valid for the Vehicle Type`)
                    }
                } catch (e) {
                    console.log(e);
                    return res.json(`Mechanic is not endorsed for the Vehicle Type`)
                }


                try {
                    const result = await api.create(
                        estimatedTime,
                        actualTime,
                        vehicle,
                        employee
                    );
                    return res.json(result);
                } catch (e) {
                    return res.json((e as Error).message);
                }

            } catch (e) {
                console.log(e);
                return res.json((e as Error).message);
            }

        });







        // Update
        express.post(`/vrr/update`, async (req, res) => {
            const id: number = req.body.id ?? 0;
            const estimatedTime: number = req.body.estimatedTime ?? 0;
            const actualTime: number = req.body.actualTime ?? 0;
            const vehicleID: number = req.body.vehicle ?? 0;
            const mechanicID: number = req.body.mechanic ?? 0;
            if (id <= 0) {
                return res.json(`ID is not valid`);
            }
            if (estimatedTime <= 0) {
                return res.json(`Estimated Time is not valid`);
            }
            if (actualTime <= 0) {
                return res.json(`Actual Time is not valid`);
            }
            if (vehicleID <= 0) {
                return res.json(`vehicle is not valid`);
            }
            if (mechanicID <= 0) {
                return res.json(`Mechanic is not valid`);
            }


            try {
                const vDC = new VehicleDataConnector(dataSource);
                const vAPI = new VehicleApi(vDC);
                const vehicle = await vAPI.getByID(vehicleID);

                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC);
                const employee = await eAPI.getByID(mechanicID);

                const mDC = new MechanicVehicleTypeDataConnector(dataSource);
                const mAPI = new MechanicVehicleTypeApi(mDC);
                try {
                    const predicate = new MechanicVehicleType();
                    predicate.employee = employee;
                    predicate.type = vehicle.type;
                    await mAPI.get(predicate);
                } catch (e) {
                    console.log(e);
                    return res.json(`Mechanic is not endorsed for the Vehicle Type`)
                }


                try {
                    const result = await api.updateByID(
                        id,
                        estimatedTime,
                        actualTime,
                        vehicle,
                        employee
                    );
                    return res.json(result);
                } catch (e) {
                    return res.json((e as Error).message);
                }

            } catch (e) {
                console.log(e);
                return res.json((e as Error).message);
            }

        });







        // Delete
        express.post(`/vrr/delete`, async (req, res) => {
            const id: number = req.body.id ?? 0;

            if (id <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                await api.deleteByID(id);
                return res.json(`Delete ID:${id}`);
            } catch (e) {
                return res.json((e as Error).message);
            }

        });


    }//Constructor
}