import { supabase } from './supabase.js'

const PROXY = 'https://aiulcycosynvrriabpqg.supabase.co/functions/v1/dropbox-proxy'
const LOGO = 'data:image/png;base64,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'
const FOLDER_ICON = 'data:image/png;base64,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'

let state = {
  user: null, athlete: null,
  files: [], breadcrumbs: [],
  layout: 'list',
  sortBy: 'name', sortDir: 1,
  thumbs: {}, linkCache: {}, folderCache: {},
  rootFolders: [], sidebarExpanded: {}, sidebarChildren: {}
}

const IMG_EXTS = ['jpg','jpeg','png','gif','webp','heic','bmp']
const VID_EXTS = ['mp4','mov','avi','mkv','wmv','m4v','webm']
const extOf = n => (n||'').split('.').pop().toLowerCase()
const isImg = n => IMG_EXTS.includes(extOf(n))
const isVid = n => VID_EXTS.includes(extOf(n))
const isMedia = n => isImg(n) || isVid(n)
const fmtSize = b => !b ? '' : b < 1048576 ? Math.round(b/1024)+' KB' : (b/1048576).toFixed(1)+' MB'

function toast(msg, type='') {
  const t = document.getElementById('toast')
  if (!t) return
  t.textContent = msg
  t.className = 'toast' + (type ? ' '+type : '')
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}

async function proxyPost(action, body) {
  const r = await fetch(PROXY + '?action=' + action, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  if (!r.ok) throw new Error('Proxy ' + r.status)
  return r
}

async function getLink(path) {
  const c = state.linkCache[path]
  if (c && c.exp > Date.now()) return c.url
  const r = await proxyPost('link', {path})
  const d = await r.json()
  if (d.link) state.linkCache[path] = {url: d.link, exp: Date.now() + 3*60*60*1000}
  return d.link
}

async function getThumb(path) {
  if (state.thumbs[path]) return state.thumbs[path]
  try {
    const r = await proxyPost('thumb', {resource: {'.tag':'path', path}, format: {'.tag':'jpeg'}, size: {'.tag':'w640h480'}, mode: {'.tag':'fitone_bestfit'}})
    if (!r.ok) return null
    const url = URL.createObjectURL(await r.blob())
    state.thumbs[path] = url
    return url
  } catch { return null }
}

async function listFolder(path) {
  if (state.folderCache[path]) return state.folderCache[path]
  try {
    const r = await proxyPost('list', {path, recursive: false, include_media_info: true})
    const d = await r.json()
    const entries = d.entries || []
    state.folderCache[path] = entries
    return entries
  } catch { toast('Erro ao carregar.', 'error'); return [] }
}

async function getAthlete(email) {
  try {
    const r = await supabase.from('athlete_folders').select('folder_path,nome,foto').eq('email', email).single()
    return r.data || null
  } catch { return null }
}

function injectStyles() {
  const s = document.createElement('style')
  s.textContent = `
    * { box-sizing:border-box; margin:0; padding:0 }
    body { font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:#fff; color:#1a1a2e; -webkit-font-smoothing:antialiased; font-size:14px }
    #app { height:100vh; display:flex; flex-direction:column; overflow:hidden }
    .topbar { height:52px; border-bottom:1px solid #eee; display:flex; align-items:center; justify-content:space-between; padding:0 20px; background:#fff; position:sticky; top:0; z-index:50; flex-shrink:0 }
    .top-l { display:flex; align-items:center; gap:10px }
    .top-logo { width:28px; height:28px; border-radius:6px; object-fit:cover }
    .top-title { font-size:15px; font-weight:600; color:#0f1923 }
    .top-r { display:flex; align-items:center; gap:6px }
    .out-btn { width:32px; height:32px; border:1px solid #eee; border-radius:7px; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#666 }
    .out-btn:hover { background:#f5f5f5 }
    .app-body { display:flex; flex:1; overflow:hidden; min-height:0 }
    .sidebar { width:200px; flex-shrink:0; border-right:1px solid #f0f0f0; background:#fafafa; overflow-y:auto; height:100% }
    .sidebar-title { font-size:10px; font-weight:700; color:#aaa; text-transform:uppercase; letter-spacing:0.6px; padding:14px 20px 6px }
    .sb-item { display:flex; align-items:center; gap:8px; padding:7px 20px; cursor:pointer; font-size:13px; color:#333; user-select:none; -webkit-tap-highlight-color:transparent }
    .sb-item:hover { background:#e8e8e8 }
    .sb-item.active { background:#eff4ff; color:#0061ff; font-weight:500 }
    .sb-arrow { width:12px; height:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#bbb; transition:transform 0.15s; cursor:pointer }
    .sb-arrow:hover { color:#555 }
    .main-content { flex:1; overflow-y:auto; display:flex; flex-direction:column; min-width:0 }
    .athlete-card { display:flex; align-items:center; gap:14px; padding:14px 20px; border-bottom:1px solid #f0f0f0; background:#fff; position:sticky; top:0; z-index:9; flex-shrink:0 }
    .ath-photo { width:44px; height:44px; border-radius:50%; object-fit:cover; border:1px solid #eee; flex-shrink:0 }
    .ath-ph { width:44px; height:44px; border-radius:50%; background:#e8f0ff; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#0061ff; flex-shrink:0 }
    .ath-name { font-size:16px; font-weight:600; color:#0f1923 }
    .ath-sub { font-size:11px; color:#aaa; margin-top:2px }
    .bc-bar { padding:8px 20px; display:flex; align-items:center; gap:4px; border-bottom:1px solid #f5f5f5; flex-wrap:wrap; flex-shrink:0 }
    .bc-btn { font-size:12px; color:#0061ff; background:none; border:none; cursor:pointer; padding:2px 4px; border-radius:4px }
    .bc-btn:hover { background:#eff4ff }
    .bc-sep { font-size:12px; color:#ccc }
    .bc-cur { font-size:12px; color:#555; font-weight:500; padding:2px 4px }
    .toolbar { padding:8px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f5f5f5; background:#fff; flex-shrink:0; position:sticky; top:72px; z-index:8 }
    .sort-dir-btn { display:flex; align-items:center; gap:4px; background:none; border:none; cursor:pointer; font-size:13px; color:#333; padding:4px 6px; border-radius:6px; font-family:inherit; font-weight:500 }
    .sort-dir-btn:hover { background:#f5f5f5 }
    .sort-cat-btn { display:flex; align-items:center; background:none; border:none; cursor:pointer; padding:4px; border-radius:6px; color:#bbb; opacity:0; transition:opacity 0.15s }
    .toolbar:hover .sort-cat-btn { opacity:1 }
    .ic-btn { width:30px; height:30px; border:1px solid #eee; border-radius:6px; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#555; transition:background 0.1s }
    .ic-btn:hover { background:#f5f5f5 }
    .ic-btn.on { background:#f0f0f0; border-color:#ccc }
    .lv-btns { display:flex; gap:3px }
    .file-list { flex:1; background:#fff }
    .frow { display:flex; align-items:center; gap:12px; padding:10px 20px; border-bottom:1px solid #f8f8f8; cursor:pointer; -webkit-tap-highlight-color:transparent }
    .frow:hover { background:#fafafa }
    .frow:active { background:#f3f3f3 }
    .frow-ic { width:36px; height:36px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:#f5f5f5; overflow:hidden }
    .frow-ic img { width:36px; height:36px; object-fit:cover }
    .frow-info { flex:1; min-width:0 }
    .frow-name { font-size:14px; color:#1a1a2e; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }
    .frow-meta { font-size:11px; color:#bbb; margin-top:1px }
    .frow-act { color:#ddd; flex-shrink:0; display:flex; align-items:center; gap:6px }
    .dl-btn { width:26px; height:26px; border-radius:5px; border:1px solid #eee; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#888; opacity:0; transition:opacity 0.15s }
    .frow:hover .dl-btn { opacity:1 }
    .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding:16px }
    .gcell { cursor:pointer; border-radius:8px; overflow:hidden; background:#f5f5f7; -webkit-tap-highlight-color:transparent }
    .gcell:hover { box-shadow:0 2px 10px rgba(0,0,0,0.1) }
    .gcell-ic { width:100%; aspect-ratio:1; display:flex; align-items:center; justify-content:center; background:#f0f1f3 }
    .gcell-ic img { width:100%; height:100%; object-fit:contain }
    .gcell-th { width:100%; aspect-ratio:1; object-fit:cover; display:block }
    .gcell-name { font-size:12px; color:#1a1a2e; padding:8px 10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; background:#fff; border-top:1px solid #eee }
    .prev-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.93); z-index:200; display:flex; flex-direction:column; align-items:center; justify-content:center }
    .prev-top { position:absolute; top:0; left:0; right:0; height:52px; display:flex; align-items:center; justify-content:space-between; padding:0 16px; background:linear-gradient(rgba(0,0,0,0.5),transparent) }
    .prev-name { color:#fff; font-size:14px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:60% }
    .prev-actions { display:flex; align-items:center; gap:8px }
    .prev-close { background:none; border:none; color:#fff; cursor:pointer; width:34px; height:34px; display:flex; align-items:center; justify-content:center; border-radius:50% }
    .prev-close:hover { background:rgba(255,255,255,0.15) }
    .prev-dl { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:#fff; cursor:pointer; padding:6px 14px; border-radius:7px; font-size:13px; font-weight:500; display:flex; align-items:center; gap:6px }
    .prev-img { max-width:90vw; max-height:85vh; object-fit:contain; border-radius:4px; display:block }
    .prev-video { max-width:90vw; max-height:85vh; border-radius:4px; outline:none; display:block }
    .loading { padding:40px; text-align:center; color:#aaa; font-size:13px; display:flex; align-items:center; justify-content:center; gap:8px }
    .spin { width:14px; height:14px; border:2px solid #eee; border-top-color:#0061ff; border-radius:50%; animation:sp 0.7s linear infinite; flex-shrink:0 }
    @keyframes sp { to { transform:rotate(360deg) } }
    .empty { padding:50px; text-align:center; color:#bbb; font-size:13px; background:#fff }
    .auth-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:#f5f6f8 }
    .auth-box { width:100%; max-width:360px; background:#fff; border-radius:14px; padding:32px 28px; box-shadow:0 2px 16px rgba(0,0,0,0.08) }
    .auth-logo { text-align:center; margin-bottom:24px }
    .auth-logo img { width:52px; height:52px; border-radius:10px; display:block; margin:0 auto 12px }
    .auth-logo h1 { font-size:18px; font-weight:600; color:#0f1923 }
    .auth-logo p { font-size:13px; color:#aaa; margin-top:3px }
    .auth-field { margin-bottom:12px }
    .auth-field label { display:block; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#aaa; margin-bottom:4px }
    .auth-field input { width:100%; padding:10px 12px; border:1.5px solid #e5e5e5; border-radius:8px; font-size:14px; outline:none; font-family:inherit; transition:border-color 0.15s }
    .auth-field input:focus { border-color:#0061ff }
    .auth-submit { width:100%; padding:11px; background:linear-gradient(135deg,#0066ff,#0044cc); color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; font-family:inherit }
    .auth-submit:disabled { opacity:0.5 }
    .auth-err { background:#fff0f0; border:1px solid #fca5a5; border-radius:7px; padding:8px 12px; font-size:13px; color:#dc2626; margin-bottom:10px }
    .toast { position:fixed; bottom:18px; left:50%; transform:translateX(-50%) translateY(8px); background:#1a1a2e; color:#fff; font-size:13px; padding:9px 16px; border-radius:9px; opacity:0; transition:opacity 0.2s,transform 0.2s; pointer-events:none; white-space:nowrap; z-index:300 }
    .toast.show { opacity:1; transform:translateX(-50%) translateY(0) }
    .toast.success { background:#16a34a }
    .toast.error { background:#dc2626 }
    @media(max-width:768px) {
      .sidebar { display:none }
      .grid { grid-template-columns:repeat(2,1fr); gap:10px; padding:12px }
    }
  `
  document.head.appendChild(s)
}

const ARROW_UP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><polyline points="18 15 12 9 6 15"/></svg>`
const ARROW_DN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><polyline points="6 9 12 15 18 9"/></svg>`
const ARROW_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><polyline points="6 9 12 15 18 9"/></svg>`
const GRID_IC = `<svg viewBox="0 0 24 24" fill="#333" width="14" height="14"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>`
const LIST_IC = `<svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill="#333"/><circle cx="3" cy="12" r="1" fill="#333"/><circle cx="3" cy="18" r="1" fill="#333"/></svg>`
const OUT_IC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`
const DL_IC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
const CLOSE_IC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
const FOLDER_IC_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="#0061ff" stroke-width="1.5" width="13" height="13"><path d="M3 7a2 2 0 0 1 2-2h3.586a1 1 0 0 1 .707.293L11 7h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`

function fileIcon(tag, name) {
  const e = extOf(name||'')
  let col = '#bbb'
  let path = 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z'
  if (tag==='folder') { col='#0061ff'; path='M3 7a2 2 0 0 1 2-2h3.586a1 1 0 0 1 .707.293L11 7h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }
  else if (VID_EXTS.includes(e)) { col='#6366f1'; path='M15 10l4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }
  else if (e==='pdf') col='#ef4444'
  else if (IMG_EXTS.includes(e)) { col='#10b981'; path='M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z' }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="${path}"/></svg>`
}

function renderAuth() {
  document.getElementById('app').innerHTML = `
    <div class="auth-wrap"><div class="auth-box">
      <div class="auth-logo">
        <img src="${LOGO}" />
        <h1>Portal do Atleta</h1>
        <p>All In Sports Group</p>
      </div>
      <div id="aer" class="auth-err" style="display:none"></div>
      <div class="auth-field"><label>Email</label><input type="email" id="ai" placeholder="o teu email" autocomplete="email"/></div>
      <div class="auth-field"><label>Password</label><input type="password" id="ap" placeholder="••••••••" autocomplete="current-password"/></div>
      <button class="auth-submit" id="ab">Entrar</button>
    </div></div>
    <div class="toast" id="toast"></div>
  `
  const doLogin = async () => {
    const email = document.getElementById('ai').value.trim()
    const pass = document.getElementById('ap').value
    const btn = document.getElementById('ab')
    const err = document.getElementById('aer')
    btn.disabled = true; btn.textContent = 'A entrar...'
    err.style.display = 'none'
    const r = await supabase.auth.signInWithPassword({email, password: pass})
    if (r.error) {
      err.textContent = 'Email ou password incorretos.'
      err.style.display = 'block'
      btn.disabled = false; btn.textContent = 'Entrar'
    }
  }
  document.getElementById('ab').addEventListener('click', doLogin)
  document.getElementById('ap').addEventListener('keydown', e => { if(e.key==='Enter') doLogin() })
}

function renderShell() {
  const ath = state.athlete
  let athHtml = ''
  if (ath) {
    const photoEl = ath.foto
      ? `<img class="ath-photo" src="${ath.foto}" />`
      : `<div class="ath-ph">${(ath.nome||'?')[0]}</div>`
    athHtml = `<div class="athlete-card">${photoEl}<div><div class="ath-name">${ath.nome||''}</div><div class="ath-sub">All In Sports Online</div></div></div>`
  }

  document.getElementById('app').innerHTML = `
    <div class="topbar">
      <div class="top-l">
        <img class="top-logo" src="${LOGO}" />
        <span class="top-title">Portal do Atleta</span>
      </div>
      <div class="top-r">
        <button class="out-btn" id="btn-out">${OUT_IC}</button>
      </div>
    </div>
    <div class="app-body">
      <div class="sidebar" id="sidebar">
        <div class="sidebar-title">Pastas</div>
        <div id="sidebar-list"><div class="loading"><div class="spin"></div></div></div>
      </div>
      <div class="main-content">
        ${athHtml}
        <div id="bc" class="bc-bar" style="display:none"></div>
        <div class="toolbar">
          <div style="display:flex;align-items:center;gap:2px">
            <button class="sort-dir-btn" id="sort-dir">Nome ${ARROW_UP}</button>
            <button class="sort-cat-btn" id="sort-cat">${ARROW_SM}</button>
          </div>
          <div class="lv-btns">
            <button class="ic-btn" id="lv-list" title="Lista">${LIST_IC}</button>
            <button class="ic-btn" id="lv-grid" title="Mosaico">${GRID_IC}</button>
          </div>
        </div>
        <div id="fl" class="file-list"><div class="loading"><div class="spin"></div> A carregar...</div></div>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `

  document.getElementById('btn-out').addEventListener('click', async () => { await supabase.auth.signOut(); renderAuth() })
  document.getElementById('lv-list').addEventListener('click', () => setLayout('list'))
  document.getElementById('lv-grid').addEventListener('click', () => setLayout('grid'))
  document.getElementById('sort-dir').addEventListener('click', () => {
    state.sortDir = state.sortDir === 1 ? -1 : 1
    updateSortBtn(); renderFiles()
  })
  document.getElementById('sort-cat').addEventListener('click', e => toggleSortMenu(e))
  setLayout(state.layout)
}

function setLayout(l) {
  state.layout = l
  const gl = document.getElementById('lv-grid')
  const ll = document.getElementById('lv-list')
  if (gl) gl.classList.toggle('on', l==='grid')
  if (ll) ll.classList.toggle('on', l==='list')
  renderFiles()
}

function updateSortBtn() {
  const btn = document.getElementById('sort-dir')
  if (!btn) return
  const labels = {name:'Nome', date:'Data', type:'Tipo'}
  btn.innerHTML = (labels[state.sortBy]||'Nome') + ' ' + (state.sortDir===1 ? ARROW_UP : ARROW_DN)
}

function toggleSortMenu(e) {
  e.stopPropagation()
  const existing = document.getElementById('sort-menu')
  if (existing) { existing.remove(); return }
  const btn = document.getElementById('sort-cat')
  const rect = btn.getBoundingClientRect()
  const menu = document.createElement('div')
  menu.id = 'sort-menu'
  menu.style.cssText = `position:fixed;top:${rect.bottom+4}px;left:${rect.left}px;background:#fff;border:1px solid #e5e5e5;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.12);z-index:100;min-width:170px;padding:6px 0`
  const items = [{key:'name',label:'Nome'},{key:'date',label:'Data'},{key:'type',label:'Tipo'}]
  menu.innerHTML = '<div style="padding:7px 14px 5px;font-size:10px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:0.5px">Ordenar por</div>'
    + items.map(it => {
      const active = state.sortBy === it.key
      return `<div class="sm-item" data-sort="${it.key}" style="display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;font-size:13px;color:${active?'#0061ff':'#333'}">
        <span style="color:${active?'#0061ff':'transparent'}">✓</span>
        <span style="font-weight:${active?'500':'400'}">${it.label}</span>
      </div>`
    }).join('')
  document.body.appendChild(menu)
  menu.querySelectorAll('.sm-item').forEach(el => {
    el.addEventListener('mouseover', () => el.style.background='#f5f5f5')
    el.addEventListener('mouseout', () => el.style.background='')
    el.addEventListener('click', () => {
      const wasActive = state.sortBy === el.dataset.sort
      state.sortBy = el.dataset.sort
      if (wasActive) state.sortDir = state.sortDir === 1 ? -1 : 1
      else state.sortDir = 1
      menu.remove(); updateSortBtn(); renderFiles()
    })
  })
  setTimeout(() => document.addEventListener('click', function rm() { menu.remove(); document.removeEventListener('click', rm) }), 0)
}

function renderBreadcrumb() {
  const bc = document.getElementById('bc')
  if (!bc) return
  if (state.breadcrumbs.length <= 1) { bc.style.display = 'none'; return }
  bc.style.display = 'flex'
  bc.innerHTML = state.breadcrumbs.map((b, i) =>
    i === state.breadcrumbs.length-1
      ? `<span class="bc-cur">${b.name}</span>`
      : `<button class="bc-btn" data-idx="${i}">${b.name}</button><span class="bc-sep">›</span>`
  ).join('')
  bc.querySelectorAll('.bc-btn').forEach(el =>
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.idx)
      state.breadcrumbs = state.breadcrumbs.slice(0, idx+1)
      loadFiles(state.breadcrumbs[idx].path)
    })
  )
}

function sortedFiles() {
  return [...state.files].sort((a, b) => {
    if (a['.tag'] !== b['.tag']) return a['.tag']==='folder' ? -1 : 1
    const dir = state.sortDir
    if (state.sortBy === 'date') {
      const ad = a.client_modified||a.server_modified||'', bd = b.client_modified||b.server_modified||''
      return ad < bd ? -dir : ad > bd ? dir : 0
    }
    if (state.sortBy === 'type') {
      const ae = extOf(a.name), be = extOf(b.name)
      return ae < be ? -dir : ae > be ? dir : 0
    }
    return a.name.localeCompare(b.name) * dir
  })
}

function renderFiles() {
  const fl = document.getElementById('fl')
  if (!fl) return
  if (!state.files.length) { fl.innerHTML = '<div class="empty">Pasta vazia</div>'; return }
  const files = sortedFiles()
  const tc = document.getElementById('tc')
  if (tc) tc.textContent = ''
  if (state.layout === 'grid') renderGrid(files, fl)
  else renderList(files, fl)
}

function renderList(files, fl) {
  fl.innerHTML = files.map(f => {
    const isF = f['.tag']==='folder'
    const thumb = state.thumbs[f.path_lower]
    const icHtml = thumb && isMedia(f.name)
      ? `<img src="${thumb}" style="width:36px;height:36px;object-fit:cover" />`
      : fileIcon(f['.tag'], f.name)
    return `<div class="frow" data-path="${f.path_lower}" data-tag="${f['.tag']}" data-name="${f.name.replace(/"/g,'&quot;')}">
      <div class="frow-ic">${icHtml}</div>
      <div class="frow-info">
        <div class="frow-name">${f.name}</div>
        ${f.size ? `<div class="frow-meta">${fmtSize(f.size)}</div>` : ''}
      </div>
      <div class="frow-act">
        ${isF
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>`
          : `<button class="dl-btn" data-dl="${f.path_lower}" data-name="${f.name.replace(/"/g,'&quot;')}">${DL_IC}</button>`
        }
      </div>
    </div>`
  }).join('')
  bindEvents(fl)
  loadThumbs(files)
}

function renderGrid(files, fl) {
  fl.innerHTML = `<div class="grid">${files.map(f => {
    const isF = f['.tag']==='folder'
    const thumb = state.thumbs[f.path_lower]
    const inner = thumb && isMedia(f.name)
      ? `<img class="gcell-th" src="${thumb}" />`
      : `<div class="gcell-ic">${isF ? `<img src="${FOLDER_ICON}" style="width:28%;height:28%;object-fit:contain" />` : fileIcon(f['.tag'], f.name)}</div>`
    const short = f.name.length > 24 ? f.name.slice(0,22)+'…' : f.name
    return `<div class="gcell" data-path="${f.path_lower}" data-tag="${f['.tag']}" data-name="${f.name.replace(/"/g,'&quot;')}">${inner}<div class="gcell-name">${short}</div></div>`
  }).join('')}</div>`
  bindEvents(fl)
  loadThumbs(files)
}

function bindEvents(container) {
  container.querySelectorAll('.frow,.gcell').forEach(el => {
    el.addEventListener('click', async e => {
      if (e.target.closest('.dl-btn')) return
      const path = el.dataset.path, tag = el.dataset.tag, name = el.dataset.name
      if (tag === 'folder') {
        state.breadcrumbs.push({name, path})
        history.pushState({lvl: state.breadcrumbs.length}, '', location.pathname)
        loadFiles(path)
      } else {
        openPreview(path, name)
      }
    })
  })
  container.querySelectorAll('.dl-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      doDownload(btn.dataset.dl, btn.dataset.name)
    })
  })
}

async function doDownload(path, name) {
  toast('A preparar download...', '')
  try {
    const link = await getLink(path)
    const a = document.createElement('a')
    a.href = link; a.download = name
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    toast('Download iniciado!', 'success')
  } catch { toast('Erro no download.', 'error') }
}

async function openPreview(path, name) {
  const ov = document.createElement('div')
  ov.className = 'prev-overlay'
  ov.innerHTML = `
    <div class="prev-top">
      <span class="prev-name">${name}</span>
      <div class="prev-actions">
        <button class="prev-dl" id="prev-dl">${DL_IC} Download</button>
        <button class="prev-close" id="prev-cls">${CLOSE_IC}</button>
      </div>
    </div>
    <div id="prev-body" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%">
      <div class="loading"><div class="spin"></div></div>
    </div>
  `
  document.body.appendChild(ov)
  const close = () => { if (document.body.contains(ov)) document.body.removeChild(ov) }
  document.getElementById('prev-cls').addEventListener('click', close)
  ov.addEventListener('click', e => { if (e.target===ov) close() })
  document.getElementById('prev-dl').addEventListener('click', () => doDownload(path, name))
  const onKey = e => { if (e.key==='Escape') { close(); document.removeEventListener('keydown', onKey) } }
  document.addEventListener('keydown', onKey)
  try {
    const link = await getLink(path)
    const body = document.getElementById('prev-body')
    if (!body) return
    if (isImg(name)) {
      const img = document.createElement('img')
      img.className = 'prev-img'; img.src = link
      body.innerHTML = ''; body.appendChild(img)
    } else if (isVid(name)) {
      const vid = document.createElement('video')
      vid.className = 'prev-video'; vid.src = link
      vid.controls = true; vid.autoplay = true; vid.playsInline = true
      body.innerHTML = ''; body.appendChild(vid)
    } else { close(); doDownload(path, name) }
  } catch { toast('Erro ao carregar preview.', 'error'); close() }
}

async function loadThumbs(files) {
  for (const f of files) {
    if (f['.tag']!=='folder' && isMedia(f.name) && !state.thumbs[f.path_lower]) {
      const url = await getThumb(f.path_lower)
      if (url) {
        state.thumbs[f.path_lower] = url
        document.querySelectorAll(`[data-path="${f.path_lower}"]`).forEach(el => {
          const ic = el.querySelector('.frow-ic, .gcell-ic')
          if (ic) ic.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover" />`
          const ct = el.querySelector('.gcell-th')
          if (ct) ct.src = url
        })
      }
    }
  }
}

async function loadFiles(path) {
  const fl = document.getElementById('fl')
  if (state.folderCache[path]) {
    state.files = state.folderCache[path]
    renderBreadcrumb(); renderFiles()
  } else {
    if (fl) fl.innerHTML = '<div class="loading"><div class="spin"></div> A carregar...</div>'
    state.files = await listFolder(path)
    renderBreadcrumb(); renderFiles()
  }
  setTimeout(() => {
    state.files.filter(f => f['.tag']==='folder' && !state.folderCache[f.path_lower])
      .forEach(f => listFolder(f.path_lower))
  }, 500)
}

async function loadSidebar(rootPath) {
  const entries = await listFolder(rootPath)
  const folders = entries.filter(e => e['.tag']==='folder').sort((a,b) => a.name.localeCompare(b.name))
  state.rootFolders = folders
  const sl = document.getElementById('sidebar-list')
  if (!sl) return
  if (!folders.length) { sl.innerHTML = '<div style="padding:8px 20px;font-size:12px;color:#ccc">Sem pastas</div>'; return }
  sl.innerHTML = ''
  folders.forEach(f => sl.appendChild(createSidebarItem(f, 0)))
}

function createSidebarItem(f, depth) {
  const wrap = document.createElement('div')
  const row = document.createElement('div')
  row.className = 'sb-item'
  row.style.paddingLeft = (20 + depth*14) + 'px'

  const arrow = document.createElement('span')
  arrow.className = 'sb-arrow'
  arrow.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="9" height="9"><polyline points="9 18 15 12 9 6"/></svg>`

  const ic = document.createElement('span')
  ic.style.cssText = 'flex-shrink:0;display:flex;align-items:center'
  ic.innerHTML = FOLDER_IC_SM

  const nm = document.createElement('span')
  nm.textContent = f.name
  nm.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0'

  row.appendChild(arrow); row.appendChild(ic); row.appendChild(nm)
  const children = document.createElement('div')
  children.style.display = 'none'
  wrap.appendChild(row); wrap.appendChild(children)

  arrow.addEventListener('click', async e => {
    e.stopPropagation()
    const expanded = state.sidebarExpanded[f.path_lower]
    if (expanded) {
      state.sidebarExpanded[f.path_lower] = false
      children.style.display = 'none'
      arrow.style.transform = ''
    } else {
      state.sidebarExpanded[f.path_lower] = true
      arrow.style.transform = 'rotate(90deg)'
      children.style.display = 'block'
      if (!state.sidebarChildren[f.path_lower]) {
        children.innerHTML = `<div style="padding:6px ${20+depth*14+28}px;font-size:11px;color:#ccc">A carregar...</div>`
        const sub = await listFolder(f.path_lower)
        const subFolders = sub.filter(e => e['.tag']==='folder').sort((a,b) => a.name.localeCompare(b.name))
        state.sidebarChildren[f.path_lower] = subFolders
        children.innerHTML = ''
        if (subFolders.length) subFolders.forEach(sf => children.appendChild(createSidebarItem(sf, depth+1)))
        else { arrow.style.opacity='0.2'; arrow.style.pointerEvents='none' }
      }
    }
  })

  row.addEventListener('click', () => {
    document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'))
    row.classList.add('active')
    state.breadcrumbs = [state.breadcrumbs[0], {name: f.name, path: f.path_lower}]
    history.pushState({lvl:2}, '', location.pathname)
    loadFiles(f.path_lower)
  })
  return wrap
}

window.addEventListener('popstate', () => {
  if (state.breadcrumbs.length > 1) {
    state.breadcrumbs.pop()
    loadFiles(state.breadcrumbs[state.breadcrumbs.length-1].path)
  }
})

async function init() {
  injectStyles()
  const sd = await supabase.auth.getSession()
  state.user = sd.data.session?.user || null
  if (!state.user) { renderAuth(); return }
  state.athlete = await getAthlete(state.user.email)
  renderShell()
  const root = state.athlete?.folder_path || '/All In Sports - Online'
  const rootName = root.split('/').pop() || 'Ficheiros'
  state.breadcrumbs = [{name: rootName, path: root}]
  history.replaceState({lvl:1}, '', location.pathname)
  await loadFiles(root)
  loadSidebar(root)
  supabase.auth.onAuthStateChange((event, session) => {
    state.user = session?.user || null
    if (!state.user) renderAuth()
    else if (event==='SIGNED_IN') init()
  })
}

init()
