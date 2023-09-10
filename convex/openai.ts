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
            budget
        }: {
            roomId: Id<"rooms">;
            type: string;
            budget: string;
        }
    ) => {

        if (!process.env.OPENAI_API_KEY) {
            throw new Error(
                "Please set OpenAI API key in .env file. See .env.example for more details."
            );
        }

        const prompt = `
       I want to build a ${type} room setup for myself. My budget is ${budget}. Suggest me the best possible design for my room. To be point answer with what I need.
       `;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        await scheduler.runAfter(0, internal.replicate.generate, {
            roomId,
            prompt: completion.choices[0].message.content!,
        });
    })