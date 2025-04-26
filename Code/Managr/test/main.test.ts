
import { describe, it, expect } from "vitest";
import router from "../src/router";

// Sanity check - always useful to have
describe('Test Environment', () => {
  it('should run basic tests', () => {
    expect(1).toBeTruthy(); // Simple sanity check
  });
});

describe("Router Configuration", () => {
  it("should have a root route (/)", () => {
    const rootRoute = router.getRoutes().find(route => route.path === "/");
    expect(rootRoute).toBeDefined();
    expect(rootRoute?.path).toBe("/");
  });
});