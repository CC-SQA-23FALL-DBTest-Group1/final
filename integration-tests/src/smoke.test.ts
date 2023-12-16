import axios from "axios";
import { targetURL } from "./Config";

const targetUrl = targetURL();

describe("smoke", () => {
  it("persistence-service status is 200", async () => {
    console.log(targetUrl);
    const health = await axios.get(`http://${targetUrl}`);
    console.log(health.status);
    expect(health.status).toBe(200);
  });
});
