import { spawn } from "child_process";

export const POST = async (req: Request) => {
  const python = spawn("python", ["scripts/ocr_script.py", "uploads/file_3.jpg"]);

  let output = "";
  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  python.on("close", (code) => {
    if (code === 0) {
      console.log("OCR Output:", output);
    } else {
      console.error("Error running script.");
    }
  });

  return new Response(output);
};
