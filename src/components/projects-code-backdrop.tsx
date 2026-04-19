"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const snippets = [
  `const monitor = await prisma.monitor.findUnique({
  where: { id: monitorId },
  include: { checks: { take: 20, orderBy: { createdAt: 'desc' } } }
})
const transition = resolveState(monitor.status, latestCheck)`,
  `const room = rooms.get(roomId) ?? createRoom(roomId)
const doc = new Y.Doc()
const provider = new WebsocketProvider(ws, roomId, doc)
provider.on('sync', () => console.log('crdt synced'))`,
  `pipeline.addStage('fetch', async (ctx) => {
  ctx.response = await fetch(ctx.monitor.url)
  ctx.latency = Date.now() - ctx.startTime
  return ctx
})`,
  `const job = await checksQueue.add('run-check', {
  monitorId,
  attempt: 1,
}, { delay: monitor.interval * 1000 })`,
];

export function ProjectsCodeBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.28, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="projects-code-mask absolute inset-x-1/2 top-12 h-[86%] w-[min(1120px,115vw)] -translate-x-1/2"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { y: isInView ? [0, -10, 0] : 0 }
          }
          transition={{
            duration: 32,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative h-full"
        >
          <div className="projects-code-vignette absolute inset-0" />
          {snippets.map((snippet, index) => (
            <pre
              key={snippet}
              className={[
                "projects-code-block absolute select-none whitespace-pre-wrap font-mono text-[0.76rem] leading-7 tracking-[-0.02em]",
                index === 0 && "left-[2%] top-[8%] w-[32rem] rotate-[-2.5deg]",
                index === 1 &&
                  "right-[3%] top-[22%] w-[29rem] rotate-[2deg]",
                index === 2 &&
                  "left-[14%] bottom-[18%] w-[26rem] rotate-[1.5deg]",
                index === 3 &&
                  "right-[16%] bottom-[8%] w-[24rem] rotate-[-1.8deg]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {snippet}
            </pre>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
