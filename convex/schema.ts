import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    blueprints: defineTable({
        prompt: v.optional(v.string()),
        result: v.optional(v.string()),
    }),
});