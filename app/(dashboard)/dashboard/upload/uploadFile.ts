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

    const res = supabase.storage.from("pdfs").getPublicUrl(filePath);
    console.log(res);

    if (!res.data.publicUrl) {
      throw new Error("Failed to get public URL.");
    }

    return res.data.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
