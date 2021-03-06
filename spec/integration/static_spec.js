const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/";

describe("routes : static", () => {
    describe("GET /", () => {
        it("should return status code 200", (done) => {
            request.get(base, (err, res, body) => {
                console.log(res.statusCode);
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });
});