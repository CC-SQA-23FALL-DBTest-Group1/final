// Written by Xingru 
// Version 1
// Last update: 2023-12-11
import {CustomerApi} from "../api/CustomerApi";
import { DataConnector } from "../dataconnector";
import { Customer } from "../models";

//Last update: 2023-12-12
describe("Customer Type Table API Tests", () => {
    describe('Get Customer By ID',() => {
        test('With Valid Existing ID', async() => {
            const customerApi = new CustomerApi (
                new MockCustomerApiDataConnector(),
    );
    const result = await customerApi.getCustomers([{id: 8}]);
    expect(result).toHaveLength(0);
    });

    test("With Valid Nonexisting ID", async () => {
       const customerApi = new CustomerApi(
        new MockCustomerApiDataConnector()
       );

       await expect(customerApi.getCustomerByID(88)).rejects.toThrow(Error);
    });

    test('With Invalid ID(Negative Integer) should throw an error', async() => {
        const customerApi = new CustomerApi(
            new MockCustomerApiDataConnector()
        );

        await expect(customerApi.getCustomerByID(-1)).rejects.toThrow(Error);
    });
});
    
describe('Get Customers', () => {
    test('With Existing Customer Name', async() => {
        const customerApi = new CustomerApi(
            new MockCustomerApiDataConnector()
        );

        const result = await customerApi.getCustomers([{name:"John"}]);
        expect(result).toHaveLength(1);
    });

    test('With Nonexisting Customer Name', async() => {
        const customerApi = new CustomerApi(
            new MockCustomerApiDataConnector()
        );

        const result = await customerApi.getCustomers([{name : "Alina"}]);
        expect(result).toHaveLength(0);
    });

    test('With Valid Existing ID', async () => {
        const customerApi = new CustomerApi(
            new MockCustomerApiDataConnector()
        );

        const result = await customerApi.getCustomers([{id: 0}]);
        expect(result).toHaveLength(1);
    });

test('With Valid Nonexisting ID', async () => {
    const customerApi = new CustomerApi(
        new MockCustomerApiDataConnector()
    );

    const result = await customerApi.getCustomers([{id: 9}]);
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

class MockCustomerApiDataConnector implements DataConnector<Customer>{

    async get(predicates: Object[]) :Promise<Customer[]>{
        const customer = new Customer();
        if (predicates.length >= 1) {
            // For Valid Existing ID
            if (JSON.stringify(predicates[0]) === JSON.stringify({ id: 0 })) {
                return [customer];
            }

            // For Existing Customer Name
            if (JSON.stringify(predicates[0]) === JSON.stringify({ name: "John" })) {
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
    
    save: (entity: Customer) => Promise<void>;

    delete: (entity: Customer) => Promise<void>;
    
    
}
