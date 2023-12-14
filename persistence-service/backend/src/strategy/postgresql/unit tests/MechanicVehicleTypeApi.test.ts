// Written by Xingru 
// Version 2
// Last update: 2023-12-13
// Reviewed by Frederick
// Reviewed on 2023-12-13
import { MechanicVehicleTypeApi } from "../api/MechanicVehicleTypeApi"
import { DataConnector } from "../dataconnector"
import { Employee, VehicleType, MechanicVehicleType } from "../models"


describe(`Mechanic Vehicle Type Table API Tests`, () => {

    describe(`Get`, () => {

        test(`With Valid Employee and VehicleType`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector(),
            );

            let predicate = new MechanicVehicleType();
            predicate.employee = new Employee();
            predicate.type = new VehicleType();
            

            const result = await mechanicVehicleApi.get(predicate);
            expect(result).toHaveLength(1);

        });

    });


    describe(`Create`, () => {

        test(`with valid Employee and VehicleType`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            expect(await mechanicVehicleApi.create(employee, vehicleType, status)).toBeInstanceOf(MechanicVehicleType);
        });
    
    });


    describe(`Update`, () => {

        test(`with valid Employee and VehicleType`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const employee = new Employee();
            const vehicleType = new VehicleType();
            const status = true;

            expect(await mechanicVehicleApi.update(employee, vehicleType, status)).toBeInstanceOf(MechanicVehicleType);
        });

    });


    describe(`Delete`, () => {

        test(`with Employee and VehicleType`, async () => {
            const mechanicVehicleApi = new MechanicVehicleTypeApi(
                new MockMechanicVehicleTypeDataConnector()
            );

            const employee = new Employee();
            const vehicleType = new VehicleType();
            
            // expecting void
            expect(await mechanicVehicleApi.delete(employee, vehicleType)).not.toBeDefined();
        });

    });






    class MockMechanicVehicleTypeDataConnector implements DataConnector<MechanicVehicleType> {
        async get(predicate: MechanicVehicleType): Promise<MechanicVehicleType[]> {
            const mechanicVehicleType = new MechanicVehicleType();

            return [mechanicVehicleType];


        }

        async save(entity: MechanicVehicleType): Promise<void> {

        }
        async delete(entity: MechanicVehicleType): Promise<void> {

        }
    }
})
