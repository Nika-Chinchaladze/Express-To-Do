import { describe, it, expect, vi } from "vitest";

const request = require("supertest");
const app = require("../app");


describe("GET /books", () => {
    it("should return books", async () => {
        const response = await request(app).get("/books");
        console.log(response.body);
    });
});
