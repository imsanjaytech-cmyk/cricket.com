import { useState, useEffect, useRef } from 'react';
import {
    Sidebar, SidebarProvider, SidebarContent, SidebarInset,
    SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarGroup, SidebarGroupContent, SidebarFooter,
    SidebarTrigger, SidebarRail
} from '../components/ui/sidebar';

const NavHome    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const NavMatches = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const NavStand   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><polyline points="8 7 8 3 16 3 16 7"/><path d="M5 7h14v4a7 7 0 0 1-14 0z"/><path d="M5 7H3a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h.5"/><path d="M19 7h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-.5"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg>;
const NavNews    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="18" y1="14" x2="12" y2="14"/><line x1="18" y1="10" x2="12" y2="10"/></svg>;
const NavVideos  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>;
const NavStats   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconSearch = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconBell   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconUser   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconTv     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const IconCricket= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="8" y1="16" x2="16" y2="8"/><line x1="8" y1="8" x2="16" y2="16"/></svg>;
const IconClose  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const TEAM_META = {
    'India':                { flag: '🇮🇳', code: 'IND', group: 'A' },
    'Pakistan':             { flag: '🇵🇰', code: 'PAK', group: 'A' },
    'Australia':            { flag: '🇦🇺', code: 'AUS', group: 'B' },
    'England':              { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG', group: 'B' },
    'South Africa':         { flag: '🇿🇦', code: 'RSA', group: 'C' },
    'New Zealand':          { flag: '🇳🇿', code: 'NZ',  group: 'C' },
    'West Indies':          { flag: '🏝️',  code: 'WI',  group: 'D' },
    'Sri Lanka':            { flag: '🇱🇰', code: 'SL',  group: 'D' },
    'Afghanistan':          { flag: '🇦🇫', code: 'AFG', group: 'A' },
    'Bangladesh':           { flag: '🇧🇩', code: 'BAN', group: 'B' },
    'Ireland':              { flag: '🇮🇪', code: 'IRE', group: 'C' },
    'Netherlands':          { flag: '🇳🇱', code: 'NED', group: 'D' },
    'Scotland':             { flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'SCO', group: 'A' },
    'Zimbabwe':             { flag: '🇿🇼', code: 'ZIM', group: 'B' },
    'Nepal':                { flag: '🇳🇵', code: 'NEP', group: 'C' },
    'Canada':               { flag: '🇨🇦', code: 'CAN', group: 'D' },
    'Oman':                 { flag: '🇴🇲', code: 'OMA', group: 'A' },
    'United Arab Emirates': { flag: '🇦🇪', code: 'UAE', group: 'B' },
    'United States':        { flag: '🇺🇸', code: 'USA', group: 'C' },
    'U.S.A.':               { flag: '🇺🇸', code: 'USA', group: 'C' },
    'USA':                  { flag: '🇺🇸', code: 'USA', group: 'C' },
    'Namibia':              { flag: '🇳🇦', code: 'NAM', group: 'D' },
    'Uganda':               { flag: '🇺🇬', code: 'UGA', group: 'A' },
    'Papua New Guinea':     { flag: '🇵🇬', code: 'PNG', group: 'B' },
};

const GRP_COLOR = { A: '#06b6d4', B: '#a78bfa', C: '#34d399', D: '#fb923c' };

const navItems = [
    { label: 'Home',      icon: NavHome,    href: '/'        },
    { label: 'Matches',   icon: NavMatches, href: '#matches' },
    { label: 'Standings', icon: NavStand,   href: '#'        },
    { label: 'News',      icon: NavNews,    href: '#'        },
    { label: 'Videos',    icon: NavVideos,  href: '#'        },
    { label: 'Stats',     icon: NavStats,   href: '#'        },
];

function buildTeamsFromMatches(matches) {
    const seen = new Set();
    const teams = [];
    let rank = 1;

    (matches || []).forEach(match => {
        const teamInfoList = match.teamInfo || [];
        const teamNames    = match.teams || [];

        const names = teamInfoList.length > 0
            ? teamInfoList.map(ti => ti.name)
            : teamNames;

        names.forEach((rawName, idx) => {
            if (!rawName || seen.has(rawName)) return;
            seen.add(rawName);

            const meta    = TEAM_META[rawName] || {};
            const tiEntry = teamInfoList[idx];

            teams.push({
                name:  rawName,
                flag:  meta.flag  || tiEntry?.flag  || '🏏',
                code:  meta.code  || tiEntry?.shortname?.toUpperCase() || rawName.slice(0, 3).toUpperCase(),
                group: meta.group || '?',
                img:   tiEntry?.img || null,
                rank:  rank++,
            });
        });
    });

    return teams;
}

function SearchOverlay({ open, onClose, teams = [] }) {
    const [query, setQuery]   = useState('');
    const [active, setActive] = useState(null);
    const inputRef = useRef(null);

    const filtered = teams.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.code.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (open) { setQuery(''); setActive(null); setTimeout(() => inputRef.current?.focus(), 80); }
    }, [open]);

    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    if (!open) return null;

    const groups = [...new Set(teams.map(t => t.group))].filter(g => g !== '?').sort();

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(1,6,16,0.88)',
                backdropFilter: 'blur(20px) saturate(1.4)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                padding: '5vh 16px 20px',
                animation: 'fadeInOverlay 0.18s ease',
            }}>

            <div style={{
                width: '100%', maxWidth: 700,
                background: 'linear-gradient(160deg,#060e1e 0%,#091525 55%,#0c1d30 100%)',
                borderRadius: 22,
                border: '1px solid rgba(99,179,237,0.15)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,179,237,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
                overflow: 'hidden',
                animation: 'slideUpSearch 0.28s cubic-bezier(0.34,1.4,0.64,1)',
            }}>

                {/* Input */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '18px 22px',
                    background: 'rgba(99,179,237,0.03)',
                    borderBottom: '1px solid rgba(99,179,237,0.08)',
                }}>
                    <span style={{ color: '#38bdf8', flexShrink: 0, opacity: 0.8 }}><IconSearch /></span>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search teams, countries, codes…"
                        style={{
                            flex: 1, background: 'none', border: 'none', outline: 'none',
                            color: '#e2f4fb', fontSize: 16, fontWeight: 500,
                            fontFamily: 'inherit', letterSpacing: '0.2px',
                        }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                            fontSize: 10, fontWeight: 700, color: 'rgba(56,189,248,0.45)',
                            background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.12)',
                            padding: '3px 8px', borderRadius: 6, letterSpacing: 1.2,
                        }}>ESC</span>
                        <button onClick={onClose} style={{
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                            cursor: 'pointer', color: 'rgba(255,255,255,0.35)',
                            padding: 6, borderRadius: 9, display: 'flex', alignItems: 'center',
                            transition: 'all .15s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                        >
                            <IconClose />
                        </button>
                    </div>
                </div>

                {/* Sub-header */}
                <div style={{
                    padding: '12px 22px 10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 8,
                }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(56,189,248,0.4)', margin: 0 }}>
                        {query
                            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`
                            : `${teams.length} Teams · ICC T20 WC 2026`}
                    </p>
                    {groups.length > 0 && (
                        <div style={{ display: 'flex', gap: 5 }}>
                            {groups.map(g => (
                                <span key={g} style={{
                                    fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 5,
                                    background: `${GRP_COLOR[g] || '#888'}15`,
                                    color: GRP_COLOR[g] || '#888',
                                    border: `1px solid ${(GRP_COLOR[g] || '#888')}30`,
                                    letterSpacing: 1.2,
                                }}>GROUP {g}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Teams grid */}
                <div style={{ padding: '4px 14px 16px', maxHeight: '54vh', overflowY: 'auto' }}>
                    {filtered.length === 0 ? (
                        <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                            <p style={{ fontSize: 30, marginBottom: 10 }}>🏏</p>
                            <p style={{ color: 'rgba(148,196,220,0.35)', fontSize: 14, fontWeight: 500 }}>
                                {teams.length === 0 ? 'No match data loaded yet.' : `No teams match "${query}"`}
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 7 }}>
                            {filtered.map((team, i) => {
                                const isHover   = active === team.code;
                                const grpColor  = GRP_COLOR[team.group] || '#64748b';
                                return (
                                    <button
                                        key={team.code + i}
                                        onMouseEnter={() => setActive(team.code)}
                                        onMouseLeave={() => setActive(null)}
                                        onClick={onClose}
                                        style={{
                                            background: isHover ? `rgba(56,189,248,0.08)` : 'rgba(255,255,255,0.025)',
                                            border: `1px solid ${isHover ? 'rgba(56,189,248,0.28)' : 'rgba(56,189,248,0.08)'}`,
                                            borderRadius: 13,
                                            padding: '11px 13px',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: 11,
                                            transition: 'all .16s ease',
                                            textAlign: 'left',
                                            transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
                                            boxShadow: isHover ? '0 6px 20px rgba(56,189,248,0.1)' : 'none',
                                            animation: `fadeInCard 0.3s ease ${i * 0.02}s both`,
                                        }}
                                    >
                                        {/* Flag / image box */}
                                        <div style={{
                                            width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                                            background: isHover ? `${grpColor}15` : 'rgba(56,189,248,0.05)',
                                            border: `1px solid ${isHover ? grpColor + '35' : 'rgba(56,189,248,0.1)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: team.img ? 0 : 22,
                                            overflow: 'hidden',
                                            transition: 'all .16s',
                                        }}>
                                            {team.img
                                                ? <img src={team.img} alt={team.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                : team.flag}
                                        </div>

                                        {/* Text */}
                                        <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
                                            <p style={{
                                                fontSize: 12, fontWeight: 700,
                                                color: isHover ? '#e2f4fb' : 'rgba(226,244,251,0.75)',
                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                lineHeight: 1.2, marginBottom: 4,
                                                transition: 'color .16s',
                                            }}>{team.name}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                <span style={{
                                                    fontSize: 9, fontWeight: 800, letterSpacing: 1.2,
                                                    color: 'rgba(148,196,220,0.45)',
                                                }}>{team.code}</span>
                                                {team.group !== '?' && (
                                                    <span style={{
                                                        fontSize: 8, fontWeight: 800, padding: '1px 5px', borderRadius: 4,
                                                        background: `${grpColor}15`,
                                                        color: grpColor,
                                                        border: `1px solid ${grpColor}30`,
                                                        letterSpacing: 0.8,
                                                    }}>GRP {team.group}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Rank */}
                                        <span style={{
                                            fontSize: 10, fontWeight: 900,
                                            color: isHover ? 'rgba(56,189,248,0.6)' : 'rgba(56,189,248,0.2)',
                                            flexShrink: 0, transition: 'color .16s',
                                        }}>#{team.rank}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer hints */}
                <div style={{
                    padding: '10px 22px',
                    borderTop: '1px solid rgba(56,189,248,0.07)',
                    background: 'rgba(56,189,248,0.02)',
                    display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
                }}>
                    {[['↑↓','navigate'],['↵','select'],['ESC','close']].map(([k, a]) => (
                        <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{
                                fontSize: 10, fontWeight: 700,
                                color: 'rgba(56,189,248,0.55)',
                                background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.14)',
                                padding: '2px 6px', borderRadius: 5,
                            }}>{k}</span>
                            <span style={{ fontSize: 10, color: 'rgba(148,196,220,0.3)', fontWeight: 500 }}>{a}</span>
                        </span>
                    ))}
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(148,196,220,0.22)', fontWeight: 600 }}>
                        {teams.length} teams · ICC T20 World Cup 2026
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ── Layout ── */
export default function AppLayout({ children, matches = [] }) {
    const [activeItem, setActiveItem] = useState('Matches');
    const [searchOpen, setSearchOpen] = useState(false);

    const teams = buildTeamsFromMatches(matches);

    return (
        <SidebarProvider>
            <style>{`
                @keyframes livePulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.6)} }
                @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
                @keyframes slideUpSearch { from{opacity:0;transform:translateY(28px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
                @keyframes fadeInCard { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
                [data-sidebar="sidebar"] {
                    background: linear-gradient(180deg,#030b18 0%,#050f22 50%,#071528 100%) !important;
                    border-right: none !important;
                }
                .peer { border-right: none !important; }
                [data-sidebar="sidebar"] + * { border-left: none !important; }
            `}</style>

            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} teams={teams} />

            {/* ── SIDEBAR ── */}
            <Sidebar
                collapsible="icon"
                style={{ background: 'linear-gradient(180deg,#030b18 0%,#050f22 50%,#071528 100%)', borderRight: 'none' }}
                className="border-r-0"
            >
                {/* Brand */}
                <SidebarHeader className="px-3 pt-5 pb-4" style={{ borderBottom: 'none' }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative flex-shrink-0">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                                style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 0 22px rgba(14,165,233,0.45)' }}>
                                <IconCricket />
                            </div>
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400"
                                style={{ border: '2px solid #030b18', animation: 'livePulse 1.5s infinite' }} />
                        </div>
                        <div className="group-data-[collapsible=icon]:hidden overflow-hidden">
                            <p className="text-white font-black text-sm tracking-tight leading-none whitespace-nowrap">ICC Men's T20</p>
                            <p className="font-bold text-[9px] tracking-[2.5px] uppercase mt-0.5 whitespace-nowrap"
                                style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                                World Cup 2026
                            </p>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="px-2 py-3">
                    {/* Live badge */}
                    <div className="group-data-[collapsible=icon]:hidden mx-2 mb-4 px-3 py-2.5 rounded-xl flex items-center gap-2"
                        style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
                            style={{ animation: 'livePulse 1.5s infinite' }} />
                        <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400">Live Now</span>
                        <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full"
                            style={{ background: '#10b981', color: '#030b18' }}>2</span>
                    </div>

                    {/* Nav */}
                    <SidebarGroup className="p-0">
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-0.5">
                                {navItems.map(({ label, icon: Icon, href }) => {
                                    const on = activeItem === label;
                                    return (
                                        <SidebarMenuItem key={label}>
                                            <SidebarMenuButton
                                                asChild tooltip={label} isActive={on}
                                                onClick={() => setActiveItem(label)}
                                                className="h-11 rounded-xl transition-all duration-200"
                                                style={on ? {
                                                    background: 'linear-gradient(135deg,rgba(14,165,233,0.2),rgba(99,102,241,0.12))',
                                                    border: '1px solid rgba(56,189,248,0.3)',
                                                    color: '#fff',
                                                    boxShadow: '0 2px 18px rgba(14,165,233,0.15)',
                                                } : {
                                                    color: 'rgba(148,196,220,0.45)',
                                                    border: '1px solid transparent',
                                                }}
                                            >
                                                <a href={href} className="flex items-center gap-3 px-3 w-full">
                                                    <span style={{ color: on ? '#38bdf8' : 'rgba(148,196,220,0.35)' }}><Icon /></span>
                                                    <span className="font-semibold text-[13px]">{label}</span>
                                                    {on && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 group-data-[collapsible=icon]:hidden" />}
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Divider */}
                    <div className="mx-2 my-4" style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(56,189,248,0.15),transparent)' }} />

                    {/* ICC.TV promo */}
                    <div className="group-data-[collapsible=icon]:hidden mx-2 p-3 rounded-xl"
                        style={{ background: 'linear-gradient(135deg,rgba(14,165,233,0.09),rgba(99,102,241,0.06))', border: '1px solid rgba(56,189,248,0.18)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span style={{ color: '#38bdf8' }}><IconTv /></span>
                            <span className="text-[11px] font-black tracking-widest uppercase text-sky-400">ICC.TV</span>
                            <span className="ml-auto text-[8px] font-black px-1.5 py-0.5 rounded-full"
                                style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)' }}>LIVE</span>
                        </div>
                        <p className="text-[10px] leading-relaxed mb-2.5" style={{ color: 'rgba(148,196,220,0.4)' }}>
                            Watch live matches &amp; highlights in HD
                        </p>
                        <button className="w-full text-[11px] font-bold tracking-widest uppercase py-2 rounded-lg text-white transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 2px 14px rgba(14,165,233,0.28)' }}>
                            Watch Now →
                        </button>
                    </div>

                    {/* Collapsed TV icon */}
                    <div className="group-data-[collapsible=icon]:flex hidden justify-center mt-2">
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white" title="ICC.TV"
                            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 2px 12px rgba(14,165,233,0.3)' }}>
                            <IconTv />
                        </button>
                    </div>
                </SidebarContent>

                {/* Footer */}
                <SidebarFooter className="px-3 pb-5 pt-2" style={{ borderTop: 'none' }}>
                    <div className="group-data-[collapsible=icon]:hidden flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer hover:bg-sky-900/20 transition-all">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 0 10px rgba(14,165,233,0.3)' }}>
                            <IconUser />
                        </div>
                        <div>
                            <p className="text-white text-[11px] font-bold leading-none">My Account</p>
                            <p className="text-[9px] mt-0.5" style={{ color: 'rgba(148,196,220,0.4)' }}>Sign in to continue</p>
                        </div>
                    </div>
                    <div className="group-data-[collapsible=icon]:flex hidden justify-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                            <IconUser />
                        </div>
                    </div>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>

            {/* ── MAIN ── */}
            <SidebarInset style={{ background: '#f0f7ff', minHeight: '100vh' }}>

                {/* Top Bar */}
                <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5"
                    style={{
                        background: 'rgba(240,247,255,0.94)',
                        backdropFilter: 'blur(16px)',
                        borderBottom: '1px solid rgba(14,165,233,0.1)',
                        boxShadow: '0 1px 20px rgba(14,165,233,0.05)',
                    }}>

                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-sky-50"
                            style={{ border: '1px solid rgba(14,165,233,0.2)', color: '#0284c7', background: 'transparent' }} />
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: 'rgba(2,132,199,0.4)' }}>ICC 2026</span>
                            <span style={{ color: 'rgba(2,132,199,0.22)' }}>/</span>
                            <span className="text-sm font-bold" style={{ color: '#0c4a6e' }}>Matches</span>
                        </div>
                        <div className="flex sm:hidden items-center gap-2">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                                style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                                <IconCricket />
                            </div>
                            <span className="font-black text-sm" style={{ color: '#0c4a6e' }}>ICC T20 WC</span>
                        </div>
                    </div>

                    {/* Center search */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-xs mx-4 cursor-pointer transition-all hover:border-sky-300/50"
                        style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)' }}>
                        <span style={{ color: '#0ea5e9' }}><IconSearch /></span>
                        <span className="text-sm font-medium" style={{ color: 'rgba(2,132,199,0.42)' }}>Search teams…</span>
                        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(14,165,233,0.08)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.15)' }}>⌘K</span>
                    </button>

                    {/* Right */}
                    <div className="flex items-center gap-1.5">
                        {/* Live */}
                        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ animation: 'livePulse 1.5s infinite' }} />
                            <span className="text-emerald-600 text-[10px] font-black tracking-widest uppercase">2 Live</span>
                        </div>

                        {/* Mobile search */}
                        <button onClick={() => setSearchOpen(true)}
                            className="flex md:hidden w-8 h-8 rounded-lg items-center justify-center"
                            style={{ border: '1px solid rgba(14,165,233,0.2)', color: '#0284c7' }}>
                            <IconSearch />
                        </button>

                        {/* Bell */}
                        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-sky-50 transition-all"
                            style={{ border: '1px solid rgba(14,165,233,0.2)', color: '#0284c7' }}>
                            <IconBell />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        </button>

                        {/* ICC.TV */}
                        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-[11px] tracking-widest uppercase text-white hover:opacity-90 transition-all"
                            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 2px 10px rgba(14,165,233,0.28)' }}>
                            <IconTv /> ICC.TV
                        </button>

                        {/* Avatar */}
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 2px 8px rgba(14,165,233,0.28)' }}>
                            <IconUser />
                        </button>
                    </div>
                </header>

                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}