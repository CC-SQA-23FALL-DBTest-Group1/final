// Written by Frederick
// Version 1
// Last update: 2023-12-14

import { DataSource } from "typeorm";
import { Express } from "express";
import {
    EmployeeDataConnector,
    EmployeeVehicleTypeOperationDataConnector,
    VehicleTypeDataConnector
} from "../dataconnector";
import {
    EmployeeApi,
    EmployeeVehicleTypeOperationApi,
    VehicleTypeApi
} from "../api";
import { Employee } from "../models";


/**
 * Register the urls related to Employee table.
 * Give Responses with JSON.
 * All errors should be cought here.
 */
export class EmployeeApiRegister {

    constructor(dataSource: DataSource, express: Express) {

        const dc = new EmployeeDataConnector(dataSource);
        const api = new EmployeeApi(dc);

        //Default
        express.get(`/employee`, (_, res) => {
            return res.json(`Employee`);
        });

        //Read one Employee
        express.get(`/employee/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else if (parseInt(id) <= 0) {
                return res.json(`ID is not valid`);
            }

            try {
                const employee = await api.getByID(parseInt(id));
                return res.json(employee);
            } catch (e) {
                return res.json((e as Error).message);
            }

        });

        //Read Employees
        express.post(`/employee`, async (req, res) => {
            const firstName: string = req.body.firstName?.trim() ?? ``;
            const lastName: string = req.body.lastName?.trim() ?? ``;
            const seniority: number = req.body.seniority ?? -1;
           
            let predicate = new Employee();
            predicate.firstName = firstName;
            predicate.lastName = lastName;
            predicate.seniority = Math.round(seniority);

            try {
                const employees = await api.get(predicate);
                return res.json(employees);
            } catch (e) {
                return res.json((e as Error).message);
            }
        });

        //Create Employee
        //Employee at least can operate one vehicle type
        express.post(`/employee/new`, async (req, res) => {
            const firstName: string = req.body.firstName?.trim() ?? ``;
            const lastName: string = req.body.lastName?.trim() ?? ``;
            const seniority: number = req.body.seniority ?? -1;
            const vehicleTypeID: number = req.body.vehicleTypeID ?? -1;

            if (firstName.length == 0) {
                return res.json(`First name is not valid`);
            }
            if (lastName.length == 0) {
                return res.json(`Last name is not valid`);
            }
            if (seniority < 0) {
                return res.json(`Seniority is not valid`);
            }
            if (vehicleTypeID <= 0) {
                return res.json(`Vehicle type is not valid`);
            }
            else {

                // Check if Vehicle Type exists
                const vdc = new VehicleTypeDataConnector(dataSource);
                const vapi = new VehicleTypeApi(vdc);
                try {
                    const vt = await vapi.getByID(vehicleTypeID);

                    // Vehicle Type exists
                    // Then Create new employee
                    // And EmployeeVehicleTypeOperation
                    try {

                        const newEmployee = await api.create(
                            firstName,
                            lastName,
                            seniority
                        );

                        // Creation of employee done
                        //  Then try to create EmployeeVehicleTypeOperation
                        const evtoDC =
                            new EmployeeVehicleTypeOperationDataConnector(
                                dataSource
                            );
                        const evtoAPI =
                            new EmployeeVehicleTypeOperationApi(evtoDC);

                        try {

                            await evtoAPI.create(newEmployee, vt);
                            
                        } catch (e) {

                            // Failed to create EmployeeVehicleTypeOperation
                            // Then Remove the new Employee
                            try {
                                await api.deleteByID(newEmployee.id);
                            } catch (e) {
                                return res.json((e as Error).message);
                            }
                            return res.json((e as Error).message);
                        }
                        // Creation of employee done
                        // Creation of EmployeeVehicleTypeOperation done
                        return res.json(newEmployee);
                    } catch (e) {
                        return res.json((e as Error).message);
                    }


                }
                catch {
                    return res.json(`Vehicle type does not exist`);
                }

            }



        });


        //Update Employee
        express.post(`/employee/update`, async (req, res) => {
            const id: number = req.body.id ?? 0
            const firstName: string = req.body.firstName?.trim() ?? ``;
            const lastName: string = req.body.lastName?.trim() ?? ``;
            const seniority: number = req.body.seniority ?? -1;

            if (id <= 0) {
                return res.json(`ID is not valid`);
            }
            if (firstName.length == 0) {
                return res.json(`First name is not valid`);
            }
            if (lastName.length == 0) {
                return res.json(`Last name is not valid`);
            }
            if (seniority < 0) {
                return res.json(`Seniority is not valid`);
            }

            try {

                const result = await api.updateByID(
                    id,
                    firstName,
                    lastName,
                    seniority
                );

                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        });


        //Delete Employee
        express.post(`/employee/delete`, async (req, res) => {
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

        });


    }



}