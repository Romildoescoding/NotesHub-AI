import { useState } from "react";

const useOCRGemini = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const sendOCRImage = async (image: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      const base64Image = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const body = {
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  data: base64Image.split(",")[1], // Extract Base64 data
                  mimeType: image.type, // Use the correct MIME type
                },
              },
            ],
          },
          {
            role: "user", // ✅ Required Role
            parts: [
              {
                text: `This is not a question but a requirement. You do not have to reply to this instruction directly.**Must Remember:**  
                - Your name is not Gemini. Your name is **NoteCraftAI**.  
                - Respond in the BlockNote format, which contains an array of blocks for the BlockNote editor.  
                - A sample array is given below as a reference.  
                - Extract the processed text from the provided input and insert it into the 'content' field in the appropriate format. 
                - You do not have to modify any of the content or the text from the image. Just give as it is but with only minor grammar improvements in case anything does not make sense at all. 
                - Change the 'type' of blocks in the 'type' field according to the given format.  

                ### **Supported Block Types:**  
                - **ParagraphBlock:** { "type": "paragraph" }  
                - **HeadingBlock:** { "type": "heading", "props": { "level": 1 | 2 | 3 } }  
                - **BulletListItemBlock:** { "type": "bulletListItem" }  
                - **NumberedListItemBlock:** { "type": "numberedListItem" }  
                - **TableBlock:** { "type": "table" }  

                ### **Default Formatting Rules:**  
                - **Text Styling:** Bold, Italic, Underline, Strikethrough  
                - **Text Alignment:** Left, Center, Right, Justify  
                - **Default Colors:** textColor: "default", backgroundColor: "default"  

            ### **This is format you need to follow. Change the values as needed but you need to keep the default values as specified below in every single block in case of no changes:**
                [
                    {
                        "id": "5702f5ad-58f0-4e3d-b144-fbb2f82e882b",
                        "type": "heading",
                        "props": {
                            "textColor": "default",
                            "backgroundColor": "default",
                            "textAlignment": "left",
                            "level": 1
                        },
                        "content": [
                            { "type": "text", "text": "Get Started", "styles": {} }
                        ],
                        "children": []
                    }
                ]
            
            Important Notes:
                - Do not use any sort of Markdown, HTML, bullet points, or any formatting symbols like \`\` and all that.
                - Incase of use of superscipt in the text, use ^ to denote it e.g 2^n.
                - The id field in each block should be uniquely generated already by you. Do not use sequential ids but rather you have to generate them via uuid() and use them by yourself.
                - For different types of headings, you have the level property in the heading block as -> { "level": 1 | 2 | 3 } which denotes h1, h2 and h3 respectively.
                - The response should just be structured as an array of blocks in the JSON format, readable and directly usable in the BlockNote editor.
                - Now, process the following input and return the result in the correct BlockNote format:
            `,
              },
            ],
          },
        ],
      };

      console.log("GEMINI CALLED");
      console.log(
        `${process.env.NEXT_PUBLIC_GEMINI_API_URI}${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GEMINI_API_URI}${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(`Failed to process PDF: ${response.statusText}`);
      }

      console.log("GEMINI DATA RETURNED");
      console.log(data);
      return data; // Return the processed response
    } catch (err) {
      setError(err.message);
      console.error("Error processing PDF:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    sendOCRImage,
    isProcessing,
    error,
  };
};

export default useOCRGemini;
