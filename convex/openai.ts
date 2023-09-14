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

        const prompt = `Generate an best ${type}, considering a ${color} theme, all within a ${budget}$ budget. Provide recommendations for top-notch products in each category, with detailed explanations for their superiority. Additionally, offer insights on optimal table placement within the room, wall decor, and any other elements essential to achieve the perfect setup.
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
                Create a stable difussion prompt for image creation.` }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        const markdownResponse = await openai.chat.completions.create({
            messages: [{
                role: "system", content: `${completion.choices[0].message.content!}.
                Generate the response as markdown.` }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        const setupName = await openai.chat.completions.create({
            messages: [{
                role: "system", content: `${completion.choices[0].message.content!}.
                Generate a 2 word unique and cool name for this setup.` }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        await scheduler.runAfter(0, internal.replicate.generate, {
            roomId,
            prompt: completion.choices[0].message.content!,
            replicatePrompt: replicatePrompt.choices[0].message.content!,
            markdownResponse: markdownResponse.choices[0].message.content!,
            setupName: setupName.choices[0].message.content!,
        });
    })

