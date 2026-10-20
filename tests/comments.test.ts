import { describe, expect, it } from "vitest";
import { projectComments } from "@/lib/sanity/comments";

describe("projectComments", () => {
  it("exposes only id, name, comment, and createdAt", () => {
    const out = projectComments([
      {
        _id: "c1",
        _createdAt: "2024-02-01T00:00:00Z",
        name: " Ada ",
        comment: " Lovely. ",
        // Fields that must never reach the page even if a query regressed:
        email: "ada@example.com",
        approved: true,
        ipHash: "deadbeef",
      },
    ]);
    expect(out).toEqual([{ id: "c1", name: "Ada", comment: "Lovely.", createdAt: "2024-02-01T00:00:00Z" }]);
    expect(JSON.stringify(out)).not.toContain("ada@example.com");
    expect(JSON.stringify(out)).not.toContain("ipHash");
  });

  it("skips malformed entries and non-array input", () => {
    expect(projectComments([{ _id: "x" }, null, { _id: "y", _createdAt: "t", name: "", comment: "hi" }])).toEqual([]);
    expect(projectComments(undefined)).toEqual([]);
  });
});
