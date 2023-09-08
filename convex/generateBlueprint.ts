"use node";

import Replicate from "replicate";
import { internalAction } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const generate = internalAction(
    async (
        { runMutation },
        {
            bluePrintId
        }: { bluePrintId: Id<"blueprints"> }
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
                    prompt: "An astronaut riding a rainbow unicorn"
                }
            }
        )) as [string, string];

        await runMutation(internal.blueprint.updateBluePrint, {
            bluePrintId,
            result: output[1],
        });

    }
);