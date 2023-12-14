// Written by Xingru 
//Reviewed by Frederick
// Version 1
// Last update: 2023-12-13
import { CustomerApi } from "../api/CustomerApi";
import { DataConnector } from "../dataconnector";
import { Shipment } from "../models";
import { Customer } from "../models";
import { ShipmentApi } from "../api/ShipmentApi";
import { TransitPoint, VehicleType } from "../models";
import { DataSource } from "typeorm";

describe(`Shipment API Tests`, () => {

    describe(`Get By ID`, () => {
        test(`With Valid Existing ID`, async () => {

            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );

            const result = await shipmentApi.getByID(0);
            expect(result).toBeInstanceOf(Shipment);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );
            

            await expect(shipmentApi.getByID(9)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );


            await expect(shipmentApi.getByID(-1)).rejects.toThrow(Error);
        });
    });



    describe(`Create`, function () {
            test('with valid data', async () => {
                const shipmentApi = new ShipmentApi(
                    new MockShipmentDataConnector()

                );


                const weight = 10;
                const value = 2.05;
                const from = new TransitPoint();
                const to = new TransitPoint();
                const customer = new Customer();

                expect(await shipmentApi.create(customer, weight, value, from, to)).toBeInstanceOf(Shipment);
            });

            test(`with 0 weight should throw an error`, async () => {
                const shipmentApi = new ShipmentApi(
                    new MockShipmentDataConnector()
                );


                const weight = 0;
                const value = 2.05;
                const from = new TransitPoint();
                const to = new TransitPoint();
                const customer = new Customer();

                await expect(shipmentApi.create(customer, weight, value, from, to)).rejects.toThrow(Error);
            });

            test(`with negative weight should throw an error`, async () => {
                const shipmentApi = new ShipmentApi(
                    new MockShipmentDataConnector()
                );

                const weight = -1;
                const value = 2.05;
                const from = new TransitPoint();
                const to = new TransitPoint();
                const customer = new Customer();

                await expect(shipmentApi.create(customer, weight, value, from, to)).rejects.toThrow(Error);
            });

            test(`with 0 value should throw an error`, async () => {
                const shipmentApi = new ShipmentApi(
                    new MockShipmentDataConnector()
                );


                const weight = 1;
                const value = 0;
                const from = new TransitPoint();
                const to = new TransitPoint();
                const customer = new Customer();

                await expect(shipmentApi.create(customer, weight, value, from, to)).rejects.toThrow(Error);
            });

            test(`with negative value should throw an error`, async () => {
                const shipmentApi = new ShipmentApi(
                    new MockShipmentDataConnector()
                );


                const weight = 1;
                const value = -2.0;
                const from = new TransitPoint();
                const to = new TransitPoint();
                const customer = new Customer();

                await expect(shipmentApi.create(customer, weight, value, from, to)).rejects.toThrow(Error);
            });



        });


    describe(`Update By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );

            const weight = 1;
            const value = 20.25;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();

            const result = await shipmentApi.updateByID(0, customer, weight, value, from, to);
            expect(result).toBeInstanceOf(Shipment);
        });


        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );

            const weight = 1;
            const value = 20.25;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();

            await expect(
                shipmentApi.updateByID(9, customer, weight, value, from, to)
            ).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );

            const weight = 1;
            const value = 20.25;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();

            await expect(
                shipmentApi.updateByID(-9, customer, weight, value, from, to)
            ).rejects.toThrow(Error);
        });


        test(`with 0 weight should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );


            const weight = 0;
            const value = 2.05;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();

            await expect(
                shipmentApi.updateByID(0, customer, weight, value, from, to)
            ).rejects.toThrow(Error);
        });


        test(`with negative weight should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );

            const weight = 0;
            const value = 2.05;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();
            await expect(
                shipmentApi.updateByID(0, customer, weight, value, from, to)
            ).rejects.toThrow(Error);
        });


        test(`with 0 value should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );


            const weight = 10;
            const value = 0;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();

            await expect(
                shipmentApi.updateByID(0, customer, weight, value, from, to)
            ).rejects.toThrow(Error);
        });


        test(`with negative value should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );

            const weight = 1;
            const value = -2.0;
            const from = new TransitPoint();
            const to = new TransitPoint();
            const customer = new Customer();

            await expect(
                shipmentApi.updateByID(0, customer, weight, value, from, to)
            ).rejects.toThrow(Error);
        });

    });
});

    describe(`Delete By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );


            // expecting void
            expect(await shipmentApi.deleteByID(0)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );


            await expect(shipmentApi.deleteByID(9)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const shipmentApi = new ShipmentApi(
                new MockShipmentDataConnector()
            );


            await expect(shipmentApi.deleteByID(-1)).rejects.toThrow(Error);
        });

    });


    class MockShipmentDataConnector implements DataConnector<Shipment> {

        async get(predicates: Object[]): Promise<Shipment[]> {
            const shipment = new Shipment()
            if (predicates.length >= 1) {
                // For Valid Existing ID
                if (JSON.stringify(predicates[0]) === JSON.stringify({ id: 0 })) {
                    return [shipment];
                }

                // For Valid Nonexisting ID
                return [shipment];
            }
            else {
                return [shipment];
            }

        }

        async save(entity: Shipment): Promise<void> {

        }
        async delete(entity: Shipment): Promise<void> {

        }
    }
