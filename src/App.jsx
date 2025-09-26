import { useMemo } from "react";
import { motion } from "framer-motion";

import Projects from "./components/Projects";


import {
  Github,
  Mail,
  ExternalLink,
  Heart,
  ArrowRight,
  BookOpen,
  Sparkles,
  Code2,
  Rocket,
} from "lucide-react";

/**
 * App.jsx — Kawaii Cat-Themed Portfolio (Light & Pastel)
 * Tailwind v4 compatible. Drop into src/App.jsx.
 * Sections: Hero (intro), About, Projects, Goals, Contact
 */

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white text-slate-800 selection:bg-pink-200">
      <Navbar />
      <main>
        <Hero />
        <Section id="about" title="About me" subtitle="自己紹介">
          <AboutMe />
        </Section>
        <Section id="projects" title="My works" subtitle="今まで作ったもの">
          <Projects />
        </Section>
        <Section id="goals" title="What I want to build next" subtitle="これからやりたいこと">
          <Goals />
        </Section>
        <Section id="contact" title="Say hello" subtitle="お問い合わせ・SNS">
          <ContactCTA />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------- NAVBAR -------------------------------- */
function Navbar() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Works" },
    { href: "#goals", label: "Goals" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-50">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-pink-200/60">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-semibold text-pink-700">
            <span className="text-xl">🐱</span>
            <span className="tracking-tight">Kikka Takami</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-pink-800/80 hover:text-pink-900 transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-pink-300/70 px-3 py-1.5 text-xs text-pink-900 hover:bg-pink-100"
            >
              <Github className="size-4" /> GitHub
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

/* --------------------------------- HERO --------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <CatBubbles />
      <FloatingLayer />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-pink-900"
        >
          Welcome to <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent">Kikka's World</span> 🐾
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 max-w-2xl text-pink-800"
        >
          猫とテクノロジーが大好きな学生エンジニアです。React と IoT、宇宙がテーマのゲームプロジェクトを作っています。ここでは自己紹介、作品、そしてこれから挑戦したいことをまとめています。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-3 font-medium text-white shadow-lg shadow-pink-300/50 hover:bg-pink-400 transition"
          >
            See my works <ArrowRight className="size-4" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl border border-pink-300 px-5 py-3 font-medium text-pink-900 hover:bg-pink-100 transition"
          >
            About me
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function CatBubbles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[60rem] rounded-full blur-3xl bg-gradient-to-r from-pink-300/40 via-rose-200/40 to-fuchsia-300/40" />
      <div className="absolute -bottom-24 -left-20 h-72 w-[40rem] rounded-full blur-3xl bg-gradient-to-r from-pink-200/40 to-rose-200/40" />
    </div>
  );
}

/* Floating cat/cloud emojis — simple framer-motion keyframe loops */
function FloatingLayer() {
  // 固定の配置・動き（毎回同じ場所で優しい動き）
  const items = useMemo(
    () => [
      { emoji: "🐱", top: "10%", left: "8%", delay: 0 },
      { emoji: "🐾", top: "75%", left: "12%", delay: 0.2 },
      { emoji: "☁️", top: "18%", left: "78%", delay: 0.4 },
      { emoji: "☁️", top: "60%", left: "65%", delay: 0.6 },
      { emoji: "🐱", top: "30%", left: "45%", delay: 0.8 },
    ],
    []
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.25, y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 6 + i, delay: it.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: it.top, left: it.left, fontSize: i % 2 ? "2rem" : "2.8rem" }}
        >
          {it.emoji}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------- SECTIONS ------------------------------- */
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-pink-900">{title}</h2>
        <p className="mt-2 text-pink-800/90 max-w-2xl">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

/* ------------------------------- ABOUT ME ------------------------------- */
function AboutMe() {
  const facts = [
    { icon: <BookOpen className="size-5" />, text: "Kindai Univ. / Informatics / B3" },
    { icon: <Code2 className="size-5" />, text: "Java / Python / C / React / Node-RED / Azure" },
    { icon: <Rocket className="size-5" />, text: "NASA GEP / IoT・宇宙系の創作" },
    { icon: <Heart className="size-5" />, text: "NO LIFE NO CAT" },
    { icon: <Sparkles className="size-5" />, text: "TOEIC 800+ を目指して学習中" },
  ];
  //追加
  const profileSrc = `${import.meta.env.BASE_URL}images/profile.jpg`;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-pink-200 bg-white p-6">
        <p>
          {/* 追加 */}
          <img src={profileSrc} alt="Kikka Takami" className="w-32 h-32 rounded-full mx-auto mb-4" />
          はじめまして、Kikka です。プロダクトを作って人の生活をちょっと楽に、ちょっと楽しくするのが目標です。最近は
          <span className="font-medium"> React × Tailwind × Framer Motion</span> で UI を作ったり、IoT のダッシュボードや強化学習の実験、Azure の学習などに取り組んでいます。
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {facts.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-pink-900">
              <span className="text-pink-500">{f.icon}</span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-pink-200 bg-white p-6">
        <h3 className="font-semibold mb-2">好きなこと</h3>
        <p className="text-sm text-pink-900/90">
          猫、宇宙デザイン、UIアニメーション、クラウドインフラの勉強。これまでに作成した作品は下の "My works" に載せています。
        </p>
        <div className="mt-4 text-5xl select-none">🐱☁️🌸</div>
      </div>
    </div>
  );
}

/* -------------------------------- PROJECTS ------------------------------ */

/**
 * 
 * @returns componentsに移行！
 */


/* --------------------------------- GOALS -------------------------------- */
function Goals() {
  const todo = [
    { label: "可愛い猫フォントの導入（Google Fonts: Baloo / Fredoka）" },
    { label: "写真や動画を貼り付ける" },
    { label: "IoT データのライブカードを追加（温度・湿度・明るさ）" },
    { label: "現在時間を表示" },
    { label: "簡単なもの(見せられそうなもの)を表示" },
    { label: "英語版ページを追加 / 国際化ルーティング(?)" },
    { label: "作品ページを MD から自動生成" },
  ];
  return (
    <div className="rounded-2xl border border-pink-200 bg-white p-6">
      <ul className="space-y-3">
        {todo.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1">✨</span>
            <span>{t.label}</span>
          </li>
        ))}
      </ul>
      {/* <p className="mt-4 text-sm text-pink-900/90"></p> */}
    </div>
  );
}

/* -------------------------------- CONTACT -------------------------------- */
function ContactCTA() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-100 to-rose-100 p-6">
      <div>
        <h3 className="text-xl font-semibold text-pink-900">my email address: 2312110087y@kindai.ac.jp</h3>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-pink-300 bg-white px-4 py-2 hover:bg-pink-50"
        >
          <Github className="size-4" /> GitHub
        </a>
        <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 font-medium text-white hover:bg-pink-400">
          <Mail className="size-4" /> Email
        </a>
      </div>
    </div>
  );
}

/* --------------------------------- FOOTER -------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-pink-200/80 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-pink-900/80">
        <p>© {new Date().getFullYear()} kikka.site — Meow the future.</p>
        <div className="flex items-center gap-4">
          <a href="#about" className="hover:text-pink-900">About</a>
          <a href="#projects" className="hover:text-pink-900">Works</a>
          <a href="#goals" className="hover:text-pink-900">Goals</a>
          <a href="#contact" className="hover:text-pink-900">Contact</a>
        </div>
      </div>
    </footer>
  );
}