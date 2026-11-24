import { describe, expect, it } from "vitest";
import { savePageSchema, slugSchema } from "./schema";

const section = (style: string, id = crypto.randomUUID()) => ({ id, style });
const page = (sections: unknown[]) => ({
  version: 0,
  titleSv: "Titel",
  aliases: [],
  sections,
});

describe("slugSchema", () => {
  it("accepts kebab-case slugs", () => {
    expect(slugSchema.safeParse("for-foretag").success).toBe(true);
  });

  it.each(["", "For-Foretag", "a b", "a--b", "-a", "new", "edit", "upload"])(
    "rejects %j",
    (slug) => {
      expect(slugSchema.safeParse(slug).success).toBe(false);
    },
  );
});

describe("savePageSchema", () => {
  it("accepts a hero first and a footer last", () => {
    const result = savePageSchema.safeParse(
      page([section("hero"), section("text"), section("footer")]),
    );
    expect(result.success).toBe(true);
  });

  it("rejects a hero that is not first", () => {
    const result = savePageSchema.safeParse(
      page([section("text"), section("hero")]),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a footer that is not last", () => {
    const result = savePageSchema.safeParse(
      page([section("footer"), section("text")]),
    );
    expect(result.success).toBe(false);
  });

  it("rejects duplicate section ids", () => {
    const id = crypto.randomUUID();
    const result = savePageSchema.safeParse(
      page([section("text", id), section("text", id)]),
    );
    expect(result.success).toBe(false);
  });

  it("rejects images that are not http(s) urls or site paths", () => {
    for (const image of ["data:image/png;base64,AAAA", "javascript:alert(1)"]) {
      const result = savePageSchema.safeParse(
        page([{ ...section("text"), image }]),
      );
      expect(result.success).toBe(false);
    }
  });

  it("turns empty text into null", () => {
    const result = savePageSchema.parse(
      page([{ ...section("text"), headingSv: "  ", bodyEn: "" }]),
    );
    expect(result.sections[0]).toMatchObject({
      headingSv: null,
      bodyEn: null,
    });
  });
});
