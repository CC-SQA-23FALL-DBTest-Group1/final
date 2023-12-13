// Written by Xingru 
// Version 1
// Last update: 2023-12-11
import { MechanicVehicleTypeApi } from "../api/MechanicVehicleTypeApi"
import { VehicleTypeApi} from "../api/VehicleTypeApi"
import { DataConnector } from "../dataconnector"
import {Employee, VehicleType,MechanicVehicleType } from "../models"
import { EmployeeApi } from "../api/EmployeeApi";


describe(`MechanicVehicle Type API Tests`, () => {
    describe(`Get MechanicVehicle Type by Employee and VehicleType`, () => {
        test(`With Valid Employee and VehicleType`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector(),

            );

            const result = await mechanicVehicleApi.get(Employeeid,VehicleType);
            expect(result).toBeInstanceOf(MechanicVehicleType);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(mechanicVehicleApi.getByID(9)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(mechanicVehicleApi.getByID(-1)).rejects.toThrow(Error);
        });
    });


    describe(`Get`, () => {
        test(`With Existing Vehivle Type Name`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const result = await mechanicVehicleApi.get(Employee,VehicleType);
            expect(result).toHaveLength(1);
        });

        test(`With Nonexisting Vehivle Type Name`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const result = await mechanicVehicleApi.get([{ name: "Train" }]);
            expect(result).toHaveLength(0);
        });

        test(`With Valid Existing ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const result = await mechanicVehicleApi.get([{ id: 0 }]);
            expect(result).toHaveLength(1);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const result = await mechanicVehicleApi.get([{ id: 9 }]);
            expect(result).toHaveLength(0);
        });

    });


    describe(`Create`, () => {
        test(`with valid name`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `Trunk`;
            
            expect(await mechanicVehicleApi.create(name)).toBeInstanceOf(VehicleType);
        });

        test(`with invalid name(empty string) should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(mechanicVehicleApi.create(name)).rejects.toThrow(Error);
        });

        test(`with invalid name(only spaces) should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(mechanicVehicleApi.create(name)).rejects.toThrow(Error);
        });
    });


    describe(`Update By ID`, () => {

        test(`with valid name and existing ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `Trunk`;
            
            expect(await mechanicVehicleApi.updateByID(0, name)).toBeInstanceOf(VehicleType);
        });


        test(`with valid name and nonexisting ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `Trunk`;

            await expect(mechanicVehicleApi.updateByID(9, name)).rejects.toThrow(Error);
        });


        test(`with valid name and invalid ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `Trunk`;

            await expect(mechanicVehicleApi.updateByID(-1, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and existing ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(mechanicVehicleApi.updateByID(0, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and nonexisting ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(mechanicVehicleApi.updateByID(9, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and invalid ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;

            await expect(mechanicVehicleApi.updateByID(-1, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and existing ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(mechanicVehicleApi.updateByID(0, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and nonexisting ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(mechanicVehicleApi.updateByID(9, name)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and invalid ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;

            await expect(mechanicVehicleApi.updateByID(-1, name)).rejects.toThrow(Error);
        });

    });


    describe(`Delete By ID`, () => {

        test(`with existing ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            // expecting void
            expect(await mechanicVehicleApi.DeleteByID(0)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(mechanicVehicleApi.DeleteByID(9)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(mechanicVehicleApi.DeleteByID(-1)).rejects.toThrow(Error);
        });

    });



});


class MockMechanicVehicleTypeDataConnector implements DataConnector<MechanicVehicleType> {
    async get(predicates: Object[]): Promise<MechanicVehicleType[]> {
        const  mechanicVehicleType = new  MechanicVehicleType()
        if (predicates.length >= 1) {
            // For Valid Existing ID
            if (JSON.stringify(predicates[0]) === JSON.stringify({ id: 0 })) {
                return [mechanicVehicleType];
            }

            // For Existing Vehicle Type Name
            if (JSON.stringify(predicates[0]) === JSON.stringify({ name: "Trunk" })) {
                return [mechanicVehicleType];
            }

            // For Valid Nonexisting ID
            // For Nonexisting Vehicle Type Name
            return [];

        }
        else {
            return [mechanicVehicleType];
        }

    }

    async save(entity: MechanicVehicleType): Promise<void> {

    }
    async delete(entity: MechanicVehicleType): Promise<void> {

    }

}