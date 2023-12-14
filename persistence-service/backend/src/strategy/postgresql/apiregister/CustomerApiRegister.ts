// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { DataSource } from "typeorm";
import { Express } from "express";
import { CustomerApi } from "../api";
import { CustomerDataConnector } from "../dataconnector";
import { Customer } from "../models";

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

        // Default
        this.#express.get(`/customer`, (_, res) => {
            return res.json(`Customer`);
        });

        // Read one customer
        this.#express.get(`/customer/:id`, async (req, res) => {
            const id = req.params.id.trim();
            const regex = /^[0-9]{1,}$/; // Positive integer with or without leading zeros

            if (!regex.test(id)) {
                // if the id is not able to be a positive integer
                return res.json(`ID is not valid`);
            } else {
                const id_int = parseInt(id);
                if (id_int == 0) {
                    return res.json(`ID is not valid`);
                }
            }
            const dc = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dc);

            try {
                const customer = await api.getByID(parseInt(id));
                return res.json(customer);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })

        //Read customers
        this.#express.post(`/customer`, async (req, res) => {
            const name: string = req.body.name ?? ``
            const address: string = req.body.address ?? ``
            const phoneNumber: string = req.body.phoneNumber ?? ``

            const dc = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dc);

            try {
                const predicate = new Customer();
                if (name.length != 0) {
                    predicate.name = name;
                }
                if (address.length != 0) {
                    predicate.address = address;
                }
                if (phoneNumber.length != 0) {
                    predicate.phoneNumber1 = phoneNumber;
                }

                const customers = await api.get(predicate);

                res.json(customers);

            } catch (e) {
                return res.json((e as Error).message);
            }
        })

        //Create Customer
        this.#express.post(`/customer/new`, async (req, res) => {
            const name: string = req.body.name?.trim() ?? ``
            const address: string = req.body.address?.trim() ?? ``
            const phoneNumber1: string = req.body.phoneNumber1?.trim() ?? ``
            let phoneNumber2: string | null = req.body.phoneNumber2?.trim() ?? ``

            if (name.length == 0) {
                return res.json(`Name is not valid`);
            }
            if (address.length == 0) {
                return res.json(`Address is not valid`);
            }
            const phoneNumberRegex = /^(\+?(\d{1,3})?)?( ?\(\d{1,4}\))? ?\d{1,14}$/;
            if (phoneNumberRegex.test(phoneNumber1)) {
                return res.json(`Phone Number 1 is not valid`);
            }

            if (phoneNumber2 == `` || phoneNumber2 == null) {
                phoneNumber2 = null;
            }
            else {
                if (phoneNumberRegex.test(phoneNumber2)) {
                    return res.json(`Phone Number 2 is not valid`);
                }
            }


            const dc = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dc);

            try {
                const result = await api.create(name, address, phoneNumber1, phoneNumber2);
                return res.json(result);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


        //Update Customer
        this.#express.post(`/customer/update`, async (req, res) => {
            const id: string = req.body.name?.trim() ?? ``
            const name: string = req.body.name?.trim() ?? ``
            const address: string = req.body.address?.trim() ?? ``
            const phoneNumber1: string = req.body.phoneNumber1?.trim() ?? ``
            let phoneNumber2: string | null = req.body.phoneNumber2?.trim() ?? ``

            // Positive integer with or without leading zeros
            const regex = /^[0-9]{1,}$/;
            // If the id is not able to be a positive integer
            if (!regex.test(id)) {
                return res.json(`ID is not valid`);
            } else {
                const id_int = parseInt(id);
                if (id_int == 0) {
                    return res.json(`ID is not valid`);
                }
            }
            if (name.length == 0) {
                return res.json(`Name is not valid`);
            }
            if (address.length == 0) {
                return res.json(`Address is not valid`);
            }
            const phoneNumRegex = /^(\+?(\d{1,3})?)?( ?\(\d{1,4}\))? ?\d{1,14}$/;
            if (phoneNumRegex.test(phoneNumber1)) {
                return res.json(`Phone Number 1 is not valid`);
            }

            if (phoneNumber2 == `` || phoneNumber2 == null) {
                phoneNumber2 = null;
            }
            else {
                if (phoneNumRegex.test(phoneNumber2)) {
                    return res.json(`Phone Number 2 is not valid`);
                }
            }


            const dc = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dc);

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
            const id: string = req.body.name?.trim() ?? ``

            // Positive integer with or without leading zeros
            const regex = /^[0-9]{1,}$/;
            // If the id is not able to be a positive integer
            if (!regex.test(id)) {
                return res.json(`ID is not valid`);
            } else {
                const id_int = parseInt(id);
                if (id_int == 0) {
                    return res.json(`ID is not valid`);
                }
            }


            const dc = new CustomerDataConnector(this.#dataSource);
            const api = new CustomerApi(dc);

            try {
                await api.deleteByID(parseInt(id));

                return res.json(`Deleted Customer ID:${id}`);
            } catch (e) {
                return res.json((e as Error).message);
            }

        })


    }



}
