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
    '.toolbar{padding:8px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f5f5f5}',
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
    + '.sidebar{width:190px;flex-shrink:0;border-right:1px solid #f0f0f0;padding:12px 0;overflow-y:auto;background:#fafafa}'
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
    return \'<svg viewBox=\'0 0 100 80\' width=\'160\' height=\'128\' xmlns=\'http://www.w3.org/2000/svg\'>  <defs>    <linearGradient id=\'folderBack\' x1=\'0\' y1=\'0\' x2=\'0\' y2=\'1\'>      <stop offset=\'0%\' stop-color=\'#6bbde8\'/>      <stop offset=\'100%\' stop-color=\'#4aa8d8\'/>    </linearGradient>    <linearGradient id=\'folderFront\' x1=\'0\' y1=\'0\' x2=\'0\' y2=\'1\'>      <stop offset=\'0%\' stop-color=\'#82ccf0\'/>      <stop offset=\'100%\' stop-color=\'#5ab5e0\'/>    </linearGradient>    <linearGradient id=\'folderTab\' x1=\'0\' y1=\'0\' x2=\'0\' y2=\'1\'>      <stop offset=\'0%\' stop-color=\'#7ac4ec\'/>      <stop offset=\'100%\' stop-color=\'#5ab5e0\'/>    </linearGradient>    <filter id=\'shadow\' x=\'-5%\' y=\'-5%\' width=\'110%\' height=\'120%\'>      <feDropShadow dx=\'0\' dy=\'2\' stdDeviation=\'2\' flood-color=\'rgba(0,0,0,0.2)\'/>    </filter>  </defs>  <!-- Back of folder -->  <rect x=\'2\' y=\'18\' width=\'96\' height=\'60\' rx=\'6\' ry=\'6\' fill=\'url(#folderBack)\' filter=\'url(#shadow)\'/>  <!-- Tab -->  <path d=\'M2 18 Q2 12 8 12 L35 12 Q40 12 42 18 Z\' fill=\'url(#folderTab)\'/>  <!-- White divider line -->  <rect x=\'2\' y=\'22\' width=\'96\' height=\'4\' fill=\'white\' opacity=\'0.6\'/>  <!-- Front of folder -->  <rect x=\'2\' y=\'26\' width=\'96\' height=\'52\' rx=\'6\' ry=\'6\' fill=\'url(#folderFront)\'/>  <!-- Shine -->  <rect x=\'2\' y=\'26\' width=\'96\' height=\'18\' rx=\'6\' ry=\'0\' fill=\'white\' opacity=\'0.15\'/></svg>\'
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
    +'<button class=\"ic-btn\" id=\"btn-layout2\" title=\"Layout\">'+GSM_IC+'</button>'
    +'</div>'
    +'<div id=\"fl\" class=\"file-list\"><div class=\"loading\"><div class=\"spin\"></div> A carregar...</div></div>'
    +'</div>'
    +'</div>'
    +'</div>'
    +'<div class=\"toast\" id=\"toast\"></div>'

  document.getElementById('btn-out').addEventListener('click', async function(){ await supabase.auth.signOut(); renderAuth() })
  document.getElementById('btn-layout2').addEventListener('click', function(e){ toggleLayoutMenu(e) })
  document.getElementById('sort-btn').addEventListener('click', function(e){ toggleSortMenu(e) })
  setLayout(state.layout)
}

function setLayout(l) {
  state.layout = l
  // Update layout button icon
  var btn = document.getElementById('btn-layout2')
  if (btn) {
    var icons = {'list': LIST_IC, 'gsm': GSM_IC, 'glg': GLG_IC}
    btn.innerHTML = icons[l] || GSM_IC
    btn.classList.add('on')
  }
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
