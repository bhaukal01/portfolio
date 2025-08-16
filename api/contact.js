import { put } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.setHeader("Allow", ["POST"]);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }

        const { name, email, phone, message } = req.body || {};
        if (!name || !email || !message) {
            return res
                .status(400)
                .json({ error: "Name, email, and message are required." });
        }

        // Unique key for each submission
        const key = `contacts/${Date.now()}.json`;

        const entry = {
            id: Date.now(),
            name: String(name).slice(0, 200),
            email: String(email).slice(0, 200),
            phone: phone ? String(phone).slice(0, 60) : "N/A",
            message: String(message).slice(0, 5000),
            date: new Date().toISOString(),
        };

        const blob = await put(key, JSON.stringify(entry, null, 2), {
            access: "public",
            contentType: "application/json",
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return res.status(200).json({ success: true, url: blob.url, saved: entry });
    } catch (err) {
        console.error("contact error:", err);
        return res
            .status(500)
            .json({ error: "Server error", detail: String(err) });
    }
}
