import { put, get } from "@vercel/blob";

export const config = { runtime: "nodejs" };

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

        const key = "contacts.json";

        // 1) Load current array from blob if it exists
        let arr = [];
        try {
            const { url } = await get(key); // throws if blob missing
            const r = await fetch(url, { cache: "no-store" });
            if (r.ok) {
                try {
                    arr = await r.json();
                } catch {
                    const txt = await r.text();
                    try {
                        arr = JSON.parse(txt);
                    } catch {
                        arr = [];
                    }
                }
            } else {
                arr = [];
            }
        } catch {
            // First write (blob not found) – start fresh
            arr = [];
        }

        // 2) Append entry (light sanitization)
        const entry = {
            id: Date.now(),
            name: String(name).slice(0, 200),
            email: String(email).slice(0, 200),
            phone: phone ? String(phone).slice(0, 60) : "N/A",
            message: String(message).slice(0, 5000),
            date: new Date().toISOString(),
        };
        if (!Array.isArray(arr)) arr = [];
        arr.push(entry);

        // 3) Overwrite the blob with updated array
        const blob = await put(key, JSON.stringify(arr, null, 2), {
            access: "public",
            contentType: "application/json",
            // default addRandomSuffix=false -> overwrite same key
        });

        console.log("contacts.json updated:", blob.url, "count:", arr.length);
        return res
            .status(200)
            .json({ success: true, url: blob.url, saved: entry, count: arr.length });
    } catch (err) {
        console.error("contact error:", err);
        return res.status(500).json({ error: "Server error", detail: String(err) });
    }
}
