import { supabase } from './supabase.js'

var DBX = 'sl.u.AGeeXs96yxNP8nkE6MndJ0vXPN2n9QAzXApCEZ2H66RN2HuTKruCW40UdDDCy2hJk_Aig63QfN9oArML5AB1KZ3Xd7mfFgzE19jwBXkvfcPb5acRM8H5tLHRZJrlAXH8_DjR11p1QObsPLLAd65Kj1eYokQ3H1rLVgxlpLBM11g_r8J23h2M498lKSzW2u-HOTm-fhgcfdUI4XTMNm5G7VNZPSz5ShVYuLFNrhYBduN3Q5E7NWulNxkuvb5gp9UiBw7rUY5GOMjcDSFllD3nlTrVCy0IgetEb7RhqOCIC0NfsfLahBbT66Nm2y-mnFcZFp9G-Ffet8I8183onI-MbC-M13zhPzI5v6Z4o7PoCz6fHvNReuMs8N865Jh1vREriVnl6hmxy2dBYGTP56lGnXC8-LHiRVNhkdREG5dPqH46dPIU22EzOzYyzNob1__FbmyocUHOlxr9FQb33dx7F8mFwYBeWO_CqzH3oEjx-4c02bprY-N22K3dgUy_AvAeNB3ZJpBOfYg-O6w-Q63qCCpoJmCSigsB5-KuuYySxNHblg69emTaqHPMDsR4zA6W6t6mLaAXIjaQgYH1C0kcajp3p9V8Y0N0YRBN88Kw4JWp1V8Zp37hSmxMr2k9uXAwmTj0hERr_mj6k614ygSXg8O4AfPMncOD_5C56Qz9L9I0jhoHKP6sRX9pUK_LkPbB2jyoCwdaoY84GLn4U-AMgmTXx8Y2rkApFGepiEve61eoGIfAg5y8XDVfSZwN_2sbLa3SgrSA7p5L64JpGnrryEqosm-sEkJGtvI9Ss7giz3tjjZgMTQCQP8ZDoBhxEc0YhK6urkjnRm0Y8ODeao253dtYLkZdLX2RlJZW4uBZ8Pt7ZUDtcHLmW9BUiIV00PZ120Qws2NFJZlucc0DazOVCAOkYABYVCNpL6-sDvNEDLntPo5Gonwm8aRAE1dDSDRTY2NYdhdxYIdmtJ7FRATZ3D15415vS7yuaXZepAqnUFMBYn2Jbp09hR_VKjY67Ji03ecZi7p9ENGgo4kgnDvnGZ1pX80oA6V2DGsSJ8lQMvi4GDtWDw5LnIK237-F1FcSA6xOY1s2famKzoC8zt3_t0HXEbY4ght5Pg7oE1ptrHHTOGihnMoURr5dbsZY2Vudibp3L2Q25N-lQJIZXPCKmXShkFL6a476la5Dhfw32IAb6CjPWmIKfGcymWTYQkp-k2-T7TroRlK9Q43bnEAhP3M1HyoRpiTgIkoeMsm3oXnknsnNuffgjflEA_IiLQ0wWwSucy8KCVvbv4X-HuwC8IPyv--c9Af5eAtNsPbNAx7cOAMd4cLXOHZ6rVntaXihtvD_bryi64NXkggKjfJWlxzzkwf882mGFpCzyh7BZCqiW2sznpDf-Nj1TEtzI8JvonCKfGdPj_KPqrZKpv2PgPe'
var LOGO = 'data:image/png;base64,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'
var state = { user: null, files: [], breadcrumbs: [] }

// ── ICONS (monochrome, Dropbox style) ──
function icon(type, name) {
  var ext = name ? name.split('.').pop().toLowerCase() : ''
  if (type === 'folder') return svg('M3 7a2 2 0 0 1 2-2h3.586a1 1 0 0 1 .707.293L11 7h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', '#555')
  var videoExts = ['mp4','mov','avi','mkv','wmv']
  var imgExts = ['jpg','jpeg','png','gif','webp','heic']
  var docExts = ['pdf','doc','docx']
  var sheetExts = ['xls','xlsx','csv']
  if (videoExts.indexOf(ext) >= 0) return svg('M15 10l4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', '#555')
  if (imgExts.indexOf(ext) >= 0) return svg('M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z', '#555')
  if (docExts.indexOf(ext) >= 0) return svg('M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z', '#555')
  if (sheetExts.indexOf(ext) >= 0) return svg('M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2H5a2 2 0 0 1-2-2zm0 5h18M10 3v18', '#555')
  return svg('M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z', '#555')
}

function svg(path, color) {
  return '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"' + color + '\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" width=\"20\" height=\"20\"><path d=\"' + path + '\"/></svg>'
}

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1048576) return (bytes/1024).toFixed(0) + ' KB'
  return (bytes/1048576).toFixed(1) + ' MB'
}

function toast(msg, type) {
  var t = document.getElementById('toast')
  if (!t) return
  t.textContent = msg
  t.className = 'toast' + (type ? ' ' + type : '')
  t.classList.add('show')
  setTimeout(function() { t.classList.remove('show') }, 2800)
}

// ── DROPBOX ──
async function dbx(endpoint, body) {
  var res = await fetch('https://api.dropboxapi.com/2/' + endpoint, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + DBX, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error('DBX ' + res.status)
  return res.json()
}

async function getTmpLink(path) {
  var res = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + DBX, 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: path })
  })
  return (await res.json()).link
}

async function listFolder(path) {
  try {
    var data = await dbx('files/list_folder', { path: path, recursive: false })
    return data.entries || []
  } catch(e) { toast('Erro ao carregar.', 'error'); return [] }
}

async function getAthleteFolder(email) {
  try {
    var r = await supabase.from('athlete_folders').select('folder_path').eq('email', email).single()
    return r.data ? r.data.folder_path : null
  } catch(e) { return null }
}

// ── CSS ──
function injectStyles() {
  var s = document.createElement('style')
  s.textContent = [
    '* { box-sizing:border-box; margin:0; padding:0; }',
    'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:#fff; color:#1a1a2e; -webkit-font-smoothing:antialiased; }',
    '.portal-wrap { display:flex; flex-direction:column; min-height:100vh; }',
    '.portal-top { height:56px; border-bottom:1px solid #e8e8e8; display:flex; align-items:center; justify-content:space-between; padding:0 20px; position:sticky; top:0; background:#fff; z-index:10; }',
    '.portal-logo { display:flex; align-items:center; gap:10px; }',
    '.portal-logo img { width:28px; height:28px; border-radius:6px; object-fit:cover; }',
    '.portal-logo-name { font-size:14px; font-weight:600; color:#1a1a2e; }',
    '.portal-logout { background:none; border:none; cursor:pointer; color:#888; font-size:13px; padding:6px 10px; border-radius:6px; transition:background 0.15s; }',
    '.portal-logout:hover { background:#f5f5f5; color:#333; }',
    '.portal-breadcrumb { padding:12px 20px; display:flex; align-items:center; gap:4px; flex-wrap:wrap; border-bottom:1px solid #f0f0f0; background:#fafafa; }',
    '.bc-item { font-size:13px; color:#0061ff; background:none; border:none; cursor:pointer; padding:2px 4px; border-radius:4px; }',
    '.bc-item:hover { background:#eff4ff; }',
    '.bc-sep { font-size:13px; color:#aaa; padding:0 2px; }',
    '.bc-current { font-size:13px; color:#333; font-weight:500; padding:2px 4px; }',
    '.file-list { flex:1; }',
    '.file-item { display:flex; align-items:center; gap:12px; padding:12px 20px; border-bottom:1px solid #f5f5f5; cursor:pointer; transition:background 0.1s; user-select:none; -webkit-tap-highlight-color:transparent; }',
    '.file-item:hover { background:#fafafa; }',
    '.file-item:active { background:#f0f0f0; }',
    '.file-ic { width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }',
    '.file-info { flex:1; min-width:0; }',
    '.file-name { font-size:14px; color:#1a1a2e; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }',
    '.file-meta { font-size:12px; color:#aaa; margin-top:1px; }',
    '.file-arrow { color:#ccc; flex-shrink:0; }',
    '.empty { padding:60px 20px; text-align:center; color:#aaa; font-size:14px; }',
    '.loading { padding:40px 20px; text-align:center; color:#aaa; font-size:14px; display:flex; align-items:center; justify-content:center; gap:10px; }',
    '.spin { width:16px; height:16px; border:2px solid #e0e0e0; border-top-color:#0061ff; border-radius:50%; animation:spin 0.7s linear infinite; }',
    '@keyframes spin { to { transform:rotate(360deg); } }',
    '.auth-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:#f7f7f7; }',
    '.auth-box { width:100%; max-width:380px; background:#fff; border-radius:12px; padding:36px 32px; box-shadow:0 2px 16px rgba(0,0,0,0.08); }',
    '.auth-hd { text-align:center; margin-bottom:28px; }',
    '.auth-hd img { width:48px; height:48px; border-radius:10px; display:block; margin:0 auto 12px; }',
    '.auth-hd h1 { font-size:18px; font-weight:600; color:#1a1a2e; margin-bottom:3px; }',
    '.auth-hd p { font-size:13px; color:#888; }',
    '.auth-field { margin-bottom:14px; }',
    '.auth-field label { display:block; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.4px; color:#888; margin-bottom:5px; }',
    '.auth-field input { width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:7px; font-size:14px; color:#1a1a2e; outline:none; transition:border-color 0.15s; -webkit-appearance:none; }',
    '.auth-field input:focus { border-color:#0061ff; }',
    '.auth-btn { width:100%; padding:11px; background:#0061ff; color:#fff; border:none; border-radius:7px; font-size:15px; font-weight:600; cursor:pointer; margin-top:4px; transition:opacity 0.15s; }',
    '.auth-btn:hover { opacity:0.88; }',
    '.auth-btn:disabled { opacity:0.5; cursor:not-allowed; }',
    '.auth-err { background:#fff0f0; border:1px solid #fca5a5; border-radius:7px; padding:9px 12px; font-size:13px; color:#dc2626; margin-bottom:12px; }',
    '.toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); background:#1a1a2e; color:#fff; font-size:13px; padding:10px 18px; border-radius:8px; opacity:0; transition:opacity 0.2s,transform 0.2s; pointer-events:none; white-space:nowrap; z-index:100; }',
    '.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }',
    '.toast.success { background:#16a34a; }',
    '.toast.error { background:#dc2626; }',
  ].join('')
  document.head.appendChild(s)
}

// ── AUTH UI ──
function renderAuth() {
  document.getElementById('app').innerHTML = ''
    + '<div class="auth-wrap"><div class="auth-box">'
    + '<div class="auth-hd">'
    + '<img src="' + LOGO + '" />'
    + '<h1>Portal do Atleta</h1>'
    + '<p>All In Sports Group</p>'
    + '</div>'
    + '<div id="auth-err" class="auth-err" style="display:none;"></div>'
    + '<div class="auth-field"><label>Email</label><input type="email" id="ae" placeholder="o teu email" autocomplete="email" /></div>'
    + '<div class="auth-field"><label>Password</label><input type="password" id="ap" placeholder="••••••••" autocomplete="current-password" /></div>'
    + '<button class="auth-btn" id="ab">Entrar</button>'
    + '</div></div>'
    + '<div class="toast" id="toast"></div>'

  document.getElementById('ab').addEventListener('click', async function() {
    var email = document.getElementById('ae').value.trim()
    var pass = document.getElementById('ap').value
    var btn = document.getElementById('ab')
    var err = document.getElementById('auth-err')
    btn.disabled = true; btn.textContent = 'A entrar...'
    err.style.display = 'none'
    var r = await supabase.auth.signInWithPassword({ email: email, password: pass })
    if (r.error) {
      err.textContent = 'Email ou password incorretos.'
      err.style.display = 'block'
      btn.disabled = false; btn.textContent = 'Entrar'
    }
  })
  document.getElementById('ap').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('ab').click()
  })
}

// ── MAIN UI ──
function renderShell(folderName) {
  var logoutSvg = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" width=\"16\" height=\"16\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"/></svg>'
  document.getElementById('app').innerHTML = ''
    + '<div class="portal-wrap">'
    + '<div class="portal-top">'
    + '<div class="portal-logo"><img src="' + LOGO + '" /><span class="portal-logo-name">All In Sports</span></div>'
    + '<button class="portal-logout" id="btn-out">' + logoutSvg + ' Sair</button>'
    + '</div>'
    + '<div id="bc" class="portal-breadcrumb" style="display:none;"></div>'
    + '<div id="fl" class="file-list"><div class="loading"><div class="spin"></div> A carregar...</div></div>'
    + '</div>'
    + '<div class="toast" id="toast"></div>'

  document.getElementById('btn-out').addEventListener('click', async function() {
    await supabase.auth.signOut(); renderAuth()
  })
}

function renderBreadcrumb() {
  var bc = document.getElementById('bc')
  if (!bc) return
  if (state.breadcrumbs.length <= 1) { bc.style.display = 'none'; return }
  bc.style.display = 'flex'
  var html = ''
  for (var i = 0; i < state.breadcrumbs.length; i++) {
    var b = state.breadcrumbs[i]
    if (i === state.breadcrumbs.length - 1) {
      html += '<span class=\"bc-current\">' + b.name + '</span>'
    } else {
      html += '<button class=\"bc-item\" data-idx=\"' + i + '\">' + b.name + '</button><span class=\"bc-sep\">›</span>'
    }
  }
  bc.innerHTML = html
  bc.querySelectorAll('.bc-item').forEach(function(el) {
    el.addEventListener('click', function() {
      var idx = parseInt(el.dataset.idx)
      state.breadcrumbs = state.breadcrumbs.slice(0, idx + 1)
      loadFiles(state.breadcrumbs[state.breadcrumbs.length - 1].path)
    })
  })
}

function renderFiles() {
  var fl = document.getElementById('fl')
  if (!fl) return
  if (!state.files.length) {
    fl.innerHTML = '<div class="empty">Pasta vazia</div>'; return
  }
  var sorted = state.files.slice().sort(function(a, b) {
    if (a['.tag'] !== b['.tag']) return a['.tag'] === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  var arrowSvg = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" width=\"14\" height=\"14\"><polyline points=\"9 18 15 12 9 6\"/></svg>'
  var dlSvg = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" width=\"14\" height=\"14\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>'
  var html = ''
  for (var i = 0; i < sorted.length; i++) {
    var f = sorted[i]
    var isFolder = f['.tag'] === 'folder'
    var size = isFolder ? '' : formatSize(f.size)
    var ic = icon(f['.tag'], f.name)
    var arrow = isFolder ? arrowSvg : dlSvg
    html += '<div class=\"file-item\" data-path=\"' + f.path_lower + '\" data-tag=\"' + f['.tag'] + '\" data-name=\"' + f.name.replace(/"/g, '&quot;') + '\">'
      + '<div class=\"file-ic\">' + ic + '</div>'
      + '<div class=\"file-info\">'
      + '<div class=\"file-name\">' + f.name + '</div>'
      + (size ? '<div class=\"file-meta\">' + size + '</div>' : '')
      + '</div>'
      + '<div class=\"file-arrow\">' + arrow + '</div>'
      + '</div>'
  }
  fl.innerHTML = html
  fl.querySelectorAll('.file-item').forEach(function(row) {
    row.addEventListener('click', async function() {
      var path = row.dataset.path
      var tag = row.dataset.tag
      var name = row.dataset.name
      if (tag === 'folder') {
        state.breadcrumbs.push({ name: name, path: path })
        history.pushState({ lvl: state.breadcrumbs.length }, '', location.pathname)
        loadFiles(path)
      } else {
        row.style.opacity = '0.5'
        toast('A preparar download...', '')
        try {
          var link = await getTmpLink(path)
          var a = document.createElement('a')
          a.href = link; a.download = name
          document.body.appendChild(a); a.click(); document.body.removeChild(a)
          toast('Download iniciado!', 'success')
        } catch(e) { toast('Erro no download.', 'error') }
        row.style.opacity = '1'
      }
    })
  })
}

async function loadFiles(path) {
  var fl = document.getElementById('fl')
  if (fl) fl.innerHTML = '<div class=\"loading\"><div class=\"spin\"></div> A carregar...</div>'
  state.files = await listFolder(path)
  renderBreadcrumb()
  renderFiles()
}

window.addEventListener('popstate', function() {
  if (state.breadcrumbs.length > 1) {
    state.breadcrumbs.pop()
    loadFiles(state.breadcrumbs[state.breadcrumbs.length - 1].path)
  }
})

async function init() {
  injectStyles()
  var sd = await supabase.auth.getSession()
  state.user = sd.data.session ? sd.data.session.user : null
  if (!state.user) { renderAuth(); return }
  renderShell()
  var folder = await getAthleteFolder(state.user.email)
  var root = folder || '/All In Sports - Online'
  var rootName = root.split('/').pop() || 'Ficheiros'
  state.breadcrumbs = [{ name: rootName, path: root }]
  history.replaceState({ lvl: 1 }, '', location.pathname)
  await loadFiles(root)
  supabase.auth.onAuthStateChange(function(event, session) {
    state.user = session ? session.user : null
    if (!state.user) renderAuth()
    else if (event === 'SIGNED_IN') init()
  })
}

init()
