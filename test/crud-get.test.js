import { describe, it, expect, vi } from "vitest";

const request = require("supertest");
const app = require("../app");

const act = require("../routes/database/actions");


describe("GET /books", () => {
    it("should return books", async () => {
        // Arrange & Mocking
        const mockData = { id: "rand-id", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBooks").mockResolvedValue(mockData);
        // Act & Execution
        const response = await request(app).get('/books');
        // Assert & Compare
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(mockData);
    });
});


describe("GET /books/:id", () => {
    it("should return book if correct id is provided", async () => {
        // Arrange
        const mockData = { id: "rand-id", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockImplementation(async (param) => {
            if (param === mockData.id) {
                return Promise.resolve(mockData);
            }
        });
        // Act
        const response = await request(app).get(`/books/${mockData.id}`);
        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(mockData);
    });

    it("should return error message with 404 code if wrong id is provided", async () => {
        // Arrange & Mocking
        const mockData = { id: "rand-id", title: "title", author: "author", image: "https://image.png", price: 10 };

        vi.spyOn(act, "getBookById").mockImplementation(async (param) => {
            if (param === mockData.id) {
                return Promise.resolve(mockData);
            } else {
                return Promise.resolve(false);
            }
        });

        // Act & Preparation
        const response = await request(app).get("/books/wrong-id");

        // Assert & Comparison
        expect(response.status).toBe(404);
        expect(response.text).toBe("Not Found!");
    });
});
