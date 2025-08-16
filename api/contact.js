import { put, get } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required." });
        }

        const fileName = "contacts.json";

        // 1. Load existing data if file exists
        let existingData = [];
        try {
            const { url } = await get(fileName);
            const response = await fetch(url);
            existingData = await response.json();
        } catch (err) {
            existingData = []; // file doesn't exist yet
        }

        // 2. New entry
        const newEntry = {
            id: Date.now(),
            name,
            email,
            phone: phone || "N/A",
            message,
            date: new Date().toISOString(),
        };

        existingData.push(newEntry);

        // 3. Save updated data back to blob
        const blob = await put(fileName, JSON.stringify(existingData, null, 2), {
            access: "public",
            contentType: "application/json",
        });

        return res.status(200).json({ success: true, message: "Message saved!", url: blob.url });
    }

    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
