// Written by Frederick
// Version 1
// Last update: 2023-12-14
import axios from "axios";
import { cleanUp } from "./CleanUp";

//const targetUrl = `${process.env.TARGET_URL}`;
const targetUrl = `localhost`;

describe("Vehicle Type Integration Test", () => {

    afterAll(async () => {
        // Clean up the data from this test
        let a = await cleanUp(targetUrl, `vehicletype`, `VehicleType`, `Vehicle Type`);
        console.log(a);
    })


    describe(`Create Vehicle Type`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Rocket`,
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);
        });

        /**
         *  Property: Name 
         */
        test("With Empty Name", async () => {
            const data = {
                name: ``
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test("With Name Containing Only Spaces", async () => {
            const data = {
                name: `   `
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test("With Name Containing Leading and Trailing Spaces", async () => {
            let data = {
                name: ` Bike  `
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            );
            data.name = data.name.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);

        });


    });



    describe(`Read Vehicle Type`, () => {

        /**
         *  Property: ID
         */
        test("With Valid Existing ID", async () => {
            const data = {
                name: `SUV`,
            }

            const newVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = newVT.id;
            const response = await axios.get(
                `http://${targetUrl}/vehicletype/${id}`
            );

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);
            expect(response.data.id).toEqual(id);
        });


        /**
         *  Property: Name 
         */
        test("With Valid Name", async () => {
            const data = {
                name: `Bus A`,
            }

            const newVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = newVT.id;

            const response = await axios.post(
                `http://${targetUrl}/vehicletype`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });

        test("With Empty Name", async () => {
            const data = {
                name: `Bus B`,
            }

            const newVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;



            const response = await axios.post(
                `http://${targetUrl}/vehicletype`,
                { name: `` }
            );


            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });

        test("With Name Containing Only Spaces", async () => {
            const data = {
                name: `Bus C`,
            }

            const newVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;



            const response = await axios.post(
                `http://${targetUrl}/vehicletype`,
                { name: `         ` }
            );


            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });

        test("With Name Containing Leading and Trailing Spaces", async () => {
            const data = {
                name: `Bus D`,
            }

            const newVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;



            const response = await axios.post(
                `http://${targetUrl}/vehicletype`,
                { name: `   Bus D   ` }
            );


            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });


    });


    describe(`Update Vehicle Type`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Race Car`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;

            const newData = {
                id: id,
                name: `Cat`
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(newData);

            const readVT = (await axios.get(
                `http://${targetUrl}/vehicletype/${id}`
            )).data;

            expect(readVT).toMatchObject(newData);

        });

        /**
         * Property: ID
         */
        test(`With Negative ID`, async () => {
            const newData = {
                id: -1,
                name: `Tiger`
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);

        });

        test(`With ID 0`, async () => {
            const newData = {
                id: 0,
                name: `Panda`
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);

        });

        test(`With Non Existing ID`, async () => {
            const newData = {
                id: 9999,
                name: `Bin`
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(
                `Customer with ID ${newData.id} not found. Code: VT001`
            );

        });


        /**
         * Property: Name
         */
        test(`With Empty Name`, async () => {
            const data = {
                name: `Cup Noodle`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;
            const newData = {
                id: id,
                name: ``
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test(`With Name Containing Only Spaces`, async () => {
            const data = {
                name: `Green Tea`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;
            const newData = {
                id: id,
                name: `     `
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test(`With Name Containing Leading and Trailing Spaces`, async () => {
            const data = {
                name: `Green Tea`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;
            let newData = {
                id: id,
                name: `  Bottle  `
            }

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/update`,
                newData
            )
            newData.name = newData.name.trim()

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(newData);

        });


    });



    describe(`Delete Vehicle Type`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Pencil`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/delete`,
                {
                    id: id
                }
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Delete ID:${id}`);

            const read = await axios.get(
                `http://${targetUrl}/vehicletype/${id}`
            );
            expect(read.data).toEqual(
                `Customer with ID ${id} not found. Code: VT001`
            );

        });

        test("With Negative ID", async () => {
            const data = {
                name: `Island`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/delete`,
                {
                    id: -1
                }
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);

            const read = await axios.get(
                `http://${targetUrl}/vehicletype/${id}`
            );
            expect(read.data).toMatchObject(data);

        });

        test("With ID 0", async () => {
            const data = {
                name: `Clold`,
            }

            const createdVT = (await axios.post(
                `http://${targetUrl}/vehicletype/new`,
                data
            )).data;

            const id = createdVT.id;

            const response = await axios.post(
                `http://${targetUrl}/vehicletype/delete`,
                {
                    id: 0
                }
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);

            const read = await axios.get(
                `http://${targetUrl}/vehicletype/${id}`
            );
            expect(read.data).toMatchObject(data);

        });




    });



});

