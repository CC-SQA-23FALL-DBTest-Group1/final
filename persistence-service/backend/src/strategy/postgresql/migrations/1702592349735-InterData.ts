// Written by Frederick
// Version 1 , 2023-12-14

import { MigrationInterface, QueryRunner } from "typeorm"
import { Customer } from "../models"
//  npm run typeorm -- migration:create ./src/strategy/postgresql/migrations/InterData

export class InterData1702592349735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const customerRepo = queryRunner.manager.getRepository(Customer);
        let c1 = new Customer();
        c1.name = `John Doe`;
        c1.address = '123 Main St';
        c1.phoneNumber1 = '5555471234';
        customerRepo.save(c1);

        let c2 = new Customer();
        c2.name = `Jane Smith`;
        c2.address = '456 Oak St';
        c2.phoneNumber1 = '5565471984';
        customerRepo.save(c2);

        let c3 = new Customer();
        c3.name = `Bob Johnson`;
        c3.address = '789 Pine St';
        c3.phoneNumber1 = '5565910184';
        customerRepo.save(c3);

    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        const customerRepo = queryRunner.manager.getRepository(Customer);
        const customerNames = ['John Doe', 'Jane Smith', 'Bob Johnson'];
        await customerRepo
            .createQueryBuilder()
            .delete()
            .from(Customer)
            .where('name IN (:...names)', { names: customerNames })
            .execute();

    }

}
