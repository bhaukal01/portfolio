import { del } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).send("Method not allowed");
    }

    try {
        // Works with both form-data and JSON bodies
        let key = null;
        if (req.headers["content-type"]?.includes("application/json")) {
            const body = await new Promise((resolve) => {
                let data = "";
                req.on("data", (chunk) => (data += chunk));
                req.on("end", () => resolve(JSON.parse(data || "{}")));
            });
            key = body.key;
        } else {
            // Parse form POST
            const buffers = [];
            for await (const chunk of req) buffers.push(chunk);
            const bodyStr = Buffer.concat(buffers).toString();
            const params = new URLSearchParams(bodyStr);
            key = params.get("key");
        }

        if (!key) {
            return res.status(400).send("Missing blob key");
        }

        await del(key, { token: process.env.BLOB_READ_WRITE_TOKEN });

        // ✅ Redirect back to /api/view
        res.writeHead(302, { Location: "/api/view" });
        res.end();
    } catch (err) {
        console.error("Delete error:", err);
        return r
