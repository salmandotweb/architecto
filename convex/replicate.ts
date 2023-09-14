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
                    negative_prompt: "Not an amputee, Not an autograph, Proper anatomy, Accurate illustration, Good proportions, Within the borders, Detailed background, Clear, In-frame body, Interesting background, No branding, Uncropped, Not cut off, Well-formed, Well-proportioned, Undistorted, Final version, Original, Unique features, Normal fingers, Standard hands, Typical legs, Regular limbs, No fault, No flaws, Separated fingers, No grains, High resolution, Pleasant proportions, Sharp, No identifying mark, Correct scale, Accurate physiology, Correct ratio, Clear, Not kitsch, No logo, Normal neck, High quality, High resolution, Not macabre, Well-formed, No mark, Well-shaped, Complete arms, Complete fingers, Complete hands, Complete legs, No mistake, Healthy, Normal hands, No mutation, Intact, On-screen, In-frame, In the picture, Clear, Well-drawn face, Well-drawn feet, Well-drawn hands, No printed words, Final render, Attractive, Unique, Beautiful pose, Realistic engine, Attractive, No watermark, No written language."
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

export const improveSetup = internalAction(
    async (
        { runMutation },
        {
            imageId,
        }: { imageId: string }
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

        const replicatePrompt = "Improve the image quality of this image."

        const output = (await replicate.run(
            "stability-ai/sdxl:da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
            {
                input: {
                    prompt: replicatePrompt,
                    num_outputs: 1,
                    image: imageId,
                    negative_prompt: "Not an amputee, Not an autograph, Proper anatomy, Accurate illustration, Good proportions, Within the borders, Detailed background, Clear, In-frame body, Interesting background, No branding, Uncropped, Not cut off, Well-formed, Well-proportioned, Undistorted, Final version, Original, Unique features, Normal fingers, Standard hands, Typical legs, Regular limbs, No fault, No flaws, Separated fingers, No grains, High resolution, Pleasant proportions, Sharp, No identifying mark, Correct scale, Accurate physiology, Correct ratio, Clear, Not kitsch, No logo, Normal neck, High quality, High resolution, Not macabre, Well-formed, No mark, Well-shaped, Complete arms, Complete fingers, Complete hands, Complete legs, No mistake, Healthy, Normal hands, No mutation, Intact, On-screen, In-frame, In the picture, Clear, Well-drawn face, Well-drawn feet, Well-drawn hands, No printed words, Final render, Attractive, Unique, Beautiful pose, Realistic engine, Attractive, No watermark, No written language."
                },
            }
        )) as [string, string];

        return output[0];
    }
);