// Written by Xingru
// Reviewed by Frederick
// Version 1
// Last update: 2023-12-14
import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

describe("Transit Point Integration Test", () => {


    describe(`Create Transit Point`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Warehouse A`,
            }

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/new`,
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
                `http://${targetUrl}/transitpoint/new`,
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
                `http://${targetUrl}/transitpoint/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test("With Name Containing Leading and Trailing Spaces", async () => {
            let data = {
                name: ` Warehouse B  `
            }

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            );
            data.name = data.name.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);

        });


    });



    describe(`Read Transit Point`, () => {

        /**
         *  Property: ID
         */
        test("With Valid Existing ID", async () => {
            const data = {
                name: `Warehouse C`,
            }

            const newTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = newTP.id;
            const response = await axios.get(
                `http://${targetUrl}/transitpoint/${id}`
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
                name: `Warehouse D`,
            }

            const newTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = newTP.id;

            const response = await axios.post(
                `http://${targetUrl}/transitpoint`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });

        test("With Empty Name", async () => {
            const data = {
                name: `Warehouse E`,
            }

            const newTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;



            const response = await axios.post(
                `http://${targetUrl}/transitpoint`,
                { name: `` }
            );


            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });

        test("With Name Containing Only Spaces", async () => {
            const data = {
                name: `Warehouse F`,
            }

            const newTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;



            const response = await axios.post(
                `http://${targetUrl}/transitpoint`,
                { name: `         ` }
            );


            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });

        test("With Name Containing Leading and Trailing Spaces", async () => {
            const data = {
                name: `Warehouse G`,
            }

            const newTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;



            const response = await axios.post(
                `http://${targetUrl}/transitpoint`,
                { name: `   Warehouse G  ` }
            );


            expect(response.status).toBe(200);
            expect(response.data.length).toBeGreaterThanOrEqual(1);

        });


    });


    describe(`Update Vehicle Type`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Distribution Center 1`,
            }

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;

            const newData = {
                id: id,
                name: `Cat`
            }

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/update`,
                newData
            )
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(newData);

            const readTP = (await axios.get(
                `http://${targetUrl}/transitpoint/${id}`
            )).data;

            expect(readTP).toMatchObject(newData);

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
                `http://${targetUrl}/transitpoint/update`,
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
                `http://${targetUrl}/transitpoint/update`,
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
                `http://${targetUrl}/transitpoint/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(
                `Transit Point with ID ${newData.id} not found. Code: TS001`
            );

        });


        /**
         * Property: Name
         */
        test(`With Empty Name`, async () => {
            const data = {
                name: `Cup Noodle`,
            }

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;
            const newData = {
                id: id,
                name: ``
            }

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test(`With Name Containing Only Spaces`, async () => {
            const data = {
                name: `Green Tea`,
            }

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;
            const newData = {
                id: id,
                name: `     `
            }

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/update`,
                newData
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test(`With Name Containing Leading and Trailing Spaces`, async () => {
            const data = {
                name: `Green Tea`,
            }

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;
            let newData = {
                id: id,
                name: `  Bottle  `
            }

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/update`,
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

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/delete`,
                {
                    id: id
                }
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Delete ID:${id}`);

            const read = await axios.get(
                `http://${targetUrl}/transitpoint/${id}`
            );
            expect(read.data).toEqual(`Transit Point with ID ${id} not found. Code: TS001`);


        });

        test("With Negative ID", async () => {
            const data = {
                name: `Island`,
            }

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/delete`,
                {
                    id: -1
                }
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);

            const read = await axios.get(
                `http://${targetUrl}/transitpoint/${id}`
            );
            expect(read.data).toMatchObject(data);

        });

        test("With ID 0", async () => {
            const data = {
                name: `Clold`,
            }

            const createdTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                data
            )).data;

            const id = createdTP.id;

            const response = await axios.post(
                `http://${targetUrl}/transitpoint/delete`,
                {
                    id: 0
                }
            )

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);

            const read = await axios.get(
                `http://${targetUrl}/transitpoint/${id}`
            );
            expect(read.data).toMatchObject(data);

        });




    });



});

