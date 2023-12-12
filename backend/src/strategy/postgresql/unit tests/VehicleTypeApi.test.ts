// Written by Frederick
// Version 1

import { VehicleTypeApi } from "../api"
import { DataConnector } from "../dataconnector"
import { VehicleType } from "../models"

// Last update: 2023-12-12
describe(`Vehicle Type Table API Tests`, () => {
    describe(`Get By ID`, () => {
        test(`With Valid Existing ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            const result = await vehicleTypeApi.getByID(0);
            expect(result).toBeInstanceOf(VehicleType);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            await expect(vehicleTypeApi.getByID(9)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            await expect(vehicleTypeApi.getByID(-1)).rejects.toThrow(Error);
        });
    });


    describe(`Get`, () => {
        test(`With Existing Vehivle Type Name`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            const result = await vehicleTypeApi.get([{ name: "Trunk" }]);
            expect(result).toHaveLength(1);
        });

        test(`With Nonexisting Vehivle Type Name`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            const result = await vehicleTypeApi.get([{ name: "Train" }]);
            expect(result).toHaveLength(0);
        });

        test(`With Valid Existing ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            const result = await vehicleTypeApi.get([{ id: 0 }]);
            expect(result).toHaveLength(1);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            const result = await vehicleTypeApi.get([{ id: 9 }]);
            expect(result).toHaveLength(0);
        });

    });



    describe(`Create`, () => {

    });


    describe(`Update By ID`, () => {

    });

    describe(`Delete By ID`, () => {

    });

});


class MockVehicleTypeDataConnector implements DataConnector<VehicleType> {
    async get(predicates: Object[]): Promise<VehicleType[]> {
        const vehicleType = new VehicleType()
        if (predicates.length >= 1) {
            // For Valid Existing ID
            if (JSON.stringify(predicates[0]) === JSON.stringify({ id: 0 })) {
                return [vehicleType];
            }

            // For Existing Vehicle Type Name
            if (JSON.stringify(predicates[0]) === JSON.stringify({ name: "Trunk" })) {
                return [vehicleType];
            }

            // For Valid Nonexisting ID
            // For Nonexisting Vehicle Type Name
            return [];

        }
        else {
            return [vehicleType];
        }

    }

    save: (entity: VehicleType) => Promise<void>
    delete: (entity: VehicleType) => Promise<void>

}