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
                    negative_prompt: "blurry, low-quality, low-resolution, low-res, noisy, grainy, pixelated, distorted, dark, dim, overexposed, underexposed, washed-out, washed out, over-saturated, over saturated, under-saturated, under saturated, over-sharpened, over sharpened, under-sharpened, under sharpened, overexposed, underexposed, over-exposed, under-exposed, over saturated, under saturated, over-sharpened, under-sharpened, over sharpened, under sharpened, over exposed, under exposed, over saturated, under saturated, over sharpe"
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