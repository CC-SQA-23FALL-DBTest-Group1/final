// Written by Frederick
// Version 1
// Last update: 2023-12-13

import axios from "axios";

const targetUrl = `localhost`;

describe("Customer Integration Test", () => {



    afterAll(async () => {
        // Clean up the data from this test
        const response = await axios.post(`http://${targetUrl}/customer`);
        if (response.data) {
            const customers = response.data as any[];
            console.log(
                `==============================================`
                + `\n`
                + `Existing records in the table:`
                + `${customers?.length ?? `None`}`
                + `\n`
                + `==============================================`
            );

            if (customers.length > 3) {
                console.log(`Cleaning up records from previous test.`);
                customers.forEach(async customer => {
                    if (customer.id > 3) {
                        await axios.post(
                            `http://${targetUrl}/customer/delete`,
                            { id: customer.id }
                        );
                    }
                });
                console.log(
                    `Cleaned up records from previous test.`
                    + `\n`
                    + `==============================================`
                );
            }
            else if (customers.length > 0) {
                console.log(
                    `Reserve records from migration.`
                    + `\n==============================================`
                );

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

        test("With Address Containing Only Spaces", async () => {
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


        test("With Address Containing Leading and Trailing Spaces", async () => {
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
    });


    describe(`Read Customer`, () => {

        test("With Valid Existing ID", async () => {
            const id = 1;

            const response = await axios.get(
                `http://${targetUrl}/customer/${id}`
            );

            expect(response.status).toBe(200);
            expect(response.data.id).toEqual(id);

        });

    });

    describe(`Update Customer`, () => {

        test("With Valid Existing ID", async () => {

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
            console.log(noOne);

        });
    });

});