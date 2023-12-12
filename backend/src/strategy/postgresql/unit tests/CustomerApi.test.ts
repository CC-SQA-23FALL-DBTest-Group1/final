// Written by Frederick and Xingru 
// Version 1
// Last update: 2023-12-11
import {CustomerApi} from "../api/CustomerApi";
import { DataConnector } from "../dataconnector";
import { Customer } from "../models";

describe("customer api", () =>{
    test("get will return the numbers of objects", async () => {
        const customerApi = new CustomerApi (
            new MockCustomerApiDataConnector(),
        );

        //expect(await customerApi.getCustomerByID(1)).toHaveLength(5);
    });

});

class MockCustomerApiDataConnector implements DataConnector<Customer>{

    async get(predicates: Object[]) :Promise<Customer[]>{
        return [new Customer()];
    }
    
    save: (entity: Customer) => Promise<void>;

    delete: (entity: Customer) => Promise<void>;
    
    
}

class MockCustomerApiDataConnectorWithFailure implements DataConnector<Customer> {
    get: (predicates: Object[]) => Promise<Customer[]>;
    save: (entity: Customer) => Promise<void>;
    delete: (entity: Customer) => Promise<void>;
   
   
}