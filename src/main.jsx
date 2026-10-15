import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronDown, Clock3,
  Compass, ExternalLink, HeartHandshake, Leaf, Menu, Pause, Play, Printer,
  RefreshCcw, ShieldCheck, Sparkles, UsersRound, X, CircleHelp, GraduationCap,
  Volume2, BookMarked, Quote, Lightbulb, MoveRight, HandHeart, CalendarDays
} from "lucide-react";
import { lessons, promptSets, cases, references, agenda, comparisons } from "./content.js";
import { timingState, formatClock, speakerForRound, listenerForRound, totalRounds } from "./timer.js";
import "./styles.css";

const navItems = [
  ["/", "首页"], ["/learn", "系统课程"], ["/practice", "练习室"],
  ["/guide", "带领者"], ["/library", "研究文库"], ["/community", "共同体"],
];

function useRoute() {
  const getRoute = () => {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    const path = hash.split("?")[0];
    return navItems.some(([key]) => key === path) ? path : "/";
  };
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const update = () => { setRoute(getRoute()); window.scrollTo({ top: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}

const href = (path) => `#${path}`;
function Brand() {
  return <a className="brand" href={href("/")} aria-label="二人禅学习与实践中心，返回首页">
    <span className="brand-symbol" aria-hidden="true"><i /><i /></span>
    <span className="brand-name">二人禅 <small>DYAD ZEN</small></span>
  </a>;
}

function Header({ route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [route]);
  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <nav className={menuOpen ? "topnav is-open" : "topnav"} aria-label="网站主导航">
        {navItems.map(([path, title]) =>
          <a key={path} aria-current={route === path ? "page" : undefined} href={href(path)} onClick={() => setMenuOpen(false)}>{title}</a>
        )}
        <a className="nav-cta" href={href("/practice")} onClick={() => setMenuOpen(false)}>开始练习 <ArrowUpRight size={15} /></a>
      </nav>
      <button type="button" className="menu-toggle" aria-label={menuOpen ? "关闭菜单" : "打开菜单"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function SectionHeading({ eyebrow, title, children, centered = false }) {
  return <div className={centered ? "section-title center" : "section-title"}>
    <div className="eyebrow"><span className="eyebrow-rule" />{eyebrow}</div>
    <h2>{title}</h2>
    {children && <p className="section-lead">{children}</p>}
  </div>;
}
function ButtonLink({ to, children, light = false, secondary = false }) {
  return <a className={`btn ${light ? "btn-light" : ""} ${secondary ? "btn-secondary" : ""}`} href={href(to)}>{children}<ArrowUpRight size={17} /></a>;
}
function PageIntro({ eyebrow, title, description, extra }) {
  return <section className="page-intro"><div className="wrap">
    <div className="eyebrow"><span className="eyebrow-rule" />{eyebrow}</div>
    <h1>{title}</h1><p>{description}</p>{extra}
  </div><div className="page-intro-deco" aria-hidden="true"><i /><i /></div></section>;
}
function MiniNote({ children, kind = "info" }) {
  return <div className={`mini-note mini-note-${kind}`}><ShieldCheck size={21} /><p>{children}</p></div>;
}

function Home() {
  return <div>
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-rule" />DYAD ZEN · LEARNING & PRACTICE</div>
          <h1>在相遇中，<br /><em>更深地</em>认识自己。</h1>
          <p className="hero-description">二人禅，是在另一个人的专注聆听中，持续向内探寻的练习。在这里，我们不仅介绍一种方法，更陪你从第一次体验开始，慢慢建立属于自己的实践。</p>
          <div className="hero-actions"><ButtonLink to="/practice">开始第一次练习</ButtonLink><a className="inline-link" href={href("/learn")}>探索学习课程 <ArrowRight size={18}/></a></div>
          <div className="hero-footer"><span className="tiny-mark">○</span> 不急于给出答案 · 不替彼此解决 · 让真实慢慢浮现</div>
        </div>
        <div className="hero-art" aria-label="两个人相向而坐，中心留出一片安静的空间" role="img">
          <div className="art-glow" />
          <div className="art-ring ring-one"/><div className="art-ring ring-two"/>
          <div className="art-face art-left"><div className="art-head"/><div className="art-body"/></div>
          <div className="art-face art-right"><div className="art-head"/><div className="art-body"/></div>
          <div className="art-center"><span>倾 听</span><span className="art-center-line"/></div>
          <div className="art-caption">A SPACE BETWEEN US <span>·</span> 共同的静默</div>
        </div>
      </div>
      <div className="hero-index wrap"><span>01 / A different way of meeting</span><span>向内探寻 · 向外沟通</span></div>
    </section>

    <section className="promise-section soft-section"><div className="wrap promise-grid">
      <div><div className="eyebrow"><span className="eyebrow-rule"/>为什么要这样学习</div><h2 className="editorial-h2">理解，<br />始于亲身经历。</h2></div>
      <div className="promise-copy"><p>读过许多关于觉察的文字，不一定知道如何在真实关系中停下来。二人禅的学习，从一个简单的动作开始：一人带着问题向内接触，一人不评判地倾听。</p><p>本站以成人体验式学习为路径：先亲身感受，再反思发生了什么，理解其中的原则，随后重新尝试。</p><a className="inline-link" href={href("/learn")}>了解八课学习路径 <ArrowRight size={17}/></a></div>
    </div></section>

    <section className="journey-section"><div className="wrap">
      <SectionHeading eyebrow="你的学习之路" title="四步循环，让练习有方向">每一个步骤都可以慢慢来。你不需要特殊经验，也不需要向任何人证明自己的深度。</SectionHeading>
      <div className="journey-steps">
        {[
          ["01","体验","先亲身尝试","从一个小小的双人练习开始。",<Leaf/>],
          ["02","观察","留意发生了什么","看见自己的表达与倾听习惯。",<Compass/>],
          ["03","理解","回到方法与原典","辨明探问、角色、边界的意义。",<BookOpen/>],
          ["04","再实践","把领悟带回生活","尝试下一轮，也尝试不同的日常对话。",<HeartHandshake/>]
        ].map(([n,title,action,desc,icon])=><div className="journey-item" key={n}>
          <span className="journey-number">{n}</span><div className="journey-icon">{icon}</div>
          <h3>{title}</h3><strong>{action}</strong><p>{desc}</p>
        </div>)}
      </div>
    </div></section>

    <section className="door-section"><div className="wrap">
      <SectionHeading eyebrow="从这里开始" title="三个入口，一条属于你的路" centered>不管你是第一次接触，还是准备为别人带领练习，都有清楚的下一步。</SectionHeading>
      <div className="door-grid">
        <a className="door-card" href={href("/practice")}><div className="door-top"><span>01 · EXPERIENCE</span><Clock3 size={25}/></div><h3>我想先体验</h3><p>了解安全边界，打开计时器，与搭档完成一次温和的双人练习。</p><div className="door-bottom">走进练习室 <ArrowUpRight/></div></a>
        <a className="door-card" href={href("/learn")}><div className="door-top"><span>02 · LEARNING</span><BookOpen size={25}/></div><h3>我想系统学习</h3><p>跟随八个基础单元，从体验出发，逐步理解探寻与倾听的方法。</p><div className="door-bottom">查看系统课程 <ArrowUpRight/></div></a>
        <a className="door-card" href={href("/guide")}><div className="door-top"><span>03 · FACILITATION</span><UsersRound size={25}/></div><h3>我想学习带领</h3><p>学习如何维护结构、识别风险，以及在真实情境中作出恰当判断。</p><div className="door-bottom">进入带领者学院 <ArrowUpRight/></div></a>
      </div>
    </div></section>

    <section className="lineage-band"><div className="wrap lineage-band-grid">
      <div><span className="eyebrow light-eyebrow"><span className="eyebrow-rule"/>ROOTS & ADAPTATION</span><h2>尊重经典，<br />也尊重今天的学习者。</h2></div>
      <div><p>经典的 Enlightenment Intensive 由 Charles Berner 发展，典型形式包含三日密集静修，以及 40 分钟、每 5 分钟轮换角色的双人探寻。本站的四轮短练习是教学改编，并不等同于完整顿悟密集。</p><a className="inline-link light-link" href={href("/library")}>认识方法源流与研究边界 <ArrowRight size={17}/></a></div>
    </div></section>

    <section className="home-close"><div className="wrap"><div className="close-quote"><Quote size={30} strokeWidth={1}/><blockquote>有些答案，<br/>需要在真正被听见时，<em>才慢慢出现。</em></blockquote><p>我们不替彼此寻找答案，只共同守护探寻的空间。</p><ButtonLink to="/practice">开启第一次练习</ButtonLink></div></div></section>
  </div>;
}

function Learn() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dyadzen-completed-v1") || "[]"); } catch { return []; }
  });
  const selected = lessons[active];
  function toggleComplete() {
    const next = completed.includes(selected.id) ? completed.filter(id=>id!==selected.id) : [...completed,selected.id];
    setCompleted(next);
    try { localStorage.setItem("dyadzen-completed-v1", JSON.stringify(next)); } catch {}
  }
  return <>
    <PageIntro eyebrow="LEARNING · 系统课程" title={<>从第一次体验，<br/><em>走向持续操练。</em></>} description="八个基础单元，每一课都遵循体验、反思、理解、再尝试的循环。学习进度只保存在你自己的浏览器中。"/>
    <section className="learn-section"><div className="wrap">
      <div className="learn-overview"><div><span className="overline">基础课程 · 8 个单元</span><h2>不是从知识考试开始，<br/>而是从一次真实体验开始。</h2></div><div className="progress-card"><span>我的学习进度</span><strong>{completed.length}<small> / 08</small></strong><div className="progress-track"><span style={{width:`${completed.length / lessons.length * 100}%`}}/></div><p>进度仅储存在当前设备，不会上传。</p></div></div>
      <div className="curriculum">
        <aside className="lesson-list" aria-label="八节基础课程">{lessons.map((l,index)=><button type="button" key={l.id} className={active===index?"lesson-tab current":"lesson-tab"} onClick={()=>setActive(index)}>
          <span className="lesson-n">{completed.includes(l.id) ? <CheckCircle2 size={20}/> : l.id}</span><span><small>{l.theme} · {l.minutes} 分钟</small><strong>{l.title}</strong></span><ArrowUpRight size={17}/>
        </button>)}</aside>
        <article className="lesson-detail" key={selected.id}>
          <div className="lesson-detail-top"><span>LESSON {selected.id} / 08</span><span>{selected.minutes} MIN · EXPERIENCE-BASED</span></div>
          <h2>{selected.title}</h2><p className="lesson-intro">{selected.intro}</p>
          <div className="lesson-outcome"><Lightbulb size={19}/><p><strong>这节课希望你学会：</strong>{selected.outcome}</p></div>
          <div className="lesson-cycle">
            <div className="cycle-step"><span>01 / 先体验</span><h3>让身体先知道</h3><p>{selected.experience}</p></div>
            <div className="cycle-step"><span>02 / 再反思</span><h3>发生了什么？</h3><ul>{selected.reflect.map(q=><li key={q}>{q}</li>)}</ul></div>
            <div className="cycle-step"><span>03 / 理解原理</span><h3>回到方法</h3><p>{selected.concept}</p></div>
            <div className="cycle-step"><span>04 / 重新尝试</span><h3>带着发现，再来一次</h3><p>{selected.retry}</p></div>
          </div>
          <div className="lesson-actions"><button type="button" className="btn" onClick={toggleComplete}>{completed.includes(selected.id) ? "已标记完成 · 点击取消" : "标记本课已学习"} <Check size={17}/></button><a className="inline-link" href={href("/practice")}>去练习室 <ArrowRight size={17}/></a></div>
        </article>
      </div>
      <MiniNote>学习进度是个人自我记录，不是资格证明。课程不以突破性体验、情绪强度或固定时间内的“进步”作为评价标准。</MiniNote>
    </div></section>
  </>;
}

function Practice() {
  const [mode, setMode] = useState("gentle");
  const [promptType, setPromptType] = useState("gentle");
  const [prompt, setPrompt] = useState(promptSets[0].prompts[0]);
  const [consent, setConsent] = useState(false);
  const [showConsentConfirm, setShowConsentConfirm] = useState(false);
  const confirmButtonRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAtRef = useRef(null);
  const baseElapsedRef = useRef(0);
  const lastRoundRef = useRef(0);
  const audioRef = useRef(null);
  const [sound, setSound] = useState(true);
  const state = useMemo(()=>timingState(elapsed,mode),[elapsed,mode]);
  const currentSet = promptSets.find(s=>s.id===promptType);
  useEffect(()=>{
    if(showConsentConfirm) confirmButtonRef.current?.focus();
  },[showConsentConfirm]);
  useEffect(()=>{
    if (!running) return undefined;
    const id = window.setInterval(()=>{
      const elapsedNow = baseElapsedRef.current + (performance.now()-startedAtRef.current)/1000;
      setElapsed(Math.min(elapsedNow, timingState(Infinity,mode).totalSeconds));
    },120);
    return ()=>window.clearInterval(id);
  },[running,mode]);
  useEffect(()=>{
    if (state.roundIndex!==lastRoundRef.current && sound && running) {
      try {
        const Context = window.AudioContext || window.webkitAudioContext;
        if(Context){
          const ctx=audioRef.current || new Context();audioRef.current=ctx;
          const o=ctx.createOscillator();const gain=ctx.createGain();o.type="sine";o.frequency.value=660;
          gain.gain.setValueAtTime(0.0001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.12,ctx.currentTime+0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.30);o.connect(gain);gain.connect(ctx.destination);
          o.start();o.stop(ctx.currentTime+0.32);
        }
      }catch{}
    }
    lastRoundRef.current=state.roundIndex;
  },[state.roundIndex,sound,running]);
  useEffect(()=>{if(state.finished && running){setRunning(false);baseElapsedRef.current=state.totalSeconds;}},[state.finished,running,state.totalSeconds]);
  useEffect(()=>()=>{audioRef.current?.close?.().catch(()=>{});},[]);

  function startPause() {
    if(state.finished) return;
    if(running) {
      const current=baseElapsedRef.current+(performance.now()-startedAtRef.current)/1000;
      baseElapsedRef.current=current;setElapsed(current);setRunning(false);
    }else if(!consent){
      setShowConsentConfirm(true);
    }else {
      startedAtRef.current=performance.now();setRunning(true);
    }
  }
  function acceptAndStart() {
    setConsent(true);
    setShowConsentConfirm(false);
    startedAtRef.current=performance.now();
    setRunning(true);
  }
  function resetTimer() {setRunning(false);setElapsed(0);baseElapsedRef.current=0;startedAtRef.current=null;lastRoundRef.current=0;}
  function chooseMode(value) {if(running)return;setMode(value);resetTimer();}
  function choosePrompt(value,type) {if(running)return;setPrompt(value);setPromptType(type);resetTimer();}
  const setCount = totalRounds(mode);

  return <>
    <PageIntro eyebrow="PRACTICE · 练习室" title={<>让时间慢下来，<br/><em>让倾听发生。</em></>} description="一份清楚的协议、一个固定探问、两个人与一段完整的时间。计时器只负责结构，不记录声音或谈话内容。"/>
    <section className="practice-section"><div className="wrap">
      <MiniNote kind="warning">开始之前：此练习完全自愿。任何一方都可随时停止，无需解释。若正经历严重惊恐、失联、急性危机或自伤风险，请不要通过本工具独自处理，应寻求可靠的现实与专业支持。</MiniNote>
      <div className="practice-layout">
        <div className="practice-settings">
          <div className="panel-label">01 / 选择练习结构</div>
          <div className="mode-options">
            <button type="button" className={mode==="gentle"?"mode-card selected":"mode-card"} aria-pressed={mode==="gentle"} onClick={()=>chooseMode("gentle")} disabled={running}><small>日常教学改编</small><strong>温和入门</strong><span>5 分钟 × 4 轮 · 20 分钟</span></button>
            <button type="button" className={mode==="classic"?"mode-card selected":"mode-card"} aria-pressed={mode==="classic"} onClick={()=>chooseMode("classic")} disabled={running}><small>经典形式参考</small><strong>结构演示</strong><span>5 分钟 × 8 轮 · 40 分钟</span></button>
          </div>
          {mode==="classic"&&<p className="settings-hint">仅用于认识经典轮换结构，不是完整的三日 Enlightenment Intensive；较深入的练习宜在有经验的带领者支持下进行。</p>}
          <div className="panel-label">02 / 选择一个探问</div>
          <div className="prompt-types">{promptSets.map(s=><button type="button" aria-pressed={promptType===s.id} className={promptType===s.id?"pill active":"pill"} disabled={running} onClick={()=>{setPromptType(s.id);setPrompt(s.prompts[0]);resetTimer();}} key={s.id}>{s.label}</button>)}</div>
          <p className="prompt-note">{currentSet.note}</p>
          <div className="prompt-choices">{currentSet.prompts.map(q=><button type="button" key={q} disabled={running} className={prompt===q?"prompt-choice active":"prompt-choice"} onClick={()=>choosePrompt(q,currentSet.id)}><span>{q}</span>{prompt===q?<CheckCircle2 size={18}/>:<span className="choice-circle"/>}</button>)}</div>
          <div className="panel-label">03 / 确认双方的共同约定</div>
          <label className="consent"><input type="checkbox" checked={consent} disabled={running} onChange={e=>{setConsent(e.target.checked);if(e.target.checked)setShowConsentConfirm(false);}}/><span>我们自愿参与，尊重保密、沉默、暂停和退出的权利；不分析、不建议、不逼迫对方揭露私人经历。</span></label>
          <div className="settings-bottom"><label className="sound-choice"><input type="checkbox" checked={sound} onChange={e=>setSound(e.target.checked)}/><Volume2 size={18}/> 换位轻提示音</label><button type="button" className="text-button" onClick={()=>window.print()}><Printer size={17}/>打印练习指引</button></div>
        </div>

        <div className="timer-shell" aria-label="双人练习计时器">
          <div className="timer-header"><span><span className="status-dot"/> {state.finished?"已完成":"正在准备 / 练习中"}</span><span>{mode==="classic"?"经典轮换结构参考":"温和入门"}</span></div>
          <div className="timer-role-row"><span>第 {state.roundIndex+1} / {setCount} 轮</span><span>{speakerForRound(state.roundIndex)} 表达 · {listenerForRound(state.roundIndex)} 倾听</span></div>
          <div className="clock-display" aria-live="off">{formatClock(state.remaining)}</div>
          <div className="timer-progress"><span style={{width:`${state.elapsed/state.totalSeconds*100}%`}}/></div>
          <div className="timer-focus"><span>这一轮的探问</span><h2>“{prompt}”</h2><p>倾听者先给出一次明确指令；表达者向内探寻并沟通所出现的内容。倾听者不评价，换位时简短说“谢谢”。</p></div>
          <div className="timer-actions"><button type="button" className="timer-main-btn" disabled={state.finished} onClick={startPause}>{running?<Pause size={19}/>:<Play size={19}/>} {state.finished?"练习已完成":running?"暂停练习":"开始 / 继续"}</button><button type="button" className="timer-reset" onClick={()=>{resetTimer();setShowConsentConfirm(false);}}><RefreshCcw size={18}/><span>重置</span></button></div>
          {showConsentConfirm&&!consent&&<div className="consent-confirm-backdrop">
            <div className="consent-confirm" role="dialog" aria-modal="true" aria-labelledby="consent-confirm-heading" onKeyDown={e=>{if(e.key==="Escape")setShowConsentConfirm(false);}}>
            <strong id="consent-confirm-heading">开始前，请与搭档确认共同约定</strong>
            <p>双方自愿参与；尊重保密、沉默、暂停和退出的权利；不分析或逼迫对方表达。确认后计时器立即开始。</p>
            <div className="consent-confirm-actions">
              <button type="button" ref={confirmButtonRef} onClick={acceptAndStart}>已确认，开始练习</button>
              <button type="button" onClick={()=>setShowConsentConfirm(false)}>暂不开始</button>
            </div>
            </div>
          </div>}
          {!consent&&!showConsentConfirm&&<p className="timer-hint">点击「开始 / 继续」后可直接确认约定；也可以先勾选左侧的共同约定。</p>}
          {state.finished&&<p className="timer-hint">练习已结束。请先留出至少 3 分钟安静整合，再恢复日常活动。</p>}
          <div className="timer-turns">{Array.from({length:setCount},(_,i)=><span key={i} className={i<state.roundIndex||state.finished?"past":i===state.roundIndex?"present":""}>{i+1}</span>)}</div>
        </div>
      </div>

      <div className="integration-section"><SectionHeading eyebrow="AFTER THE PRACTICE" title="真正的学习，发生在练习之后。">留出一点安静，不急着讨论对方，更不用解释或评价彼此的体验。</SectionHeading>
        <div className="integration-grid">{[["身体","此刻身体里有什么变化？"],["表达","我何时开始解释、表演或保护自己？"],["倾听","我什么时候最想给建议？"],["生活","我愿意把什么小小的发现带回今天？"]].map(([t,p],i)=><div className="integration-card" key={t}><span>0{i+1} / {t}</span><p>{p}</p></div>)}</div>
        <p className="privacy-line"><ShieldCheck size={16}/> 本站不会保存你的探问内容、录音或复盘文字。你可以自己在纸上书写，也可以选择不记录。</p>
      </div>
    </div></section>
  </>;
}

function Guide() {
  const [answers, setAnswers] = useState({});
  return <>
    <PageIntro eyebrow="FACILITATION · 带领者" title={<>学习方法，<br/><em>也学习护持空间。</em></>} description="成熟的带领不是催促别人深入，而是守护同意、结构、节奏和安全。先从一场短时体验与真实情境判断开始。"/>
    <section className="guide-section"><div className="wrap">
      <SectionHeading eyebrow="40-MINUTE WORKSHOP" title="可以直接使用的初次体验流程">以下为本站教学改编，不是经典顿悟密集的缩短版。带领者应了解适合性筛选与安全边界。</SectionHeading>
      <div className="agenda-layout"><div className="agenda-list">{agenda.map(([time,title,description],i)=><div className="agenda-row" key={time}><div className="agenda-time">{time}<small>分钟</small></div><div className="agenda-marker"><span>{i+1}</span></div><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
        <aside className="script-card"><span>开场时，可以这样说</span><Quote size={33} strokeWidth={1}/><blockquote>“我们不是来回答一个正确的问题，也不是要把对方修理好。你只需接触此刻真实发生的内容，另一个人安静地陪伴。每个人都有暂停和退出的权利。”</blockquote><strong>带领的两条底线</strong><p>不让方法压过人的自主权；不把强烈情绪或特殊经验当作成果。</p><button type="button" className="print-btn" onClick={()=>window.print()}><Printer size={17}/> 打印这份带领提纲</button></aside></div>
      <div className="guide-divider"/>
      <SectionHeading eyebrow="SCENARIO LAB" title="在有张力的时刻，你会怎样回应？">选择你认为最妥当的处理方式，观察解释背后的方法原则。这是练习判断，不是认证测验。</SectionHeading>
      <div className="case-grid">{cases.map((c,index)=><article className="case-card" key={c.title}><span className="case-num">情境 0{index+1}</span><h3>{c.title}</h3><p className="case-scene">{c.scene}</p><h4>{c.question}</h4><div className="case-options">{c.options.map((opt,i)=><button key={opt} type="button" className={answers[index]===i?"selected":""} onClick={()=>setAnswers(p=>({...p,[index]:i}))}><span>{String.fromCharCode(65+i)}</span>{opt}</button>)}</div>{answers[index]!==undefined&&<div className={answers[index]===c.answer?"case-feedback good":"case-feedback"}><strong>{answers[index]===c.answer?"这是较稳妥的选择":"可以再想一想"}</strong><p>{c.feedback}</p></div>}</article>)}</div>
      <div className="facilitator-footer"><div><h3>带领前检查清单</h3><p>在每一次练习之前，比深度更重要的是清楚与同意。</p></div><ul>{["向每个人说明方法和本次改编的边界","确认自愿、保密、暂停权与退出权","准备非强迫性的分组及替代参与方式","交代时间、角色、指令与换位流程","知道何时应当停止、支持或转介","留出结束后的安静整合时间"].map(s=><li key={s}><CheckCircle2 size={18}/>{s}</li>)}</ul></div>
    </div></section>
  </>;
}

function Library() {
  const [filter, setFilter] = useState("全部");
  const types=["全部",...new Set(references.map(r=>r.type))];
  const filtered = references.filter(r=>filter==="全部"||r.type===filter);
  return <>
    <PageIntro eyebrow="LIBRARY · 研究文库" title={<>从原典出发，<br/><em>尊重方法的来处。</em></>} description="区分经典原典、当代实践、教学改编与尚待验证的解释。我们愿意对资料的来源负责，也对每个参与者的真实经验保持谦逊。"/>
    <section className="library-section"><div className="wrap">
      <SectionHeading eyebrow="CLASSICAL & GENTLE" title="经典顿悟密集，与本站入门练习">两者都珍惜直接探寻与安静接收，但目标、强度、组织条件并不相同。</SectionHeading>
      <div className="compare-grid"><div className="compare-card deep"><span>ENLIGHTENMENT INTENSIVE</span><h3>经典顿悟密集</h3><p>Charles Berner 在 20 世纪 60 年代创立。典型为三日密集静修，以“我是谁”等根本探问持续进行，双人练习常采用 40 分钟、每 5 分钟换位的结构。</p><strong>目的：直接探寻生命的根本问题。</strong></div><div className="compare-card"><span>GENTLE DYAD PRACTICE</span><h3>本站温和改编</h3><p>将聚焦、探问、沟通与轮换转化成有清楚边界的短时练习，帮助初学者体验倾听与表达。</p><strong>目的：学习稳定、可整合的日常实践。</strong></div></div>
      <div className="principle-strip">{[["聚焦","Focus"],["意向","Intention"],["开放","Openness"],["沟通","Communication"]].map(([cn,en],i)=><div key={cn}><small>0{i+1}</small><strong>{cn}</strong><span>{en}</span></div>)}</div>
      <SectionHeading eyebrow="ORIGINAL SOURCES" title="阅读资料，而不是只相信总结">下列为公开可查的资料入口。原典中的精神性目标是其传统自身的表达，不应误写成普遍已证实的心理治疗效果。</SectionHeading>
      <div className="filter-row" aria-label="按文献类别筛选">{types.map(t=><button type="button" key={t} onClick={()=>setFilter(t)} className={filter===t?"active":""}>{t}</button>)}</div>
      <div className="refs-grid">{filtered.map(r=><a className="ref-card" key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"><div className="ref-header"><span>{r.type}</span><ArrowUpRight size={19}/></div><h3>{r.title}</h3><small>{r.author}</small><p>{r.description}</p><div>{r.status} · 查看来源 ↗</div></a>)}</div>
      <SectionHeading eyebrow="METHOD DISTINCTION" title="和信任圈：相遇，却不混同">两者都重视不替他人作答的关系伦理，但不能将它们视为同一套技术。</SectionHeading>
      <div className="comparison-table" role="table" aria-label="二人禅与信任圈的比较"><div role="row" className="comparison-head"><span role="columnheader">比较维度</span><span role="columnheader">二人禅</span><span role="columnheader">信任圈</span></div>{comparisons.map(([label,dyad,circle])=><div role="row" key={label}><strong role="cell">{label}</strong><span role="cell">{dyad}</span><span role="cell">{circle}</span></div>)}</div>
      <MiniNote>研究诚实：练习者的主观报告可以帮助理解经验，但不能单独证明普遍疗效。本站目前不提供临床效果或“必然顿悟”的承诺；不同流派的细节也应依原文和版本核对。</MiniNote>
    </div></section>
  </>;
}

function Community() {
  return <>
    <PageIntro eyebrow="COMMUNITY · 持续练习" title={<>一起练习，<br/><em>也保留各自的空间。</em></>} description="二人禅不是一次体验的热闹。我们希望慢慢形成一个尊重边界、可以持续参与的学习共同体。"/>
    <section className="community-section"><div className="wrap">
      <div className="community-message"><span className="eyebrow"><span className="eyebrow-rule"/>A QUIET COMMUNITY</span><h2>愿每一次相遇，<br/>都让人更有能力<br/><em>听见自己。</em></h2><p>可以从认识一位练习搭档开始，再加入小组的定期操练。我们珍惜线下真实的相遇，也欢迎异地学习者使用公开课程与练习工具。</p></div>
      <div className="community-grid">
        <article><span>01 / TWO PEOPLE</span><HandHeart size={29}/><h3>找一位可靠的搭档</h3><p>优先选择愿意尊重隐私和边界的人。练习前确认彼此的意图，不把练习变成关系谈判。</p></article>
        <article><span>02 / ONE RHYTHM</span><CalendarDays size={29}/><h3>建立轻量而稳定的节奏</h3><p>从每周一次的温和练习开始。练习后注意休息、整合，不以次数或深度互相比较。</p></article>
        <article><span>03 / LEARN TO HOLD</span><GraduationCap size={29}/><h3>从参与者走向带领者</h3><p>先积累自己的练习经验，学习方法与风险边界，再通过观察、合作带领和同行反馈提升能力。</p></article>
      </div>
      <div className="community-contact"><div><span>关于线下与线上活动</span><h3>活动日程将以实际发布为准。</h3><p>本站尚未开通自动报名或账号系统。需要了解实践活动，可通过现有联系渠道询问；也可以先免费使用课程与练习室。</p></div><div><a className="btn" target="_blank" rel="noopener noreferrer" href="https://zcnv8lc63v15.feishu.cn/docx/ENSjdAKhOoDiIUxOQJycdzD8nSe">联系组织者 <ExternalLink size={18}/></a><a className="inline-link" href={href("/practice")}>先开始自己的练习 <ArrowRight size={17}/></a></div></div>
    </div></section>
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap"><div className="footer-top"><div><Brand/><p>在相遇中探寻 · 在静默中聆听<br/>让体验成为理解，让理解回到生活。</p></div><div className="footer-col"><strong>继续探索</strong><a href={href("/learn")}>基础八课</a><a href={href("/practice")}>双人练习室</a><a href={href("/guide")}>带领者学院</a></div><div className="footer-col"><strong>研究与链接</strong><a href={href("/library")}>原典与资源</a><a href={href("/community")}>练习共同体</a><a href="https://choosemiracle.github.io/dyad/" target="_blank" rel="noopener noreferrer">访问旧版网站 ↗</a></div></div><div className="footer-bottom"><span>© 2026 二人禅学习与实践中心 · Dyad Zen</span><span>学习与实践资源 · 不替代心理治疗 · 尊重自主与保密</span></div></div></footer>;
}

function App() {
  const route=useRoute();
  return <><a className="skip-link" href="#main">跳转到正文</a><Header route={route}/><main id="main">{route==="/learn"?<Learn/>:route==="/practice"?<Practice/>:route==="/guide"?<Guide/>:route==="/library"?<Library/>:route==="/community"?<Community/>:<Home/>}</main><Footer/></>;
}

createRoot(document.getElementById("root")).render(<App/>);
