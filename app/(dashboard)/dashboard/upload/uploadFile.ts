import supabase from "@/supabaseClient";

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
): Promise<void> => {
  try {
    const urlParts = fileUrl.split("/pdfs/");

    if (urlParts.length < 2) {
      throw new Error("Invalid file URL format.");
    }

    const filePath = `${urlParts[1]}`;

    const { error } = await supabase.storage.from("pdfs").remove([filePath]);

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
