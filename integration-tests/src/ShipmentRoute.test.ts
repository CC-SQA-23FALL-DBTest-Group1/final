// Written by Frederick
// Version 1
// Last update: 2023-12-15
import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

xdescribe("Shipment Route Integration Test", () => {

    describe(`Create`, () => {
        test("With Valid Data", async () => {

            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Rex`,
                    address: `Hoot`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Pera`,
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Onra`,
                }
            )).data;

            const newShipment = (await axios.post(
                `http://${targetUrl}/shipment/new`,
                {
                    from: tpFrom.id,
                    to: tpTo.id,
                    customerID: newCustomer.id,
                    weight: 66,
                    value: 7
                }
            )).data;


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


            const response = (await axios.post(
                `http://${targetUrl}/shipmentroute/new`,
                {
                    shipment: newShipment.id,
                    order: 1,
                    trip: newTrip.id,
                }
            ))

            const expected = {
                shipment: newShipment,
                order: 1,
                trip: newTrip,
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);

        });
    });








    // Read
    describe(`Read`, () => {
        test("With Valid Data", async () => {

            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Rex`,
                    address: `Hoot`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Pera`,
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Onra`,
                }
            )).data;

            const newShipment = (await axios.post(
                `http://${targetUrl}/shipment/new`,
                {
                    from: tpFrom.id,
                    to: tpTo.id,
                    customerID: newCustomer.id,
                    weight: 66,
                    value: 7
                }
            )).data;


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


            const newShipmentRoute = (await axios.post(
                `http://${targetUrl}/shipmentroute/new`,
                {
                    shipment: newShipment.id,
                    order: 1,
                    trip: newTrip.id,
                }
            )).data;


            const response = (await axios.get(
                `http://${targetUrl}/shipmentroute/${newShipment.id}/${1}`
            ))

            const expected = {
                shipment: newShipment,
                order: 1,
                trip: newTrip,
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);

        });
    });












    // Update
    describe(`Update`, () => {
        test("With Valid Data", async () => {

            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Rex`,
                    address: `Hoot`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Pera`,
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Onra`,
                }
            )).data;

            const newShipment = (await axios.post(
                `http://${targetUrl}/shipment/new`,
                {
                    from: tpFrom.id,
                    to: tpTo.id,
                    customerID: newCustomer.id,
                    weight: 66,
                    value: 7
                }
            )).data;


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


            const oldTrip = (await axios.post(
                `http://${targetUrl}/trip/new`,
                {
                    vehicle: newVehicle.id,
                    driver1: driver1.id,
                    from: tpFrom.id,
                    to: tpTo.id,
                }
            )).data;


            const newShipmentRoute = (await axios.post(
                `http://${targetUrl}/shipmentroute/new`,
                {
                    shipment: newShipment.id,
                    order: 1,
                    trip: oldTrip.id,
                }
            )).data;


            const response = (await axios.get(
                `http://${targetUrl}/shipmentroute/${newShipment.id}/${1}`
            ))

            let expected = {
                shipment: newShipment,
                order: 1,
                trip: oldTrip,
            }

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(expected);


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


            const res = (await axios.post(
                `http://${targetUrl}/shipmentroute/update`,
                {
                    shipment: newShipment.id,
                    order: 1,
                    trip: newTrip.id,
                }
            ));


            expected = {
                shipment: newShipment,
                order: 1,
                trip: newTrip,
            }


            expect(res.status).toBe(200);
            expect(res.data).toMatchObject(expected);

        });

    });










    // Delete
    describe(`Read`, () => {
        test("With Valid Data", async () => {

            const newCustomer = (await axios.post(
                `http://${targetUrl}/customer/new`,
                {
                    name: `Rex`,
                    address: `Hoot`,
                    phoneNumber1: `9663322455`,
                    phoneNumber2: `6399841165`,
                }
            )).data;

            const tpTo = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Pera`,
                }
            )).data;

            const tpFrom = (await axios.post(
                `http://${targetUrl}/transitpoint/new`,
                {
                    name: `Warehouse Onra`,
                }
            )).data;

            const newShipment = (await axios.post(
                `http://${targetUrl}/shipment/new`,
                {
                    from: tpFrom.id,
                    to: tpTo.id,
                    customerID: newCustomer.id,
                    weight: 66,
                    value: 7
                }
            )).data;


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


            const newShipmentRoute = (await axios.post(
                `http://${targetUrl}/shipmentroute/new`,
                {
                    shipment: newShipment.id,
                    order: 1,
                    trip: newTrip.id,
                }
            )).data;


            const response = (await axios.post(
                `http://${targetUrl}/shipmentroute/delete`,
                {
                    shipment: newShipment.id,
                    order: 1,
                }
            ))

            expect(response.status).toBe(200);
            expect(response.data).toMatchObject(
                `Delete Route with shipment(ID:${newShipment.id}) and order at ${1}`
                );

        });
    });

});