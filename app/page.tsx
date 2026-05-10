"use client";

import { useMemo, useState } from "react";

type ViewMode = "intro" | "main" | "forest" | "final";

type Card = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
};

const cards: Card[] = [
  { id: 1, title: "Memory Player", subtitle: "for mom", content: "你总是能把我的焦虑，变成一句轻松的话。", image: "/images/mom-1.jpg" },
  { id: 2, title: "Doodle Board", subtitle: "little notes", content: "你教我审美，也教我判断。", image: "/images/mom-2.jpg" },
  { id: 3, title: "Mini Diary", subtitle: "May 10", content: "谢谢你一直做你自己，也让我敢做自己。", image: "/images/mom-3.jpg" },
  { id: 4, title: "Mood Panel", subtitle: "soft stars", content: "温柔和锋芒，可以同时存在。", image: "/images/mom-4.jpg" },
];

const blessingPool = [
  "愿你每天都被温柔包围，像光照进森林一样。",
  "妈妈，今天也请你只负责快乐。",
  "你是我人生里最坚定也最柔软的力量。",
  "愿你永远有勇气做自己，像现在这样闪闪发光。",
  "谢谢你把爱变成了我看世界的方式。",
  "愿所有美好都向你靠近，像蝴蝶向光而来。",
];

export default function Home() {
  const [mode, setMode] = useState<ViewMode>("intro");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeBlessing, setActiveBlessing] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  const codeCols = useMemo(() => Array.from({ length: 34 }, (_, i) => i), []);

  const butterflies = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: 12 + Math.random() * 70,
        left: 5 + Math.random() * 88,
        size: 30 + Math.random() * 40,
        delay: Math.random() * 4,
        dur: 6 + Math.random() * 6,
        blessing: blessingPool[i % blessingPool.length],
      })),
    []
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tx = (0.5 - py) * 10;
    const ty = (px - 0.5) * 10;
    setTilt({ x: tx, y: ty });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // ===== Intro =====
  if (mode === "intro") {
    return (
      <main className="kaleiPage">
        <div className="inkBg" />
        <div className="bgRings">
          <div className="bigRing r1" />
          <div className="bigRing r2" />
          <div className="bigRing r3" />
        </div>

        <section className="heroKalei">
          <div
            className="flowerFrame introScale"
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            style={
              {
                "--tiltX": `${tilt.x}deg`,
                "--tiltY": `${tilt.y}deg`,
              } as React.CSSProperties
            }
          >
            <div className="petalRing slowRotate">
              {petals.map((i) => (
                <div key={i} className="petalSlot" style={{ ["--i" as string]: i } as React.CSSProperties}>
                  <div className="petalDog">
                    {i % 3 === 0 && <img src="/characters/dog-front.svg" alt="" />}
                    {i % 3 === 1 && <img src="/characters/dog-side.svg" alt="" />}
                    {i % 3 === 2 && <img src="/characters/dog-back.svg" alt="" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="coreMirror spinReverse">
              <div className="coreLayer" />
              <div className="coreLayer small" />
            </div>
          </div>

          <div className="storyLayer">
            <img src="/characters/flower-real.svg" className="storyFlower" alt="" />
            <img src="/characters/dog-front.svg" className="storyDogFront" alt="" />
          </div>

          <h1 className="titleRed">Mom 's Universe</h1>
          <p className="sub">a gift for Mother&apos;s Day</p>

          <button className="enterBtn" onClick={() => setMode("main")}>
            Enter
          </button>
        </section>
      </main>
    );
  }

  // ===== Forest =====
 if (mode === "forest") {
  return (
    <main className="forestPage">
      {/* 森林背景层 */}
      <div className="forestBackGlow" />
      <div className="forestCanopy" />
      <div className="forestTrunks" />
      <div className="forestMist" />

      {/* 三层竖排 code rain */}
      <div className="codeRainWrap back">
        {codeCols.map((c) => (
          <div
            key={`b-${c}`}
            className="codeCol vertical"
            style={
              {
                left: `${(c / codeCols.length) * 100}%`,
                animationDelay: `${(c % 7) * 0.4}s`,
                animationDuration: `${11 + (c % 4)}s`,
                opacity: 0.12 + ((c % 4) * 0.04),
              } as React.CSSProperties
            }
          >
            {"love you ".repeat(26)}
          </div>
        ))}
      </div>

      <div className="codeRainWrap mid">
        {codeCols.map((c) => (
          <div
            key={`m-${c}`}
            className="codeCol vertical"
            style={
              {
                left: `${(c / codeCols.length) * 100}%`,
                animationDelay: `${(c % 8) * 0.32}s`,
                animationDuration: `${8 + (c % 5)}s`,
                opacity: 0.2 + ((c % 4) * 0.07),
              } as React.CSSProperties
            }
          >
            {"love you ".repeat(32)}
          </div>
        ))}
      </div>

      <div className="codeRainWrap front">
        {codeCols.map((c) => (
          <div
            key={`f-${c}`}
            className="codeCol vertical"
            style={
              {
                left: `${(c / codeCols.length) * 100}%`,
                animationDelay: `${(c % 9) * 0.26}s`,
                animationDuration: `${6 + (c % 4)}s`,
                opacity: 0.28 + ((c % 4) * 0.1),
              } as React.CSSProperties
            }
          >
            {"love you ".repeat(34)}
          </div>
        ))}
      </div>

      {/* 蝴蝶层（更写实） */}
      <div className="butterflyLayer realistic">
        {butterflies.map((b) => (
          <button
            key={b.id}
            className="butterflyReal"
            style={
              {
                top: `${b.top}%`,
                left: `${b.left}%`,
                width: `${b.size}px`,
                height: `${(b.size * 0.78)}px`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.dur}s`,
                ["--floatAmp" as string]: `${8 + (b.id % 4) * 4}px`,
              } as React.CSSProperties
            }
            onClick={() => setActiveBlessing(b.blessing)}
          >
            <img src="/characters/butterfly-glow.svg" alt="" />
          </button>
        ))}
      </div>

      <div className="forestTopBar">
        <button className="pill" onClick={() => setMode("final")}>
  进入最后一页
</button>
      </div>

      <div className="forestTitle glass">
        <h2>Electronic Butterfly Forest</h2>
        <p>点击蝴蝶，收下一句祝福。</p>
      </div>

      {activeBlessing && (
        <div className="modal" onClick={() => setActiveBlessing(null)}>
          <div className="imgCard blessingCard" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setActiveBlessing(null)}>
              关闭
            </button>
            <h3>For Mom</h3>
            <p>{activeBlessing}</p>
          </div>
        </div>
      )}
    </main>
  );
}
if (mode === "final") {
  return (
    <main className="finalSketchPage">
      <div className="paperNoise" />

      <section className="sketchWrap">
      <svg className="momDaughterSketch" viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {/* ===== 母亲（左）：方脸、披肩发、眼镜 ===== */}
    {/* 头发外轮廓 */}
    <path className="draw d1" d="M214 212C196 248 196 304 212 350C222 378 240 402 258 422" />
    <path className="draw d2" d="M438 214C454 252 456 306 442 352C432 382 414 404 396 424" />
    <path className="draw d3" d="M232 206C252 176 292 160 332 164C372 168 406 188 420 216" />

    {/* 脸型（偏方） */}
    <path className="draw d4" d="M248 232C232 258 232 302 248 328C264 356 308 366 346 360C384 354 410 328 414 294C418 262 404 234 378 218C350 200 272 202 248 232Z" />

    {/* 五官+眼镜 */}
    <path className="draw d5" d="M284 276C292 268 308 268 316 276C308 284 292 284 284 276Z" />
    <path className="draw d6" d="M334 276C342 268 358 268 366 276C358 284 342 284 334 276Z" />
    <path className="draw d7" d="M316 276H334" />
    <path className="draw d8" d="M324 296C328 300 334 300 338 296" />
    <path className="draw d9" d="M318 314C326 322 338 322 346 314" />

    {/* 颈部 */}
    <path className="draw d10" d="M312 360C312 374 312 386 314 398" />
    <path className="draw d11" d="M342 360C342 374 342 386 340 398" />

    {/* 上身外套轮廓 */}
    <path className="draw d12" d="M248 428C252 488 258 552 266 606" />
    <path className="draw d13" d="M404 428C398 490 392 554 386 606" />
    <path className="draw d14" d="M274 426C300 408 350 408 380 424" />
    <path className="draw d15" d="M302 438C298 492 298 548 304 602" />
    <path className="draw d16" d="M352 438C356 494 356 548 350 604" />

    {/* 手臂与手 */}
    <path className="draw d17" d="M252 462C220 484 212 520 226 544" />
    <path className="draw d18" d="M224 544C232 552 244 552 250 544" />
    <path className="draw d19" d="M404 458C432 478 442 510 432 534" />
    <path className="draw d20" d="M426 536C418 544 408 544 402 536" />

    {/* ===== 女儿（右）：鹅蛋脸、及腰卷发、不戴眼镜 ===== */}
    {/* 头发外轮廓（更柔软卷） */}
    <path className="draw d21" d="M560 224C534 262 526 322 546 380C558 414 580 440 598 458" />
    <path className="draw d22" d="M782 226C808 264 816 324 796 382C784 418 760 442 742 460" />
    <path className="draw d23" d="M582 214C604 184 644 170 684 174C724 178 756 196 772 222" />

    {/* 脸型（鹅蛋） */}
    <path className="draw d24" d="M598 244C582 268 582 306 596 334C612 364 654 372 688 364C722 356 744 332 748 302C752 270 738 244 714 228C692 214 616 216 598 244Z" />

    {/* 五官（无眼镜） */}
    <path className="draw d25" d="M634 280C640 286 648 286 654 280" />
    <path className="draw d26" d="M676 280C682 286 690 286 696 280" />
    <path className="draw d27" d="M664 300C668 304 674 304 678 300" />
    <path className="draw d28" d="M656 318C664 324 676 324 684 318" />

    {/* 颈部 */}
    <path className="draw d29" d="M648 366C648 380 648 392 650 404" />
    <path className="draw d30" d="M678 366C678 380 678 392 676 404" />

    {/* 上身与裙装 */}
    <path className="draw d31" d="M590 432C594 494 600 556 608 610" />
    <path className="draw d32" d="M742 432C736 494 730 558 724 610" />
    <path className="draw d33" d="M614 432C636 418 682 418 716 430" />
    <path className="draw d34" d="M618 488C644 478 680 478 710 488" />
    <path className="draw d35" d="M614 544C642 534 682 534 714 544" />

    {/* 手臂与手 */}
    <path className="draw d36" d="M590 470C560 492 550 526 564 550" />
    <path className="draw d37" d="M562 550C570 558 582 558 588 550" />
    <path className="draw d38" d="M742 468C772 488 782 522 770 546" />
    <path className="draw d39" d="M766 546C758 554 748 554 742 546" />

    {/* 牵手（动作自然） */}
    <path className="draw d40" d="M402 500C452 510 520 510 564 500" />
    <path className="draw d41" d="M564 500C572 504 578 510 580 518" />
  </g>

  {/* 局部深蓝（衣服点缀，保留图2感觉） */}
  <g fill="#1B3F8E" opacity="0.92">
    <path className="fillDraw f1" d="M308 440C322 438 338 438 352 442C350 470 350 498 354 526C338 528 322 528 306 526C310 498 312 468 308 440Z" />
    <path className="fillDraw f2" d="M638 448C656 444 682 444 700 450C698 482 698 516 704 548C682 550 654 550 634 546C640 516 642 482 638 448Z" />
  </g>
</svg>

        <div className="finalWords">

          <button className="pill" onClick={() => setMode("main")}>回到主页面</button>
        </div>
      </section>
    </main>
  );
}
  // ===== Main =====
  return (
    <main className="mainPage">
      <section className="page">
        <header className="topBar">
          <div className="dotGroup"><span /><span /><span /></div>
          <p>Cherry girl. OS</p>
          <div className="heartsGhost">♡ ♡ ♡</div>
        </header>

        <section className="grid">
          {cards.map((c) => (
            <article className="windowCard" key={c.id} onClick={() => setActiveImage(c.image)}>
              <div className="windowHead">
                <span>{c.title}</span>
                <div className="rateHearts" onClick={(e) => e.stopPropagation()}>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      className={ratings[c.id] >= n ? "heart on" : "heart"}
                      onClick={() => setRatings((prev) => ({ ...prev, [c.id]: n }))}
                      type="button"
                    >
                      ♥
                    </button>
                  ))}
                </div>
              </div>

              <div className="windowBody">
                <p className="sub2">{c.subtitle}</p>
                <p>{c.content}</p>
                <div className="line" />
                <div className="icons">
                  <img src="/doodles/smile.svg" alt="" />
                  <img src="/doodles/star.svg" alt="" />
                  <img src="/doodles/flower.svg" alt="" />
                </div>
                <button
                  className="viewBtn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(c.image);
                  }}
                >
                  查看图片
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="ending">
          <h2>Happy Mother&apos;s Day, my first cool girl.</h2>
          <p>谢谢你，一直让我觉得世界是明亮的。</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="pill" onClick={() => setMode("intro")}>Replay Opening</button>
            <button className="pill" onClick={() => setMode("forest")}>进入森林</button>
          </div>
        </section>
      </section>

      {activeImage && (
        <div className="modal" onClick={() => setActiveImage(null)}>
          <div className="imgCard" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setActiveImage(null)}>关闭</button>
            <img src={activeImage} alt="memory" className="photo" />
          </div>
        </div>
      )}
    </main>
  );
}
