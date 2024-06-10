import { describe, it, expect, vi } from "vitest";

const request = require("supertest");
const app = require("../app");

const act = require("../routes/database/actions");

describe("PATCH /books/:id", () => {
    it("should return error message with 404 status code if wrong id is provided", async () => {
        // Arrange & Mocking
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockImplementation(async (param) => {
            if (param !== mockData.id) {
                return Promise.resolve(false);
            }
        });
        // Act & Execution
        const response = await request(app).patch("/books/2").query({fieldName: "title", fieldValue: "patch title"});

        // Assert & Compare
        expect(response.status).toBe(404);
        expect(response.text).toBe("Not Found!");
    });

    it("should return error message with 404 status code if fieldName field isn't provided", async () => {
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);

        const response = await request(app).patch(`/books/${mockData.id}`).query({fieldValue: "patch title"});

        expect(response.status).toBe(404);
        expect(response.text).toBe("Field - fieldName is't provided!");
    });

    it("should return error message with 404 status code if fieldName isn't allowed", async () => {
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);

        const response = await request(app).patch(`/books/${mockData.id}`).query({ fieldName: "music", fieldValue: "patch title"});

        expect(response.status).toBe(404);
        expect(response.text).toBe("Provided - fieldName is't allowed!");
    });

    it("should return error message with 404 status code if empty fieldName is provided", async () => {
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);

        const response = await request(app).patch(`/books/${mockData.id}`).query({ fieldName: "    ", fieldValue: "patch title"});

        expect(response.status).toBe(404);
        expect(response.text).toBe("Provided - fieldName is't allowed!");
    });

    it("should return error message with 404 status code if fieldValue field isn't provided", async () => {
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);

        const response = await request(app).patch(`/books/${mockData.id}`).query({ fieldName: "author" });

        expect(response.status).toBe(404);
        expect(response.text).toBe("Field - fieldValue is't provided!");
    });

    it("should return error message with 404 status code if empty fieldValue is provided", async () => {
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);

        const response = await request(app).patch(`/books/${mockData.id}`).query({ fieldName: "author", fieldValue: "    " });

        expect(response.status).toBe(404);
        expect(response.text).toBe("Provided - fieldValue mustn't be empty!");
    });

    it("should update record if every parameter is provided correctly", async () => {
        // Arrange & Mocking
        const mockData = { id: "1", title: "title", author: "author", image: "https://image.png", price: 10 };
        vi.spyOn(act, "getBookById").mockResolvedValue(mockData);
        vi.spyOn(act, "patchBook").mockResolvedValue(true);

        const response = await request(app).patch(`/books/${mockData.id}`).query({fieldName: "title", fieldValue: "patch"});

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Book has been modified successfully!");
    });
});

