import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateBluePrint = mutation({
	args: { prompt: v.string() },
	handler: async (ctx, args) => {
		const newPrompt = await ctx.db.insert("blueprints", {
			prompt: args.prompt,
		});
		return newPrompt;
	},
});
