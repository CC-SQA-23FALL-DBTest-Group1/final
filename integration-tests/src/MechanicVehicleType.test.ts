// Written by Frederick
// Version 1
// Last update: 2023-12-15

import axios from "axios";
import { cleanUp } from "./CleanUp"

//const targetUrl = `${process.env.TARGET_URL}`;
const targetUrl = `localhost`;

describe("Mechanic Vehicle Type Integration Test", () => {


    describe(`Create Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test MVT A`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;


            const newEmployeeData = {
                firstName: `Johnathon`,
                lastName: `En`,
                seniority: 1,
                vehicleTypeID: newVehicleType1.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                newEmployeeData
            )).data;

            const newMVTData = {
                eID: newEmployee.id,
                vtID: newVehicleType1.id,
                status: false,
            }

            const response = await axios.post(
                `http://${targetUrl}/mvt/new`,
                newMVTData
            )

            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {

                }
            }


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);




        });
    });


    describe(`Read Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test MVT AA`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;


            const newEmployeeData = {
                firstName: `TAX`,
                lastName: `RETURN`,
                seniority: 1,
                vehicleTypeID: newVehicleType1.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                newEmployeeData
            )).data;

            const newData = {
                eID: newEmployee.id,
                vtID: newVehicleType1.id,
                status: false,
            };

            await axios.post(
                `http://${targetUrl}/mvt/new`,
                newData
            )

            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType1.id,
                    name: newVehicleType1.name
                },
                status: newData.status,
            };

            const predicate = {
                eID: newEmployee.id,
                vtID: newVehicleType1.id,
            };

            const response = await axios.post(
                `http://${targetUrl}/mvt`,
                predicate
            );


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject([dataToCompare]);

        });
    });


    describe(`Update Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test MVT AAA`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;


            const newEmployeeData = {
                firstName: `TAX`,
                lastName: `RETURN`,
                seniority: 1,
                vehicleTypeID: newVehicleType1.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                newEmployeeData
            )).data;

            const newMVTData = {
                eID: newEmployee.id,
                vtID: newVehicleType1.id,
                status: false,
            };

            const newMVT = (await axios.post(
                `http://${targetUrl}/mvt/new`,
                newMVTData
            )).data;



            const updateDate = {
                eID: newMVT.employee.id,
                vtID: newMVT.type.id,
                status: !newMVT.status,
            }


            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType1.id,
                    name: newVehicleType1.name
                },
                status: !newMVT.status
            };



            const response = await axios.post(
                `http://${targetUrl}/mvt/update`,
                updateDate
            );


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);

        });
    });


    describe(`Delete Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test MVT AAAA`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;


            const newEmployeeData = {
                firstName: `Johnathon`,
                lastName: `En`,
                seniority: 1,
                vehicleTypeID: newVehicleType1.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                newEmployeeData
            )).data;

            const newMVTData = {
                eID: newEmployee.id,
                vtID: newVehicleType1.id,
                status: true,
            }

            const newMVT = (await axios.post(
                `http://${targetUrl}/mvt/new`,
                newMVTData
            )).data;


            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType1.id,
                    name: newVehicleType1.name
                }
            }
            expect(newMVT).toMatchObject(dataToCompare)

            const response = await axios.post(
                `http://${targetUrl}/mvt/delete`,
                newMVTData
            );


            expect(response.status).toBe(200);
            expect(response.data).toEqual(
                `Delete combination of employee(ID:${newEmployee.id}) ` +
                `and Vehicle Type(ID:${newVehicleType1.id})`
            );




        });
    });

});