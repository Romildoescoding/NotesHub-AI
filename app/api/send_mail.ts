// pages/api/send-email.ts
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Extract email from request body
      const { email }: { email: string } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const token = uuidv4(); // Generate unique token

      // Store token in your database with expiration (pseudo code)
      // await saveTokenToDB({ email, token });

      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const confirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm?token=${token}`;

      // Email options
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Confirm Your Email",
        text: `Please confirm your email by clicking the link: ${confirmationLink}`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Confirmation email sent!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send confirmation email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
