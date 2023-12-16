// Written by Frederick
// Version 1
// Last update: 2023-12-14

import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

describe("Employee Integration Test", () => {




    describe(`Create Employee`, () => {

        test("With Valid Data", async () => {
            const vehicleTypeData = {
                name: `Test Employee A`
            }

            const vehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData
            )).data;


            const dataToSend = {
                firstName: `John`,
                lastName: `Enderson`,
                seniority: 1,
                vehicleTypeID: vehicleType.id,
            }

            const dataToVerify = {
                firstName: `John`,
                lastName: `Enderson`,
                seniority: 1,
            }



            const response = await axios.post(
                `http://${targetUrl}/employee/new`,
                dataToSend
            );

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToVerify);

        });
    });

    describe(`Read Employee`, ()=>{
        test(`With Valid Existing ID`, async()=>{
            const vehicleTypeData = {
                name: `Test Employee B`
            }

            const vehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData
            )).data;

            const dataToSend = {
                firstName: `Eric`,
                lastName: `Enderson`,
                seniority: 1,
                vehicleTypeID: vehicleType.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                dataToSend
            )).data;

            const dataToVerify = {
                id: newEmployee.id,
                firstName: `Eric`,
                lastName: `Enderson`,
                seniority: 1,
            }

            const response = await axios.get(
                `http://${targetUrl}/employee/${newEmployee.id}`
            )

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToVerify);

        });
    });


    describe(`Update Employee`, ()=>{
        test(`With Valid Existing ID`, async()=>{
            const vehicleTypeData = {
                name: `Test Employee C`
            }

            const vehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData
            )).data;

            const dataToSend = {
                firstName: `Eric`,
                lastName: `Enderson`,
                seniority: 1,
                vehicleTypeID: vehicleType.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                dataToSend
            )).data;

            const updatedData = {
                id: newEmployee.id,
                firstName: `Ericson`,
                lastName: `Alexandra`,
                seniority: 2,
            }

            const response = await axios.post(
                `http://${targetUrl}/employee/update`,
                updatedData
            )

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(updatedData);

        })
    });

    describe(`Delete Employee`, ()=>{
        test(`With Valid Existing ID`, async()=>{
            const vehicleTypeData = {
                name: `Test Employee D`
            }

            const vehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                vehicleTypeData
            )).data;

            const dataToSend = {
                firstName: `Mamala`,
                lastName: `Ontaroi`,
                seniority: 9,
                vehicleTypeID: vehicleType.id,
            }

            const newEmployee = (await axios.post(
                `http://${targetUrl}/employee/new`,
                dataToSend
            )).data;

            const predicate1 = {
                id: newEmployee.id,
            }

            const response1 = await axios.post(
                `http://${targetUrl}/employee/delete`,
                predicate1
            )

            expect(response1.status).toBe(200);
            expect(response1.data).toEqual(`Delete ID:${newEmployee.id}`);

            const predicate2 ={
                eID: newEmployee.id,
                vtID: vehicleType.id
            }
            const response2 = await axios.post(
                `http://${targetUrl}/evto`,
                predicate2
            )

            expect(response2.status).toBe(200);
            expect(response2.data).toEqual(`Employee does not exist`);
                

        })
    });


});
