// Written by Keerthana
// Version 1
// Last update: 2023-12-13
//Reviewed and Modified erros and wrote create update delate functions tests by Xingru
//Rewritten by Xingru
// Last update: 2023-12-14
import { VehicleApi } from "../api/VehicleApi";
import { DataConnector } from "../dataconnector";
import { Vehicle, VehicleType } from "../models";

describe(`Vehicle Table API Tests`, () => {

    describe(`Get Vechicle By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );


            const result = await vehicleApi.getByID(1);
            expect(result).toBeInstanceOf(Vehicle);
        });


        test(`With Valid Nonexisting ID`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );

            await expect(vehicleApi.getByID(9)).rejects.toThrow(Error);
        });

        test(`With Invalid ID(Negative Integer and Zero) should throw an error`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );

            await expect(vehicleApi.getByID(-1)).rejects.toThrow(Error);
            await expect(vehicleApi.getByID(0)).rejects.toThrow(Error);
        });
    });


});

describe('Get Employees', () => {
    test('With Existing Brand', async () => {
        const vehicleApi = new VehicleApi(
            new MockVehicleDataConnector()
        );

        let predicate = new Vehicle();
       predicate.brand = "Mercedes-Benz";
       

    const result = await vehicleApi.get(predicate);
        expect(result).toHaveLength(1);
    });

    test('With Nonexisting Brand', async () => {
        const vehicleApi = new VehicleApi(
            new MockVehicleDataConnector()
        );

        let predicate = new Vehicle();

        predicate.brand = "Jeep";
        

        const result = await vehicleApi.get(predicate);
        expect(result).toHaveLength(0);
    });

    test('With Valid Existing ID', async () => {
        const vehicleApi = new VehicleApi(
            new MockVehicleDataConnector()
        );

        let predicate = new Vehicle();

        predicate.id=1;

        
        const result = await vehicleApi.get(predicate);
        expect(result).toHaveLength(1);
    });

    test('With Valid Nonexisting ID', async () => {
        const vehicleApi = new VehicleApi(
            new MockVehicleDataConnector()
        );

        let predicate = new Vehicle();
        predicate.id = 88;

        const result = await vehicleApi.get(predicate);
        expect(result).toHaveLength(0);
    });


});


    describe(`Create`, () => {
        test(`with valid brand`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );


           let brand = "Mercedes-Benz";
           let model = "C";
           let load = 7000;
           let capacity = 85;
           let year = 2020;
           let numberOfRepair = 1;
           let type = new VehicleType();

            expect(await vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).toBeInstanceOf(Vehicle);
        });

        // test(`with 0 load should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //    let brand = "Mercedes-Benz";
        //    let model = "C";
        //    let load = 0;
        //    let capacity = 85;
        //    let year = 2020;
        //    let numberOfRepair = 1;
        //    let type = new VehicleType();

        //     await expect(vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });

        // test(`with negative load should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = -1000;
        //     let capacity = 85;
        //     let year = 2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });


        // test(`with 0 capacity should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 7000;
        //     let capacity = 0;
        //     let year = 2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });

        // test(`with negative capacity should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 7000;
        //     let capacity = -1111;
        //     let year = 2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });


        // test(`with 0 year should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 7000;
        //     let capacity = 85;
        //     let year = 0;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });

        // test(`with negative year record should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //    let brand = "Mercedes-Benz";
        //    let model = "C";
        //    let load = 7000;
        //    let capacity = 85;
        //    let year = -2020;
        //    let numberOfRepair = 1;
        //    let type = new VehicleType();

        //     await expect(vehicleApi.create(brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });


    });


    describe(`Update By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );

            let brand = "Mercedes-Benz";
            let model = "C";
            let load = 7000;
            let capacity = 86;
            let year = 2020;
            let numberOfRepair = 1;
            let type = new VehicleType();

            expect(await vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type))
            .toBeInstanceOf(Vehicle);
        });

        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );

            let brand = "Mercedes-Benz";
            let model = "C";
            let load = 7000;
            let capacity = 8;
            let year = 2020;
            let numberOfRepair = 1;
            let type = new VehicleType();

            await expect(
                vehicleApi.updateByID(9, brand, model, load, capacity, year, numberOfRepair, type)
            ).rejects.toThrow(Error);
        });


        test(`With Invalid ID(Negative Integer and Zero) should throw an error`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );

            let brand = "Mercedes-Benz";
            let model = "C";
            let load = 7000;
            let capacity = 86;
            let year = 2020;
            let numberOfRepair = 1;
            let type = new VehicleType();

            await expect(
                vehicleApi.updateByID(-1, brand, model, load, capacity, year, numberOfRepair, type)
            ).rejects.toThrow(Error);
            await expect(
                vehicleApi.updateByID(0, brand, model, load, capacity, year, numberOfRepair, type)
            ).rejects.toThrow(Error);
        });

        // test(`with 0 load should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 0;
        //     let capacity = 85;
        //     let year = 2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });

        // test(`with negative load should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = -1000;
        //     let capacity = 85;
        //     let year = 2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });


        // test(`with 0 capacity should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 7000;
        //     let capacity = 0;
        //     let year = 2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });

        // test(`with negative capacity should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //    let brand = "Mercedes-Benz";
        //    let model = "C";
        //    let load = 7000;
        //    let capacity = -1111;
        //    let year = 2020;
        //    let numberOfRepair = 1;
        //    let type = new VehicleType();

        //     await expect(vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });


        // test(`with 0 year should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 7000;
        //     let capacity = 85;
        //     let year = 0;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });

        // test(`with negative year record should throw an error`, async () => {
        //     const vehicleApi = new VehicleApi(
        //         new MockVehicleDataConnector()
        //     );


        //     let brand = "Mercedes-Benz";
        //     let model = "C";
        //     let load = 7000;
        //     let capacity = 85;
        //     let year = -2020;
        //     let numberOfRepair = 1;
        //     let type = new VehicleType();

        //     await expect(vehicleApi.updateByID(1, brand, model, load, capacity, year, numberOfRepair, type)).rejects.toThrow(Error);
        // });
    });

    describe(`Delete By ID`, () => {

        test(`With Valid Existing ID`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );


            // expecting void
            expect(await vehicleApi.deleteByID(1)).not.toBeDefined();
        });

        test(`With Valid Nonexisting ID should throw an error`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );


            await expect(vehicleApi.deleteByID(9)).rejects.toThrow(Error);
        });

        test(`With Invalid ID(Negative Integer) should throw an error`, async () => {
            const vehicleApi = new VehicleApi(
                new MockVehicleDataConnector()
            );

            await expect(vehicleApi.deleteByID(0)).rejects.toThrow(Error);
            await expect(vehicleApi.deleteByID(-1)).rejects.toThrow(Error);
        });


    });



    class MockVehicleDataConnector implements DataConnector<Vehicle> {

        async get(predicate: Vehicle): Promise<Vehicle[]> {

            const vehicle = new Vehicle();

            if (predicate) {
                // For Valid Existing ID
                if (predicate.id == 1) {
                    return [vehicle];
                }

                //For Existing Brand
                if(predicate.brand =="Mercedes-Benz"){
                    return [vehicle];
                }
                //For Valid model

 
             

               
                return [];
            }
            else {
                return [vehicle];
            }

        }
        

        async save(entity: Vehicle): Promise<void> {

        }
        async delete(entity: Vehicle): Promise<void> {

        }

    }