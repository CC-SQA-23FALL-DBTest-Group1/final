// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Express } from "express";
import { CustomerApi } from "../api";
import { CustomerDataConnector } from "../dataconnector";

/**
 * Register the urls related to Customer table.
 * Give Responses with JSON.
 * All errors should be cought here.
 */
export default class CustomerApiRegister {
    #express: Express;
    #dataSource: DataSource;

    constructor(dataSource: DataSource, express: Express) {
        this.#dataSource = dataSource;
        this.#express = express;

        //Read one customer
        this.#express.get(`/customer/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            }
            const dataConnector = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dataConnector);

            try {
                const customer = await api.getCustomerByID(parseInt(id));
                return res.json(customer);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })

        //Read customers
        this.#express.get(`/customer`, async (req, res) => {
            const name = req.query.name ?? null
            const address = req.query.address ?? null
            const phoneNumber = req.query.phoneNumber ?? null

            const dataConnector = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dataConnector);

            try {
                const customers = await api.getCustomers([{
                    name: name,
                    address: address,
                    phoneNumber1: phoneNumber
                },
                {
                    name: name,
                    address: address,
                    phoneNumber2: phoneNumber
                }
                ]);
                return res.json(customers);
            } catch (e) {
                return res.json((e as Error).message);
            }
        })

        //Create Customer
        this.#express.post(`/customer/new`, async (req, res) => {
            const name: string = req.body.name?.trim() ?? null
            const address: string = req.body.address?.trim() ?? null
            const phoneNumber1: string = req.body.phoneNumber1?.trim() ?? null
            const phoneNumber2: string = req.body.phoneNumber2?.trim() ?? null

            /**
             * 
             * Space for Validations
             * 
             */


            const dataConnector = new CustomerDataConnector(this.#dataSource);
            const customerApi = new CustomerApi(dataConnector);

            try {
                const result = await customerApi.create(name, address, phoneNumber1, phoneNumber2);
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Update Customer
        this.#express.post(`/customer/update`, async (req, res) => {
            const id: string = req.body.name?.trim() ?? null
            const name: string = req.body.name?.trim() ?? null
            const address: string = req.body.address?.trim() ?? null
            const phoneNumber1: string = req.body.phoneNumber1?.trim() ?? null
            const phoneNumber2: string = req.body.phoneNumber2?.trim() ?? null

            /**
             * 
             * Space for Validations
             * 
             */


            const dataConnector = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dataConnector);

            try {
                const result = await api.updateByID(
                    parseInt(id),
                    name,
                    address,
                    phoneNumber1,
                    phoneNumber2
                );

                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Delete Customer
        this.#express.post(`/customer/delete`, async (req, res) => {
            const id: string = req.body.name?.trim() ?? null

            /**
             * 
             * Space for Validations
             * 
             */


            const dataConnector = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dataConnector);

            try {
                await api.DeleteByID(parseInt(id));

                return res.json(`Delete ID:${id}`);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


    }



}
