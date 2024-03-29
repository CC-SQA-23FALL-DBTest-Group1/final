// Written by Xingru 
// Version 2
// Last update: 2023-12-12
// Reviewed by Frederick
// Reviewed on 2023-13-13
/**
 * !!!!!!!! DO NOT CHANGE THIS FILE !!!!!!!!
 */
import { CustomerApi } from "../api/CustomerApi";
import { DataConnector } from "../dataconnector";
import { Customer } from "../models";


describe("Customer Table API Tests", () => {
    describe('Get Customer By ID', () => {
        test('With Valid Existing ID', async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector(),
            );
            const result = await customerApi.getByID(1);
            expect(result).toBeInstanceOf(Customer);
        });

        test("With Valid Nonexisting ID", async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            await expect(customerApi.getByID(88)).rejects.toThrow(Error);
        });

        test('With Invalid ID(Negative Integer and Zero) should throw an error', async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            await expect(customerApi.getByID(-1)).rejects.toThrow(Error);
            await expect(customerApi.getByID(0)).rejects.toThrow(Error);
        });
    });

    describe('Get Customers', () => {
        test('With Existing Customer Name', async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );
            let predicate = new Customer();
            predicate.name = "John";
            const result = await customerApi.get(predicate);
            expect(result).toHaveLength(1);
        });

        test('With Nonexisting Customer Name', async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let predicate = new Customer();
            predicate.name = "Alina";
            const result = await customerApi.get(predicate);
            expect(result).toHaveLength(0);
        });

        test('With Valid Existing ID', async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );
            let predicate = new Customer();
            predicate.id = 1;
            const result = await customerApi.get(predicate);
            expect(result).toHaveLength(1);
        });

        test('With Valid Nonexisting ID', async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let predicate = new Customer();
            predicate.id = 99;
            const result = await customerApi.get(predicate);
            expect(result).toHaveLength(0);
        });

    });


    describe(`Create`, () => {
        test(`with valid name`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `John`;
            let address = "Waterloo Campus";
            let phoneNumber1 = '123456789';
            let phoneNumber2 = '789456123';
            // expecting void

            expect(await customerApi.create(name, address, phoneNumber1, phoneNumber2)).toBeInstanceOf(Customer);
        });

        test(`with invalid name(empty string) should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = ``;
            let address = "Waterloo Campus";
            let phoneNumber1 = '123456789';
            let phoneNumber2 = '789456123';

            await expect(customerApi.create(name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });

        test(`with invalid name(only spaces) should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `   `;
            let address = "Waterloo Campus";
            let phoneNumber1 = '123456789';
            let phoneNumber2 = '789456123';

            await expect(customerApi.create(name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });

    });


    describe(`Update By ID`, () => {
        test(`with valid name and existing ID`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `Alina`;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';
            // expecting void
            expect(await customerApi.updateByID(1, name, address, phoneNumber1, phoneNumber2)).toBeInstanceOf(Customer);
        });


        test(`with valid name and nonexisting ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `Alex`;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';

            await expect(customerApi.updateByID(9, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with valid name and invalid ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `John`;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';

            await expect(customerApi.updateByID(-1, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
            await expect(customerApi.updateByID(0, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and existing ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = ``;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';


            await expect(customerApi.updateByID(1, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and nonexisting ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = ``;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';

            await expect(customerApi.updateByID(9, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with invalid name(empty string) and invalid ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = ``;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';


            await expect(customerApi.updateByID(-1, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
            await expect(customerApi.updateByID(0, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and existing ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `   `;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';


            await expect(customerApi.updateByID(1, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and nonexisting ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `   `;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';

            await expect(customerApi.updateByID(9, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


        test(`with invalid name(only spaces) and invalid ID should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            let name = `   `;
            let address = "Doon Campus";
            let phoneNumber1 = '111111111';
            let phoneNumber2 = '222222222';

            await expect(customerApi.updateByID(-1, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
            await expect(customerApi.updateByID(0, name, address, phoneNumber1, phoneNumber2)).rejects.toThrow(Error);
        });


    });

    describe(`Delete By ID`, () => {

        test(`with existing ID`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            // expecting void
            expect(await customerApi.deleteByID(1)).not.toBeDefined();
        });


        test(`With Valid Nonexisting ID`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            await expect(customerApi.deleteByID(9)).rejects.toThrow(Error);
        });


        test(`Wirh Invalid ID(Negative Integer and Zero) should throw an error`, async () => {
            const customerApi = new CustomerApi(
                new MockCustomerApiDataConnector()
            );

            await expect(customerApi.deleteByID(-1)).rejects.toThrow(Error);
            await expect(customerApi.deleteByID(0)).rejects.toThrow(Error);
        });
    });

});

class MockCustomerApiDataConnector implements DataConnector<Customer>{

    async get(predicates: Customer): Promise<Customer[]> {
        const customer = new Customer();
        if (predicates) {
            // For Valid Existing ID
            if (predicates.id == 1) {
                return [customer];
            }

            // For Existing Customer Name
            if (predicates.name == "John") {
                return [customer];
            }

            // For Valid Nonexisting ID
            // For Nonexisting Customer Name
            return [];

        }
        else {
            return [customer];
        }

    }

    async save(entity: Customer): Promise<void> {

    }

    async delete(entity: Customer): Promise<void> {

    }
}
