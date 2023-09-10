import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    rooms: defineTable({
        budget: v.string(),
        color: v.string(),
        prompt: v.optional(v.string()),
        result: v.optional(v.array(v.string())),
        roomType: v.string(),
    }),
});