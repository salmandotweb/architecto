import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateBluePrint = mutation({
	args: { prompt: v.string() },
	handler: async (ctx, args) => {
		const newPrompt = await ctx.db.insert("prompt", { prompt: args.prompt });
		return newPrompt;
	},
});

export const getPrompts = query({
	args: {},
	handler: async (ctx, args) => {
		const prompts = await ctx.db.query("prompt").collect();
		return prompts;
	},
});
