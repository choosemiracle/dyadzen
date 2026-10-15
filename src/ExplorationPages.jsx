import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, BookMarked, CheckCircle2, Clock3, Compass, HeartHandshake, Layers3, PauseCircle, ShieldCheck, UsersRound, Quote, Lightbulb } from "lucide-react";
import { historyStages, historyReferences, nvcFour, nvcCases, nvcAgenda, nvcReferences } from "./history-nvc-content.js";
import "./exploration.css";

function scrollSection(event, id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Intro({ eyebrow, title, subtitle }) {
  return <section className="exp-intro"><div className="wrap exp-intro-inner">
    <span className="exp-eyebrow"><span />{eyebrow}</span>
    <h1>{title}</h1><p>{subtitle}</p>
  </div><div className="exp-intro-circles" aria-hidden="true"><i/><i/><i/></div></section>;
}

function Heading({ eyebrow, title, children }) {
  return <div className="exp-heading" data-reveal><span className="exp-eyebrow"><span/>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function ExpImage({ name, alt, caption, className = "" }) {
  return <figure className={"exp-figure " + className} data-reveal>
    <a href={import.meta.env.BASE_URL + "illustrations/" + name} target="_blank" rel="noopener noreferrer" title="打开大图查看细节" aria-label={"打开图解大图：" + alt}>
      <img loading="lazy" decoding="async" src={import.meta.env.BASE_URL + "illustrations/" + name} alt={alt}/>
    </a>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function Bibliography({ items, caption }) {
  return <section className="exp-bibliography"><Heading eyebrow="SOURCE NOTES · 文献出处" title={caption || "查阅资料，保留判断"}>本专题用公开资料核对历史与概念；文献中的体验叙述是实践者的观点，不应直接视为已证实的普遍效果。</Heading>
    <div className="exp-source-list">{items.map((s, i) => <a className="exp-source" key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"><div className="exp-source-mark">{String(i+1).padStart(2,"0")}</div><div><span>{s.label || s.author}</span><h3>{s.title}</h3><p>{s.description || s.note}</p></div><ArrowUpRight size={19}/></a>)}</div>
  </section>;
}

const bookEditions = [
  {year:"约 1970",title:"Enlightenment",sub:"早期普及小册",desc:"解释新兴的自我探寻方法；适合看到早期表达方式。"},
  {year:"1977 / 1981",title:"The Transmission of Truth",sub:"带领者手册及修订",desc:"训练、流程与带领者角色被更系统地整理。"},
  {year:"2005",title:"Consciousness of Truth",sub:"与 Berner 讨论后的再编辑",desc:"对顿悟概念和部分实践规范作重要修订。"}
];

function History() {
  return <>
    <Intro eyebrow="HISTORY · 研究与源流" title={<>二人禅从哪里来，<br/><em>又如何走到今天？</em></>} subtitle="从 Charles Berner 的实验、经典顿悟密集的成形，到带领者手册的不断修订与今日的日常改编。这里呈现的不只是年份，而是一种方法如何逐步找到自身的形式与边界。"/>
    <section className="exp-reading-nav"><div className="wrap"><a href="#/history" onClick={e=>scrollSection(e,"history-origins")}>思想源头</a><a href="#/history" onClick={e=>scrollSection(e,"history-timeline")}>发展时间轴</a><a href="#/history" onClick={e=>scrollSection(e,"history-books")}>文献演变</a><a href="#/history" onClick={e=>scrollSection(e,"history-today")}>今天的实践</a><a href="#/history" onClick={e=>scrollSection(e,"history-sources")}>来源说明</a></div></section>
    <section className="exp-section" id="history-origins"><div className="wrap">
      <Heading eyebrow="01 · BIRTH OF A METHOD" title="它并非凭空出现，而是在两种实践之间架起了一座桥。">一个人把注意力持续带回根本问题，另一个人以专注的在场接收其表达。二人禅的重要创见，在于让向内探寻与对外沟通成为互相支持的过程。</Heading>
      <ExpImage name="dyad-origins.svg" alt="从禅宗式根本探问和人与人的真实沟通，两条线汇合为结构化二人禅，下面形成经典密集实践" caption="方法源流示意图：这是基于原始资料的概念性重绘，不是 1968 年现场照片。" className="exp-origins-art"/>
      <div className="exp-idea-grid">
        <article data-reveal><span>01 / QUESTION</span><h3>持续的根本探问</h3><p>“我是谁？”不是要求给出漂亮的哲学定义，而是反复回到一个未被轻易解决的问题，让注意力有可持续的方向。与禅宗公案有可比较之处，但不是传统禅宗修行的直接复制。</p></article>
        <article data-reveal><span>02 / RELATIONSHIP</span><h3>真实而不被打断的沟通</h3><p>表达者把探寻中实际出现的内容传递出去；倾听者不急于解释、评断或回馈。在被见证的关系里，表达不再只是自己头脑中的独白。</p></article>
        <article data-reveal><span>03 / STRUCTURE</span><h3>角色、时间与静修环境</h3><p>经典密集之所以不仅是一套问答技巧，在于它也包括反复的换位、组织好的日程、休息与带领支持。短时练习只能借鉴其中的一部分。</p></article>
      </div>
    </div></section>
    <section className="exp-section exp-paper-section" id="history-timeline"><div className="wrap">
      <Heading eyebrow="02 · HISTORICAL TIMELINE" title="一条持续被修订的实践之路">从最初的个人实验，走向专业训练、文本修订以及不同带领者的实践。阅读每个阶段时，可以留意“什么发生了变化”。</Heading>
      <div className="exp-timeline">{historyStages.map((h, i)=>{
        const ref=historyReferences.find(r=>r.id===h.source);
        return <article className="exp-time-item" key={h.year+h.title} data-reveal>
          <div className="exp-time-year"><span>{h.year}</span><small>{h.tag}</small></div>
          <div className="exp-time-track" aria-hidden="true"><span /></div>
          <div className="exp-time-body">
            <div className="exp-time-meta"><span>{h.badge}</span><span>0{i+1} / 0{historyStages.length}</span></div>
            <h3>{h.title}</h3><p>{h.body}</p><div className="exp-time-takeaway">{h.key}</div>
            <a href={ref?.url} target="_blank" rel="noopener noreferrer" className="exp-inline-source">资料线索：{ref?.label || h.kind} <ArrowUpRight size={14}/></a>
          </div>
        </article>;
      })}</div>
    </div></section>
    <section className="exp-section" id="history-books"><div className="wrap">
      <Heading eyebrow="03 · THREE KEY PUBLICATIONS" title="同一方法，不同年代的理解">研究时不能只问“Berner 当时怎么说”，还要追问“他和后来的编者如何修订这些说法”。尤其是 2005 年手册，对“直接经验”与“有意识的直接认识”的区分值得认真辨明。</Heading>
      <div className="exp-books">
        {bookEditions.map((b,i)=><article className="exp-book-entry" key={b.year} data-reveal>
          <div className={"exp-book-cover exp-cover-"+i}><span>HISTORICAL TEXTS</span><strong>{b.title}</strong><small>{b.year}</small><i/><i/></div>
          <div><span>{b.sub}</span><h3>{b.year}</h3><p>{b.desc}</p></div>
        </article>)}
      </div>
      <p className="exp-footnote">图中书影为设计性的文字示意，并非历史版本的真实封面。1977、1981 与 2005 年的文本不应视为逐字相同。2005 年编者明确修改了部分长期密集的建议；研究者需以所引用版本为准。</p>
    </div></section>
    <section className="exp-section exp-current" id="history-today"><div className="wrap">
      <Heading eyebrow="04 · DIFFERENT PATHS TODAY" title="今天说“二人禅”，需要先说清是哪一种实践。">同样采用双人沟通，并不意味着目标、训练强度和安全要求相同。</Heading>
      <div className="exp-paths">
        <article><span>CLASSICAL EI</span><h3>经典顿悟密集</h3><p>根本探问贯穿三日静修，反复进行结构化双人练习，由熟悉方法的团队管理活动与参与者状态。</p><strong>目标：该传统所说的直接认识</strong></article>
        <article><span>GENTLE DYAD</span><h3>本站日常入门</h3><p>采用四轮、每轮五分钟的温和学习结构，专注于探寻、表达、倾听以及练习后的生活整合。</p><strong>目标：建立稳定而自主的练习能力</strong></article>
        <article><span>RELATED DYADIC PRACTICES</span><h3>其他双人默观与关系练习</h3><p>现代研究中还存在 Affect Dyad 等不同范式；它们与经典顿悟密集有相似的轮流表达元素，但不能因此视为同一个方法。</p><strong>目标与证据：必须逐项辨明</strong></article>
      </div>
      <div className="exp-end-bridge"><div><span>APPLICATION · 延伸应用</span><h3>从自我探寻，走向日常关系中的真实表达。</h3></div><p>二人禅帮助我们留意当下经验；非暴力沟通可以在练习结束后，协助辨认感受与需要，并与他人开展具体对话。两者应分阶段使用，而不是混为一套官方技术。</p><a href="#/nvc">探索二人禅 × NVC <ArrowRight size={17}/></a></div>
      <div id="history-sources"><Bibliography items={historyReferences} caption="阅读原始资料，而不是只相信时间轴" /></div>
    </div></section>
  </>;
}

function Nvc() {
  const [caseIndex,setCaseIndex]=useState(0);
  const item=nvcCases[caseIndex];
  return <>
    <Intro eyebrow="APPLICATION · 二人禅 × NVC" title={<>先听见自己，<br/><em>再走向真实的对话。</em></>} subtitle="二人禅让我们在另一个人的见证中向内探寻；非暴力沟通（Nonviolent Communication）帮助我们辨认感受、需要，并在关系中提出不带强迫的请求。这里提供一套明确标注为“本站整合设计”的体验式练习。"/>
    <section className="exp-reading-nav"><div className="wrap"><a href="#/nvc" onClick={e=>scrollSection(e,"nvc-distinctions")}>两种方法</a><a href="#/nvc" onClick={e=>scrollSection(e,"nvc-four")}>NVC 四要素</a><a href="#/nvc" onClick={e=>scrollSection(e,"nvc-cases")}>情境练习</a><a href="#/nvc" onClick={e=>scrollSection(e,"nvc-workshop")}>60 分钟带领流程</a><a href="#/nvc" onClick={e=>scrollSection(e,"nvc-sources")}>参考资料</a></div></section>
    <section className="exp-section" id="nvc-distinctions"><div className="wrap">
      <Heading eyebrow="01 · TWO PRACTICES, ONE LEARNING JOURNEY" title="互补，不等于混同。">二人禅与 NVC 都重视人的真实经验，也都反对用评判取代聆听。但经典二人禅中的倾听者并不进行 NVC 式的同理反馈；后者适用于双方自愿进入沟通的阶段。</Heading>
      <ExpImage name="dyad-nvc-bridge.svg" alt="先通过固定探问进行双人探寻与安静接收，随后经过静默整合，进入观察感受需要请求的 NVC 对话" caption="整合路线示意：探寻 → 静默整合 → 自我同理 → 关系沟通；中间以清楚的阶段边界分开。" className="exp-nvc-bridge" />
      <div className="exp-two-approaches"><article className="exp-approach-dark"><small>DYAD · 阶段一</small><h3>不急于回应，允许经验出现</h3><p>一方收到一个探问，向内接触并表达；倾听者保持安静，不给建议、不分析内容、不要求表达者“讲对”。</p><div><strong>不做什么</strong><span>不在五分钟轮次内反复用 NVC 的问句追问，不替对方猜测需要。</span></div></article><article className="exp-approach-light"><small>NVC · 阶段二</small><h3>辨认需要，把发现带回关系</h3><p>经过独立整合，若双方都愿意，再尝试分清观察与评判、辨认感受与需要，并提出可拒绝的具体请求。</p><div><strong>可以做什么</strong><span>表达“我感到……，因为我珍惜……”，并尊重对方不同的理解或拒绝。</span></div></article></div>
      <div className="exp-ethics"><ShieldCheck size={22}/><p><strong>方法说明：</strong>这是网站设计的教学整合，并非 Charles Berner 或 Marshall Rosenberg 官方发布的联合练习，也不是心理治疗。若关系中存在威胁、胁迫、暴力或明显心理危机，不应以双人练习代替安全措施和专业支持。</p></div>
    </div></section>
    <section className="exp-section exp-paper-section" id="nvc-four"><div className="wrap">
      <Heading eyebrow="02 · NONVIOLENT COMMUNICATION" title="NVC 四要素：把“你怎么这样”带回“我正在经历什么”。">Marshall Rosenberg 提出的四要素是观察、感受、需要与请求。它们不是必须照着念的台词，更重要的是非强迫地表达和接收，让彼此的需要有被看见的机会。</Heading>
      <div className="exp-nvc-four">{nvcFour.map((c,i)=><article key={c.id} data-reveal><span className="exp-four-index">0{i+1}</span><div className="exp-four-ring" aria-hidden="true"><i/></div><small>{c.en}</small><h3>{c.title}</h3><p>{c.detail}</p><div>{c.tip}</div></article>)}</div>
    </div></section>
    <section className="exp-section" id="nvc-cases"><div className="wrap">
      <Heading eyebrow="03 · PRACTICE IN REAL LIFE" title="从一句评判，练习走向连接。">点击不同情境，看看一个内在反应如何先成为探寻的入口，随后经由 NVC 走向可被对方理解的表达。例句是练习素材，不是对他人的诊断。</Heading>
      <div className="exp-case-selector" role="group" aria-label="选择关系情境">{nvcCases.map((c,i)=><button type="button" aria-pressed={caseIndex===i} className={caseIndex===i?"active":""} key={c.label} onClick={()=>setCaseIndex(i)}>{c.label}</button>)}</div>
      <div className="exp-case-board">
        <div className="exp-case-before"><span>从一个日常评判开始</span><blockquote>{item.judgement}</blockquote><p>不急于指责或纠正，先把它当作值得探寻的内心反应。</p><div><Compass size={20}/><span>适合短时二人禅的探问</span><strong>{item.dyad}</strong></div></div>
        <div className="exp-case-after"><span>经过静默与自我同理</span><div className="exp-case-steps">{nvcFour.map((step,i)=><div key={step.id}><small>0{i+1} / {step.title}</small><p>{item[step.id]}</p></div>)}</div><p className="exp-case-after-note">这是自愿关系对话的一个可能版本；请求不是命令，对方可以说“不”。</p></div>
      </div>
    </div></section>
    <section className="exp-section exp-workshop" id="nvc-workshop"><div className="wrap">
      <Heading eyebrow="04 · A 60-MINUTE SESSION" title="一场可以实际带领的二人禅 × NVC 沙龙">前半段借助安静探寻看见自己的真实反应，后半段用 NVC 帮助整合表达。每轮五分钟，角色轮换与切换阶段都有清楚的时间标记。</Heading>
      <div className="exp-session"><div className="exp-session-rows">{nvcAgenda.map((s,i)=><article key={s.time}><span className="exp-session-time">{s.time}<small>MIN</small></span><span className="exp-session-point">{i+1}</span><div><h3>{s.title}</h3><p>{s.detail}</p></div></article>)}</div><aside className="exp-session-script"><span>FACILITATOR'S SCRIPT</span><Quote size={34}/><h3>可以这样说明两种方法的边界</h3><blockquote>“前二十分钟，我们只练习探寻与安静接收，不替对方整理经验。随后各自留一点静默，把自己注意到的感受和需要写下来。最后，如果双方都愿意，我们才进入互动对话。你始终可以选择暂停、不分享或不继续。”</blockquote><a href="#/practice">打开双人练习计时器 <ArrowRight size={17}/></a><p>在练习室选择「温和入门」结构，再选「关系探索 × NVC」探问；进入 NVC 阶段前务必结束计时并留出静默。</p><div><Clock3 size={17}/> 20 分钟温和二人禅 + 40 分钟说明、整合与 NVC</div></aside></div>
      <div className="exp-reflect"><strong>结束时的三组反思</strong><ol><li>在安静被倾听时，我的叙事、情绪和身体有什么变化？</li><li>当我不再急着评判，对自己和对方的需要有了什么新理解？</li><li>我准备带回现实生活的一项具体行动是什么？它是否尊重他人的选择？</li></ol></div>
      <div id="nvc-sources"><Bibliography items={nvcReferences} caption="原典与本站整合设计，分别标注" /></div>
    </div></section>
  </>;
}

export { History, Nvc };
