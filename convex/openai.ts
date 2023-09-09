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
        const prompt = `
       I want to create a custom ${type} pc, budget is ${budget}, give me the best parts I can use to build a beast pc, give the best look I can achieve in it, I want the best design like the whole interior and outer look, suggest me the best table look like how can I arrange my stuff on the table, what should be on what space and also how chair should be like in front with mic and camera for streaming as well.
       `;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        await scheduler.runAfter(0, internal.generateBlueprint.generate, {
            bluePrintId,
            prompt: completion.choices[0].message.content! ?? "",
        });
    })