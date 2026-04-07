import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(0,255,65,0.1)] px-6 sm:px-10 py-5">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 sm:gap-5">
        <Link
          href="/docs"
          className="font-mono text-[9px] tracking-[0.18em] text-[rgba(224,224,224,0.35)] hover:text-[var(--accent)] transition-colors"
        >
          DOCS
        </Link>
        <a
          href="https://x.com/darkdrop_sol"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-[0.18em] text-[rgba(224,224,224,0.35)] hover:text-[var(--accent)] transition-colors"
        >
          TWITTER
        </a>
        <a
          href="https://github.com/hitman-kai/darkdropv4"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-[0.18em] text-[rgba(224,224,224,0.35)] hover:text-[var(--accent)] transition-colors"
        >
          GITHUB
        </a>
        <div className="h-3 w-px bg-[rgba(0,255,65,0.15)]" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-[rgba(224,224,224,0.2)]">PROGRAM</span>
        <span className="font-mono text-[11px] tracking-[0.04em] text-[rgba(224,224,224,0.35)]">
          GSig1QYV...AgkU
        </span>
        <div className="h-3 w-px bg-[rgba(0,255,65,0.15)]" />
        <span className="border border-[rgba(0,255,65,0.2)] px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] text-[rgba(0,255,65,0.4)]">V4 DEVNET</span>
        <div className="h-3 w-px bg-[rgba(0,255,65,0.15)]" />
        <span className="font-mono text-[9px] tracking-[0.12em] text-[rgba(224,224,224,0.2)]">UNAUDITED</span>
      </div>
    </footer>
  );
}
