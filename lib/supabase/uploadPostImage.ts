import { supabaseBrowser } from "@/lib/supabase/client";

export async function uploadPostImage(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabaseBrowser.storage
        .from("post-images")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
        });

    if (error) throw error;

    const { data } = supabaseBrowser.storage
        .from("post-images")
        .getPublicUrl(fileName);

    return data.publicUrl;
}
