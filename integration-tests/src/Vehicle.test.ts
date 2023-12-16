// Written by Xingru
// Version 1
// Last update: 2023-12-15
import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

describe("Vehicle Integration Test", () => {


    describe(`Create`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                {
                    name: `Motorcycles`,
                }
            )).data;

            const data = {
                brand: 'Aoeing',
                model: 'Aoeing 66',
                load: 150,
                capacity: 117,
                year: 2022,
                numberOfRepair: 1,
                type: newVehicleType.id,
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicle/new`,
                data
            );


            const dataToCompare = {
                brand: 'Aoeing',
                model: 'Aoeing 66',
                load: 150,
                capacity: 117,
                year: 2022,
                numberOfRepair: 1,
                type: newVehicleType
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);
        });

    });








    describe(`Read`, () => {

        test("With Valid Existing ID", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                {
                    name: `trucks`,
                }
            )).data;

            const data = {
                brand: 'Volvo',
                model: 'Volvo FH16',
                load: 15000,
                capacity: 130000,
                year: 2022,
                numberOfRepair: 2,
                type: newVehicleType.id,
            }

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                data
            )).data;

            const dataToCompare = {
                brand: 'Volvo',
                model: 'Volvo FH16',
                load: 15000,
                capacity: 130000,
                year: 2022,
                numberOfRepair: 2,
                type: newVehicleType
            };

            expect(newVehicle).toMatchObject(dataToCompare);

            const response = await axios.get(
                `http://${targetUrl}/vehicle/${newVehicle.id}`
            );

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);

        });

    });










    describe(`Update`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                {
                    name: `Boat`,
                }
            )).data;


            const data = {
                brand: 'OceanMaster',
                model: 'Sea Voyager 3000',
                load: 180,
                capacity: 130,
                year: 2023,
                numberOfRepair: 2,
                type: newVehicleType.id,
            }

            const vehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                data
            )).data;


            const updatedData = {
                id: vehicle.id,
                brand: 'Seafarer',
                model: 'Marine Cruiser XL',
                load: 200,
                capacity: 150,
                year: 2024,
                numberOfRepair: 1,
                type: newVehicleType.id
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicle/update`,
                updatedData
            );

            const expectedData = {
                id: vehicle.id,
                brand: 'Seafarer',
                model: 'Marine Cruiser XL',
                load: 200,
                capacity: 150,
                year: 2024,
                numberOfRepair: 1,
                type: newVehicleType
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expectedData);

            const response2 = await axios.get(
                `http://${targetUrl}/vehicle/${vehicle.id}`,
            );

            expect(response2.status).toBe(200);
            expect(response2.data).toMatchObject(expectedData);
        });



    });








    describe(`Delete`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                {
                    name: `Taxi`,
                }
            )).data;

            const data = {
                brand: 'OceanMaster',
                model: 'Sea Voyager 3000',
                load: 180,
                capacity: 130,
                year: 2023,
                numberOfRepair: 2,
                type: newVehicleType.id
            }

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                data
            )).data;

            const response1 = await axios.get(
                `http://${targetUrl}/vehicle/${newVehicle.id}`
            );


            const expectedData = {
                brand: 'OceanMaster',
                model: 'Sea Voyager 3000',
                load: 180,
                capacity: 130,
                year: 2023,
                numberOfRepair: 2,
                type: newVehicleType
            }
            expect(response1.status).toBe(200);
            expect(response1.data).toMatchObject(expectedData);

            const response2 = await axios.post(
                `http://${targetUrl}/vehicle/delete`,
                { id: newVehicle.id }
            );

            expect(response2.status).toBe(200);
            expect(response2.data).toEqual(`Delete ID:${newVehicle.id}`);

        });
    });



});

