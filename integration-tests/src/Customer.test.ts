// Written by Frederick
// Version 1
// Last update: 2023-12-13
// Written by Frederick
// Version 2
// Last update: 2023-12-14

import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();
describe("Customer Integration Test", () => {



    describe(`Create Customer`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Starley`,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
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
                name: ``,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);

        });

        test("With Name Containing Only Spaces", async () => {
            const data = {
                name: `    `,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid`);
        });


        test("With Name Containing Leading and Trailing Spaces", async () => {
            let data = {
                name: ` Alex `,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            data.name = data.name.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);
        });


        /**
         *  Property: Address 
         */
        test("With Empty Address", async () => {
            const data = {
                name: `Alex`,
                address: ``,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Address is not valid`);

        });

        test("With Address Containing Only Spaces", async () => {
            const data = {
                name: `Alex`,
                address: `    `,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Address is not valid`);
        });


        test("With Address Containing Leading and Trailing Spaces", async () => {
            let data = {
                name: `Alex`,
                address: `  99 Queen St  `,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            data.address = data.address.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);
        });


        /**
         *  Property: phoneNumber1 
         */
        test("With Empty phoneNumber1", async () => {
            const data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: ``,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Phone Number 1 is not valid`);

        });

        test("With phoneNumber1 Containing Only Spaces", async () => {
            const data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `   `,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Phone Number 1 is not valid`);
        });


        test("With phoneNumber1 Containing Leading and Trailing Spaces", async () => {
            let data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `   6593214795  `,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            data.phoneNumber1 = data.phoneNumber1.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);
        });


        /**
         *  Property: phoneNumber2
         *  Phone number 2 is optional accordingt to requirements. 
         */

        test("Without phoneNumber2", async () => {
            const data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6399841165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);

        });


        test("With Empty phoneNumber2", async () => {
            const data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6399841165`,
                phoneNumber2: ``,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            const expectedData = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6399841165`,
                phoneNumber2: null
            }


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expectedData);

        });

        test("With phoneNumber2 Containing Only Spaces", async () => {
            const data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `   `,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            const expectedData = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: null
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expectedData);
        });


        test("With phoneNumber2 Containing Leading and Trailing Spaces", async () => {
            let data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `  6399841165  `,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            );

            data.phoneNumber2 = data.phoneNumber2.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);
        });
    });


    describe(`Read Customer`, () => {

        test("With Valid Existing ID", async () => {

            let data = {
                name: `Alex`,
                address: `99 King St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const customer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            )).data;

            const id = customer.id;

            const response = await axios.get(
                `http://${targetUrl}/customer/${id}`
            );

            expect(response.status).toBe(200);
            expect(response.data.id).toEqual(id);
            expect(response.data).toMatchObject(data);

        });


        test("With negative ID", async () => {
            const id = -1;

            const response = await axios.get(
                `http://${targetUrl}/customer/${id}`
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);
        });

        test("With ID 0", async () => {
            const id = 0;

            const response = await axios.get(
                `http://${targetUrl}/customer/${id}`
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`);
        });


        test("With non existing ID", async () => {
            const id = 9999999;

            const response = await axios.get(
                `http://${targetUrl}/customer/${id}`
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Customer with ID ${id} not found. Code: CG001`);
        });

    });

    describe(`Update Customer`, () => {


        test("With Valid Data", async () => {

            const data = {
                name: `Starley`,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            let createdCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            )).data;


            expect(createdCustomer).toMatchObject(data);

            const id = createdCustomer.id;

            const newData = {
                id: id,
                name: `Starley Delfino`,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/update`,
                newData
            );
            createdCustomer = (await axios.get(
                `http://${targetUrl}/customer/${id}`
            )).data;


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(newData);
            expect(createdCustomer).toMatchObject(newData);

        });

        /**
         *  ID
         */
        test("With negative ID", async () => {
            const id = -1;

            const newData = {
                id: id,
                name: `Starley Delfino`,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/update`,
                newData
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid. Code:CUUP0`);
        });

        test("With ID 0", async () => {
            const id = 0;

            const newData = {
                id: id,
                name: `Starley Delfino`,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/update`,
                newData
            );

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid. Code:CUUP1`);
        });

        /**
         * Name
         */
        test("With Empty Name", async () => {
            const data = {
                name: `Jason`,
                address: `9999 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const createdCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            )).data;


            expect(createdCustomer).toMatchObject(data);

            const id = createdCustomer.id;

            const newData = {
                id: id,
                name: ``,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/update`,
                newData
            );
            const readCustomer = (await axios.get(
                `http://${targetUrl}/customer/${id}`
            )).data;

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid. Code:CUUP2`);
            expect(readCustomer).toMatchObject(createdCustomer);

        });

        test("With Name Containing Only Spaces", async () => {
            const data = {
                name: `Jason`,
                address: `9999 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const createdCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            )).data;


            expect(createdCustomer).toMatchObject(data);

            const id = createdCustomer.id;

            const newData = {
                id: id,
                name: `   `,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/update`,
                newData
            );
            const readCustomer = (await axios.get(
                `http://${targetUrl}/customer/${id}`
            )).data;

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Name is not valid. Code:CUUP2`);
            expect(readCustomer).toMatchObject(createdCustomer);
        });


        test("With Name Containing Leading and Trailing Spaces", async () => {
            const data = {
                name: `Jason`,
                address: `9999 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const createdCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            )).data;


            expect(createdCustomer).toMatchObject(data);

            const id = createdCustomer.id;

            let newData = {
                id: id,
                name: `   Johnson   `,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(
                `http://${targetUrl}/customer/update`,
                newData
            );
            const readCustomer = (await axios.get(
                `http://${targetUrl}/customer/${id}`
            )).data;

            newData.name = newData.name.trim();
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(newData);
            expect(readCustomer).toMatchObject(newData);
        });

    });

    describe(`Delete Customer`, () => {

        test("With Valid Existing ID", async () => {
            const data = {
                name: `Starley`,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const customer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                data
            )).data;

            expect(customer).toMatchObject(data);

            const id = customer.id;

            const response = await axios.post(
                `http://${targetUrl}/customer/delete`,
                { id: id }
            );
            const noOne = (await axios.get(
                `http://${targetUrl}/customer/${id}`
            )).data;


            expect(response.status).toBe(200);
            expect(noOne).toEqual(`Customer with ID ${id} not found. Code: CG001`);

        });


        test("With negative ID", async () => {

            const id = -1;

            const response = await axios.post(
                `http://${targetUrl}/customer/delete`,
                { id: id }
            );


            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`)

        });

        test("With ID 0", async () => {

            const id = 0;

            const response = await axios.post(
                `http://${targetUrl}/customer/delete`,
                { id: id }
            );


            expect(response.status).toBe(200);
            expect(response.data).toEqual(`ID is not valid`)

        });
    });

});