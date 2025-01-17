// import { spawn } from "child_process";

// export const POST = async (req: Request) => {
//   const python = spawn("python", ["scripts/ocr_script.py", "uploads/file_3.jpg"]);

//   let output = "";
//   python.stdout.on("data", (data) => {
//     output += data.toString();
//   });

//   python.stderr.on("data", (data) => {
//     console.error(data.toString());
//   });

//   python.on("close", (code) => {
//     if (code === 0) {
//       console.log("OCR Output:", output);
//     } else {
//       console.error("Error running script.");
//     }
//   });

//   return new Response(output);
// };

// import multer from "multer";
// import { spawn } from "child_process";

// const upload = multer({ dest: "uploads/" });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export const POST = async (req, res) => {
//   if (req.method === "POST") {
//     upload.single("file")(req, res, (err) => {
//       if (err) return res.status(500).json({ error: "Upload error" });

//       const python = spawn("python", ["scripts/ocr_script.py", req.file.path]);

//       let output = "";
//       python.stdout.on("data", (data) => {
//         output += data.toString();
//       });

//       python.stderr.on("data", (data) => {
//         console.error(data.toString());
//       });

//       python.on("close", (code) => {
//         if (code === 0) {
//           res.status(200).json({ text: output });
//         } else {
//           res.status(500).json({ error: "OCR processing failed" });
//         }
//       });
//     });
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };

// import { NextRequest, NextResponse } from "next/server";
// import multer from "multer";
// import { spawn } from "child_process";
// import path from "path";
// import fs from "fs";

// // Configure Multer for file uploads
// const upload = multer({ dest: "uploads/" });

// const uploadMiddleware = (req: any, res: any): Promise<void> =>
//   new Promise((resolve, reject) => {
//     upload.single("file")(req, res, (err: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });

// const runPythonScript = (filePath: string): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const python = spawn("python", ["scripts/ocr_script.py", filePath]);

//     let output = "";
//     python.stdout.on("data", (data) => {
//       output += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//       console.error("Python Error:", data.toString());
//       reject(data.toString());
//     });

//     python.on("close", (code) => {
//       if (code === 0) {
//         resolve(output.trim());
//       } else {
//         reject("Python script exited with an error.");
//       }
//     });
//   });

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.formData();
//     const file = body.get("file");
//     console.log("POST REQUEST MADE..");
//     console.log(file);

//     if (!file || typeof file === "string") {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Save the file to the `uploads` directory
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const filePath = path.resolve("uploads", file.name);
//     fs.writeFileSync(filePath, buffer);

//     // Run the Python script
//     const result = await runPythonScript(filePath);

//     // Cleanup the file
//     fs.unlinkSync(filePath);

//     return NextResponse.json({ text: result }, { status: 200 });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { error: "Failed to process the file" },
//       { status: 500 }
//     );
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// import { NextRequest, NextResponse } from "next/server";
// import multer from "multer";
// import { spawn } from "child_process";
// import path from "path";
// import fs from "fs";

// // Configure Multer for file uploads
// const upload = multer({ dest: "uploads/" });

// // Helper function to use Multer with Next.js
// const uploadMiddleware = (req: any, res: any): Promise<void> =>
//   new Promise((resolve, reject) => {
//     upload.single("file")(req, res, (err: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });

// // Function to run Python script
// const runPythonScript = (filePath: string): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const python = spawn("python", ["scripts/ocr_script.py", filePath]);
//     console.log(filePath);

//     let output = "";
//     python.stdout.on("data", (data) => {
//       output += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//       console.error("Python Error:", data.toString());
//       reject(data.toString());
//     });

//     python.on("close", (code) => {
//       if (code === 0) {
//         resolve(output.trim());
//       } else {
//         reject("Python script exited with an error.");
//       }
//     });
//   });

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.formData();
//     const file = body.get("file");
//     console.log("POST REQUEST MADE..");
//     console.log(file);
//     console.log("POST REQ");
//     // Prepare a mock `res` object for Multer
//     const res: any = {
//       status: () => ({
//         json: (data: any) => data,
//       }),
//     };

//     // Handle file upload
//     await uploadMiddleware(req, res);
//     console.log("AFTER MIDDLEWARE");

//     // const file = (req as any).file;
//     // console.log(file);

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const filePath = file.path;

//     // Run the Python script
//     const result = await runPythonScript(filePath);

//     // Cleanup the file
//     fs.unlinkSync(filePath);

//     return NextResponse.json({ text: result }, { status: 200 });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { error: "Failed to process the file" },
//       { status: 500 }
//     );
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing to let Multer handle it
//   },
// };

import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

// Function to run Python script
const runPythonScript = (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    console.log("PYTHON SCRIPT BEGIN");
    const python = spawn("python", ["scripts/ocr_script.py", filePath]);
    console.log("PYTHON SCRIPT ENDED GUESS SO!!");

    let output = "";
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.log(data);
      console.error("Python Error:", data.toString());
      reject(data.toString());
    });

    python.on("close", (code) => {
      if (code === 0) {
        resolve(output.trim());
      } else {
        reject("Python script exited with an error.");
      }
    });
  });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file to the `uploads` directory
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadDir, Date.now() + (file as File).name);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
    }

    fs.writeFileSync(filePath, buffer);

    // Run the Python script
    const result = await runPythonScript(filePath);

    // Cleanup the uploaded file
    fs.unlinkSync(filePath);

    return NextResponse.json({ text: result }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process the file" },
      { status: 500 }
    );
  }
}
