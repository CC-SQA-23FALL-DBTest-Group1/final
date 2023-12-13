// Written by Frederick
// Version 2
// Last update: 2023-12-12
import { VehicleTypeApi } from "../api"
import { DataConnector } from "../dataconnector"
import { VehicleType } from "../models"


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
        test(`with valid name`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `Trunk`;
            
            expect(await vehicleTypeApi.create(name)).toBeInstanceOf(VehicleType);
        });

        test(`with invalid name(empty string) should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(vehicleTypeApi.create(name)).rejects.toThrow(Error);
        });

        test(`with invalid name(only spaces) should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(vehicleTypeApi.create(name)).rejects.toThrow(Error);
        });
    });


    describe(`Update By ID`, () => {

        test(`with valid name and existing ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `Trunk`;
            
            expect(await vehicleTypeApi.updateByID(0, name)).toBeInstanceOf(VehicleType);
        });


        test(`with valid name and nonexisting ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `Trunk`;

            await expect(vehicleTypeApi.updateByID(9, name)).rejects.toThrow(Error);
        });


        test(`with valid name and invalid ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `Trunk`;

            await expect(vehicleTypeApi.updateByID(-1, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and existing ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(vehicleTypeApi.updateByID(0, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and nonexisting ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(vehicleTypeApi.updateByID(9, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and invalid ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(vehicleTypeApi.updateByID(-1, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and existing ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(vehicleTypeApi.updateByID(0, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and nonexisting ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(vehicleTypeApi.updateByID(9, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and invalid ID should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(vehicleTypeApi.updateByID(-1, name)).rejects.toThrow(Error);
        });

    });


    describe(`Delete By ID`, () => {

        test(`with existing ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            // expecting void
            expect(await vehicleTypeApi.DeleteByID(0)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            await expect(vehicleTypeApi.DeleteByID(9)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const vehicleTypeApi = new VehicleTypeApi(
                new MockVehicleTypeDataConnector()
            );

            await expect(vehicleTypeApi.DeleteByID(-1)).rejects.toThrow(Error);
        });

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

    async save(entity: VehicleType): Promise<void> {

    }
    async delete(entity: VehicleType): Promise<void> {

    }

}