"use node";

import OpenAI from "openai";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const openAI = internalAction(
    async (
        { scheduler },
        {
            bluePrintId,
            type,
            budget
        }: {
            bluePrintId: Id<"blueprints">;
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
       I want to create a custom ${type} pc, budget is ${budget}, give me a list of parts and prices for each part for best performance. 
       `;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo-16k-0613",
        });

        await scheduler.runAfter(0, internal.generateBlueprint.generate, {
            bluePrintId,
            prompt: completion.choices[0].message.content! + "\n" + "Create a image based on these specs which should look cool and artistic.",
        });
    })