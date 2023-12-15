// Written by Frederick
// Version 1
// Last update: 2023-12-15

import { DataSource } from "typeorm";
import { Express } from "express";
import { EmployeeDataConnector, MechanicVehicleTypeDataConnector, VehicleTypeDataConnector } from "../dataconnector";
import { EmployeeApi, MechanicVehicleTypeApi, VehicleTypeApi } from "../api";
import { MechanicVehicleType } from "../models";

export class MechanicVehicleTypeApiRegister {

    constructor(dataSource: DataSource, express: Express) {
        const dc = new MechanicVehicleTypeDataConnector(dataSource);
        const api = new MechanicVehicleTypeApi(dc);

        //Default
        express.get(`/mvt`, (_, res) => {
            return res.json(`Mechanic Vehicle Type Operation`);
        });

        //Read
        express.post(`/mvt`, async (req, res) => {
            const eID: number = req.body.eID ?? null;
            const vtID: number = req.body.vtID ?? null;
            if (eID != null && eID <= 0) {
                return res.json(`Employee is not valid`);
            }
            if (vtID != null && vtID <= 0) {
                return res.json(`Vehicle Type is not valid`);
            }

            try {
                let employee = null;

                if (eID) {
                    const eDC = new EmployeeDataConnector(dataSource);
                    const eAPI = new EmployeeApi(eDC);
                    try {
                        employee = await eAPI.getByID(eID);
                    } catch (e) {
                        return res.json(`Employee does not exist`);
                    }
                }
                let vehicleType = null;
                if (vtID) {
                    const vtDC = new VehicleTypeDataConnector(dataSource);
                    const vtAPI = new VehicleTypeApi(vtDC);
                    try {
                        vehicleType = await vtAPI.getByID(vtID);
                    } catch (e) {
                        return res.json(`Vehicle Type does not exist`);
                    }

                }

                let predicate = new MechanicVehicleType();
                if (employee) {
                    predicate.employee = employee;
                }
                if (vehicleType) {
                    predicate.type = vehicleType;
                }

                const result = await api.get(predicate);

                return res.json(result);

            } catch (e) {
                return res.json((e as Error).message);
            }

        });


        //Create
        express.post(`/mvt/new`, async (req, res) => {
            const eID: number = req.body.eID ?? 0;
            const vtID: number = req.body.vtID ?? 0;
            const status: boolean = req.body.status ?? true;

            if (eID <= 0) {
                return res.json(`Employee is not valid`);
            }
            if (vtID <= 0) {
                return res.json(`Vehicle Type is not valid`);
            }

            try {
                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC);
                const employee = await eAPI.getByID(eID);

                const vtDC = new VehicleTypeDataConnector(dataSource);
                const vtAPI = new VehicleTypeApi(vtDC);
                const vehicleType = await vtAPI.getByID(vtID);

                const result = await api.create(employee, vehicleType, status);

                return res.json(result);

            } catch (e) {
                return res.json((e as Error).message);
            }
        });

        //Update
        express.post(`/mvt/update`, async (req, res) => {
            const eID: number = req.body.eID ?? 0;
            const vtID: number = req.body.vtID ?? 0;
            const status: boolean = req.body.status;

            if (eID <= 0) {
                return res.json(`Employee is not valid`);
            }
            if (vtID <= 0) {
                return res.json(`Vehicle Type is not valid`);
            }
            if (status == undefined || status == null) {
                return res.json(`Status is not valid`);
            }

            try {
                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC);
                const employee = await eAPI.getByID(eID);

                const vtDC = new VehicleTypeDataConnector(dataSource);
                const vtAPI = new VehicleTypeApi(vtDC);
                const vehicleType = await vtAPI.getByID(vtID);


                let predicate = new MechanicVehicleType();
                predicate.employee = employee;
                predicate.type = vehicleType;

                const result = await api.update(employee, vehicleType, status);

                return res.json(result);

            } catch (e) {
                return res.json((e as Error).message);
            }
        });

        //Delete
        express.post(`/mvt/delete`, async (req, res) => {
            const eID: number = req.body.eID ?? 0;
            const vtID: number = req.body.vtID ?? 0;

            if (eID <= 0) {
                return res.json(`Employee is not valid`);
            }
            if (vtID <= 0) {
                return res.json(`Vehicle Type is not valid`);
            }


            try {
                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC);
                const employee = await eAPI.getByID(eID);

                const vtDC = new VehicleTypeDataConnector(dataSource);
                const vtAPI = new VehicleTypeApi(vtDC);
                const vehicleType = await vtAPI.getByID(vtID);

                let predicate = new MechanicVehicleType();
                predicate.employee = employee;
                predicate.type = vehicleType;

                await api.delete(employee,vehicleType);

                return res.json(
                    `Delete combination of employee(ID:${eID})` +
                    ` and Vehicle Type(ID:${vtID})`
                );

            } catch (e) {
                return res.json((e as Error).message);
            }
        });

    }
}