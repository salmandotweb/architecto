import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const generateRoomSetup = mutation({
    args: {
        roomType: v.string(),
        budget: v.string(),
        color: v.string(),
    },
    handler: async (ctx, args) => {
        const newPrompt = await ctx.db.insert("rooms", {
            roomType: args.roomType,
            budget: args.budget,
            color: args.color,
        });

        await ctx.scheduler.runAfter(0, internal.openai.openAI, {
            roomId: newPrompt,
            type: args.roomType,
            budget: args.budget,
            color: args.color,
        });

        return newPrompt;
    },
});

export const updateRoomSetup = internalMutation({
    handler: async (
        { db },
        { roomId, result, prompt }: { roomId: Id<"rooms">; result?: string[], prompt?: string }
    ) => {
        await db.patch(roomId, {
            result,
            prompt,
        })
    },
});

export const getRoomSetups = query(async ({ db }) => {
    const rooms = await db.query("rooms").collect();
    return rooms;
});

export const getRoomSetup = query(({ db }, { roomId }: { roomId: Id<"rooms"> }) => {
    if (!roomId) return null;
    return db.get(roomId);
}
);
