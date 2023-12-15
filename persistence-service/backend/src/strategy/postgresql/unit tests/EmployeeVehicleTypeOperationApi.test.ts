// Written by Xingru 
// Version 2
// Last update: 2023-12-13
// Reviewed by Frederick
// Reviewed on 2023-12-13
// Written by Xingru 
// Version 3
// Last update: 2023-12-14


import { EmployeeVehicleTypeOperationApi  } from "../api/EmployeeVehicleTypeOperationApi"
import { DataConnector } from "../dataconnector"
import { Employee, VehicleType, EmployeeVehicleTypeOperation } from "../models"


describe(`Employee Vehicle Type Operation Table API Tests`, () => {
    describe(`Get`, () => {

        test(`With Valid Employee and VehicleType`, async () => {
            const employee = new Employee();
            const vehicleType = new VehicleType();
            const employeeVehicleTypeOperationApi  = new EmployeeVehicleTypeOperationApi (
                new MockEmployeeVehicleTypeOperationDataConnector ()
            );

            let predicate = new EmployeeVehicleTypeOperation();
            predicate.employee = new Employee();
            predicate.type = new VehicleType();
            

            const result = await employeeVehicleTypeOperationApi.get(predicate);
            expect(result).toHaveLength(1);

        });

    });


    describe(`Create`, () => {

        test(`with valid Employee and VehicleType`, async () => {
            const employeeVehicleTypeOperationApi  = new EmployeeVehicleTypeOperationApi (
                new MockEmployeeVehicleTypeOperationDataConnector ()
            );
            const employee = new Employee();
            const vehicleType = new VehicleType();
         

            expect(await employeeVehicleTypeOperationApi.create(employee, vehicleType)).toBeInstanceOf(EmployeeVehicleTypeOperation);
        });
    
    });


    describe(`Update`, () => {

        test(`with valid Employee and VehicleType`, async () => {
            const employeeVehicleTypeOperationApi  = new EmployeeVehicleTypeOperationApi (
                new MockEmployeeVehicleTypeOperationDataConnector ()
            );
                
           let predicate = new EmployeeVehicleTypeOperation();
            predicate.employee = new Employee();
            predicate.type = new VehicleType();

            const vehicleType = new VehicleType();

            expect(await employeeVehicleTypeOperationApi.update(predicate, vehicleType)).toBeInstanceOf(EmployeeVehicleTypeOperation);
        });

    });


    describe(`Delete`, () => {

        test(`with Employee and VehicleType`, async () => {
            const employeeVehicleTypeOperationApi  = new EmployeeVehicleTypeOperationApi (
                new MockEmployeeVehicleTypeOperationDataConnector ()
            );

            let predicate = new EmployeeVehicleTypeOperation();
            predicate.employee = new Employee();
            predicate.type = new VehicleType();

           
            
            // expecting void
            expect(await employeeVehicleTypeOperationApi .delete(predicate)).not.toBeDefined();
        });

    });






    class MockEmployeeVehicleTypeOperationDataConnector implements DataConnector<EmployeeVehicleTypeOperation> {
        async get(predicate: EmployeeVehicleTypeOperation): Promise<EmployeeVehicleTypeOperation[]> {
            const employeeVehicleTypeOperation = new EmployeeVehicleTypeOperation();

           
           
            return [employeeVehicleTypeOperation];


        }

        async save(entity: EmployeeVehicleTypeOperation): Promise<void> {

        }
        async delete(entity: EmployeeVehicleTypeOperation): Promise<void> {

        }
    }
})
