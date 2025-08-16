import { put, get } from "@vercel/blob";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.setHeader("Allow", ["POST"]);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }

        const { name, email, phone, message } = req.body || {};
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required." });
        }

        const fileName = "contacts.json";

        // 1) Load existing messages if the blob exists
        let existing = [];
        try {
            const { url } = await get(fileName); // throws if not found
            const resp = await fetch(url);
            if (resp.ok) {
                const ct = resp.headers.get("content-type") || "";
                if (ct.includes("application/json")) {
                    existing = await resp.json();
                } else {
                    // Fallback: if somehow not JSON, ignore and start fresh
                    existing = [];
                }
            }
        } catch {
            // Blob does not exist yet – start with empty list
            existing = [];
        }

        // 2) Append new entry
        const entry = {
            id: Date.now(),
            name,
            email,
            phone: phone || "N/A",
            message,
            date: new Date().toISOString(),
        };
        existing.push(entry);

        // 3) Save back to blob
        const blob = await put(fileName, JSON.stringify(existing, null, 2), {
            access: "public",
            contentType: "application/json",
        });

        return res.status(200).json({
            success: true,
            message: "Message saved!",
            url: blob.url,
            saved: entry,
            count: existing.length,
        });
    } catch (err) {
        return res.status(500).json({ error: "Server error", detail: String(err) });
    }
}
