import { describe, it, expect, vi } from "vitest";

const request = require("supertest");
const app = require("../app");

const act = require("../routes/database/actions");

describe("POST /books", () => {
    it("should add new record into database if all fields are provided", async () => {
        // Arrange & Preparation
        const mockData = { id: "rand-id", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "postBook").mockImplementation(async (data) => {
            if (
                data.hasOwnProperty("title") &&
                data.hasOwnProperty("author") &&
                data.hasOwnProperty("image") &&
                data.hasOwnProperty("price")
            ) {
                return Promise.resolve(mockData);
            }
        });

        // Act & Execution
        const response = await request(app).post("/books").send(mockData);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("New book has been added successfully");
        expect(response.body.book).toEqual(mockData);
    });

    it("should return error message with 404 status code if not every field is provided", async () => {
        // Arrange & Preparation
        const provideData = { id: "rand-id", title: "title", author: "author", image: "https://image.png" };

        // Act & Execution
        const response = await request(app).post("/books").send(provideData);

        // Assert & Comparison
        expect(response.status).toBe(404);
        expect(response.text).toBe("Bad Request - all fields must be provided!");
    });
});
