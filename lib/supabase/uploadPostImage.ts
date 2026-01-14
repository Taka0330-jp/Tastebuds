import { supabaseBrowser } from "@/lib/supabase/client";

const BUCKET = "blog-images";

export async function uploadPostImage(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabaseBrowser.storage
        .from(BUCKET)
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
        });

    if (error) throw error;

    return fileName;
}
