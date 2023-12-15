// Written by Frederick
// Version 1
// Last update: 2023-12-14

import axios from "axios";
import { cleanUp } from "./CleanUp"

//const targetUrl = `${process.env.TARGET_URL}`;
const targetUrl = `localhost`;

describe("Employee Vehicle Type Operation Integration Test", () => {

    afterAll(async () => {
        // Clean up the data from this test
        let a = await cleanUp(targetUrl,`employee`,`Employee`,`Employee`);
        console.log(a);
        a = await cleanUp(targetUrl,`vehicletype`,`VehicleType`,`Employee`);
        console.log(a);
    });

    describe(`Create Record`, ()=>{

        test(`With Valid Data`,async()=>{
            
        });
    });

});