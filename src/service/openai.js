import axios from "axios";





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




export const searchPhrase = async (notes,phrase) => {

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
