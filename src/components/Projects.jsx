import { useEffect, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// projects/ フォルダの .md ファイルをまとめて読み込む
const files = import.meta.glob("/projects/*.md", { as: "raw" });

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all(
      Object.entries(files).map(async ([path, loader]) => {
        const raw = await loader();
        const { data, content } = matter(raw);
        return { ...data, content };
      })
    ).then((loaded) => {
      // 日付で新しい順にソート
      loaded.sort((a, b) => (a.date < b.date ? 1 : -1));
      setProjects(loaded);
    });
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.05 * i }}
          className="group relative rounded-2xl border border-pink-200 bg-white p-5 hover:shadow-lg hover:shadow-pink-200/60"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-200/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
          <div className="relative">
            <div className="mb-2 text-sm text-pink-600">{p.date}</div>
            <h3 className="font-semibold text-pink-900">{p.title}</h3>

            <ReactMarkdown className="mt-1 text-sm text-pink-900/90">
              {p.content}
            </ReactMarkdown>

            {p.image && (
              <img
                src={p.image}
                alt={`${p.title} のスクリーンショット`}
                className="mt-3 rounded-lg shadow"
              />
            )}

            {p.video && (
              <video
                src={p.video}
                controls
                className="mt-3 rounded-lg shadow"
              />
            )}

            {p.tags && (
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
