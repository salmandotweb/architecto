"use node";

import OpenAI from "openai";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const openAI = internalAction(
    async (
        { scheduler },
        {
            roomId,
            type,
            budget,
            color
        }: {
            roomId: Id<"rooms">;
            type: string;
            budget: string;
            color: string;
        }
    ) => {

        if (!process.env.OPENAI_API_KEY) {
            throw new Error(
                "Please set OpenAI API key in .env file. See .env.example for more details."
            );
        }

        const prompt = `
        I'd like to create the perfect ${type} room setup within a budget of ${budget} while maintaining a ${color} theme. Please provide me with your expert design recommendations.
       `;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        const replicatePrompt = await openai.chat.completions.create({
            messages: [{
                role: "system", content: `${completion.choices[0].message.content!}.
                Create a stable difussion prompt out of this.` }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        await scheduler.runAfter(0, internal.replicate.generate, {
            roomId,
            prompt: completion.choices[0].message.content!,
            replicatePrompt: replicatePrompt.choices[0].message.content!,
        });
    })