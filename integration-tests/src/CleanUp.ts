// Written by Frederick
// Version 1
// Last update: 2023-12-14

import axios from "axios";

export async function cleanUp(
    targetUrl: string,
    subUrl: string,
    tableName: string,
    testName: string
) {
    const response = await axios.post(`http://${targetUrl}/${subUrl}`); // Get all
    if (response.data) {
        const entities = response.data as any[];
        let output: string = ``;

        output += (
            `==============================================`
            + `\n`
            + `Existing ${tableName} records in the table:`
            + `${entities?.length ?? `None`}`
            + `\n`
            + `==============================================`
        );
        console.log(typeof (entities))
        if (typeof (entities) == `string`) {
            output += (`\n` + entities);
        }

        if (typeof (entities) != `string` && entities.length > 3) {
            output += (
                `\n`
                + `Cleaning up records from previous test.`
            );

            entities?.forEach(async e => {
                if (e.id > 3) {
                    await axios.post(
                        `http://${targetUrl}/${subUrl}/delete`,
                        { id: e.id }
                    );

                }

            });
            output += (
                `\n`
                + `Clean-up done.`
                + `\n`
                + `==============================================`
            );

            await new Promise(resolve => setTimeout(resolve, 2000));
            const res = await axios.post(`http://${targetUrl}/${subUrl}`); // Get all
            if (res.data) {
                const e = res.data as any[];
                output += (
                    `\n`
                    + `Existing ${tableName} records in the table:`
                    + `${e?.length ?? `None`}`
                    + `\n`
                    + `==============================================`
                );
            }
        }
        else if (entities.length > 0) {

            output += (
                `\n` +
                `Reserve records from migration.` +
                `\n==============================================`
            );

        }

        return output;
    }
    else {
        throw Error(`${testName} Integration Test Stops.`)
    }
}