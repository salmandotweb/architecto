import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    prompt: defineTable({ prompt: v.string() }),
});