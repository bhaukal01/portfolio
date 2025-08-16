import { get } from "@vercel/blob";
import ejs from "ejs";
import path from "path";

export default async function handler(req, res) {
    let messages = [];
    try {
        const { url } = await get("contacts.json");
        const response = await fetch(url);
        messages = await response.json();
    } catch (err) {
        messages = [];
    }

    const templatePath = path.join(process.cwd(), "api", "messages.ejs");
    const html = await ejs.renderFile(templatePath, { messages });

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
}
