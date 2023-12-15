// Written by Frederick
// Version 1
// Last update: 2023-12-15
import axios from "axios";

//const targetUrl = `${process.env.TARGET_URL}`;
const targetUrl = `localhost`;

describe("Shipment Integration Test", () => {


    describe(`Create`, () => {

        test("With Valid Data", async () => {
            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `ABCDE`,
                    address: `REWPPFLD`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const toTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 999`,
                }
            )).data;


            const fromTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 9559`,
                }
            )).data;

            const data = {
                from: fromTP.id,
                to: toTP.id,
                customerID: newCustomer.id,
                weight: 66,
                value: 7
            }

            const response = await axios.post(
                `http://${targetUrl}/shipment/new`,
                data
            );


            const dataToCompare = {
                from: fromTP,
                to: toTP,
                customer: newCustomer,
                weight: 66,
                value: 7
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);
        });

    });



    describe(`Read`, () => {

        test("With Valid Existing ID", async () => {
            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Poom`,
                    address: `1 Han St`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const toTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse q99`,
                }
            )).data;


            const fromTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 33559`,
                }
            )).data;

            const data = {
                from: fromTP.id,
                to: toTP.id,
                customerID: newCustomer.id,
                weight: 10,
                value: 100
            }

            const newShipment = (await axios.post(
                `http://${targetUrl}/shipment/new`,
                data
            )).data;




            const dataToCompare = {
                from: fromTP,
                to: toTP,
                customer: newCustomer,
                weight: 10,
                value: 100
            }
            expect(newShipment).toMatchObject(dataToCompare);

            const response = await axios.get(
                `http://${targetUrl}/shipment/${newShipment.id}`
            )

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);

        });

    });


    describe(`Update`, () => {

        test("With Valid Data", async () => {
            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Hons`,
                    address: `Aqua`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const toTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 999`,
                }
            )).data;


            const fromTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 9559`,
                }
            )).data;

            const data = {
                from: fromTP.id,
                to: toTP.id,
                customerID: newCustomer.id,
                weight: 66,
                value: 7
            }

            const shipment = await axios.post(
                `http://${targetUrl}/shipment/new`,
                data
            );


            const dataToCompare = {
                id: shipment.data.id,
                from: fromTP,
                to: toTP,
                customer: newCustomer,
                weight: 100,
                value: 7
            }

            const dataToSend = {
                id: shipment.data.id,
                from: fromTP.id,
                to: toTP.id,
                customerID: newCustomer.id,
                weight: 100,
                value: 7
            }

            const response = await axios.post(
                `http://${targetUrl}/shipment/update`,
                dataToSend
            );

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(dataToCompare);

            const response2 = await axios.get(
                `http://${targetUrl}/shipment/${dataToSend.id}`,
            );

            expect(response2.status).toBe(200);
            expect(response2.data).toMatchObject(dataToCompare);
        });



    });



    describe(`Delete Vehicle Type`, () => {

        test("With Valid Data", async () => {
            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Honxs`,
                    address: `Aquawa`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const toTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 999`,
                }
            )).data;


            const fromTP = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse 9559`,
                }
            )).data;

            const data = {
                from: fromTP.id,
                to: toTP.id,
                customerID: newCustomer.id,
                weight: 66,
                value: 7
            }

            const dataToCompare = {
                from: fromTP,
                to: toTP,
                customer: newCustomer,
                weight: 66,
                value: 7
            }

            const newShipment = (await axios.post(
                `http://${targetUrl}/shipment/new`,
                data
            )).data;

            const response1 = await axios.get(
                `http://${targetUrl}/shipment/${newShipment.id}`
            );
            expect(response1.status).toBe(200);
            expect(response1.data).toMatchObject(dataToCompare);

            const response2 = await axios.post(
                `http://${targetUrl}/shipment/delete`,
                { id: newShipment.id }
            );

            expect(response2.status).toBe(200);
            expect(response2.data).toEqual(`Delete ID:${newShipment.id}`);


        });



    });



});

