import { useEffect, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { Buffer } from "buffer";
window.Buffer = Buffer;


// Codespaces などで /projects はリポジトリ直下。
// Viteの新仕様: { query: "?raw", import: "default" }
const files = import.meta.glob("/projects/*.md", {
    query: "?raw",
    import: "default",
});

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const loaded = await Promise.all(
                    Object.entries(files).map(async ([path, loader]) => {
                        const raw = await loader();
                        // ここで try/catch して、壊れたMDをスキップ
                        try {
                            const { data, content } = matter(raw);
                            // content が文字列でない/空なら捨てる
                            if (typeof content !== "string" || content.trim() === "") {
                                console.warn("Empty content skipped:", path);
                                return null;
                            }
                            return { ...data, content };
                        } catch (e) {
                            console.error("Matter parse error:", path, e);
                            return null;
                        }
                    })
                );
                const ok = loaded.filter(Boolean);
                ok.sort((a, b) => (a.date < b.date ? 1 : -1));
                setProjects(ok);
            } catch (e) {
                console.error("Projects load error:", e);
                setProjects([]);
            }
        })();
    }, []);

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
                <motion.div
                    key={`${p.title ?? "untitled"}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    className="group relative rounded-2xl border border-pink-200 bg-white p-5 hover:shadow-lg hover:shadow-pink-200/60"
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-200/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative">
                        {p.date && <div className="mb-2 text-sm text-pink-600">{p.date}</div>}
                        {p.title && <h3 className="font-semibold text-pink-900">{p.title}</h3>}

                        {/* HTML(例: <video>)をMarkdown内で許可。GFM(表・脚注等)も有効化 */}
                        {typeof p.content === "string" && (
                            <ReactMarkdown
                                className="mt-1 text-sm text-pink-900/90 prose prose-sm max-w-none prose-pink"
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {p.content}
                            </ReactMarkdown>
                        )}

                        {/* frontmatter 直参照の画像/動画（任意）。ダミーは入れない */}
                        {p.image && (
                            <img
                                src={p.image}
                                alt={`${p.title ?? ""} のスクリーンショット`}
                                className="mt-3 rounded-lg shadow"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        )}
                        {p.video && (
                            <video
                                src={p.video}
                                controls
                                className="mt-3 rounded-lg shadow"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        )}

                        {/* タグ */}
                        {Array.isArray(p.tags) && p.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {p.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-pink-300 bg-pink-50 px-2 py-0.5 text-xs text-pink-700"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* リンク */}
                        {p.link && (
                            <a
                                href={p.link}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-1 text-sm text-pink-700 hover:underline"
                            >
                                <ExternalLink className="size-4" /> View more
                            </a>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default Projects;
