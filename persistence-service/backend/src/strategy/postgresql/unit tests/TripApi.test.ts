// Written by Keerthana
// Version 1
// Last update: 2023-12-13
//Reviewed and Modified erros and wrote create update delate functions tests by Xingru
//Rewritten by Xingru
// Last update: 2023-12-14
import { TripApi } from "../api/TripApi";
import { DataConnector, } from "../dataconnector";
import { Trip, Employee, TransitPoint, Vehicle } from "../models";


describe(`Trip Table API Tests`, () => {

    describe(`Get By ID`, () => {
        test(`With Valid Existing ID`, async () => {

            const tripApi = new TripApi(
                new MockTripDataConnector()
            );

            const result = await tripApi.getByID(1);
            expect(result).toBeInstanceOf(Trip);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const tripApi = new TripApi(
                new MockTripDataConnector()
            );

            await expect(tripApi.getByID(9)).rejects.toThrow(Error);
        });

        test(`With Invalid ID(Negative Integer or Zero) should throw an error`, async () => {
            const tripApi = new TripApi(
                new MockTripDataConnector()
            );

            await expect(tripApi.getByID(-1)).rejects.toThrow(Error);
            await expect(tripApi.getByID(0)).rejects.toThrow(Error);
        });
    });


    describe(`Create`, () => {
        test('with valid data', async () => {
            const tripApi = new TripApi(
                new MockTripDataConnector()

            );


            const vehicle = new Vehicle();
            const driver1 = new Employee();
            const driver2 = new Employee();
            const from = new TransitPoint();
            const to = new TransitPoint();


            expect(await tripApi.create(vehicle, from, to, driver1, driver2)).toBeInstanceOf(Trip);
        });



    });


    describe(`Update By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const tripApi = new TripApi(
                new MockTripDataConnector()
            );

            const vehicle = new Vehicle();
            const driver1 = new Employee();
            const driver2 = new Employee();
            const from = new TransitPoint();
            const to = new TransitPoint();

            const result = await tripApi.updateByID(1, vehicle, from, to, driver1, driver2);

            expect(result).toBeInstanceOf(Trip);
        });

        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const tripApi = new TripApi(
                new MockTripDataConnector()
            );

            const vehicle = new Vehicle();
            const driver1 = new Employee();
            const driver2 = new Employee();
            const from = new TransitPoint();
            const to = new TransitPoint();

            await expect(
                tripApi.updateByID(9, vehicle, from, to, driver1, driver2)
            ).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer or Zero) should throw an error`, async () => {
            const tripApi = new TripApi(
                new MockTripDataConnector()
            );

            const vehicle = new Vehicle();
            const driver1 = new Employee();
            const driver2 = new Employee();
            const from = new TransitPoint();
            const to = new TransitPoint();


            await expect(
                tripApi.updateByID(-1, vehicle, from, to, driver1, driver2)
            ).rejects.toThrow(Error);
            await expect(
                tripApi.updateByID(0, vehicle, from, to, driver1, driver2)
            ).rejects.toThrow(Error);
        });

    });
});

describe(`Delete By ID`, () => {

    test(`With Valid Existing ID`, async () => {
        const tripApi = new TripApi(
            new MockTripDataConnector()
        );


        // expecting void
        expect(await tripApi.deleteByID(1)).not.toBeDefined();
    });


    test(`With Valid Nonexisting ID should throw an error`, async () => {
        const tripApi = new TripApi(
            new MockTripDataConnector()
        );


        await expect(tripApi.deleteByID(9)).rejects.toThrow(Error);
    });

    test(`With Invalid ID(Negative Integer or Zero) should throw an error`, async () => {
        const tripApi = new TripApi(
            new MockTripDataConnector()
        );

        await expect(tripApi.deleteByID(0)).rejects.toThrow(Error);
        await expect(tripApi.deleteByID(-1)).rejects.toThrow(Error);
    });

});

class MockTripDataConnector implements DataConnector<Trip> {

    async get(predicate: Trip): Promise<Trip[]> {

        const trip = new Trip()
        if (predicate) {
            // For Valid Existing ID
            if (predicate.id == 1) {
                return [trip];
            }

            // For Valid Nonexisting ID

            return [];
        }

        else {
            return [trip];
        }

    }

    async save(entity: Trip): Promise<void> {

    }
    async delete(entity: Trip): Promise<void> {

    }

}
