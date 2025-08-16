import { put, get } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.setHeader("Allow", ["POST"]);
            return res
                .status(405)
                .json({ error: `Method ${req.method} Not Allowed` });
        }

        const { name, email, phone, message } = req.body || {};
        if (!name || !email || !message) {
            return res
                .status(400)
                .json({ error: "Name, email, and message are required." });
        }

        const key = "contacts.json";

        // Load existing array from blob if it exists
        let arr = [];
        try {
            const { url } = await get(key); // throws if blob missing
            const r = await fetch(url, { cache: "no-store" });
            if (r.ok) {
                arr = await r.json();
            }
        } catch {
            arr = []; // file not found, start fresh
        }

        // Append new entry
        const entry = {
            id: Date.now(),
            name: String(name).slice(0, 200),
            email: String(email).slice(0, 200),
            phone: phone ? String(phone).slice(0, 60) : "N/A",
            message: String(message).slice(0, 5000),
            date: new Date().toISOString(),
        };
        arr.push(entry);

        // Overwrite blob with updated array using token
        const blob = await put(key, JSON.stringify(arr, null, 2), {
            access: "public",
            contentType: "application/json",
            token: process.env.BLOB_READ_WRITE_TOKEN, // ✅ needed for overwrite
        });

        console.log("contacts.json updated:", blob.url, "count:", arr.length);
        return res.status(200).json({
            success: true,
            url: blob.url,
            saved: entry,
            count: arr.length,
        });
    } catch (err) {
        console.error("contact error:", err);
        return res
            .status(500)
            .json({ error: "Server error", detail: String(err) });
    }
}
