import { Head } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';

/* ── Icons ── */
const IconTrophy      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><polyline points="8 7 8 3 16 3 16 7"/><path d="M5 7h14v4a7 7 0 0 1-7 7 7 7 0 0 1-7-7z"/><path d="M5 7H3a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h.5"/><path d="M19 7h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-.5"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg>;
const IconMapPin      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconArrowRight  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconTicket      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><line x1="9" y1="12" x2="15" y2="12"/></svg>;
const IconChevronLeft = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="15 18 9 12 15 6"/></svg>;
const IconChevronRight= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="9 18 15 12 9 6"/></svg>;
const IconChevronDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>;
const IconCalendar    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

/* ── Date Picker ── */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function DatePicker({ value, onChange }) {
    const [open, setOpen]       = useState(false);
    const [viewDate, setViewDate] = useState(value || new Date(2026, 1, 17));
    const ref = useRef(null);

    useEffect(() => {
        const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', fn);
        return () => document.removeEventListener('mousedown', fn);
    }, []);

    const year  = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const selected = value ? value.getDate() : null;
    const selectedMonth = value ? value.getMonth() : null;
    const selectedYear  = value ? value.getFullYear() : null;

    const isSelected = (d) => d && d === selected && month === selectedMonth && year === selectedYear;
    const isToday = (d) => {
        const t = new Date();
        return d && d === t.getDate() && month === t.getMonth() && year === t.getFullYear();
    };
    const inRange = (d) => {
        if (!d) return false;
        const dt = new Date(year, month, d);
        return dt >= new Date(2026, 1, 17) && dt <= new Date(2026, 2, 8);
    };

    const fmt = (dt) => dt ? `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}` : 'Pick date';

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(v => !v)}
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                    background: open ? 'rgba(14,165,233,0.1)' : 'rgba(14,165,233,0.05)',
                    border: `1.5px solid ${open ? 'rgba(14,165,233,0.4)' : 'rgba(14,165,233,0.18)'}`,
                    color: '#0284c7', fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.5px', transition: 'all .18s',
                    boxShadow: open ? '0 4px 16px rgba(14,165,233,0.12)' : 'none',
                }}
            >
                <IconCalendar />
                <span>{fmt(value)}</span>
                <span style={{ opacity: 0.5, marginLeft: 2 }}><IconChevronDown /></span>
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 500,
                    background: 'linear-gradient(160deg,#060e1e,#091525)',
                    border: '1px solid rgba(56,189,248,0.18)',
                    borderRadius: 16,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.08)',
                    padding: '16px',
                    minWidth: 280,
                    animation: 'dpSlide 0.2s cubic-bezier(0.34,1.4,0.64,1)',
                }}>
                    {/* Month nav */}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 14 }}>
                        <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
                            style={{ background:'rgba(56,189,248,0.08)', border:'1px solid rgba(56,189,248,0.15)', borderRadius:8, padding:'5px 8px', cursor:'pointer', color:'#38bdf8', display:'flex', alignItems:'center' }}>
                            <IconChevronLeft />
                        </button>
                        <span style={{ color:'#e2f4fb', fontWeight: 800, fontSize: 13, letterSpacing: 0.5 }}>
                            {MONTHS[month]} {year}
                        </span>
                        <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
                            style={{ background:'rgba(56,189,248,0.08)', border:'1px solid rgba(56,189,248,0.15)', borderRadius:8, padding:'5px 8px', cursor:'pointer', color:'#38bdf8', display:'flex', alignItems:'center' }}>
                            <IconChevronRight />
                        </button>
                    </div>

                    {/* Day headers */}
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, marginBottom:6 }}>
                        {DAYS.map(d => (
                            <div key={d} style={{ textAlign:'center', fontSize:9, fontWeight:700, color:'rgba(56,189,248,0.4)', letterSpacing:1, padding:'2px 0' }}>{d}</div>
                        ))}
                    </div>

                    {/* Day cells */}
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
                        {cells.map((d, i) => {
                            const sel = isSelected(d);
                            const today = isToday(d);
                            const inr = inRange(d);
                            return (
                                <button key={i} disabled={!d || !inr}
                                    onClick={() => { if (d && inr) { onChange(new Date(year, month, d)); setOpen(false); } }}
                                    style={{
                                        height: 34, borderRadius: 8, fontSize: 12, fontWeight: sel ? 800 : 500,
                                        cursor: d && inr ? 'pointer' : 'default',
                                        border: today && !sel ? '1px solid rgba(56,189,248,0.35)' : '1px solid transparent',
                                        background: sel
                                            ? 'linear-gradient(135deg,#0ea5e9,#6366f1)'
                                            : inr ? 'rgba(56,189,248,0.05)' : 'transparent',
                                        color: sel ? '#fff' : inr ? '#e2f4fb' : 'rgba(148,196,220,0.2)',
                                        boxShadow: sel ? '0 2px 10px rgba(14,165,233,0.4)' : 'none',
                                        transition: 'all .15s',
                                    }}
                                    onMouseEnter={e => { if (d && inr && !sel) { e.currentTarget.style.background = 'rgba(56,189,248,0.12)'; e.currentTarget.style.color = '#38bdf8'; }}}
                                    onMouseLeave={e => { if (d && inr && !sel) { e.currentTarget.style.background = 'rgba(56,189,248,0.05)'; e.currentTarget.style.color = '#e2f4fb'; }}}
                                >
                                    {d || ''}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tournament range note */}
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(56,189,248,0.1)', textAlign:'center' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color:'rgba(56,189,248,0.4)', letterSpacing: 1.5, textTransform:'uppercase' }}>
                            Tournament: 17 Feb – 8 Mar 2026
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Helpers ── */
function formatScore(scoreArr, teamIndex) {
    if (!scoreArr || !scoreArr[teamIndex]) return null;
    const s = scoreArr[teamIndex];
    return `${s.r}/${s.w} (${s.o} ov)`;
}

function groupByDate(matches) {
    return matches.reduce((acc, match) => {
        const key = new Date(match.dateTimeGMT || match.date).toLocaleDateString('en-US', {
            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
        }).toUpperCase();
        if (!acc[key]) acc[key] = [];
        acc[key].push(match);
        return acc;
    }, {});
}

function matchTime(match) {
    return new Date(match.dateTimeGMT || match.date).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: false,
    });
}

/* ── Component ── */
export default function Home({ matches }) {
    const [activeTab, setActiveTab] = useState('fixtures');
    const [pickedDate, setPickedDate] = useState(null);
    const grouped = groupByDate(matches || []);

    return (
        <>
            <Head title="ICC Men's T20 World Cup 2026 – Matches" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                :root {
                    --sky:   #0ea5e9;
                    --sky2:  #38bdf8;
                    --ind:   #6366f1;
                    --teal:  #0891b2;
                    --dark:  #030b18;
                    --dark2: #050f22;
                    --bg:    #f0f7ff;
                    --brd:   #dbeafe;
                    --muted: #94a3b8;
                    --text:  #0c1a2e;
                    --grn:   #10b981;
                    --red:   #ef4444;
                    --pk:    #8b5cf6;
                }
                html { scroll-behavior: smooth; }
                body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: var(--dark); }
                ::-webkit-scrollbar-thumb { background: var(--sky); border-radius: 3px; }

                /* HERO */
                .hero {
                    background: linear-gradient(135deg, #030b18 0%, #050f22 45%, #091a38 100%);
                    padding: 52px 24px 44px; position: relative; overflow: hidden;
                }
                .hero::before {
                    content:''; position:absolute; top:-80px; right:-80px;
                    width:400px; height:400px;
                    background: radial-gradient(circle, rgba(14,165,233,.22) 0%, transparent 65%);
                    pointer-events:none;
                }
                .hero::after {
                    content:''; position:absolute; bottom:-60px; left:5%;
                    width:360px; height:200px;
                    background: radial-gradient(ellipse, rgba(99,102,241,.12) 0%, transparent 70%);
                    pointer-events:none;
                }
                .hero-inner { max-width:1200px; margin:0 auto; position:relative; z-index:1; }
                .hero-eyebrow {
                    display:inline-flex; align-items:center; gap:8px;
                    background:rgba(14,165,233,.12); border:1px solid rgba(14,165,233,.28);
                    color:var(--sky2); font-size:11px; font-weight:700; letter-spacing:2px;
                    text-transform:uppercase; padding:5px 14px; border-radius:20px; margin-bottom:16px;
                }
                .hero-title {
                    font-size:clamp(28px,5vw,54px); font-weight:900; color:#fff;
                    line-height:1; letter-spacing:-.5px; margin-bottom:10px;
                    text-shadow:0 0 40px rgba(14,165,233,.35);
                }
                .hero-title em { font-style:normal; color:var(--sky2); }
                .hero-sub { font-size:14px; color:rgba(255,255,255,.4); font-weight:500; }

                /* TABS */
                .tabs-bar { background:#fff; border-bottom:2px solid var(--brd); padding:0 24px; display:flex; }
                .tab-btn {
                    background:none; border:none; font-family:'Inter',sans-serif;
                    font-size:12px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase;
                    color:#94a3b8; padding:15px 22px; cursor:pointer;
                    border-bottom:3px solid transparent; margin-bottom:-2px; transition:all .2s;
                }
                .tab-btn.active { color:var(--sky); border-bottom-color:var(--sky); }
                .tab-btn:hover:not(.active) { color:#475569; }

                /* FILTERS */
                .filters {
                    background:#fff; padding:11px 24px;
                    display:flex; align-items:center; gap:10px; flex-wrap:wrap;
                    border-bottom:1px solid var(--brd);
                }
                .filter-pill {
                    display:inline-flex; align-items:center; gap:7px;
                    border:1.5px solid #bfdbfe; border-radius:8px; padding:8px 14px;
                    font-family:'Inter',sans-serif; font-size:11px; font-weight:600;
                    color:var(--teal); background:#fff; cursor:pointer;
                    transition:border-color .2s,background .2s; text-transform:uppercase; letter-spacing:.5px;
                }
                .filter-pill:hover { border-color:var(--sky); background:#eff6ff; }

                /* DATE PICKER ANIMATION */
                @keyframes dpSlide {
                    from { opacity:0; transform:translateY(8px) scale(.97); }
                    to   { opacity:1; transform:translateY(0) scale(1); }
                }

                /* CONTENT */
                .content { max-width:1200px; margin:0 auto; padding:32px 20px 72px; }

                /* DATE GROUP */
                .dgroup {
                    margin-bottom:28px; border-radius:14px; overflow:hidden;
                    box-shadow:0 4px 24px rgba(14,165,233,.1);
                    animation:fadeUp .45s ease both;
                }
                @keyframes fadeUp {
                    from { opacity:0; transform:translateY(18px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .dheader {
                    background:linear-gradient(90deg,#030b18,#050f22 50%,#0c1d3a);
                    color:#fff; padding:13px 22px; font-size:11px; font-weight:700;
                    letter-spacing:2.5px; text-transform:uppercase;
                    display:flex; align-items:center; gap:9px;
                    border-bottom:1px solid rgba(14,165,233,.15);
                }
                .dheader-dot { width:6px; height:6px; background:var(--sky2); border-radius:50%; flex-shrink:0; }

                /* MATCH CARD */
                .mcard {
                    background:#fff;
                    border-left:1px solid var(--brd); border-right:1px solid var(--brd); border-bottom:1px solid var(--brd);
                    padding:20px 22px;
                    display:grid; grid-template-columns:250px 1fr 130px 196px;
                    align-items:center; gap:20px;
                    transition:background .2s; cursor:default; position:relative;
                }
                .mcard::before {
                    content:''; position:absolute; left:0; top:0; bottom:0; width:0;
                    background:linear-gradient(180deg,var(--sky),var(--ind));
                    transition:width .25s ease;
                }
                .mcard:hover::before { width:3px; }
                .mcard:hover { background:#f0f9ff; }
                .mcard:last-child { border-radius:0 0 14px 14px; }

                /* meta */
                .mbadge {
                    display:inline-flex; align-items:center; gap:5px;
                    font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    color:var(--pk); background:rgba(139,92,246,.1);
                    padding:3px 9px; border-radius:4px; margin-bottom:7px;
                }
                .mname {
                    font-size:12px; font-weight:600; color:var(--text); line-height:1.45; margin-bottom:6px;
                    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
                }
                .mvenue { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--muted); font-weight:500; }

                /* teams */
                .trow { display:flex; align-items:center; gap:11px; padding:5px 0; }
                .timg { width:34px; height:34px; border-radius:50%; object-fit:cover; border:2px solid #bfdbfe; background:var(--bg); flex-shrink:0; }
                .tfallback {
                    width:34px; height:34px; border-radius:50%;
                    background:linear-gradient(135deg,var(--teal),var(--sky));
                    display:flex; align-items:center; justify-content:center;
                    color:#fff; font-size:10px; font-weight:800; flex-shrink:0;
                    border:2px solid #bfdbfe; letter-spacing:.5px;
                }
                .tname { font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase; letter-spacing:.3px; line-height:1; }
                .tshort { font-size:11px; color:var(--muted); font-weight:500; margin-top:2px; }
                .mstarts { font-size:11px; color:var(--muted); font-weight:500; margin-top:8px; }

                /* score */
                .tcol { text-align:center; }
                .tval { font-size:22px; font-weight:800; color:var(--teal); letter-spacing:-.5px; }
                .sline { font-size:13px; font-weight:700; color:var(--text); line-height:2; }
                .sresult {
                    font-size:11px; color:#059669; font-weight:600;
                    background:#ecfdf5; padding:3px 8px; border-radius:4px;
                    margin-top:6px; display:inline-block; line-height:1.4;
                }

                /* status badges */
                .blive {
                    display:inline-flex; align-items:center; gap:6px;
                    background:#fef2f2; color:var(--red); border:1.5px solid #fca5a5;
                    font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    padding:5px 10px; border-radius:6px; margin-top:8px;
                }
                .blivedot { width:7px; height:7px; background:var(--red); border-radius:50%; animation:blink 1.1s infinite; }
                @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }
                .bup {
                    display:inline-flex; align-items:center;
                    background:#eff6ff; color:var(--sky); border:1.5px solid #bfdbfe;
                    font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    padding:5px 10px; border-radius:6px; margin-top:8px;
                }
                .bfin {
                    display:inline-flex; align-items:center;
                    background:#f0fdf4; color:#16a34a; border:1.5px solid #bbf7d0;
                    font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase;
                    padding:4px 8px; border-radius:5px; margin-top:6px;
                }

                /* action buttons */
                .acol { display:flex; flex-direction:column; gap:9px; align-items:flex-end; }
                .btn1 {
                    display:flex; align-items:center; justify-content:space-between; gap:8px; width:170px;
                    border:1.5px solid var(--teal); background:transparent; color:var(--teal);
                    font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:1px;
                    text-transform:uppercase; padding:10px 15px; border-radius:8px; cursor:pointer;
                    text-decoration:none; transition:all .22s; white-space:nowrap;
                }
                .btn1:hover { background:var(--sky); border-color:var(--sky); color:#fff; box-shadow:0 4px 14px rgba(14,165,233,.3); }
                .btn2 {
                    display:flex; align-items:center; justify-content:space-between; gap:8px; width:170px;
                    border:1.5px solid var(--pk); background:transparent; color:var(--pk);
                    font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:1px;
                    text-transform:uppercase; padding:10px 15px; border-radius:8px; cursor:pointer;
                    text-decoration:none; transition:all .22s; white-space:nowrap;
                }
                .btn2:hover { background:var(--pk); color:#fff; box-shadow:0 4px 14px rgba(139,92,246,.3); }

                /* empty */
                .empty { text-align:center; padding:80px 20px; color:var(--muted); font-size:15px; font-weight:500; }
                .empty svg { display:block; margin:0 auto 16px; opacity:.3; }

                /* FOOTER */
                .footer {
                    background:linear-gradient(90deg,#030b18,#050f22);
                    border-top:1px solid rgba(14,165,233,.15);
                    padding:26px 24px; text-align:center;
                    font-size:12px; font-weight:500; color:rgba(255,255,255,.25); letter-spacing:.5px;
                }
                .footer strong { color:var(--sky2); font-weight:700; }

                /* RESPONSIVE */
                @media(max-width:960px){
                    .mcard{grid-template-columns:1fr 1fr;grid-template-rows:auto auto;}
                    .acol{flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:flex-start;}
                    .btn1,.btn2{width:auto;flex:1;min-width:130px;}
                }
                @media(max-width:640px){
                    .hero{padding:32px 16px 28px;}
                    .content{padding:20px 12px 60px;}
                    .filters{padding:10px 16px;gap:8px;}
                    .tabs-bar{padding:0 16px;}
                    .mcard{grid-template-columns:1fr;padding:16px;gap:14px;}
                    .tcol{text-align:left;}
                    .acol{flex-direction:row;}
                    .btn1,.btn2{flex:1;}
                    .filter-pill span{display:none;}
                }
            `}</style>

            <div>
                {/* HERO */}
                <div className="hero">
                    <div className="hero-inner">
                        <div className="hero-eyebrow">
                            <IconTrophy />
                            India &amp; Sri Lanka · 17 Feb – 8 Mar 2026
                        </div>
                        <h1 className="hero-title"><em>Fixtures</em> &amp; Results</h1>
                        <p className="hero-sub">ICC Men's T20 World Cup 2026 — All Matches</p>
                    </div>
                </div>

                {/* TABS */}
                <div className="tabs-bar">
                    <button className={`tab-btn ${activeTab === 'results'  ? 'active' : ''}`} onClick={() => setActiveTab('results')}>Results</button>
                    <button className={`tab-btn ${activeTab === 'fixtures' ? 'active' : ''}`} onClick={() => setActiveTab('fixtures')}>Fixtures</button>
                </div>

                {/* FILTERS */}
                <div className="filters">
                    {/* Modern Date Picker */}
                    <DatePicker value={pickedDate} onChange={setPickedDate} />

                    <div className="filter-pill"><span>All Teams</span><IconChevronDown /></div>
                    <div className="filter-pill"><span>All Venues</span><IconChevronDown /></div>

                    {pickedDate && (
                        <button
                            onClick={() => setPickedDate(null)}
                            style={{
                                display:'inline-flex', alignItems:'center', gap:6,
                                padding:'8px 12px', borderRadius:8, cursor:'pointer',
                                background:'rgba(239,68,68,0.08)', border:'1.5px solid rgba(239,68,68,0.25)',
                                color:'#ef4444', fontFamily:'inherit', fontSize:11, fontWeight:700,
                                letterSpacing:'.5px', textTransform:'uppercase',
                            }}
                        >
                            ✕ Clear date
                        </button>
                    )}
                </div>

                {/* MATCHES */}
                <div className="content" id="matches">
                    {(matches || []).length > 0 ? (
                        Object.entries(grouped).map(([date, dayMatches], gi) => (
                            <div className="dgroup" key={date} style={{ animationDelay:`${gi * 0.07}s` }}>
                                <div className="dheader">
                                    <span className="dheader-dot" />
                                    {date}
                                </div>

                                {dayMatches.map((match, i) => {
                                    const t1Info    = match.teamInfo?.[0];
                                    const t2Info    = match.teamInfo?.[1];
                                    const team1     = match.teams?.[0] || 'TBA';
                                    const team2     = match.teams?.[1] || 'TBA';
                                    const isLive    = !match.matchEnded && match.matchStarted;
                                    const hasEnded  = match.matchEnded;
                                    const score1Str = formatScore(match.score, 0);
                                    const score2Str = formatScore(match.score, 1);
                                    const time      = matchTime(match);

                                    return (
                                        <div className="mcard" key={match.id || i}>

                                            {/* META */}
                                            <div>
                                                <div className="mbadge"><IconTrophy />T20I</div>
                                                <div className="mname">{match.name || `ICC Men's T20 World Cup, 2026 – Match ${gi * 10 + i + 1}`}</div>
                                                {match.venue && (
                                                    <div className="mvenue"><IconMapPin />{match.venue}</div>
                                                )}
                                            </div>

                                            {/* TEAMS */}
                                            <div>
                                                {[{name:team1,info:t1Info},{name:team2,info:t2Info}].map(({name,info},ti) => (
                                                    <div className="trow" key={ti}>
                                                        {info?.img
                                                            ? <img src={info.img} alt={name} className="timg" loading="lazy"
                                                                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                                                            : null}
                                                        <div className="tfallback" style={{ display: info?.img ? 'none' : 'flex' }}>
                                                            {(info?.shortname || name.slice(0,3)).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="tname">{name}</div>
                                                            {info?.shortname && <div className="tshort">{info.shortname}</div>}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mstarts">
                                                    {isLive ? '● In Progress' : hasEnded ? 'Match ended' : `Starts at ${time}`}
                                                </div>
                                            </div>

                                            {/* SCORE / TIME */}
                                            <div className="tcol">
                                                {score1Str && score2Str ? (
                                                    <div>
                                                        <div className="sline">{score1Str}</div>
                                                        <div className="sline">{score2Str}</div>
                                                        {hasEnded && <span className="bfin">Final</span>}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="tval">{time}</div>
                                                        {isLive  && <div className="blive"><span className="blivedot" />Live</div>}
                                                        {!isLive && !hasEnded && <div className="bup">Upcoming</div>}
                                                    </div>
                                                )}
                                                {hasEnded && match.status && <div className="sresult">{match.status}</div>}
                                            </div>

                                            {/* ACTIONS */}
                                            <div className="acol">
                                                <a href="#" className="btn1">Match Centre<IconArrowRight /></a>
                                                <a href="#" className="btn2">Buy Ticket<IconTicket /></a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
                            </svg>
                            No T20 World Cup matches found.
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <footer className="footer">
                    © {new Date().getFullYear()} <strong>ICC Men's T20 World Cup</strong> Tracker · All rights reserved.
                </footer>
            </div>
        </>
    );
}
Home.layout = page => {
    const { matches } = page.props; 
    return <AppLayout matches={matches}>{page}</AppLayout>;
};