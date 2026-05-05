import { supabase } from './supabase.js'

var PROXY = 'https://aiulcycosynvrriabpqg.supabase.co/functions/v1/dropbox-proxy'
var LOGO = 'data:image/png;base64,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'
var IMG_EXTS = ['jpg','jpeg','png','gif','webp','heic','bmp']
var VID_EXTS = ['mp4','mov','avi','mkv','wmv','m4v','webm']
var state = { user: null, athlete: null, files: [], breadcrumbs: [], layout: 'gsm', sortBy: 'name', sortDir: 1, thumbs: {}, linkCache: {}, rootFolders: [], folderCache: {} }

function ext(n) { return (n||'').split('.').pop().toLowerCase() }
function isImg(n) { return IMG_EXTS.indexOf(ext(n)) >= 0 }
function isVid(n) { return VID_EXTS.indexOf(ext(n)) >= 0 }
function isMedia(n) { return isImg(n) || isVid(n) }
function fmtSize(b) { if(!b)return''; if(b<1048576)return Math.round(b/1024)+' KB'; return (b/1048576).toFixed(1)+' MB' }

function toast(msg, type) {
  var t = document.getElementById('toast')
  if (!t) return
  t.textContent = msg
  t.className = 'toast' + (type ? ' '+type : '')
  t.classList.add('show')
  setTimeout(function(){ t.classList.remove('show') }, 2500)
}

async function proxyPost(action, body) {
  var r = await fetch(PROXY + '?action=' + action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!r.ok) throw new Error('Proxy ' + r.status)
  return r
}

async function getLink(path) {
  var cached = state.linkCache[path]
  if (cached && cached.exp > Date.now()) return cached.url
  var r = await proxyPost('link', { path: path })
  var d = await r.json()
  if (d.link) { state.linkCache[path] = { url: d.link, exp: Date.now() + 3 * 60 * 60 * 1000 } }
  return d.link
}

async function getThumb(path) {
  if (state.thumbs[path]) return state.thumbs[path]
  try {
    var r = await proxyPost('thumb', { resource: {'.tag':'path',path:path}, format:{'.tag':'jpeg'}, size:{'.tag':'w640h480'}, mode:{'.tag':'fitone_bestfit'} })
    if (!r.ok) return null
    var url = URL.createObjectURL(await r.blob())
    state.thumbs[path] = url
    return url
  } catch(e){ return null }
}

async function listFolder(path) {
  if (state.folderCache[path]) return state.folderCache[path]
  try {
    var r = await proxyPost('list', { path: path, recursive: false, include_media_info: true })
    var d = await r.json()
    var entries = d.entries || []
    state.folderCache[path] = entries
    return entries
  } catch(e){ toast('Erro ao carregar.','error'); return [] }
}

async function getAthlete(email) {
  try {
    var r = await supabase.from('athlete_folders').select('folder_path,nome,foto').eq('email', email).single()
    return r.data || null
  } catch(e){ return null }
}

function injectStyles() {
  var s = document.createElement('style')
  s.textContent = [
    '*{box-sizing:border-box;margin:0;padding:0}',
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#fff;color:#1a1a2e;-webkit-font-smoothing:antialiased;font-size:14px}',
    '#app{min-height:100vh}',
    // topbar
    '.topbar{height:56px;border-bottom:1px solid #e5e5e5;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;background:#fff;z-index:50}',
    '.top-l{display:flex;align-items:center;gap:10px}',
    '.top-logo{width:28px;height:28px;border-radius:6px;object-fit:cover;flex-shrink:0}',
    '.top-title{font-size:15px;font-weight:600;color:#0f1923;letter-spacing:-0.1px}',
    '.top-r{display:flex;align-items:center;gap:6px}',
    '.ic-btn{width:34px;height:34px;border:1px solid #e5e5e5;border-radius:7px;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#1a1a2e;transition:all 0.12s}',
    '.ic-btn:hover{background:#f5f5f5;border-color:#ddd}',
    '.ic-btn.on{background:#f0f0f0;border-color:#ccc;color:#1a1a2e}',
    '.out-btn{width:34px;height:34px;border:1px solid #e5e5e5;border-radius:7px;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#666;transition:background 0.12s}',
    '.out-btn:hover{background:#f5f5f5;border-color:#ddd}',
    // athlete card - Dropbox style header
    '.athlete-card{display:flex;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid #f0f0f0}',
    '.ath-photo{width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid #eee;flex-shrink:0}',
    '.ath-photo-ph{width:56px;height:56px;border-radius:50%;background:#e8f0ff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#0061ff;flex-shrink:0}',
    '.ath-info{}',
    '.ath-label{font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px}',
    '.ath-name{font-size:18px;font-weight:600;color:#0f1923;letter-spacing:-0.2px}',
    // breadcrumb
    '.bc-bar{padding:0 24px;height:44px;display:flex;align-items:center;gap:4px;border-bottom:1px solid #f5f5f5;overflow-x:auto}',
    '.bc-btn{font-size:13px;color:#0061ff;background:none;border:none;cursor:pointer;padding:3px 6px;border-radius:4px;white-space:nowrap;font-weight:500}',
    '.bc-btn:hover{background:#eff4ff}',
    '.bc-sep{font-size:13px;color:#ccc;flex-shrink:0}',
    '.bc-cur{font-size:13px;color:#555;font-weight:500;padding:3px 6px;white-space:nowrap}',
    // toolbar
    '.toolbar{padding:8px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f5f5f5;background:#fff;position:sticky;top:0;z-index:10}',
    '.tool-count{font-size:12px;color:#bbb}',
    '.tool-r{display:flex;gap:4px}',
    // list view
    '.file-list{flex:1}',
    '.frow{display:flex;align-items:center;gap:14px;padding:10px 24px;border-bottom:1px solid #f8f8f8;cursor:pointer;transition:background 0.1s;-webkit-tap-highlight-color:transparent;user-select:none}',
    '.frow:hover{background:#fafafa}',
    '.frow:active{background:#f3f3f3}',
    '.frow-ic{width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#f5f5f5;overflow:hidden}',
    '.frow-ic img{width:38px;height:38px;object-fit:cover;display:block}',
    '.frow-info{flex:1;min-width:0}',
    '.frow-name{font-size:14px;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}',
    '.frow-meta{font-size:12px;color:#bbb;margin-top:1px}',
    '.frow-act{color:#ddd;flex-shrink:0;display:flex;align-items:center;gap:6px}',
    '.dl-btn{width:28px;height:28px;border-radius:6px;border:1px solid #eee;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#888;opacity:0;transition:opacity 0.15s}',
    '.frow:hover .dl-btn{opacity:1}',
    // grid
    '.grid-sm{display:grid;grid-template-columns:repeat(2,minmax(200px,1fr));gap:20px;padding:24px}',
    '.grid-lg{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;padding:3px}',
    '.gcell{cursor:pointer;border-radius:10px;overflow:hidden;background:#f0f1f3;position:relative;transition:transform 0.12s,box-shadow 0.12s}',
    '.gcell:hover{box-shadow:0 2px 12px rgba(0,0,0,0.1);transform:translateY(-1px)}.gcell:active{transform:scale(0.97)}',
    '.gcell-thumb{width:100%;min-height:200px;max-height:240px;object-fit:cover;display:block}',
    '.gcell-icon{width:100%;min-height:200px;display:flex;align-items:center;justify-content:center;background:#eef0f5;padding:40px}',
    '.gcell-name{font-size:14px;color:#1a1a2e;text-align:left;padding:12px 16px 14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;border-top:1px solid #e5e5e5;font-weight:400}',
    '.gcell-name-lg{font-size:12px;padding:7px 8px}',
    // preview overlay
    '.prev-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.93);z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center}',
    '.prev-top{position:absolute;top:0;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;background:linear-gradient(rgba(0,0,0,0.5),transparent)}',
    '.prev-filename{color:#fff;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60%}',
    '.prev-actions{display:flex;align-items:center;gap:8px}',
    '.prev-close{background:none;border:none;color:#fff;cursor:pointer;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background 0.15s}',
    '.prev-close:hover{background:rgba(255,255,255,0.15)}',
    '.prev-dl-btn{background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:#fff;cursor:pointer;padding:7px 14px;border-radius:7px;font-size:13px;font-weight:500;display:flex;align-items:center;gap:6px;transition:background 0.15s}',
    '.prev-dl-btn:hover{background:rgba(255,255,255,0.25)}',
    '.prev-img{max-width:90vw;max-height:85vh;object-fit:contain;border-radius:4px;display:block}',
    '.prev-video{max-width:90vw;max-height:85vh;border-radius:4px;outline:none;display:block}',
    // states
    '.loading{padding:48px 24px;text-align:center;color:#bbb;font-size:13px;display:flex;align-items:center;justify-content:center;gap:10px}',
    '.spin{width:16px;height:16px;border:2px solid #eee;border-top-color:#0061ff;border-radius:50%;animation:sp 0.7s linear infinite;flex-shrink:0}',
    '@keyframes sp{to{transform:rotate(360deg)}}',
    '.empty{padding:60px 24px;text-align:center;color:#bbb;font-size:13px}',
    // auth
    '.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f7f7f7}',
    '.auth-box{width:100%;max-width:380px;background:#fff;border-radius:14px;padding:36px 32px;box-shadow:0 2px 20px rgba(0,0,0,0.08)}',
    '.auth-logo{text-align:center;margin-bottom:26px}',
    '.auth-logo img{width:52px;height:52px;border-radius:11px;display:block;margin:0 auto 12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}',
    '.auth-logo h1{font-size:19px;font-weight:600;color:#0f1923;margin-bottom:3px}',
    '.auth-logo p{font-size:13px;color:#aaa}',
    '.auth-field{margin-bottom:13px}',
    '.auth-field label{display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#aaa;margin-bottom:5px}',
    '.auth-field input{width:100%;padding:11px 13px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:14px;outline:none;-webkit-appearance:none;transition:border-color 0.15s;font-family:inherit}',
    '.auth-field input:focus{border-color:#0061ff}',
    '.auth-submit{width:100%;padding:12px;background:linear-gradient(135deg,#0066ff,#0044cc);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;margin-top:6px;font-family:inherit;transition:opacity 0.15s}',
    '.auth-submit:disabled{opacity:0.5;cursor:not-allowed}',
    '.auth-err{background:#fff0f0;border:1px solid #fca5a5;border-radius:7px;padding:9px 13px;font-size:13px;color:#dc2626;margin-bottom:12px}',
    '.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%) translateY(8px);background:#1a1a2e;color:#fff;font-size:13px;padding:10px 18px;border-radius:9px;opacity:0;transition:opacity 0.2s,transform 0.2s;pointer-events:none;white-space:nowrap;z-index:300}'
    + '.app-body{display:flex;flex:1;min-height:0}'
    + '.sidebar{width:190px;flex-shrink:0;border-right:1px solid #f0f0f0;padding:12px 0;overflow-y:auto;background:#fafafa;position:sticky;top:0;height:calc(100vh - 56px);align-self:flex-start}'
    + '.sidebar-title{font-size:11px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.5px;padding:6px 24px 4px}'
    + '.sidebar-item{display:flex;align-items:center;gap:8px;padding:8px 16px;cursor:pointer;font-size:13px;color:#444;border-radius:0;transition:background 0.1s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.sidebar-item:hover{background:#f0f0f0}'
    + '.sidebar-item.active{background:#eff4ff;color:#0061ff;font-weight:500}'
    + '.sidebar-item{display:flex;align-items:center;gap:6px;padding:7px 16px;cursor:pointer;font-size:13px;color:#444;transition:background 0.1s;user-select:none;-webkit-tap-highlight-color:transparent}'
    + '.sidebar-folder-ic{flex-shrink:0}'
    + '.main-content{flex:1;min-width:0;overflow-y:auto;display:flex;flex-direction:column}',
    '.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}',
    '.toast.success{background:#16a34a}',
    '.toast.error{background:#dc2626}',
  ].join('')
  document.head.appendChild(s)
}

function ficon(tag, name, large) {
  var e = ext(name||''), col='#bbb'
  var sz = large ? '80' : '20'
  var p = 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z'
  if (tag==='folder' && large) {
    return '<img src="' + FOLDER_ICON + '" style="width:120px;height:120px;object-fit:contain;display:block;" />'
  }
    if (tag==='folder'){col='#0061ff';p='M3 7a2 2 0 0 1 2-2h3.586a1 1 0 0 1 .707.293L11 7h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'}
  else if (VID_EXTS.indexOf(e)>=0){col='#6366f1';p='M15 10l4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'}
  else if (e==='pdf'){col='#ef4444'}
  else if (IMG_EXTS.indexOf(e)>=0){col='#10b981';p='M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z'}
  return '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"'+col+'\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" width=\"'+sz+'\" height=\"'+sz+'\"><path d=\"'+p+'\"/></svg>'
}

function renderAuth() {
  document.getElementById('app').innerHTML =
    '<div class=\"auth-wrap\"><div class=\"auth-box\">'
    +'<div class=\"auth-logo\"><img src=\"'+LOGO+'\" /><h1>Portal do Atleta</h1><p>All In Sports Group</p></div>'
    +'<div id=\"aer\" class=\"auth-err\" style=\"display:none;\"></div>'
    +'<div class=\"auth-field\"><label>Email</label><input type=\"email\" id=\"ai\" placeholder=\"o teu email\" autocomplete=\"email\" /></div>'
    +'<div class=\"auth-field\"><label>Password</label><input type=\"password\" id=\"ap\" placeholder=\"••••••••\" autocomplete=\"current-password\" /></div>'
    +'<button class=\"auth-submit\" id=\"ab\">Entrar</button>'
    +'</div></div><div class=\"toast\" id=\"toast\"></div>'
  var doLogin = async function() {
    var em=document.getElementById('ai').value.trim()
    var pw=document.getElementById('ap').value
    var btn=document.getElementById('ab'), er=document.getElementById('aer')
    btn.disabled=true; btn.textContent='A entrar...'
    er.style.display='none'
    var r=await supabase.auth.signInWithPassword({email:em,password:pw})
    if(r.error){er.textContent='Email ou password incorretos.';er.style.display='block';btn.disabled=false;btn.textContent='Entrar'}
  }
  document.getElementById('ab').addEventListener('click',doLogin)
  document.getElementById('ap').addEventListener('keydown',function(e){if(e.key==='Enter')doLogin()})
}

var LIST_IC='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#1a1a2e\" stroke-width=\"1.5\" width=\"15\" height=\"15\"><line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"/><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"/><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"/><circle cx=\"3\" cy=\"6\" r=\"1\" fill=\"#1a1a2e\"/><circle cx=\"3\" cy=\"12\" r=\"1\" fill=\"#1a1a2e\"/><circle cx=\"3\" cy=\"18\" r=\"1\" fill=\"#1a1a2e\"/></svg>'
var FOLDER_ICON = 'data:image/png;base64,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'
var GSM_IC='<svg viewBox=\"0 0 24 24\" fill=\"#1a1a2e\" width=\"15\" height=\"15\"><rect x=\"3\" y=\"3\" width=\"8\" height=\"8\" rx=\"1.5\"/><rect x=\"13\" y=\"3\" width=\"8\" height=\"8\" rx=\"1.5\"/><rect x=\"3\" y=\"13\" width=\"8\" height=\"8\" rx=\"1.5\"/><rect x=\"13\" y=\"13\" width=\"8\" height=\"8\" rx=\"1.5\"/></svg>'
var GLG_IC = GSM_IC
var OUT_IC='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"16\" height=\"16\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"/></svg>'
var DL_IC='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" width=\"13\" height=\"13\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>'
var ARR_IC='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" width=\"14\" height=\"14\"><polyline points=\"9 18 15 12 9 6\"/></svg>'
var CLOSE_IC='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"18\" height=\"18\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>'

function renderShell() {
  var ath = state.athlete
  var athHtml = ''
  if (ath) {
    var photoEl = ath.foto
      ? '<img class=\"ath-photo\" src=\"'+ath.foto+'\" />'
      : '<div class=\"ath-photo-ph\">'+(ath.nome||'?')[0]+'</div>'
    athHtml = '<div class=\"athlete-card\">'+photoEl+'<div class=\"ath-info\"><div class=\"ath-name\">'+(ath.nome||'')+'</div></div></div>'
  }
  document.getElementById('app').innerHTML =
    '<div style=\"display:flex;flex-direction:column;min-height:100vh;\">'
    +'<div class=\"topbar\">'
    +'<div class=\"top-l\"><img class=\"top-logo\" src=\"'+LOGO+'\" /><span class=\"top-title\">Portal do Atleta</span></div>'
    +'<div class=\"top-r\">'
    +'<button class=\"out-btn\" id=\"btn-out\">'+OUT_IC+'</button>'
    +'</div></div>'
    +athHtml
    +'<div id=\"bc\" class=\"bc-bar\" style=\"display:none;\"></div>'
    +'<div class=\"app-body\">'
    +'<div class=\"sidebar\" id=\"sidebar\"><div class=\"sidebar-title\">Pastas</div><div id=\"sidebar-list\"><div style=\"padding:8px 16px;font-size:12px;color:#ccc;\">A carregar...</div></div></div>'
    +'<div class=\"main-content\">'
    +'<div class=\"toolbar\">'
    +'<button id=\"sort-btn\" style=\"display:flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;font-size:13px;color:#555;padding:4px 8px;border-radius:6px;font-family:inherit;\">'
    +'<span style=\"font-weight:500;\">Nome ↑</span>'
    +'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"12\" height=\"12\"><polyline points=\"6 9 12 15 18 9\"/></svg>'
    +'</button>'
    +'<div style=\"display:flex;gap:4px;\">'
    +'<button class=\"ic-btn\" id=\"lv-gsm\">'+GSM_IC+'</button>'
    +'<button class=\"ic-btn\" id=\"lv-list\">'+LIST_IC+'</button>'
    +'</div>'
    +'</div>'
    +'<div id=\"fl\" class=\"file-list\"><div class=\"loading\"><div class=\"spin\"></div> A carregar...</div></div>'
    +'</div>'
    +'</div>'
    +'</div>'
    +'<div class=\"toast\" id=\"toast\"></div>'

  document.getElementById('btn-out').addEventListener('click', async function(){ await supabase.auth.signOut(); renderAuth() })
  document.getElementById('lv-gsm').addEventListener('click', function(){ setLayout('gsm') })
  document.getElementById('lv-list').addEventListener('click', function(){ setLayout('list') })
  document.getElementById('sort-btn').addEventListener('click', function(e){ toggleSortMenu(e) })
  setLayout(state.layout)
}

function setLayout(l) {
  state.layout = l
  var gsm = document.getElementById('lv-gsm')
  var lst = document.getElementById('lv-list')
  if (gsm) gsm.classList.toggle('on', l === 'gsm')
  if (lst) lst.classList.toggle('on', l === 'list')
  renderFiles()
}

function toggleLayoutMenu(e) {
  e.stopPropagation()
  var existing = document.getElementById('layout-menu')
  if (existing) { existing.remove(); return }
  var btn = document.getElementById('btn-layout2')
  var rect = btn.getBoundingClientRect()
  var menu = document.createElement('div')
  menu.id = 'layout-menu'
  menu.style.cssText = 'position:fixed;top:'+(rect.bottom+6)+'px;right:'+(window.innerWidth-rect.right)+'px;background:#fff;border:1px solid #e5e5e5;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.12);z-index:100;min-width:200px;padding:6px 0;'
  var label = '<div style=\"padding:8px 16px 6px;font-size:11px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.4px;\">Layout</div>'
  var items = [
    {key:'gsm', label:'Mosaico', icon:GSM_IC},
    {key:'list', label:'Lista', icon:LIST_IC},
  ]
  var rows = items.map(function(it){
    var active = state.layout === it.key
    return '<div class=\"lm-item\" data-layout=\"'+it.key+'\" style=\"display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:14px;color:'+(active?'#0061ff':'#333')+';\">'
      +'<span style=\"color:'+(active?'#0061ff':'transparent')+'\">✓</span>'
      +'<span style=\"flex:1;font-weight:'+(active?'500':'400')+'\">'+ it.label+'</span>'
      +it.icon
      +'</div>'
  }).join('')
  menu.innerHTML = label + rows
  document.body.appendChild(menu)
  menu.querySelectorAll('.lm-item').forEach(function(el){
    el.addEventListener('mouseover', function(){ el.style.background='#f5f5f5' })
    el.addEventListener('mouseout', function(){ el.style.background='transparent' })
    el.addEventListener('click', function(){
      setLayout(el.dataset.layout)
      menu.remove()
    })
  })
  setTimeout(function(){
    document.addEventListener('click', function rm(){ menu.remove(); document.removeEventListener('click', rm) })
  }, 0)
}

function toggleSortMenu(e) {
  e.stopPropagation()
  var existing = document.getElementById('sort-menu')
  if (existing) { existing.remove(); return }
  var btn = e.currentTarget
  var rect = btn.getBoundingClientRect()
  var menu = document.createElement('div')
  menu.id = 'sort-menu'
  menu.style.cssText = 'position:fixed;top:'+(rect.bottom+6)+'px;left:'+rect.left+'px;background:#fff;border:1px solid #e5e5e5;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.12);z-index:100;min-width:180px;padding:6px 0;'
  var label = '<div style=\"padding:8px 16px 6px;font-size:11px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.4px;\">Ordenar por</div>'
  var items = [
    {key:'name', label:'Nome'},
    {key:'date', label:'Data'},
    {key:'type', label:'Tipo'},
  ]
  var rows = items.map(function(it){
    var active = (state.sortBy||'name') === it.key
    return '<div class=\"sm-item\" data-sort=\"'+it.key+'\" style=\"display:flex;align-items:center;gap:10px;padding:10px 16px;cursor:pointer;font-size:14px;color:'+(active?'#0061ff':'#333')+';\">'
      +'<span style=\"color:'+(active?'#0061ff':'transparent')+'\">✓</span>'
      +'<span style=\"font-weight:'+(active?'500':'400')+'\">'+ it.label+'</span>'
      +'</div>'
  }).join('')
  menu.innerHTML = label + rows
  document.body.appendChild(menu)
  menu.querySelectorAll('.sm-item').forEach(function(el){
    el.addEventListener('mouseover', function(){ el.style.background='#f5f5f5' })
    el.addEventListener('mouseout', function(){ el.style.background='transparent' })
    el.addEventListener('click', function(){
      state.sortBy = el.dataset.sort
      menu.remove()
      updateSortBtn()
      renderFiles()
    })
  })
  setTimeout(function(){
    document.addEventListener('click', function rm(){ menu.remove(); document.removeEventListener('click', rm) })
  }, 0)
}

function updateSortBtn() {
  var btn = document.getElementById('sort-btn')
  if (!btn) return
  var labels = {name:'Nome', date:'Data', type:'Tipo'}
  var arr = state.sortDir === 1 ? ' ↑' : ' ↓'
  btn.innerHTML = '<span style=\"font-weight:500;\">'+(labels[state.sortBy||'name']||'Nome')+arr+'</span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"12\" height=\"12\"><polyline points=\"6 9 12 15 18 9\"/></svg>'
}

function renderBreadcrumb() {
  var bc = document.getElementById('bc')
  if (!bc) return
  if (state.breadcrumbs.length <= 1) { bc.style.display = 'none'; return }
  bc.style.display = 'flex'
  var h = ''
  for (var i = 0; i < state.breadcrumbs.length; i++) {
    var b = state.breadcrumbs[i]
    if (i === state.breadcrumbs.length-1) { h += '<span class=\"bc-cur\">'+b.name+'</span>' }
    else { h += '<button class=\"bc-btn\" data-idx=\"'+i+'\">'+b.name+'</button><span class=\"bc-sep\">›</span>' }
  }
  bc.innerHTML = h
  bc.querySelectorAll('.bc-btn').forEach(function(el){
    el.addEventListener('click', function(){
      var idx = parseInt(el.dataset.idx)
      state.breadcrumbs = state.breadcrumbs.slice(0, idx+1)
      loadFiles(state.breadcrumbs[idx].path)
    })
  })
}

function renderFiles() {
  var fl = document.getElementById('fl')
  if (!fl) return
  if (!state.files.length) { fl.innerHTML = '<div class=\"empty\">Pasta vazia</div>'; return }
  var sorted = state.files.slice().sort(function(a,b){
    if (a['.tag']!==b['.tag']) return a['.tag']==='folder'?-1:1
    var sortBy = state.sortBy || 'name'
    var dir = state.sortDir || 1
    if (sortBy === 'date') {
      var ad = a.client_modified || a.server_modified || ''
      var bd = b.client_modified || b.server_modified || ''
      return ad < bd ? -dir : ad > bd ? dir : 0
    }
    if (sortBy === 'type') {
      var ae = ext(a.name), be2 = ext(b.name)
      return ae < be2 ? -dir : ae > be2 ? dir : 0
    }
    return a.name.localeCompare(b.name) * dir
  })
  var tc = document.getElementById('tc')
  if (tc) tc.textContent = ''
  if (state.layout === 'list') renderList(sorted, fl)
  else renderGrid(sorted, fl)
}

function renderList(files, fl) {
  var h = ''
  for (var i = 0; i < files.length; i++) {
    var f = files[i], isF = f['.tag']==='folder'
    var thumb = state.thumbs[f.path_lower]
    var icHtml = thumb && isMedia(f.name)
      ? '<img src=\"'+thumb+'\" style=\"width:38px;height:38px;object-fit:cover;\" />'
      : ficon(f['.tag'], f.name)
    h += '<div class=\"frow\" data-path=\"'+f.path_lower+'\" data-tag=\"'+f['.tag']+'\" data-name=\"'+f.name.replace(/"/g,'&quot;')+'\">'
      +'<div class=\"frow-ic\">'+icHtml+'</div>'
      +'<div class=\"frow-info\"><div class=\"frow-name\">'+f.name+'</div>'+(f.size?'<div class=\"frow-meta\">'+fmtSize(f.size)+'</div>':'')+'</div>'
      +'<div class=\"frow-act\">'
      +(isF ? ARR_IC : '<button class=\"dl-btn\" data-dl=\"'+f.path_lower+'\" data-name=\"'+f.name.replace(/"/g,'&quot;')+'\">'+DL_IC+'</button>')
      +'</div>'
      +'</div>'
  }
  fl.innerHTML = h
  bindEvents(fl)
  loadThumbs(files)
}

function renderGrid(files, fl) {
  var lg = state.layout === 'glg'
  var cls = lg ? 'grid-lg' : 'grid-sm'
  var nameCls = lg ? 'gcell-name gcell-name-lg' : 'gcell-name'
  var h = '<div class=\"'+cls+'\">'
  for (var i = 0; i < files.length; i++) {
    var f = files[i]
    var thumb = state.thumbs[f.path_lower]
    var inner = thumb && isMedia(f.name)
      ? '<img class=\"gcell-thumb\" src=\"'+thumb+'\" />'
      : '<div class=\"gcell-icon\">'+ficon(f['.tag'], f.name, true)+'</div>'
    var short = f.name.length > 22 ? f.name.slice(0,20)+'…' : f.name
    h += '<div class=\"gcell\" data-path=\"'+f.path_lower+'\" data-tag=\"'+f['.tag']+'\" data-name=\"'+f.name.replace(/"/g,'&quot;')+'\">'
      +inner+'<div class=\"'+nameCls+'\">'+short+'</div></div>'
  }
  h += '</div>'
  fl.innerHTML = h
  bindEvents(fl)
  loadThumbs(files)
}

function bindEvents(container) {
  // Folder/file rows
  container.querySelectorAll('.frow,.gcell').forEach(function(el){
    el.addEventListener('click', async function(e){
      if (e.target.closest('.dl-btn')) return
      var path = el.dataset.path, tag = el.dataset.tag, name = el.dataset.name
      if (tag === 'folder') {
        state.breadcrumbs.push({name:name, path:path})
        history.pushState({lvl:state.breadcrumbs.length}, '', location.pathname)
        loadFiles(path)
      } else {
        openPreview(path, name)
      }
    })
  })
  // Download buttons (list view only)
  container.querySelectorAll('.dl-btn').forEach(function(btn){
    btn.addEventListener('click', async function(e){
      e.stopPropagation()
      var path = btn.dataset.dl, name = btn.dataset.name
      await doDownload(path, name)
    })
  })
}

async function doDownload(path, name) {
  toast('A preparar download...', '')
  try {
    var link = await getLink(path)
    var a = document.createElement('a')
    a.href = link; a.download = name
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    toast('Download iniciado!', 'success')
  } catch(e){ toast('Erro no download.', 'error') }
}

async function openPreview(path, name) {
  var ov = document.createElement('div')
  ov.className = 'prev-overlay'
  ov.innerHTML = ''
    + '<div class=\"prev-top\">'
    + '<span class=\"prev-filename\">'+name+'</span>'
    + '<div class=\"prev-actions\">'
    + '<button class=\"prev-dl-btn\" id=\"prev-dl\">'+DL_IC+' Download</button>'
    + '<button class=\"prev-close\" id=\"prev-cls\">'+CLOSE_IC+'</button>'
    + '</div></div>'
    + '<div id=\"prev-body\" style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%;\"><div class=\"loading\"><div class=\"spin\"></div></div></div>'
  document.body.appendChild(ov)

  var close = function(){ if(document.body.contains(ov)) document.body.removeChild(ov) }
  document.getElementById('prev-cls').addEventListener('click', close)
  ov.addEventListener('click', function(e){ if(e.target===ov) close() })
  document.getElementById('prev-dl').addEventListener('click', function(){ doDownload(path, name) })

  // Keyboard close
  var onKey = function(e){ if(e.key==='Escape') { close(); document.removeEventListener('keydown', onKey) } }
  document.addEventListener('keydown', onKey)

  try {
    var link = await getLink(path)
    var body = document.getElementById('prev-body')
    if (!body) return
    if (isImg(name)) {
      var img = document.createElement('img')
      img.className = 'prev-img'
      img.src = link
      body.innerHTML = ''
      body.appendChild(img)
    } else if (isVid(name)) {
      var vid = document.createElement('video')
      vid.className = 'prev-video'
      vid.src = link
      vid.controls = true
      vid.autoplay = true
      vid.playsInline = true
      body.innerHTML = ''
      body.appendChild(vid)
    } else {
      close()
      doDownload(path, name)
    }
  } catch(e){ toast('Erro ao carregar preview.', 'error'); close() }
}

async function loadThumbs(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i]
    if (f['.tag']!=='folder' && isMedia(f.name) && !state.thumbs[f.path_lower]) {
      var url = await getThumb(f.path_lower)
      if (url) {
        state.thumbs[f.path_lower] = url
        document.querySelectorAll('[data-path=\"'+f.path_lower+'\"]').forEach(function(el){
          var ic = el.querySelector('.frow-ic, .gcell-icon')
          if (ic) { ic.innerHTML = '<img src=\"'+url+'\" style=\"width:100%;height:100%;object-fit:cover;\" />'; ic.className = ic.classList.contains('frow-ic')?'frow-ic':'gcell-icon' }
          var ct = el.querySelector('.gcell-thumb')
          if (ct) ct.src = url
        })
      }
    }
  }
}

async function loadFiles(path) {
  var fl = document.getElementById('fl')
  // Show cached content immediately, then refresh
  if (state.folderCache[path]) {
    state.files = state.folderCache[path]
    renderBreadcrumb()
    renderFiles()
  } else {
    if (fl) fl.innerHTML = '<div class=\"loading\"><div class=\"spin\"></div> A carregar...</div>'
    state.files = await listFolder(path)
    renderBreadcrumb()
    renderFiles()
  }
  // Preload subfolders in background
  setTimeout(function(){
    state.files.filter(function(f){ return f['.tag']==='folder' && !state.folderCache[f.path_lower] }).forEach(function(f){
      listFolder(f.path_lower)
    })
  }, 500)
}

window.addEventListener('popstate', function(){
  if (state.breadcrumbs.length > 1) {
    state.breadcrumbs.pop()
    loadFiles(state.breadcrumbs[state.breadcrumbs.length-1].path)
  }
})

var sidebarExpanded = {}
var sidebarChildren = {}

async function loadSidebar(rootPath) {
  var entries = await listFolder(rootPath)
  var folders = entries.filter(function(e){ return e['.tag']==='folder' })
  state.rootFolders = folders
  var sl = document.getElementById('sidebar-list')
  if (!sl) return
  if (!folders.length) { sl.innerHTML = '<div style=\"padding:8px 16px;font-size:12px;color:#ccc;\">Sem pastas</div>'; return }
  folders.sort(function(a,b){ return a.name.localeCompare(b.name) })
  renderSidebarItems(sl, folders, 0)
}

function renderSidebarItems(container, folders, depth) {
  container.innerHTML = ''
  folders.forEach(function(f){
    var item = createSidebarItem(f, depth)
    container.appendChild(item)
  })
}

function createSidebarItem(f, depth) {
  var wrap = document.createElement('div')
  wrap.dataset.path = f.path_lower

  var row = document.createElement('div')
  row.className = 'sidebar-item'
  row.style.paddingLeft = (24 + depth*14) + 'px'

  var arrowEl = document.createElement('span')
  arrowEl.className = 'sb-arrow'
  arrowEl.style.cssText = 'width:14px;height:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#bbb;transition:transform 0.15s;'
  arrowEl.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"10\" height=\"10\"><polyline points=\"9 18 15 12 9 6\"/></svg>'

  var icEl = document.createElement('span')
  icEl.style.cssText = 'flex-shrink:0;display:flex;align-items:center;'
  icEl.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0061ff\" stroke-width=\"1.5\" width=\"14\" height=\"14\"><path d=\"M3 7a2 2 0 0 1 2-2h3.586a1 1 0 0 1 .707.293L11 7h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/></svg>'

  var nameEl = document.createElement('span')
  nameEl.textContent = f.name
  nameEl.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;'

  row.appendChild(arrowEl)
  row.appendChild(icEl)
  row.appendChild(nameEl)
  wrap.appendChild(row)

  // Children container
  var children = document.createElement('div')
  children.className = 'sb-children'
  children.style.display = 'none'
  wrap.appendChild(children)

  // Click on arrow to expand
  arrowEl.addEventListener('click', async function(e){
    e.stopPropagation()
    var expanded = sidebarExpanded[f.path_lower]
    if (expanded) {
      sidebarExpanded[f.path_lower] = false
      children.style.display = 'none'
      arrowEl.style.transform = ''
    } else {
      sidebarExpanded[f.path_lower] = true
      arrowEl.style.transform = 'rotate(90deg)'
      children.style.display = 'block'
      if (!sidebarChildren[f.path_lower]) {
        children.innerHTML = '<div style=\"padding:6px '+(16+depth*14+28)+'px;font-size:11px;color:#ccc;\">A carregar...</div>'
        var sub = await listFolder(f.path_lower)
        var subFolders = sub.filter(function(e){ return e['.tag']==='folder' })
        subFolders.sort(function(a,b){ return a.name.localeCompare(b.name) })
        sidebarChildren[f.path_lower] = subFolders
        children.innerHTML = ''
        if (subFolders.length) {
          subFolders.forEach(function(sf){
            children.appendChild(createSidebarItem(sf, depth+1))
          })
        } else {
          arrowEl.style.opacity = '0.2'
          arrowEl.style.pointerEvents = 'none'
        }
      }
    }
  })

  // Click on row to navigate
  row.addEventListener('click', function(){
    document.querySelectorAll('.sidebar-item').forEach(function(i){ i.classList.remove('active') })
    row.classList.add('active')
    var crumbs = [{name: state.breadcrumbs[0].name, path: state.breadcrumbs[0].path}]
    // Build breadcrumbs from depth
    crumbs.push({name: f.name, path: f.path_lower})
    state.breadcrumbs = crumbs
    history.pushState({lvl:2}, '', location.pathname)
    loadFiles(f.path_lower)
  })

  return wrap
}

async function init() {
  injectStyles()
  var sd = await supabase.auth.getSession()
  state.user = sd.data.session ? sd.data.session.user : null
  if (!state.user) { renderAuth(); return }
  state.athlete = await getAthlete(state.user.email)
  renderShell()
  var root = state.athlete && state.athlete.folder_path ? state.athlete.folder_path : '/All In Sports - Online'
  var rootName = root.split('/').pop() || 'Ficheiros'
  state.breadcrumbs = [{name:rootName, path:root}]
  history.replaceState({lvl:1}, '', location.pathname)
  await loadFiles(root)
  loadSidebar(root)
  supabase.auth.onAuthStateChange(function(event, session){
    state.user = session ? session.user : null
    if (!state.user) renderAuth()
    else if (event==='SIGNED_IN') init()
  })
}

init()
