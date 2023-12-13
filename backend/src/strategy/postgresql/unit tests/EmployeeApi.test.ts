// Written by Xingru 
// Version 1

import { EmployeeApi } from "../api/EmployeeApi";
import { DataConnector } from "../dataconnector";
import { Employee } from "../models";

describe("Employee Type Table API Tests", () => {
    describe('Get Employee By ID', () => {
        test('With Valid Existing ID', async () => {
            const employeeApi = new EmployeeApi(
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

        test('With Invalid ID(Negative Integer) should throw an error', async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            await expect(employeeApi.getByID(-1)).rejects.toThrow(Error);
        });
    });

    describe('Get Customers', () => {
        test('With Existing Customer Name', async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            const result = await employeeApi.get([{ name: "John" }]);
            expect(result).toHaveLength(1);
        });

        test('With Nonexisting Customer Name', async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            const result = await employeeApi.get([{ name: "Alina" }]);
            expect(result).toHaveLength(0);
        });

        test('With Valid Existing ID', async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            const result = await employeeApi.get([{ id: 0 }]);
            expect(result).toHaveLength(1);
        });

        test('With Valid Nonexisting ID', async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            const result = await employeeApi.get([{ id: 9 }]);
            expect(result).toHaveLength(0);
        });

    });


    describe(`Create`, () => {
        test(`with valid firstName`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `John`;
            let lastName = "Smith";
            let seniority = 1;
            // expecting void
      
            expect(await employeeApi.create(firstName,lastName,seniority)).toBeInstanceOf(Employee);
        });

        test(`with invalid firstName(empty string) should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = ``;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.create(firstName,lastName,seniority)).rejects.toThrow(Error);
        });

        test(`with invalid firstName(only spaces) should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `   `;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.create(firstName,lastName,seniority)).rejects.toThrow(Error);
        });

    });


    describe(`Update By ID`, () => {
        test(`with valid firstName and existing ID`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `John`;
            let lastName = "Smith";
            let seniority = 1;
            
            expect(await employeeApi.updateByID(0, firstName,lastName,seniority)).toBeInstanceOf(Employee);
        });


        test(`with valid firstName and nonexisting ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `John`;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.updateByID(9, firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with valid firstName and invalid ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `John`;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.updateByID(-1, firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with invalid firstName(empty string) and existing ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = ``;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.updateByID(0, firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with invalid firstName(empty string) and nonexisting ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = ``;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.updateByID(9, firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with invalid firstName(empty string) and invalid ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = ``;
            let lastName = "Smith";
            let seniority = 1;

            await expect(employeeApi.updateByID(-1,firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with invalid firstName(only spaces) and existing ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `   `;
            let lastName = "Smith";
            let seniority = 1;
            await expect(employeeApi.updateByID(0, firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with invalid firstName(only spaces) and nonexisting ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `   `;
            let lastName = "Smith";
            let seniority = 1;
            await expect(employeeApi.updateByID(9, firstName,lastName,seniority)).rejects.toThrow(Error);
        });


        test(`with invalid firstName(only spaces) and invalid ID should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            let firstName = `   `;
            let lastName = "Smith";
            let seniority = 1;
            await expect(employeeApi.updateByID(-1, firstName,lastName,seniority)).rejects.toThrow(Error);
        });

    });

    describe(`Delete By ID`, () => {
        test(`with existing ID`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            // expecting void
            expect(await employeeApi.DeleteByID(0)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            await expect(employeeApi.DeleteByID(9)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer) should throw an error`, async () => {
            const employeeApi = new EmployeeApi(
                new MockEmployeeApiDataConnector()
            );

            await expect(employeeApi.DeleteByID(-1)).rejects.toThrow(Error);
        });

    });

    });



class MockEmployeeApiDataConnector implements DataConnector<Employee>{

    async get(predicates: Object[]): Promise<Employee[]> {
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

    async save(entity: Employee): Promise<void> {

    }
    async delete(entity: Employee): Promise<void> {

    }

}