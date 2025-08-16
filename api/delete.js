import { del } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).send("Method not allowed");
    }

    try {
        const { key } = req.body || {};
        if (!key) {
            return res.status(400).send("Missing blob key");
        }

        await del(key, { token: process.env.BLOB_READ_WRITE_TOKEN });

        // Redirect back to /api/view
        res.writeHead(302, { Location: "/api/view" });
        res.end();
    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).send("Failed to delete: " + String(err));
    }
}
