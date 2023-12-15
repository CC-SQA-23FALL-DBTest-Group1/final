// Written by Keerthana
// Version 1
// Last update: 2023-12-13
//Reviewed and Modified erros and wrote create update delate functions tests by Xingru
//Rewritten by Xingru
// Last update: 2023-12-14
import { TransitPointApi } from "../api/TransitPointApi";
import { DataConnector } from "../dataconnector";
import { TransitPoint } from "../models";


describe("Transit Point Table API Tests", () => {
    describe(`Get By ID`, () => {
        test(`With Valid Existing ID`, async () => {
            const transitpointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            const result = await transitpointApi.getByID(1);
            expect(result).toBeInstanceOf(TransitPoint);
        });

        test(`With Valid Nonexisting ID`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            await expect(transitPointApi.getByID(88)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer and Zero) should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            await expect(transitPointApi.getByID(-1)).rejects.toThrow(Error);
            await expect(transitPointApi.getByID(0)).rejects.toThrow(Error);
        });
    });


    describe(`Get Transit Point`, () => {
        test(`With Existing Transit Point Name`, async () => {
            const transitpointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let predicate = new TransitPoint();
            predicate.name = "Trunk";

            const result = await transitpointApi.getByName("Trunk")
            expect(result).toHaveLength(1);
        });

        test(`With Nonexisting Transit Point Name`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let predicate = new TransitPoint();
            predicate.name = "Train";

            const result = await transitPointApi.getByName("Train");
            expect(result).toHaveLength(0);
        });



    });


    describe(`Create`, () => {

        test(`with valid name`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = `Trunk`;

            // expecting void

            expect(await transitPointApi.create(name)).toBeInstanceOf(TransitPoint);
        });

        test(`with invalid Name(empty string) should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = ``;

            await expect(transitPointApi.create(name)).rejects.toThrow(Error);

        });

        test(`with invalid name(only spaces) should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = ` `;

            await expect(transitPointApi.create(name)).rejects.toThrow(Error);
        });

    });

    describe(`Update By ID`, () => {
        test(`with valid name and existing ID`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = "Trunk";


            const result = await transitPointApi.updateByID(1, name);
            expect(result).toBeInstanceOf(TransitPoint);
        });


        test(`with valid name and nonexisting ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = `John`;


            await expect(transitPointApi.updateByID(9, name)).rejects.toThrow(Error);
        });

        test(`with valid name and invalid ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = `John`;

            await expect(transitPointApi.updateByID(-1, name)).rejects.toThrow(Error);
            await expect(transitPointApi.updateByID(0, name)).rejects.toThrow(Error);
        });

        test(`with invalid name(empty string) and existing ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = ``;


            await expect(transitPointApi.updateByID(1, name)).rejects.toThrow(Error);
        });
        test(`with invalid name(empty string) and nonexisting ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = ``;


            await expect(transitPointApi.updateByID(9, name)).rejects.toThrow(Error);
        });
        test(`with invalid name(empty string) and invalid ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = ``;

            await expect(transitPointApi.updateByID(-1, name)).rejects.toThrow(Error);
            await expect(transitPointApi.updateByID(0, name)).rejects.toThrow(Error);
        });

        test(`with invalid name(only spaces) and existing ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = `   `;

            await expect(transitPointApi.updateByID(1, name)).rejects.toThrow(Error);
        });

        test(`with invalid name(only spaces) and nonexisting ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = `   `;

            await expect(transitPointApi.updateByID(9, name)).rejects.toThrow(Error);
        });
        test(`with invalid name(only spaces) and invalid ID should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            let name = `   `;

            await expect(transitPointApi.updateByID(-1, name)).rejects.toThrow(Error);
            await expect(transitPointApi.updateByID(0, name)).rejects.toThrow(Error);
        });
    });

    describe(`Delete By ID`, () => {

        test(`with existing ID`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            // expecting void
            expect(await transitPointApi.deleteByID(1)).not.toBeDefined();
        });

        test(`With Valid Nonexisting ID`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            await expect(transitPointApi.deleteByID(9)).rejects.toThrow(Error);
        });

        test(`Wirh Invalid ID(Negative Integer and Zero) should throw an error`, async () => {
            const transitPointApi = new TransitPointApi(
                new MockTransitPointApiDataConnector()
            );

            await expect(transitPointApi.deleteByID(-1)).rejects.toThrow(Error);
            await expect(transitPointApi.deleteByID(0)).rejects.toThrow(Error);
        });


    });

});

class MockTransitPointApiDataConnector implements DataConnector<TransitPoint> {

    async get(predicate: TransitPoint): Promise<TransitPoint[]> {
        const transitPoint = new TransitPoint()
        if (predicate) {
            // For Valid Existing ID
            if (predicate.id == 1) {
                return [transitPoint];
            }

            // For Existing Transit Point Name
            if (predicate.name == "Trunk") {
                return [transitPoint];
            }

            // For Valid Nonexisting ID
            // For Nonexisting Transit Point Name
            return [];

        }
        else {
            return [transitPoint];
        }

    }
    async save(entity: TransitPoint): Promise<void> {

    }
    async delete(entity: TransitPoint): Promise<void> {

    }

}