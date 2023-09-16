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
        })

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
        { roomId, result, prompt, markdownResponse, replicatePrompt, setupName }: { roomId: Id<"rooms">; result?: string[], prompt?: string, markdownResponse?: string, replicatePrompt?: string, setupName?: string }
    ) => {

        await db.patch(roomId, {
            result,
            prompt,
            markdownResponse,
            replicatePrompt,
            setupName
        })

    },
});

export const getRoomSetups = query(async ({ auth, db }) => {
    const identity = await auth.getUserIdentity();
    if (identity === null) {
        return []
    }
    const rooms = await db.query("rooms").collect();
    return rooms.sort((a, b) => {
        return b._creationTime - a._creationTime;
    })
});

export const getRoomSetup = query(async ({ auth, db }, { roomId }: { roomId: Id<"rooms"> }) => {
    const identity = await auth.getUserIdentity();
    if (identity === null) {
        return null
    }
    if (!roomId) return null;
    return db.get(roomId);
}
);

