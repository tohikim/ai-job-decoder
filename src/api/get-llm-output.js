import axios from "axios";
import { delay } from "../utils/delay";
import { MINIMUM_JOB_DESCRIPTION_CHARACTERS } from "../constants/job-description";
import mockResult from "../__mocks__/llm-result.json";

export const getLlmOutput = async (jobDescription) => {
  if (
    import.meta.env.VITE_ENVIRONMENT !== "production" &&
    jobDescription.length < MINIMUM_JOB_DESCRIPTION_CHARACTERS
  ) {
    await delay(750);

    return mockResult;
  }

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/free",
      temperature: 0.5,
      max_tokens: 8192,
      messages: [
        {
          role: "system",
          content:
            'You are a no-BS senior career coach with broad cross-industry experience. You\'ve sat on hiring panels across tech, finance, healthcare, marketing, design, operations, sales, and beyond—you read job descriptions for a living and know how to translate marketing fluff into what the role actually is. Adapt your domain knowledge to whatever field the posting is in.\n\nThe user will paste a job description. Decode it and produce a realistic interview prep plan.\n\nReturn ONE JSON object matching this exact schema. No markdown fences, no commentary before or after, no trailing text:\n\n{\n  "decoder": {\n    "roleTitle": string,\n    "roleOverview": string,\n    "honestTake": string\n  },\n  "skills": [\n    { "label": string, "actionItems": [string, string, string] }\n  ]\n}\n\nField rules:\n\n- roleTitle: The exact title from the posting, preserving level/seniority prefixes. Do not invent or normalize.\n- roleOverview: 2–4 sentences describing what the person will actually do day-to-day. Ground every claim in something the posting literally says.\n- honestTake: 3–5 sentences of candid, subtext-aware analysis. Be direct but useful. Light emphasis via *asterisks* is allowed for key phrases.\n- skills: Select the most critical technical or domain competencies. You must return a MAXIMUM of 7 skills, ideally between 3 and 7. These must be RANKED strictly by importance to the role (most critical first). Exclude soft skills and generic buzzwords. Include minor or legacy mentions only if they represent a specific technical hurdle.\n- skills[].label: Canonical short name only (e.g. "React", "Figma", "Salesforce").\n- skills[].actionItems: Provide the "right" number of prep actions based on context, with a MINIMUM of 2 and a MAXIMUM of 4 items per skill. Each must be a specific, interview-focused prep action (case study, portfolio review, technical screen, etc.) tied to how this specific skill will plausibly be tested in this specific role.\n\nValidation:\n- If the pasted input is not a job description, return the schema with "roleTitle": "INVALID_INPUT", empty strings for the other decoder fields, and an empty skills array.\n\nOutput: the JSON object only.',
        },
        {
          role: "user",
          content: jobDescription,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "interview_prep",
          strict: true,
          schema: {
            type: "object",
            properties: {
              decoder: {
                type: "object",
                properties: {
                  roleTitle: { type: "string" },
                  roleOverview: { type: "string" },
                  honestTake: { type: "string" },
                },
                required: ["roleTitle", "roleOverview", "honestTake"],
                additionalProperties: false,
              },
              skills: {
                type: "array",
                minItems: 3,
                maxItems: 7,
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    actionItems: {
                      type: "array",
                      minItems: 2,
                      maxItems: 4,
                      items: { type: "string" },
                    },
                  },
                  required: ["label", "actionItems"],
                  additionalProperties: false,
                },
              },
            },
            required: ["decoder", "skills"],
            additionalProperties: false,
          },
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = response.data.choices?.[0]?.message?.content;

  if (!result) {
    throw new Error("Result missing in llm response");
  }

  return JSON.parse(result);
};
