import supabase from "@/supabaseClient";
import { userAgent } from "next/server";

export const uploadFileToSupabase = async (file: File): Promise<string> => {
  try {
    const filePath = `pdfs/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("pdfs")
      .upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    const fileUrl = `https://toedslmykfbanqvtpktp.supabase.co/storage/v1/object/public/pdfs/${filePath}`;

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteFileFromSupabase = async (
  fileUrl: string
): Promise<boolean> => {
  try {
    const urlParts = fileUrl.split("/pdfs/");

    if (urlParts.length < 2) {
      throw new Error("Invalid file URL format.");
    }

    const filePath = `${urlParts[1]}`;

    const { error } = await supabase.storage.from("pdfs").remove([filePath]);

    if (error) {
      console.log(error);
      return false;
      // throw new Error(error.message);
    }

    console.log(`File deleted successfully: ${filePath}`);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
    // throw error;
  }
};

export const uploadImageToSupabase = async (
  file: File,
  email: string
): Promise<string> => {
  try {
    const filePath = email;

    const { data, error } = await supabase.storage
      .from("user-profiles")
      .upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    const imageUrl = `https://toedslmykfbanqvtpktp.supabase.co/storage/v1/object/public/user-profiles/${filePath}`;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteImageFromSupabase = async (
  fileUrl: string
): Promise<boolean> => {
  try {
    const urlParts = fileUrl.split("/user-profiles/");

    if (urlParts.length < 2) {
      throw new Error("Invalid file URL format.");
    }

    const filePath = `${urlParts[1]}`;

    const { error } = await supabase.storage
      .from("user-profiles")
      .remove([filePath]);

    if (error) {
      console.log(error);
      return false;
      // throw new Error(error.message);
    }

    console.log(`Image deleted successfully: ${filePath}`);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
    // throw error;
  }
};
