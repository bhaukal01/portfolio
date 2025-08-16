import { list } from "@vercel/blob";
import ejs from "ejs";
import path from "path";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pin = url.searchParams.get("pin");

        // If no pin given, show browser prompt
        if (!pin) {
            return res.status(401).send(`
        <script>
          const p = prompt("Enter PIN:");
          if (p !== null) {
            window.location = "/api/view?pin=" + encodeURIComponent(p);
          }
        </script>
      `);
        }

        // Validate pin
        if (pin !== process.env.VIEW_PIN) {
            return res.status(403).send("<h1>Unauthorized</h1><p>Invalid PIN</p>");
        }

        // Load messages
        let messages = [];
        const { blobs } = await list({ prefix: "contacts/" });

        for (const blob of blobs) {
            try {
                const r = await fetch(blob.url, { cache: "no-store" });
                if (r.ok) {
                    const data = await r.json();
                    messages.push({ ...data, key: blob.pathname });
                }
            } catch { }
        }

        messages.sort((a, b) => new Date(b.date) - new Date(a.date));

        const templatePath = path.join(process.cwd(), "api", "messages.ejs");
        const html = await ejs.renderFile(templatePath, { messages });

        res.setHeader("Content-Type", "text/html");
        return res.status(200).send(html);
    } catch (err) {
        return res.status(500).send(`<pre>View error:\n${String(err)}</pre>`);
    }
}
