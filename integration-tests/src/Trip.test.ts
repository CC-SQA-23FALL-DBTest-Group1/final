// Written by Frederick
// Version 1
// Last update: 2023-12-15
import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

describe("Trip Integration Test", () => {


    describe(`Create`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Butterfly` }
            )).data;

            const driver1 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Johnwa`,
                    lastName: `Enden`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const driver2 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Alex`,
                    lastName: `Kuriski`,
                    seniority: 2,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Ghost House`
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Sunny House`
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    brand: 'assag',
                    model: 'Aoeing 66',
                    load: 150,
                    capacity: 117,
                    year: 2022,
                    numberOfRepair: 1,
                    type: newVehicleType.id,
                }
            )).data;


            const response = (await axios.post(
                `http://${targetUrl}/trip/new`,
                {
                    vehicle: newVehicle.id,
                    driver1: driver1.id,
                    driver2: driver2.id,
                    from: tpFrom.id,
                    to: tpTo.id,
                }
            ));

            const expected = {
                vehicle: newVehicle,
                driver1: driver1,
                driver2: driver2,
                from: tpFrom,
                to: tpTo,
            }


            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);
        });

    });









    describe(`Read`, () => {

        test("With Valid Existing ID", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Worm` }
            )).data;

            const driver1 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Justin`,
                    lastName: `Leady`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const driver2 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Ashama`,
                    lastName: `Logan`,
                    seniority: 2,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Jasmin`
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Pearson`
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    brand: '354tygv',
                    model: 'Aoeing 66',
                    load: 150,
                    capacity: 117,
                    year: 2022,
                    numberOfRepair: 1,
                    type: newVehicleType.id,
                }
            )).data;


            const newTrip = (await axios.post(
                `http://${targetUrl}/trip/new`,
                {
                    vehicle: newVehicle.id,
                    driver1: driver1.id,
                    driver2: driver2.id,
                    from: tpFrom.id,
                    to: tpTo.id,
                }
            )).data;

            const expected = {
                id: newTrip.id,
                vehicle: newVehicle,
                driver1: driver1,
                driver2: driver2,
                from: tpFrom,
                to: tpTo,
            }

            const response = (await axios.get(
                `http://${targetUrl}/trip/${newTrip.id}`

            ))

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);

        });

    });








    describe(`Update`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Calsimn` }
            )).data;

            const driver1 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Perferc`,
                    lastName: `Potty`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const driver2 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Linda`,
                    lastName: `Mahahh`,
                    seniority: 2,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Zororo`
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Waterloo`
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    brand: 'sfcvcxv',
                    model: 'ccc 66',
                    load: 150,
                    capacity: 117,
                    year: 2022,
                    numberOfRepair: 1,
                    type: newVehicleType.id,
                }
            )).data;


            const newTrip = (await axios.post(
                `http://${targetUrl}/trip/new`,
                {
                    vehicle: newVehicle.id,
                    driver1: driver1.id,
                    driver2: driver2.id,
                    from: tpFrom.id,
                    to: tpTo.id,
                }
            )).data;

            const newTPTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Leslie Centre`
                }
            )).data;

            const expected = {
                id: newTrip.id,
                vehicle: newVehicle,
                driver1: driver1,
                driver2: driver2,
                from: tpFrom,
                to: newTPTo,
            }

            const response = (await axios.post(
                `http://${targetUrl}/trip/update`,
                {
                    id: newTrip.id,
                    vehicle: newVehicle.id,
                    driver1: driver1.id,
                    driver2: driver2.id,
                    from: tpFrom.id,
                    to: newTPTo.id,
                }
            ))

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);
            expect(response.data).not.toMatchObject(newTrip);
        });
    });






    describe(`Delete`, () => {

        test("With Valid Data", async () => {

            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Kitkat` }
            )).data;

            const driver1 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Lamb`,
                    lastName: `Baby`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const driver2 = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Kelvin`,
                    lastName: `May`,
                    seniority: 2,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Waterfront`
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Lakeside`
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    brand: 'sdfsd',
                    model: 'Aoeinccg 66',
                    load: 150,
                    capacity: 117,
                    year: 2022,
                    numberOfRepair: 1,
                    type: newVehicleType.id,
                }
            )).data;


            const newTrip = (await axios.post(
                `http://${targetUrl}/trip/new`,
                {
                    vehicle: newVehicle.id,
                    driver1: driver1.id,
                    driver2: driver2.id,
                    from: tpFrom.id,
                    to: tpTo.id,
                }
            )).data;

            const readTrip = (await axios.get(
                `http://${targetUrl}/trip/${newTrip.id}`

            )).data;

            const expected = {
                id: newTrip.id,
                vehicle: newVehicle,
                driver1: driver1,
                driver2: driver2,
                from: tpFrom,
                to: tpTo,
            }

            expect(readTrip).toMatchObject(expected);

            const response = (await axios.post(
                `http://${targetUrl}/trip/delete`,
                {
                    id: newTrip.id,
                }
            ))

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Delete ID:${newTrip.id}`);


        });



    });



});

