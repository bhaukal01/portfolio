import { get } from "@vercel/blob";
import ejs from "ejs";
import path from "path";

export default async function handler(req, res) {
    try {
        let messages = [];
        try {
            const { url } = await get("contacts.json");
            const response = await fetch(url);
            if (response.ok) {
                const ct = response.headers.get("content-type") || "";
                messages = ct.includes("application/json") ? await response.json() : [];
            }
        } catch {
            // Blob not found yet – show empty list
            messages = [];
        }

        const templatePath = path.join(process.cwd(), "api", "messages.ejs");
        const html = await ejs.renderFile(templatePath, { messages });
        res.setHeader("Content-Type", "text/html");
        return res.status(200).send(html);
    } catch (err) {
        return res
            .status(500)
            .send(`<pre>View error:\n${String(err)}</pre>`);
    }
}
