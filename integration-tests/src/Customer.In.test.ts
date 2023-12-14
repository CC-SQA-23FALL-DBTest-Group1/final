// Written by Frederick
// Version 1
// Last update: 2023-12-13

import axios from "axios";

const targetUrl = `${process.env.TARGET_URL}`;

describe("Customer Integration Test", () => {


    describe(`Create Customer`, () => {
        test("With Valid Data", async () => {
            const data = {
                name: `Starley`,
            address: `99 Queen St`,
            phoneNumber1: `6593214795`,
            phoneNumber2: `6399841165`,
            }

            const response = await axios.post(`http://${targetUrl}/customer/new`, data);

            console.log(response.status);
            expect(response.status).toBe(200);
            console.log(`XXXXXXXXXXXXXXXXXXXXXXX`)
            console.log(response.data)
            console.log(`XXXXXXXXXXXXXXXXXXXXXXX`)
            
        });
    })

});