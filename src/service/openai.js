import axios from "axios";





/*********************************Image to react*************************************************************************** */



export const extractUIJsonFromImage = async (base64Image) => {
    const prompt = `
You are a frontend UI/UX expert. Analyze the provided UI image and return its complete layout as a valid JSON structure representing the visual hierarchy and styling of the components.

Respond ONLY with a valid JSON structure like:
{
  "type": "div",
  "class": "container",
  "style": { ... },
  "children": [ ... ]
}

Follow these rules:
- Use semantic HTML-like tags such as: \`div\`, \`span\`, \`h1\`–\`h6\`, \`p\`, \`button\`, etc.
- Include inline \`style\` for each element, defining:
  - Layout: \`display\`, \`flexDirection\`, \`gap\`, etc.
  - Spacing: \`padding\`, \`margin\`
  - Text styling: \`fontSize\`, \`fontWeight\`, \`color\`
  - Box styling: \`width\`, \`height\`, \`backgroundColor\`, \`borderRadius\`, \`boxShadow\`, \`border\`

- For any image, icon, or avatar:
  - Use a \`div\` with correct dimensions and \`backgroundColor\`
  - Add \`borderRadius: "50%"\` if it’s circular

- For buttons:
  - Use the \`button\` tag
  - Include \`padding\`, \`backgroundColor\`, \`color\`, \`border\`, \`borderRadius\`, \`fontSize\`, \`fontWeight\`

- Use meaningful and readable class names like \`card\`, \`card-title\`, \`avatar-wrapper\`, \`primary-btn\`, etc.

- Include visible UI text (titles, labels, buttons, prices, etc.) in a \`"content"\` field inside the appropriate element.

- Reflect the layout hierarchy visually and structurally using nested \`children\`.

Return ONLY the pure JSON — no explanation or extra formatting.
`;

    

    
    
    const payload = {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `${base64Image}` // or image/png based on your image type
              }
            }
          ]
        }
      ],
      temperature: 0.3
    };
    

    try {
        const response = await axios.post("https://test-gpt-us-region.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-01", payload, {
            headers: {
                "accept": "*/*",
                "accept-language": "en-US",
                "api-key": "700cf09d92e348bcb358a7264d6b21d3", // 🔑 Replace with secure env var in production
                "content-type": "application/json"
            }
        });

        const jsonStr = response?.data?.choices?.[0]?.message?.content;
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Error extracting UI JSON:", error.message);
        return null;
    }
};












/*********************************Image to react*************************************************************************** */






export const analyzeNote = async (note) => {

    const prompt = `
        You are an intelligent assistant. Analyze the following note and respond only in raw JSON format (without code block or markdown):

        {
        "sentiment": "Negative 🙁 | Neutral 🙂 | Positive 😃 | Very Positive 🥳 | Angry 😡 | Sad 😢 | Happy 😃 | Excited 🥳 | Anxious 😟 | Stressed 😫 | Hopeful 🌈 | Grateful 🙏 | Frustrated 😣 | Confident 💪 | Bored 😐 | Lonely 😔 | Motivated 🚀 | Tired 😴 | Calm 🌿",
        "tag": "OneWordTag",
        "summary": "A one-line short summary of the note"
        }

        Note: """${note}"""
        Respond with ONLY valid JSON.
        `;

    const payload = {
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `${prompt}`,
                    },
                ],
            },
        ],
        temperature: 0,
    };

    try {
        const response = await axios.post("https://test-gpt-us-region.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-01", payload, {
            headers: {
                "accept": "*/*",
                "accept-language": "en-US",
                "api-key": "700cf09d92e348bcb358a7264d6b21d3", // 🔑 Replace with secure env var in production
                "content-type": "application/json"
            }
        });


        const contentString = response?.data?.choices?.[0]?.message?.content;


        let parsedData = null;

        try {
            parsedData = JSON.parse(contentString);
        } catch (err) {
            console.error("Failed to parse content:", err);
        }



        return parsedData; // ✅ Should be in JSON: { sentiment: ..., tag: ..., summary: ... }

    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        throw error;
    }
};


export const searchPhrase = async (notes, phrase) => {

    const prompt = `
    You are an intelligent assistant. Analyze the provided JSON array of notes and return only those notes where the content, tag, or sentiment is semantically or directly related to the phrase: "${phrase}".
    
    Respond in **raw JSON format ONLY** (no markdown or code block).
    
    Input Notes:
    ${JSON.stringify(notes, null, 2)}
    `;


    const payload = {
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `${prompt}`,
                    },
                ],
            },
        ],
        temperature: 0,
    };

    try {
        const response = await axios.post("https://test-gpt-us-region.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-01", payload, {
            headers: {
                "accept": "*/*",
                "accept-language": "en-US",
                "api-key": "700cf09d92e348bcb358a7264d6b21d3", // 🔑 Replace with secure env var in production
                "content-type": "application/json"
            }
        });


        const contentString = response?.data?.choices?.[0]?.message?.content;


        let parsedData = null;

        try {
            parsedData = JSON.parse(contentString);
        } catch (err) {
            console.error("Failed to parse content:", err);
        }



        return parsedData; // ✅ Should be in JSON: { sentiment: ..., tag: ..., summary: ... }

    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        throw error;
    }
};
