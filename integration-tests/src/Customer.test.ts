// Written by Frederick
// Version 1
// Last update: 2023-12-13

import axios from "axios";

const targetUrl = `localhost`;

describe("Customer Integration Test", () => {

    afterEach(async () => {
        // Clean up the data from previous test
        const response = await axios.get(`http://${targetUrl}/customer`);
        console.log(response)
        if (response) {
            const customers = JSON.parse(response.data) as any[];
            console.log(`==============================================`);
            console.log(`Existing records in the table:`);
            console.log(customers ?? `None`);
            console.log(`==============================================`);

            if (customers.length > 0) {
                if (customers.length > 3) {
                    console.log(`Cleaning up records from previous test.`);
                    customers.forEach(async customer => {
                        if (customer.id > 3) {
                            await axios.post(`http://${targetUrl}/customer/delete`, { id: customer.id })
                        }
                    });
                    console.log(`Cleaned up records from previous test.`);
                    console.log(`==============================================`);
                }
                else {
                    console.log(`Reserve records from migration.`);
                    console.log(`==============================================`);
                }

            } else {
                throw Error(`Customer Integration Test Stops.`)
            }
        }
        else {
            throw Error(`Customer Integration Test Stops.`)
        }
    })





    describe(`Create Customer`, () => {

        test("With Valid Data", async () => {
            const data = {
                name: `Starley`,
                address: `99 Queen St`,
                phoneNumber1: `6593214795`,
                phoneNumber2: `6399841165`,
            }

            const response = await axios.post(`http://${targetUrl}/customer/new`, data);

            console.log(response.status);
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(data);

        });
    });

/*
    describe(`Read Customer`, () => {

        test("With Valid Existing ID", async () => {
            const id = 4;

            const response = await axios.get(`http://${targetUrl}/customer/${id}`);

            console.log(response.status);
            expect(response.status).toBe(200);
            expect(response.data.id).toEqual(4);

        });
    });

    describe(`Update Customer`, () => {

        test("With Valid Existing ID", async () => {
            const id = 4;
            const newData = {
                name: `Starley Delfino`,
                address: `1000 Queen St`,
                phoneNumber1: `5693000005`,
                phoneNumber2: `6300041165`,
            }

            const response = await axios.post(`http://${targetUrl}/update`, newData);
            const customer = await (await axios.get(`http://${targetUrl}/customer/${id}`)).data;

            console.log(response.status);
            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(newData);
            expect(customer).toMatchObject(newData);

        });
    });

    describe(`Delete Customer`, () => {

        test("With Valid Existing ID", async () => {
            const id = 4;

            const response = await axios.post(`http://${targetUrl}/delete`, { id: id });
            const customer = await (await axios.get(`http://${targetUrl}/customer/${id}`)).data;

            console.log(response.status);
            expect(response.status).toBe(200);
            console.log(customer);

        });
    });
*/
});