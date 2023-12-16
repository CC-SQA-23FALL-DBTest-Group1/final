// Written by Frederick
// Version 1
// Last update: 2023-12-15
import axios from "axios";

//const targetUrl = `${process.env.TARGET_URL}`;
const targetUrl = `localhost`;

xdescribe("Vehicle Repair Record Integration Test", () => {


    describe(`Read`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Los Angelas` }
            )).data;

            const mechanic = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Andrew`,
                    lastName: `Baul`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    /**
                     * Wait for Vehicle Integration
                     * 
                     * 
                     * 
                     * 
                     * 
                     */
                }
            )).data;

            const newMechanicVT = (await axios.post(
                `http://${targetUrl}/mvt/new`,
                {
                    eID: mechanic.id,
                    vtID: newVehicleType.id,
                    status: true,
                }
            )).data;


            const newVRR = (await axios.post(
                `http://${targetUrl}/vrr/new`,
                {
                    estimatedTime: 2,
                    actualTime: 2,
                    vehicle: newVehicle.id,
                    mechanic: mechanic.id,
                }
            )).data;

            const expected = {
                id: newVRR.id,
                estimatedTime: 2,
                actualTime: 2,
                vehicle: newVehicle,
                mechanic: mechanic,
            }

            const response = (await axios.get(
                `http://${targetUrl}/vrr/${newVRR.id}`
            ));

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);
        });

    });









    describe(`Create`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Los Angelas` }
            )).data;

            const mechanic = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Andrew`,
                    lastName: `Baul`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    /**
                     * Wait for Vehicle Integration
                     * 
                     * 
                     * 
                     * 
                     * 
                     */
                }
            )).data;

            const newMechanicVT = (await axios.post(
                `http://${targetUrl}/mvt/new`,
                {
                    eID: mechanic.id,
                    vtID: newVehicleType.id,
                    status: true,
                }
            )).data;


            const response = (await axios.post(
                `http://${targetUrl}/vrr/new`,
                {
                    estimatedTime: 2,
                    actualTime: 2,
                    vehicle: newVehicle.id,
                    mechanic: mechanic.id,
                }
            ));

            const expected = {
                estimatedTime: 2,
                actualTime: 2,
                vehicle: newVehicle,
                mechanic: mechanic,
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);
        });

    });










    describe(`Update`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Banana` }
            )).data;

            const mechanic = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Apple`,
                    lastName: `Bottl`,
                    seniority: 1,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    /**
                     * Wait for Vehicle Integration
                     * 
                     * 
                     * 
                     * 
                     * 
                     */
                }
            )).data;

            const newMechanicVT = (await axios.post(
                `http://${targetUrl}/mvt/new`,
                {
                    eID: mechanic.id,
                    vtID: newVehicleType.id,
                    status: true,
                }
            )).data;


            const newVRR = (await axios.post(
                `http://${targetUrl}/vrr/new`,
                {
                    estimatedTime: 2,
                    actualTime: 2,
                    vehicle: newVehicle.id,
                    mechanic: mechanic.id,
                }
            )).data;


            const response = (await axios.post(
                `http://${targetUrl}/vrr/update`,
                {
                    id: newVRR.id,
                    estimatedTime: 9,
                    actualTime: 6,
                    vehicle: newVehicle.id,
                    mechanic: mechanic.id,
                }
            ));

            const expected = {
                id: newVRR.id,
                estimatedTime: 9,
                actualTime: 6,
                vehicle: newVehicle,
                mechanic: mechanic,
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);
        });
    });










    describe(`Delete Vehicle Type`, () => {

        test("With Valid Data", async () => {
            const newVehicleType = (await axios.post(
                `http://${targetUrl}/vehicletype/new`, { name: `Orange` }
            )).data;

            const mechanic = (await axios.post(
                `http://${targetUrl}/employee/new`,
                {
                    firstName: `Pear`,
                    lastName: `Edison`,
                    seniority: 9,
                    vehicleTypeID: newVehicleType.id
                }
            )).data;

            const newVehicle = (await axios.post(
                `http://${targetUrl}/vehicle/new`,
                {
                    /**
                     * Wait for Vehicle Integration
                     * 
                     * 
                     * 
                     * 
                     * 
                     */
                }
            )).data;

            const newMechanicVT = (await axios.post(
                `http://${targetUrl}/mvt/new`,
                {
                    eID: mechanic.id,
                    vtID: newVehicleType.id,
                    status: true,
                }
            )).data;


            const newVRR = (await axios.post(
                `http://${targetUrl}/vrr/new`,
                {
                    estimatedTime: 9,
                    actualTime: 12,
                    vehicle: newVehicle.id,
                    mechanic: mechanic.id,
                }
            )).data;

            const response = (await axios.post(
                `http://${targetUrl}/vrr/delete`,
                {
                    id: newVRR.id,
                }
            ));

            expect(response.status).toBe(200);
            expect(response.data).toEqual(`Delete ID:${newVRR.id}`);
        });



    });



});

