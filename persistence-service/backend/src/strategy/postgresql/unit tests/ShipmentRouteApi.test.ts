// Written by Xingru 
// Version 2
// Last update: 2023-12-13
// Reviewed by Frederick
// Reviewed on 2023-12-13
// Reviewd by Xingru
// Reviewed on 2023-12-14
import {ShipmentRouteApi } from "../api/ShipmentRouteApi"
import { DataConnector } from "../dataconnector"
import { Shipment, Trip, ShipmentRoute } from "../models"


describe(`Shipment Route Table API Tests`, () => {

    describe(`Get`, () => {

        test(`With Valid Shipment and Trip`, async () => {
            const shipment = new Shipment();
            const trip = new Trip();
       
            const shipmentRouteApi = new ShipmentRouteApi(
                new MockShipmentRouteDataConnector(),
            );

            let predicate = new ShipmentRoute();
            predicate.shipment = new Shipment();
            predicate.trip = new Trip();


            const result = await shipmentRouteApi.get(predicate);
            expect(result).toHaveLength(1);

        });

    });


    describe(`Create`, () => {

        test(`with valid Shipment and Trip`, async () => {
            const shipmentRouteApi = new ShipmentRouteApi(
                new MockShipmentRouteDataConnector(),
            );

            const shipment = new Shipment();
            const trip = new Trip();
            const order = 1;

            expect(await shipmentRouteApi.create(shipment,order,trip)).toBeInstanceOf(ShipmentRoute);
        });

    });


    describe(`Update`, () => {

        test(`with valid Shipment and Trip`, async () => {
            const shipmentRouteApi = new ShipmentRouteApi(
                new MockShipmentRouteDataConnector(),
            );

            const shipment = new Shipment();
            const trip = new Trip();
            const order = 1;

            expect(await shipmentRouteApi.update(shipment,order,trip)).toBeInstanceOf(ShipmentRoute);
        });

    });


    describe(`Delete`, () => {

        test(`with Shipment and Trip`, async () => {
            const shipmentRouteApi = new ShipmentRouteApi(
                new MockShipmentRouteDataConnector(),
            );

            const shipment = new Shipment();
            const trip = 1;

            // expecting void
            expect(await shipmentRouteApi.delete(shipment,trip)).not.toBeDefined();
        });

    });






    class MockShipmentRouteDataConnector implements DataConnector<ShipmentRoute> {
        async get(predicate: ShipmentRoute): Promise<ShipmentRoute[]> {
            const shipmentRoute = new ShipmentRoute();

            return [shipmentRoute];


        }

        async save(entity: ShipmentRoute): Promise<void> {

        }
        async delete(entity: ShipmentRoute): Promise<void> {

        }
    }
})
