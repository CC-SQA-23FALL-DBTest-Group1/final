// Written by Frederick
// Version 1
// Last update: 2023-12-14

import { DataSource } from "typeorm";
import { Express } from "express";
import { EmployeeDataConnector, EmployeeVehicleTypeOperationDataConnector, VehicleTypeDataConnector } from "../dataconnector";
import { EmployeeApi, EmployeeVehicleTypeOperationApi, VehicleTypeApi } from "../api";
import { EmployeeVehicleTypeOperation } from "../models";

export class EmployeeVehicleTypeOperationApiRegister {

    constructor(dataSource: DataSource, express: Express) {
        const dc = new EmployeeVehicleTypeOperationDataConnector(dataSource);
        const api = new EmployeeVehicleTypeOperationApi(dc);

        //Default
        express.get(`/evto`, (_, res) => {
            return res.json(`Employee Vehicle Type Operation`);
        });

        //Read
        express.post(`/evto`, async (req, res) => {
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

                let predicate = new EmployeeVehicleTypeOperation();
                if(employee){
                    predicate.employee = employee;
                }
                if(vehicleType){
                    predicate.type = vehicleType;
                }

                const result = await api.get(predicate);

                return res.json(result);

            } catch (e) {
                return res.json((e as Error).message);
            }

        });


        //Create
        express.post(`/evto/new`, async (req, res) => {
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

                const result = await api.create(employee, vehicleType);

                return res.json(result);

            } catch (e) {
                return res.json((e as Error).message);
            }
        });

        //Update
        express.post(`/evto/update`, async (req, res) => {
            const eID: number = req.body.eID ?? 0;
            const vtID: number = req.body.vtID ?? 0;
            const newVTID: number = req.body.newVTID ?? 0;

            if (eID <= 0) {
                return res.json(`Employee is not valid`);
            }
            if (vtID <= 0) {
                return res.json(`Vehicle Type is not valid`);
            }
            if (newVTID <= 0) {
                return res.json(`New Vehicle Type is not valid`);
            }

            try {
                const eDC = new EmployeeDataConnector(dataSource);
                const eAPI = new EmployeeApi(eDC);
                const employee = await eAPI.getByID(eID);

                const vtDC = new VehicleTypeDataConnector(dataSource);
                const vtAPI = new VehicleTypeApi(vtDC);
                const vehicleType = await vtAPI.getByID(vtID);
                const newVhicleType = await vtAPI.getByID(newVTID);

                let predicate = new EmployeeVehicleTypeOperation();
                predicate.employee = employee;
                predicate.type = vehicleType;

                const result = await api.update(predicate, newVhicleType);

                return res.json(result);

            } catch (e) {
                return res.json((e as Error).message);
            }
        });

        //Delete
        express.post(`/evto/delete`, async (req, res) => {
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

                let predicate = new EmployeeVehicleTypeOperation();
                predicate.employee = employee;
                predicate.type = vehicleType;

                await api.delete(predicate);

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