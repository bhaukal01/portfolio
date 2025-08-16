import { get } from "@vercel/blob";
import ejs from "ejs";
import path from "path";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    try {
        let messages = [];
        try {
            const { url } = await get("contacts.json");
            const r = await fetch(url, { cache: "no-store" });
            if (r.ok) {
                messages = await r.json();
            }
        } catch {
            messages = [];
        }

        const templatePath = path.join(process.cwd(), "api", "messages.ejs");
        const html = await ejs.renderFile(templatePath, { messages });
        res.setHeader("Content-Type", "text/html");
        return res.status(200).send(html);
    } catch (err) {
        return res.status(500).send(`<pre>View error:\n${String(err)}</pre>`);
    }
}
