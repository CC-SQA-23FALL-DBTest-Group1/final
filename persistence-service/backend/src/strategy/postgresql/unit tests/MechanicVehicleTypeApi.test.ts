// Written by Xingru 
// Version 1
// Last update: 2023-12-11
import { MechanicVehicleTypeApi } from "../api/MechanicVehicleTypeApi"
import { VehicleTypeApi } from "../api/VehicleTypeApi"
import { DataConnector } from "../dataconnector"
import { Employee, VehicleType, MechanicVehicleType } from "../models"
import { EmployeeApi } from "../api/EmployeeApi";
import { VehicleTypeDataConnector } from "../dataconnector";
import { EmployeeDataConnector } from "../dataconnector";

describe(`Mechanic Vehicle Type Table API Tests`, () => {
    describe(`Get MechanicVehicle Type by Employee and VehicleType`, () => {
        test(`With Valid Employee and VehicleType`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector(),
            );

            await expect(async () => {
                const result = await mechanicVehicleApi.get(employee, vehicleType);
                expect(result).toBeInstanceOf(MechanicVehicleType);
            }).not.toThrow();
        });

        test(`With Invalid ID(Negative Integer) should throw an error`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(() => mechanicVehicleApi.get(employee, vehicleType)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector(),

            );

            await expect(mechanicVehicleApi.get(employee,vehicleType)).rejects.toThrow(Error);
        });
    });


    describe(`Get`, () => {
        test(`With Existing Vehivle Type Name`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );
            let name = `Trunk`;
            const employee = new Employee();
            const vehicleType = new VehicleType();

            const result = await mechanicVehicleApi.get(employee, vehicleType);
            expect(result).toHaveLength(1);
        });

        test(`With Nonexisting MechanicVehicle Type Name`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );
            let name = `Trunk`;
            const employee = new Employee();
            const vehicleType = new VehicleType();

            expect(await mechanicVehicleApi.get(employee, vehicleType)).toBeInstanceOf(MechanicVehicleType);
        });
    });

    test(`With Valid Existing ID`, async () => {
        const mechanicVehicleApi = new MechanicVehicleTypeApi(
            new MockMechanicVehicleTypeDataConnector()
        );
        let name = `Trunk`;
        const employee = new Employee();
        const vehicleType = new VehicleType();
        const status = true;

        expect(await mechanicVehicleApi.get(employee, vehicleType)).toBeInstanceOf(MechanicVehicleType);
    });

    test(`With Valid Nonexisting ID`, async () => {
        const mechanicVehicleApi = new MechanicVehicleTypeApi(
            new MockMechanicVehicleTypeDataConnector()
        );
     
        const employee = new Employee();
        const vehicleType = new VehicleType();
        const status = true;

        expect(await mechanicVehicleApi.update(employee, vehicleType,status)).toBeInstanceOf(MechanicVehicleType);
    });

    describe(`Create`, () => {
        test(`with valid name`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `Trunk`;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            expect(await mechanicVehicleApi.create(employee, vehicleType, status)).toBeInstanceOf(MechanicVehicleType);
        });

        test(`with invalid name(empty string) should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.create(employee, vehicleType, status)).rejects.toThrow(Error);
        });

        test(`with invalid name(only spaces) should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const name = ` `;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;


            await expect(mechanicVehicleApi.create(employee, vehicleType, status)).rejects.toThrow(Error);
        });
    });


    describe(`Update By ID`, () => {

        test(`with valid name and existing ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const name = `Trunk`;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            expect(await mechanicVehicleApi.update(employee, vehicleType, status)).toBeInstanceOf(MechanicVehicleType);
        });


        test(`with valid name and nonexisting ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const name = `Trunk`;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType, status)).rejects.toThrow(Error);
        });


        test(`with valid name and invalid ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `Trunk`;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;


            await expect(mechanicVehicleApi.update(employee, vehicleType,status)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and existing ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType, status)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and nonexisting ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType,status)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and invalid ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = ``;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType, status)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and existing ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType, status)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and nonexisting ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType, status)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and invalid ID should throw an error`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            let name = `   `;
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            await expect(mechanicVehicleApi.update(employee, vehicleType,status)).rejects.toThrow(Error);
        });

    });


    describe(`Delete By ID`, () => {

        test(`with existing ID`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;
            // expecting void
            expect(await mechanicVehicleApi.delete(employee, vehicleType)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(mechanicVehicleApi.delete(employee, vehicleType)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
            
                new MockMechanicVehicleTypeDataConnector()
            );

            await expect(mechanicVehicleApi.delete(employee, vehicleType)).rejects.toThrow(Error);
        });

    });






    class MockMechanicVehicleTypeDataConnector implements DataConnector<MechanicVehicleType> {
        async get(predicates: Object[]): Promise<MechanicVehicleType[]> {
            const mechanicVehicleType = new MechanicVehicleType()
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
                // For Nonexisting mechanicVehicle Type Name
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
})
