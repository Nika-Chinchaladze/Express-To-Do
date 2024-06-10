import { describe, it, expect, vi } from "vitest";

const request = require("supertest");
const app = require("../app");
const act = require("../routes/database/actions");


describe("DELETE /books/:id", () => {
    it("should return error message with 404 status code if wrong id is provided", async () => {
        // Arrange & Mocking
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockImplementation(async (param) => {
            if (param !== mockData.id) {
                return Promise.resolve(false);
            }
        });
        // Act & Execution
        const response = await request(app).delete("/books/2");
        // Assert & Compare
        expect(response.status).toBe(404);
        expect(response.text).toBe("Not Found!");
    });

    it("should delete record if correct id is provided", async () => {
        // Arrange & Mocking
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);
        vi.spyOn(act, "deleteBook").mockResolvedValue(true);
        // Act & Execution
        const response = await request(app).delete(`/books/${mockData.id}`);
        // Assert & Compare
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Book has been deleted successfully!");
    });
});
