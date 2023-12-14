// Written by Frederick
// Version 1
// Last update: 2023-12-13
/**
 * !!!!!!!! DO NOT CHANGE THIS FILE !!!!!!!!
 */

import { VehicleRepairRecordApi } from "../api";
import { DataConnector } from "../dataconnector";
import { Employee, Vehicle, VehicleRepairRecord } from "../models";

describe(`Vehicle Repair Record API Tests`, () => {



    describe(`Get By ID`, () => {
        test(`With Valid Existing ID`, async () => {

            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            const result = await api.getByID(1);
            expect(result).toBeInstanceOf(VehicleRepairRecord);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            await expect(api.getByID(9)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer and Zero) should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            await expect(api.getByID(0)).rejects.toThrow(Error);
            await expect(api.getByID(-1)).rejects.toThrow(Error);
        });
    });



    describe(`Create`, () => {
        test(`with valid data`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 1;
            const actualTime = 2;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            expect(await api.create(estimatedTime, actualTime, vehicle, mechanic)).toBeInstanceOf(VehicleRepairRecord);
        });

        test(`with 0 estimated time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 0;
            const actualTime = 2;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(api.create(estimatedTime, actualTime, vehicle, mechanic)).rejects.toThrow(Error);
        });

        test(`with negative estimated time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            const estimatedTime = -1;
            const actualTime = 2;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(api.create(estimatedTime, actualTime, vehicle, mechanic)).rejects.toThrow(Error);
        });

        test(`with 0 actual time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 1;
            const actualTime = 0;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(api.create(estimatedTime, actualTime, vehicle, mechanic)).rejects.toThrow(Error);
        });

        test(`with negative actual time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 1;
            const actualTime = -1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(api.create(estimatedTime, actualTime, vehicle, mechanic)).rejects.toThrow(Error);
        });



    });


    describe(`Update By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            const estimatedTime = 1;
            const actualTime = 1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            const result = await api.updateByID(1, estimatedTime, actualTime, vehicle, mechanic);
            expect(result).toBeInstanceOf(VehicleRepairRecord);
        });


        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            const estimatedTime = 1;
            const actualTime = 1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(
                api.updateByID(9, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer & Zero) should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            const estimatedTime = 1;
            const actualTime = 1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(
                api.updateByID(-9, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
            await expect(
                api.updateByID(0, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
        });


        test(`with 0 estimated time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 0;
            const actualTime = 1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(
                api.updateByID(1, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
        });


        test(`with negative estimated time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            const estimatedTime = -1;
            const actualTime = 1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(
                api.updateByID(1, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
        });


        test(`with 0 actual time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 1;
            const actualTime = 0;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(
                api.updateByID(1, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
        });


        test(`with negative actual time should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            const estimatedTime = 1;
            const actualTime = -1;
            const vehicle = new Vehicle();
            const mechanic = new Employee();

            await expect(
                api.updateByID(1, estimatedTime, actualTime, vehicle, mechanic)
            ).rejects.toThrow(Error);
        });

    });


    describe(`Delete By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            // expecting void
            expect(await api.deleteByID(1)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );


            await expect(api.deleteByID(9)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const api = new VehicleRepairRecordApi(
                new MockVehicleRepairRecordDataConnector()
            );

            await expect(api.deleteByID(0)).rejects.toThrow(Error);
            await expect(api.deleteByID(-1)).rejects.toThrow(Error);
        });

    });



});


class MockVehicleRepairRecordDataConnector implements DataConnector<VehicleRepairRecord> {
    async get(predicate: VehicleRepairRecord): Promise<VehicleRepairRecord[]> {
        const record = new VehicleRepairRecord()
        if (predicate) {
            // For Valid Existing ID
            if (predicate.id == 1) {
                return [record];
            }

            // For Valid Nonexisting ID
            return [];
        }
        else {
            return [record];
        }

    }

    async save(entity: VehicleRepairRecord): Promise<void> {

    }
    async delete(entity: VehicleRepairRecord): Promise<void> {

    }

}