// Written by Frederick
// Version 1
// Last update: 2023-12-11
import { Brackets, DataSource } from "typeorm";
import { Customer } from "../models";
import { DataConnector } from "./DataConnector";
export class CustomerDataConnector implements DataConnector<Customer>{

    #dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.#dataSource = dataSource;
    }


    async get(predicate: Customer): Promise<Customer[]> {

        try {

            const queryBuilder = this.#dataSource.getRepository(Customer)
                .createQueryBuilder(`c`);

            if (
                predicate.id !== undefined
                && predicate.id >= 1
                && predicate.id !== null
            ) {
                queryBuilder.andWhere(`c.id = :id`, { id: predicate.id });
            }

            if (
                predicate.name !== undefined
                && predicate.name !== ''
                && predicate.name !== null
            ) {
                queryBuilder.andWhere(`c.name LIKE :searchTerm`, { searchTerm: `%${predicate.name}%` });
            }

            if (
                predicate.address !== undefined
                && predicate.address !== ''
                && predicate.address !== null
            ) {
                queryBuilder.andWhere(`c.address LIKE :searchTerm`, { searchTerm: `%${predicate.address}%` });
            }

            if (
                predicate.phoneNumber1 !== undefined
                && predicate.phoneNumber1 !== ''
                && predicate.phoneNumber1 !== null
            ) {
                queryBuilder.andWhere(
                    new Brackets(qb => {
                        qb.where('c.phoneNumber1 LIKE :phone', { phone: predicate.phoneNumber1 })
                            .orWhere('c.phoneNumber2 LIKE :phone', { phone: predicate.phoneNumber1 });
                    })
                );
            }

            if (
                predicate.phoneNumber2 !== undefined
                && predicate.phoneNumber2 !== ''
                && predicate.phoneNumber2 !== null
            ) {
                queryBuilder.andWhere(
                    new Brackets(qb => {
                        qb.where('c.phoneNumber1 LIKE :phone', { phone: predicate.phoneNumber2 })
                            .orWhere('c.phoneNumber2 LIKE :phone', { phone: predicate.phoneNumber2 });
                    })
                );
            }

            return await queryBuilder.getMany();

        } catch (e) {
            throw Error(`Error occured when searching. Code: CS000`);
        }

    }

    async save(entity: Customer): Promise<void> {
        try {
            await this.#dataSource.manager.save(entity);
        } catch (e) {
            throw Error(`Error occured when saving. Code: CS001`)
        }

    }

    async delete(entity: Customer): Promise<void> {
        try {
            await this.#dataSource.manager.remove(entity);
        } catch (error) {
            throw new Error(`Error occured when removing. Code: CS003`)
        }
    }
}