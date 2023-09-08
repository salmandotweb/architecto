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

		await ctx.scheduler.runAfter(0, internal.generateBlueprint.generate, {
			bluePrintId: newPrompt,
			prompt: args.prompt,
		});

		return newPrompt;
	},
});

export const updateBluePrint = internalMutation({
	handler: async (
		{ db },
		{ bluePrintId, result }: { bluePrintId: Id<"blueprints">; result: string }
	) => {
		await db.patch(bluePrintId, {
			result,
		})
	},
});

export const getBluePrints = query(async ({ db }) => {
	const blueprints = await db.query("blueprints").collect();
	return blueprints;
});
