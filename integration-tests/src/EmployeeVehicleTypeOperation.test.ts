// Written by Frederick
// Version 1
// Last update: 2023-12-14

import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

describe("Employee Vehicle Type Operation Integration Test", () => {


    describe(`Create Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test EVTO A`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;

            const vehicleTypeData2 = {
                name: `Test EVTO B`
            }

            const newVehicleType2 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData2
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

            const newECTOData = {
                eID: newEmployee.id,
                vtID: newVehicleType2.id,
            }

            const response = await axios.post(
                `http://${targetUrl}/evto/new`,
                newECTOData
            )

            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType2.id,
                    name: newVehicleType2.name
                }
            }


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);




        });
    });


    describe(`Read Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test EVTO AA`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;

            const vehicleTypeData2 = {
                name: `Test EVTO BB`
            }

            const newVehicleType2 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData2
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

            const newECTOData = {
                eID: newEmployee.id,
                vtID: newVehicleType2.id,
            };

            const newECTO = (await axios.post(
                `http://${targetUrl}/evto/new`,
                newECTOData
            )).data;

            
            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType2.id,
                    name: newVehicleType2.name
                }
            };

            expect(newECTO).toMatchObject(dataToCompare);

            const response = await axios.post(
                `http://${targetUrl}/evto`,
                newECTOData
            );


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject([dataToCompare]);
            
        });
    });


    describe(`Update Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test EVTO AAA`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;

            const vehicleTypeData2 = {
                name: `Test EVTO BBB`
            }

            const newVehicleType2 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData2
            )).data;

            const vehicleTypeData3 = {
                name: `Test EVTO CCC`
            }

            const newVehicleType3 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData3
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

            const newECTOData = {
                eID: newEmployee.id,
                vtID: newVehicleType2.id,
            };

            const newECTO = (await axios.post(
                `http://${targetUrl}/evto/new`,
                newECTOData
            )).data;


            const updateDate = {
                eID: newECTO.employee.id,
                vtID: newECTO.type.id,
                newVTID: newVehicleType3.id,
            }

            
            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType3.id,
                    name: newVehicleType3.name
                }
            };

            

            const response = await axios.post(
                `http://${targetUrl}/evto/update`,
                updateDate
            );


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);
            
        });
    });


    describe(`Delete Record`, () => {

        test(`With Valid Data`, async () => {
            const vehicleTypeData1 = {
                name: `Test EVTO AAAA`
            }

            const newVehicleType1 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData1
            )).data;

            const vehicleTypeData2 = {
                name: `Test EVTO BBBB`
            }

            const newVehicleType2 = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData2
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

            const newECTOData = {
                eID: newEmployee.id,
                vtID: newVehicleType2.id,
            }

            const newEVTO = (await axios.post(
                `http://${targetUrl}/evto/new`,
                newECTOData
            )).data;

                
            const dataToCompare = {
                employee: {
                    firstName: newEmployeeData.firstName,
                    lastName: newEmployeeData.lastName,
                    id: newEmployee.id,
                    seniority: newEmployee.seniority,
                },
                type: {
                    id: newVehicleType2.id,
                    name: newVehicleType2.name
                }
            }
            expect(newEVTO).toMatchObject(dataToCompare)

            const response = await axios.post(
                `http://${targetUrl}/evto/delete`,
                newECTOData
            );


            expect(response.status).toBe(200);
            expect(response.data).toEqual(
                `Delete combination of employee(ID:${newEmployee.id}) `+
                `and Vehicle Type(ID:${newVehicleType2.id})`
                );




        });
    });

});