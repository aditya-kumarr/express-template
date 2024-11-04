import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../server.js";

describe("Testing Auth routes", () => {
  describe("Token Routes", () => {
    it("GET /api/auth/token should return 200 and a token", async () => {
      const response = await request(app).get("/api/auth/token");
      assert.equal(response.status, 200);
      assert.ok(response.body.token);
    });
  });
});
