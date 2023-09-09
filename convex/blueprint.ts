import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const generateBluePrint = mutation({
	args: { prompt: v.string() },
	handler: async (ctx, args) => {
		const newPrompt = await ctx.db.insert("blueprints", {
			prompt: args.prompt,
		});

		await ctx.scheduler.runAfter(0, internal.openai.openAI, {
			bluePrintId: newPrompt,
			type: "gaming",
			budget: "500$",
		});

		return newPrompt;
	},
});

export const updateBluePrint = internalMutation({
	handler: async (
		{ db },
		{ bluePrintId, result, prompt }: { bluePrintId: Id<"blueprints">; result?: string, prompt?: string }
	) => {
		await db.patch(bluePrintId, {
			result,
			prompt,
		})
	},
});

export const getBluePrints = query(async ({ db }) => {
	const blueprints = await db.query("blueprints").collect();
	return blueprints;
});
