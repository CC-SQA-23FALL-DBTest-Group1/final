// Written by Frederick and Xingru
// Version 1 , 2023-12-14

import { MigrationInterface, QueryRunner } from "typeorm"
import { Customer, Employee, VehicleType, TransitPoint, EmployeeVehicleTypeOperation, MechanicVehicleType, Shipment, Vehicle, VehicleRepairRecord, Trip, ShipmentRoute } from "../models"
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


        const employeeRepo = queryRunner.manager.getRepository(Employee);

        let e1 = new Employee();
        e1.firstName = 'John';
        e1.lastName = 'Doe';
        e1.seniority = 2;
        employeeRepo.save(e1);

        let e2 = new Employee();
        e2.firstName = 'Jane';
        e2.lastName = 'Smith';
        e2.seniority = 3;
        employeeRepo.save(e2);

        let e3 = new Employee();
        e3.firstName = 'Bob';
        e3.lastName = 'Johnson';
        e3.seniority = 1;
        employeeRepo.save(e3);

        const vehicleTypeRepo = queryRunner.manager.getRepository(VehicleType);
        let vt1 = new VehicleType();
        vt1.name = "Cargo Planes";
        vehicleTypeRepo.save(vt1);

        let vt2 = new VehicleType();
        vt2.name = "In-city trucks";
        vehicleTypeRepo.save(vt2);


        let vt3 = new VehicleType();
        vt3.name = "Long haul trucks";
        vehicleTypeRepo.save(vt3);

        const transitPointRepo = queryRunner.manager.getRepository(TransitPoint);
        let transitPoint1 = new TransitPoint();
        transitPoint1.name = 'Warehouse A';
        transitPointRepo.save(transitPoint1);

        let transitPoint2 = new TransitPoint();
        transitPoint2.name = 'Warehouse B';
        transitPointRepo.save(transitPoint2);

        let transitPoint3 = new TransitPoint();
        transitPoint3.name = 'Distribution Center';
        transitPointRepo.save(transitPoint3);



        const evtoRepo = queryRunner.manager.getRepository(EmployeeVehicleTypeOperation);

        // Fetch existing employees and vehicle types from the database
        const johnDoe = await employeeRepo.findOneOrFail({ where: { firstName: 'John', lastName: 'Doe' } });
        const janeSmith = await employeeRepo.findOneOrFail({ where: { firstName: 'Jane', lastName: 'Smith' } });
        const bobJohnson = await employeeRepo.findOneOrFail({ where: { firstName: 'Bob', lastName: 'Johnson' } });

        const cargoPlanes = await vehicleTypeRepo.findOneOrFail({ where: { name: 'Cargo Planes' } });
        const inCityTrucks = await vehicleTypeRepo.findOneOrFail({ where: { name: 'In-city trucks' } });
        const longHaulTrucks = await vehicleTypeRepo.findOneOrFail({ where: { name: 'Long haul trucks' } });

        // Create and save instances of EmployeeVehicleTypeOperation (evto)
        let evto1 = new EmployeeVehicleTypeOperation();
        evto1.employee = johnDoe;
        evto1.type = cargoPlanes;
        await evtoRepo.save(evto1);

        let evto2 = new EmployeeVehicleTypeOperation();
        evto2.employee = janeSmith;
        evto2.type = inCityTrucks;
        await evtoRepo.save(evto2);

        let evto3 = new EmployeeVehicleTypeOperation();
        evto3.employee = bobJohnson;
        evto3.type = longHaulTrucks;
        await evtoRepo.save(evto3);



        const mechanicVehicleTypeRepo = queryRunner.manager.getRepository(MechanicVehicleType);



        // Insert data into MechanicVehicleType table
        let mvt1 = new MechanicVehicleType();
        mvt1.employee = johnDoe;
        mvt1.type = cargoPlanes;
        mvt1.status = true;
        await mechanicVehicleTypeRepo.save(mvt1);

        let mvt2 = new MechanicVehicleType();
        mvt2.employee = janeSmith;
        mvt2.type = inCityTrucks;
        mvt2.status = true;
        await mechanicVehicleTypeRepo.save(mvt2);

        let mvt3 = new MechanicVehicleType();
        mvt3.employee = bobJohnson;
        mvt3.type = longHaulTrucks;
        mvt3.status = true;
        await mechanicVehicleTypeRepo.save(mvt3);



        const vehicleRepo = queryRunner.manager.getRepository(Vehicle);
        const cargoPlanesTypeId = await vehicleTypeRepo
            .createQueryBuilder()
            .select('id')
            .from(VehicleType, 'vt')
            .where('vt.name = :name', { name: 'Cargo Planes' })
            .getRawOne();

        const inCityTrucksTypeId = await vehicleTypeRepo
            .createQueryBuilder()
            .select('id')
            .from(VehicleType, 'vt')
            .where('vt.name = :name', { name: 'In-city trucks' })
            .getRawOne();

        const longHaulTrucksTypeId = await vehicleTypeRepo
            .createQueryBuilder()
            .select('id')
            .from(VehicleType, 'vt')
            .where('vt.name = :name', { name: 'Long haul trucks' })
            .getRawOne();

        let v1 = new Vehicle();
        v1.brand = 'Boeing';
        v1.model = 'Boeing 747';
        v1.load = 10000;
        v1.capacity = 100000;
        v1.year = 2022;
        v1.type = cargoPlanesTypeId.id;
        await vehicleRepo.save(v1);

        let v2 = new Vehicle();
        v2.brand = 'Airbus';
        v2.model = 'Airbus A380';
        v2.load = 12000;
        v2.capacity = 120000;
        v2.year = 2021;
        v2.type = cargoPlanesTypeId.id;
        await vehicleRepo.save(v2);

        let v3 = new Vehicle();
        v3.brand = 'Cessna';
        v3.model = 'Cessna 208 Caravan';
        v3.load = 1500;
        v3.capacity = 4000;
        v3.year = 2020;
        v3.type = cargoPlanesTypeId.id;
        await vehicleRepo.save(v3);

        const vehicleRepairRecordRepo = queryRunner.manager.getRepository(VehicleRepairRecord);
        let vrr1 = new VehicleRepairRecord();
        vrr1.estimatedTime = 110;
        vrr1.actualTime = 120;
        vrr1.vehicle = v1;
        vrr1.mechanic = e1;
        await vehicleRepairRecordRepo.save(vrr1);

        let vrr2 = new VehicleRepairRecord();
        vrr2.estimatedTime = 100;
        vrr2.actualTime = 90;
        vrr2.vehicle = v2;
        vrr2.mechanic = e2;
        await vehicleRepairRecordRepo.save(vrr2);

        let vrr3 = new VehicleRepairRecord();
        vrr3.estimatedTime = 90;
        vrr3.actualTime = 80;
        vrr3.vehicle = v3;
        vrr3.mechanic = e3;
        await vehicleRepairRecordRepo.save(vrr3);


        const tripRepo = queryRunner.manager.getRepository(Trip);


        const vehicle1 = await vehicleRepo.findOneOrFail({ where: { brand: 'Boeing' } });
        const vehicle2 = await vehicleRepo.findOneOrFail({ where: { brand: 'Airbus' } });
        const vehicle3 = await vehicleRepo.findOneOrFail({ where: { brand: 'Cessna' } });

        const driver1 = await employeeRepo.findOneOrFail({ where: { firstName: 'John', lastName: 'Doe' } });
        const driver2 = await employeeRepo.findOneOrFail({ where: { firstName: 'Jane', lastName: 'Smith' } });




        let trip1 = new Trip();
        trip1.vehicle = vehicle1;
        trip1.driver1 = driver1;
        trip1.driver2 = driver2;
        trip1.from = transitPoint1;
        trip1.to = transitPoint2;
        await tripRepo.save(trip1);

        let trip2 = new Trip();
        trip2.vehicle = vehicle2;
        trip2.driver1 = driver2;
        trip2.driver2 = driver1;
        trip2.from = transitPoint2;
        trip2.to = transitPoint3;
        await tripRepo.save(trip2);

        let trip3 = new Trip();
        trip3.vehicle = vehicle3;
        trip3.driver1 = driver1;
        trip3.driver2 = null;
        trip3.from = transitPoint2;
        trip3.to = transitPoint3;
        await tripRepo.save(trip3);


        const shipmentRepo = queryRunner.manager.getRepository(Shipment);
        const customer1 = await customerRepo.findOneOrFail({ where: { name: 'John Doe' } });
        const customer2 = await customerRepo.findOneOrFail({ where: { name: 'Jane Smith' } });
        const customer3 = await customerRepo.findOneOrFail({ where: { name: 'Bob Johnson' } });



        let shipment1 = new Shipment();
        shipment1.from = transitPoint1;
        shipment1.to = transitPoint3;
        shipment1.weight = 600;
        shipment1.value = 1100;
        shipment1.customer = customer1;
        await shipmentRepo.save(shipment1);

        let shipment2 = new Shipment();
        shipment2.from = transitPoint2;
        shipment2.to = transitPoint3;
        shipment2.weight = 700;
        shipment2.value = 1400;
        shipment2.customer = customer2;
        await shipmentRepo.save(shipment2);

        let shipment3 = new Shipment();
        shipment3.from = transitPoint3;
        shipment3.to = transitPoint1;
        shipment3.weight = 800;
        shipment3.value = 1500;
        shipment3.customer = customer3;
        await shipmentRepo.save(shipment3);



        const shipmentRouteRepo = queryRunner.manager.getRepository(ShipmentRoute);

        // Insert data into ShipmentRoute table
        let shipmentRoute1 = new ShipmentRoute();
        shipmentRoute1.shipment = shipment1;
        shipmentRoute1.order = 0;
        shipmentRoute1.trip = trip1;
        await shipmentRouteRepo.save(shipmentRoute1);

        let shipmentRoute2 = new ShipmentRoute();
        shipmentRoute2.shipment = shipment1;
        shipmentRoute2.order = 1;
        shipmentRoute2.trip = trip2;
        await shipmentRouteRepo.save(shipmentRoute2);

        let shipmentRoute3 = new ShipmentRoute();
        shipmentRoute3.shipment = shipment2;
        shipmentRoute3.order = 0;
        shipmentRoute3.trip = trip3;
        await shipmentRouteRepo.save(shipmentRoute3);








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


        const employeeRepo = queryRunner.manager.getRepository(Employee);
        const employeeFirstNames = ['John', 'Jane', 'Bob'];
        await employeeRepo
            .createQueryBuilder()
            .delete()
            .from(Employee)
            .where('firstName IN (:...firstNames)', { firstName: employeeFirstNames })
            .execute();



        const vehicleTypeRepo = queryRunner.manager.getRepository(VehicleType);
        const VehicleTypeNames = ['Cargo Planes', 'In-city trucks', 'Long haul trucks'];

        await vehicleTypeRepo
            .createQueryBuilder()
            .delete()
            .from(VehicleType)
            .where('name IN (:...names)', { names: VehicleTypeNames })
            .execute();

        const transitPointRepo = queryRunner.manager.getRepository(TransitPoint);
        const transitPointNames = ['Warehouse A', 'Warehouse B', 'Distribution Center'];

        await transitPointRepo
            .createQueryBuilder()
            .delete()
            .from(TransitPoint)
            .where('name IN (:...names)', { names: transitPointNames })
            .execute();


        const evtoRepo = queryRunner.manager.getRepository(EmployeeVehicleTypeOperation);


        // Fetch existing employees and vehicle types from the database
        const johnDoe = await employeeRepo.findOneOrFail({ where: { firstName: 'John', lastName: 'Doe' } });
        const janeSmith = await employeeRepo.findOneOrFail({ where: { firstName: 'Jane', lastName: 'Smith' } });
        const bobJohnson = await employeeRepo.findOneOrFail({ where: { firstName: 'Bob', lastName: 'Johnson' } });

        const cargoPlanes = await vehicleTypeRepo.findOneOrFail({ where: { name: 'Cargo Planes' } });
        const inCityTrucks = await vehicleTypeRepo.findOneOrFail({ where: { name: 'In-city trucks' } });
        const longHaulTrucks = await vehicleTypeRepo.findOneOrFail({ where: { name: 'Long haul trucks' } });

        // Delete EmployeeVehicleTypeOperation records
        const evtoNames = [
            { employee: johnDoe, type: cargoPlanes },
            { employee: janeSmith, type: inCityTrucks },
            { employee: bobJohnson, type: longHaulTrucks },
        ];

        await evtoRepo
            .createQueryBuilder()
            .delete()
            .from(EmployeeVehicleTypeOperation)
            .where('employee = :employee AND type = :type', { employee: johnDoe, type: cargoPlanes })
            .orWhere('employee = :employee AND type = :type', { employee: janeSmith, type: inCityTrucks })
            .orWhere('employee = :employee AND type = :type', { employee: bobJohnson, type: longHaulTrucks })
            .execute();


        const mechanicVehicleTypeRepo = queryRunner.manager.getRepository(MechanicVehicleType);

        // Delete data from MechanicVehicleType table
        await mechanicVehicleTypeRepo
            .createQueryBuilder()
            .delete()
            .from(MechanicVehicleType)
            .where('(employee = :johnDoe AND type = :cargoPlanes) OR (employee = :janeSmith AND type = :inCityTrucks) OR (employee = :bobJohnson AND type = :longHaulTrucks)', {
                johnDoe: johnDoe,
                janeSmith: janeSmith,
                bobJohnson: bobJohnson,
                cargoPlanes: cargoPlanes,
                inCityTrucks: inCityTrucks,
                longHaulTrucks: longHaulTrucks,
            })
            .execute();





        const vehicleRepo = queryRunner.manager.getRepository(Vehicle);
        const vehicleTypeNames = ['Cargo Planes', 'In-city trucks', 'Long haul trucks'];
        await vehicleRepo
            .createQueryBuilder()
            .delete()
            .from(Vehicle)
            .where('type IN (:...types)', { types: vehicleTypeNames })
            .execute();

       


        const vehicleRepairRecordRepo = queryRunner.manager.getRepository(VehicleRepairRecord);
        await vehicleRepairRecordRepo
            .createQueryBuilder()
            .delete()
            .from(VehicleRepairRecord)
            .where('estimatedTime > :estimatedTime', { estimatedTime: 95 })
            .execute();



        const tripRepo = queryRunner.manager.getRepository(Trip);

        const deleteConditions = [
            { vehicle: { brand: 'Boeing' }, driver1: { firstName: 'John', lastName: 'Doe' } },
            { vehicle: { brand: 'Airbus' }, driver1: { firstName: 'Jane', lastName: 'Smith' } },
            { vehicle: { brand: 'Cessna' }, driver1: { firstName: 'John', lastName: 'Doe' } },
        ];

        for (const condition of deleteConditions) {
            await tripRepo
                .createQueryBuilder()
                .delete()
                .from(Trip)
                .where('vehicle = :vehicle AND driver1 = :driver1', condition)
                .execute();
        }


        const shipmentRepo = queryRunner.manager.getRepository(Shipment);
        const shipmentCustomerNames = ['John Doe', 'Jane Smith', 'Bob Johnson'];
        await shipmentRepo
            .createQueryBuilder()
            .delete()
            .from(Shipment)
            .where('customer IN (:...customerNames)', { customerNames: shipmentCustomerNames })
            .execute();

        const shipmentRouteRepo = queryRunner.manager.getRepository(ShipmentRoute);


        const shipment1 = await shipmentRepo.findOneOrFail({ where: { customer: { name: 'John Doe' } } });
        const shipment2 = await shipmentRepo.findOneOrFail({ where: { customer: { name: 'Jane Smith' } } });

        const trip1 = await tripRepo.findOneOrFail({ where: { vehicle: { brand: 'Boeing' } } });
        const trip2 = await tripRepo.findOneOrFail({ where: { vehicle: { brand: 'Airbus' } } });
        const trip3 = await tripRepo.findOneOrFail({ where: { vehicle: { brand: 'Cessna' } } });

        // Delete data from ShipmentRoute table
        await shipmentRouteRepo
            .createQueryBuilder()
            .delete()
            .from(ShipmentRoute)
            .where('(shipment = :shipment1 AND order = :order0 AND trip = :trip1) OR ' +
                '(shipment = :shipment1 AND order = :order1 AND trip = :trip2) OR ' +
                '(shipment = :shipment2 AND order = :order0 AND trip = :trip3)', {
                shipment1: shipment1,
                shipment2: shipment2,
                order0: 0,
                order1: 1,
                trip1: trip1,
                trip2: trip2,
                trip3: trip3,
            })
            .execute();
    }

}
