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
    #app { min-height:100vh; display:flex; flex-direction:column }
    .topbar { height:52px; border-bottom:1px solid #eee; display:flex; align-items:center; justify-content:space-between; padding:0 20px; background:#fff; position:sticky; top:0; z-index:50; flex-shrink:0 }
    .top-l { display:flex; align-items:center; gap:10px }
    .top-logo { width:28px; height:28px; border-radius:6px; object-fit:cover }
    .top-title { font-size:15px; font-weight:600; color:#0f1923 }
    .top-r { display:flex; align-items:center; gap:6px }
    .out-btn { width:32px; height:32px; border:1px solid #eee; border-radius:7px; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#666 }
    .out-btn:hover { background:#f5f5f5 }
    .app-body { display:flex; flex:1; overflow:hidden; height:calc(100vh - 52px) }
    .sidebar { width:200px; flex-shrink:0; border-right:1px solid #f0f0f0; background:#fafafa; overflow-y:auto; height:100% }
    .sidebar-title { font-size:10px; font-weight:700; color:#aaa; text-transform:uppercase; letter-spacing:0.6px; padding:14px 20px 6px }
    .sb-item { display:flex; align-items:center; gap:8px; padding:7px 20px; cursor:pointer; font-size:13px; color:#333; user-select:none; -webkit-tap-highlight-color:transparent }
    .sb-item:hover { background:#efefef }
    .sb-item.active { background:#eff4ff; color:#0061ff; font-weight:500 }
    .sb-arrow { width:12px; height:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#bbb; transition:transform 0.15s; cursor:pointer }
    .sb-arrow:hover { color:#555 }
    .main-content { flex:1; overflow-y:auto; display:flex; flex-direction:column }
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
    .toolbar { padding:8px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f5f5f5; background:#fff; flex-shrink:0; position:sticky; top:73px; z-index:8 }
    .sort-dir-btn { display:flex; align-items:center; gap:4px; background:none; border:none; cursor:pointer; font-size:13px; color:#333; padding:4px 6px; border-radius:6px; font-family:inherit; font-weight:500 }
    .sort-dir-btn:hover { background:#f5f5f5 }
    .sort-cat-btn { display:flex; align-items:center; background:none; border:none; cursor:pointer; padding:4px; border-radius:6px; color:#bbb; opacity:0; transition:opacity 0.15s }
    .toolbar:hover .sort-cat-btn { opacity:1 }
    .ic-btn { width:30px; height:30px; border:1px solid #eee; border-radius:6px; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#555; transition:background 0.1s }
    .ic-btn:hover { background:#f5f5f5 }
    .ic-btn.on { background:#f0f0f0; border-color:#ccc }
    .lv-btns { display:flex; gap:3px }
    .file-list { flex:1 }
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
    .empty { padding:50px; text-align:center; color:#bbb; font-size:13px }
    .auth-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:#f7f7f7 }
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
      : `<div class="gcell-ic">${isF ? `<img src="${FOLDER_ICON}" style="width:80%;height:80%;object-fit:contain" />` : fileIcon(f['.tag'], f.name)}</div>`
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
