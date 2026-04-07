import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center" style={{ paddingTop: "52px" }}>
        <div className="relative mx-auto w-full max-w-4xl px-5 sm:px-10 py-12 sm:py-20">
          <div className="absolute left-5 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,255,65,0.2)] to-transparent" />

          <p className="mb-8 pl-4 sm:pl-6 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-[rgba(0,255,65,0.4)]">
            OUTPUT // 0X00 — UNLINKABLE SOLANA TRANSFERS
          </p>

          <h1 className="mb-6 pl-4 sm:pl-6 font-mono text-[clamp(28px,5vw,64px)] font-light leading-[1.1] tracking-tight text-[var(--text)]">
            Zero-knowledge<br />
            <span className="text-[var(--accent)]">dead drops.</span>
          </h1>

          <p className="mb-10 pl-4 sm:pl-6 max-w-md text-xs sm:text-sm leading-relaxed text-[rgba(224,224,224,0.5)]">
            No decoded amounts in the claim transaction.<br />
            No inner instructions on withdrawal.<br />
            Sender and receiver never linked on-chain.
          </p>

          <div className="mb-12 flex flex-wrap gap-3 pl-4 sm:pl-6">
            <Link
              href="/drop/create"
              className="border border-[var(--accent)] bg-[var(--accent)] px-5 sm:px-7 py-3 font-mono text-[10px] font-medium tracking-[0.2em] !text-black transition-all hover:bg-[#33ff66] hover:shadow-[0_0_24px_rgba(0,255,65,0.25)]"
            >
              CREATE DROP
            </Link>
            <Link
              href="/drop/claim"
              className="border border-[rgba(0,255,65,0.25)] px-5 sm:px-7 py-3 font-mono text-[10px] tracking-[0.2em] text-[rgba(224,224,224,0.6)] transition-all hover:border-[rgba(0,255,65,0.5)] hover:text-[var(--text)]"
            >
              CLAIM DROP
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px border border-[rgba(0,255,65,0.1)] bg-[rgba(0,255,65,0.06)] md:grid-cols-3 ml-4 sm:ml-6">
            <div className="bg-[#000] p-5 sm:p-7 transition-colors hover:bg-[#050505]">
              <p className="mb-4 font-mono text-[9px] tracking-[0.3em] text-[rgba(224,224,224,0.2)]">STEP 01</p>
              <p className="mb-3 font-mono text-[16px] font-medium tracking-[0.12em] text-[var(--accent)]">DEPOSIT</p>
              <p className="text-xs leading-relaxed text-[rgba(224,224,224,0.5)]">SOL enters the Merkle vault. You receive a claim code. Share it however you want.</p>
            </div>
            <div className="bg-[#000] p-5 sm:p-7 transition-colors hover:bg-[#050505]">
              <p className="mb-4 font-mono text-[9px] tracking-[0.3em] text-[rgba(224,224,224,0.2)]">STEP 02</p>
              <p className="mb-3 font-mono text-[16px] font-medium tracking-[0.12em] text-[var(--accent)]">CLAIM</p>
              <p className="text-xs leading-relaxed text-[rgba(224,224,224,0.5)]">ZK proof verified on-chain. Credit note created. Zero SOL moves. Zero amounts visible.</p>
            </div>
            <div className="bg-[#000] p-5 sm:p-7 transition-colors hover:bg-[#050505]">
              <p className="mb-4 font-mono text-[9px] tracking-[0.3em] text-[rgba(224,224,224,0.2)]">STEP 03</p>
              <p className="mb-3 font-mono text-[16px] font-medium tracking-[0.12em] text-[var(--accent)]">WITHDRAW</p>
              <p className="text-xs leading-relaxed text-[rgba(224,224,224,0.5)]">SOL arrives via direct lamport manipulation. No Transfer instruction. No inner CPI. Credit note destroyed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
