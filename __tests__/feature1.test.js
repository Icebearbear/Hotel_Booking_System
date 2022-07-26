// const { async } = require("@firebase/util");
// const request = require("supertest");
// const { describe } = require("yargs");
// const baseURL = "http://localhost:3001";
// const server = require("../server/index");
// import { hasUncaughtExceptionCaptureCallback } from "process";
const newFilter = require("./feature1test.js")

describe("test handle filter",()=> {
    
    it("should return subset of " , async() =>{
        var first = newFilter("sin");
        console.log(first);
        var second = newFilter("sing");
        var subset = second.some(r=> first.includes(r));
        console.log(subset);
        expect(subset).toBe(true);
    })
})