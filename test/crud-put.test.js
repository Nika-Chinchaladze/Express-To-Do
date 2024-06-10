import { describe, it, expect, vi } from "vitest";

const request = require("supertest");
const app = require("../app");
const act = require("../routes/database/actions");


describe("PUT /books/:id", () => {
    it("should update book if correct id and all required fields are provided", async () => {
        // Arrange & Mocking
        const mockSourceData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        const mockUpdateData = { id: "1", title: "title", author: "updated author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockSourceData);
        vi.spyOn(act, "putBook").mockResolvedValue(mockUpdateData);
        // Act & Execution
        const response = await request(app).put("/books/1").send(mockUpdateData);
        // Assert & Compare
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Book has been updated successfully");
    });
    
    it("should return error message with 404 status code if id is correct, but not every field is provided", async () => {
        // Arrange & Mocking
        const mockSourceData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        const mockUpdateData = { id: "1", title: "title", author: "updated author" };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockSourceData);
        // Act & Execution
        const response = await request(app).put("/books/1").send(mockUpdateData);
        // Assert & Compare
        expect(response.status).toBe(404);
        expect(response.text).toBe("Bad Request - all fields must be provided!");
    });
    
    it("should return error message with 404 status code if wrong book id is provided", async () => {
        // Arrange & Mocking
        const mockSourceData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        const mockUpdateData = { id: "1", title: "title", author: "updated author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockImplementation(async (param) => {
            if (param !== mockSourceData.id) {
                return Promise.resolve(false);
            }
        });
        // Act & Execution
        const response = await request(app).put("/books/2").send(mockUpdateData);
        // Assert & Compare
        expect(response.status).toBe(404);
        expect(response.text).toBe("Not Found!");
    });
});
