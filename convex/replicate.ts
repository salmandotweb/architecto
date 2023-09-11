import { internalAction } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import Replicate from "replicate";

export const generate = internalAction(
    async (
        { runMutation },
        {
            roomId,
            prompt,
            replicatePrompt,
            markdownResponse,
            setupName
        }: { roomId: Id<"rooms">; prompt: string; replicatePrompt: string, markdownResponse: string, setupName: string }
    ) => {
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error(
                "Add REPLICATE_API_TOKEN to your environment variables: " +
                "https://docs.convex.dev/production/environment-variables"
            );
        }
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const output = (await replicate.run(
            "stability-ai/sdxl:da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
            {
                input: {
                    prompt: replicatePrompt,
                    num_outputs: 1,
                },
            }
        )) as [string, string];

        await runMutation(internal.generate.updateRoomSetup, {
            roomId,
            prompt,
            result: output,
            markdownResponse: markdownResponse,
            replicatePrompt: replicatePrompt,
            setupName: setupName
        });

    }
);