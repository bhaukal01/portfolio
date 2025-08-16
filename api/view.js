import { list } from "@vercel/blob";
import ejs from "ejs";
import path from "path";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    try {
        let messages = [];

        // List all blobs under "contacts/"
        const { blobs } = await list({ prefix: "contacts/" });

        for (const blob of blobs) {
            try {
                const r = await fetch(blob.url, { cache: "no-store" });
                if (r.ok) {
                    const data = await r.json();
                    messages.push(data);
                }
            } catch {
                // ignore bad blobs
            }
        }

        // Sort by date descending
        messages.sort((a, b) => new Date(b.date) - new Date(a.date));

        const templatePath = path.join(process.cwd(), "api", "messages.ejs");
        const html = await ejs.renderFile(templatePath, { messages });

        res.setHeader("Content-Type", "text/html");
        return res.status(200).send(html);
    } catch (err) {
        return res.status(500).send(`<pre>View error:\n${String(err)}</pre>`);
    }
}
