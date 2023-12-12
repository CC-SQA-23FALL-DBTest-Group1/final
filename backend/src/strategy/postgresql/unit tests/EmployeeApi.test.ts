// Written by Xingru 
// Version 1

import { EmployeeApi } from "../api/EmployeeApi";
import { DataConnector } from "../dataconnector";
import { Employee } from "../models";

describe("Employee Type Table API Tests", () => {
    describe('Get Employee By ID',() => {
        test('With Valid Existing ID', async() => {
            const employeeApi = new EmployeeApi (
                new MockEmployeeApiDataConnector(),
    );
    const result = await employeeApi.get([{ id: 0 }]);
    expect(result).toHaveLength(1);;
    });

    test("With Valid Nonexisting ID", async () => {
       const employeeApi = new EmployeeApi(
        new MockEmployeeApiDataConnector()
       );

       await expect(employeeApi.getByID(88)).rejects.toThrow(Error);
    });

    test('With Invalid ID(Negative Integer) should throw an error', async() => {
        const employeeApi = new EmployeeApi(
            new MockEmployeeApiDataConnector()
        );

        await expect(employeeApi.getByID(-1)).rejects.toThrow(Error);
    });
});
    
describe('Get Customers', () => {
    test('With Existing Customer Name', async() => {
        const employeeApi = new EmployeeApi(
            new MockEmployeeApiDataConnector()
        );

        const result = await employeeApi.get([{name:"John"}]);
        expect(result).toHaveLength(1);
    });

    test('With Nonexisting Customer Name', async() => {
        const employeeApi = new EmployeeApi(
            new MockEmployeeApiDataConnector()
        );

        const result = await employeeApi.get([{name : "Alina"}]);
        expect(result).toHaveLength(0);
    });

    test('With Valid Existing ID', async () => {
        const employeeApi = new EmployeeApi(
            new MockEmployeeApiDataConnector()
        );

        const result = await employeeApi.get([{id: 0}]);
        expect(result).toHaveLength(1);
    });

test('With Valid Nonexisting ID', async () => {
    const employeeApi = new EmployeeApi(
        new MockEmployeeApiDataConnector()
    );

    const result = await employeeApi.get([{id: 9}]);
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

class MockEmployeeApiDataConnector implements DataConnector<Employee>{

    async get(predicates: Object[]) :Promise<Employee[]>{
        const employee = new Employee();
        if (predicates.length >= 1) {
            // For Valid Existing ID
            if (JSON.stringify(predicates[0]) === JSON.stringify({ id: 0 })) {
                return [employee];
            }

            // For Existing Employee Name
            if (JSON.stringify(predicates[0]) === JSON.stringify({ name: "John" })) {
                return [employee];
            }

            // For Valid Nonexisting ID
            // For Nonexisting Employee Name
            return [];

        }
        else {
            return [employee];
        }

    }
    
    save: (entity: Employee) => Promise<void>;

    delete: (entity: Employee) => Promise<void>;
    
    
}
