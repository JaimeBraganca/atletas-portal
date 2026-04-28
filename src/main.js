import { supabase } from './supabase.js'

const DROPBOX_TOKEN =  + DROPBOX_TOKEN + r
const LOGO =  + LOGO_SRC + r

let state = {
  user: null,
  currentPath: null,
  files: [],
  breadcrumbs: [],
}

// ── ICONS ──
function getFileIcon(entry) {
  const isFolder = entry.tag === 'folder'
  if (isFolder) {
    return '<svg viewBox="0 0 24 24" width="28" height="28"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="#e8f0ff" stroke="#0066ff" stroke-width="1.5"/></svg>'
  }
  const ext = entry.name.split('.').pop().toLowerCase()
  const colors = {
    pdf: ['#fee2e2', '#dc2626'],
    mp4: ['#dbeafe', '#1d4ed8'], mov: ['#dbeafe', '#1d4ed8'], avi: ['#dbeafe', '#1d4ed8'], mkv: ['#dbeafe', '#1d4ed8'],
    jpg: ['#dcfce7', '#16a34a'], jpeg: ['#dcfce7', '#16a34a'], png: ['#dcfce7', '#16a34a'], gif: ['#dcfce7', '#16a34a'],
    doc: ['#dbeafe', '#1d4ed8'], docx: ['#dbeafe', '#1d4ed8'],
    xls: ['#dcfce7', '#16a34a'], xlsx: ['#dcfce7', '#16a34a'],
    ppt: ['#ffedd5', '#ea580c'], pptx: ['#ffedd5', '#ea580c'],
    zip: ['#fef3c7', '#d97706'], rar: ['#fef3c7', '#d97706'],
  }
  const [bg, color] = colors[ext] || ['#f1f5f9', '#64748b']
  const labels = {
    pdf: 'PDF', mp4: 'MP4', mov: 'MOV', avi: 'AVI', mkv: 'MKV',
    jpg: 'IMG', jpeg: 'IMG', png: 'IMG', gif: 'GIF',
    doc: 'DOC', docx: 'DOC', xls: 'XLS', xlsx: 'XLS',
    ppt: 'PPT', pptx: 'PPT', zip: 'ZIP', rar: 'RAR',
  }
  const label = labels[ext] || ext.toUpperCase().slice(0,3)
  return `<div style="width:40px;height:40px;border-radius:8px;background:${bg};display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1px;">
    <span style="font-size:8px;font-weight:700;color:${color};font-family:'DM Mono',monospace;letter-spacing:0.3px;">${label}</span>
    <div style="width:20px;height:2px;background:${color};border-radius:1px;opacity:0.4;"></div>
  </div>`
}

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB'
  return (bytes/(1024*1024)).toFixed(1) + ' MB'
}

function showToast(msg, type='') {
  const t = document.getElementById('toast')
  if (!t) return
  t.textContent = msg
  t.className = 'toast' + (type ? ' ' + type : '')
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2800)
}

// ── DROPBOX ──
async function dropboxRequest(endpoint, body) {
  const res = await fetch(`https://api.dropboxapi.com/2/${endpoint}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${DROPBOX_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(`Dropbox error: ${res.status}`)
  return res.json()
}

async function getDownloadLink(path) {
  const res = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${DROPBOX_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ path })
  })
  const data = await res.json()
  return data.link
}

async function listFolder(path) {
  try {
    const data = await dropboxRequest('files/list_folder', { path, recursive: false })
    return (data.entries || []).map(e => ({ ...e, tag: e['.tag'] }))
  } catch(e) {
    showToast('Erro ao carregar ficheiros.', 'error')
    return []
  }
}

async function findAthleteFolder(email) {
  try {
    const { data, error } = await supabase.from('athlete_folders').select('folder_path').eq('email', email).single()
    if (error || !data) return null
    return data.folder_path
  } catch(e) { return null }
}

// ── AUTH ──
function renderAuth() {
  document.getElementById('app').innerHTML = `
    <div class="auth-screen">
      <div class="auth-card">
        <div class="auth-logo">
          <img src="${LOGO}" class="auth-logo-img" />
          <div class="auth-title">Portal do Atleta</div>
          <div class="auth-sub">All In Sports Group</div>
        </div>
        <form class="auth-form" id="auth-form">
          <div>
            <label class="field-label">Email</label>
            <input class="field-input" type="email" id="auth-email" placeholder="o teu email" autocomplete="email" required />
          </div>
          <div>
            <label class="field-label">Password</label>
            <input class="field-input" type="password" id="auth-password" placeholder="••••••••" autocomplete="current-password" required />
          </div>
          <div id="auth-error" style="display:none" class="auth-error"></div>
          <button type="submit" class="btn-primary" id="auth-btn">Entrar</button>
        </form>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `
  document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('auth-email').value.trim()
    const password = document.getElementById('auth-password').value
    const btn = document.getElementById('auth-btn')
    const errEl = document.getElementById('auth-error')
    btn.disabled = true; btn.textContent = 'A entrar...'
    errEl.style.display = 'none'
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      errEl.textContent = 'Email ou password incorretos.'
      errEl.style.display = 'block'
      btn.disabled = false; btn.textContent = 'Entrar'
    }
  })
}

// ── RENDER APP ──
function renderApp() {
  document.getElementById('app').innerHTML = `
    <div class="app-layout">
      <div class="topbar">
        <div class="topbar-left">
          <div class="topbar-logo"><img src="${LOGO}" style="width:30px;height:30px;object-fit:cover;" /></div>
          <span class="topbar-title">Os meus ficheiros</span>
        </div>
        <div class="topbar-right">
          <button class="btn-icon" id="btn-logout" title="Sair">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
      <div id="breadcrumb-bar" class="breadcrumb-bar" style="display:none;"></div>
      <div id="file-list" class="player-list">
        <div class="loading"><div class="spinner"></div> A carregar os teus ficheiros...</div>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `
  document.getElementById('btn-logout').addEventListener('click', async () => {
    await supabase.auth.signOut()
    renderAuth()
  })
}

function renderBreadcrumb() {
  const bar = document.getElementById('breadcrumb-bar')
  if (!bar) return
  if (state.breadcrumbs.length <= 1) { bar.style.display = 'none'; return }
  bar.style.display = 'flex'
  bar.innerHTML = state.breadcrumbs.map((b, i) => {
    if (i === state.breadcrumbs.length - 1) return `<span class="breadcrumb-current">${b.name}</span>`
    return `<button class="breadcrumb-link" data-idx="${i}">${b.name}</button><span class="breadcrumb-sep">›</span>`
  }).join('')
  bar.querySelectorAll('.breadcrumb-link').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.idx)
      state.breadcrumbs = state.breadcrumbs.slice(0, idx + 1)
      loadFiles(state.breadcrumbs[state.breadcrumbs.length - 1].path)
    })
  })
}

function renderFiles() {
  const list = document.getElementById('file-list')
  if (!list) return

  if (!state.files.length) {
    list.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <p>Pasta vazia</p>
        <span>Ainda não há ficheiros aqui</span>
      </div>`
    return
  }

  const sorted = [...state.files].sort((a, b) => {
    if (a.tag !== b.tag) return a.tag === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  const items = sorted.map(f => {
    const isFolder = f.tag === 'folder'
    const size = isFolder ? '' : formatSize(f.size)
    const iconHtml = getFileIcon(f)
    const actionIcon = isFolder
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><polyline points="9 18 15 12 9 6"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'

    return { f, isFolder, size, iconHtml, actionIcon }
  })

  list.innerHTML = items.map(({ f, isFolder, size, iconHtml, actionIcon }) => `
    <div class="player-row file-row" data-path="${f.path_lower}" data-tag="${f.tag}" data-name="${f.name}" style="gap:14px;">
      <div style="flex-shrink:0;">${iconHtml}</div>
      <div class="player-info">
        <div class="player-name" style="font-size:14px;">${f.name}</div>
        ${size ? `<div class="player-meta">${size}</div>` : ''}
      </div>
      <div class="chevron" style="color:${isFolder ? 'var(--accent)' : 'var(--text-3)'};">${actionIcon}</div>
    </div>
  `).join('')

  list.querySelectorAll('.file-row').forEach(row => {
    row.addEventListener('click', async () => {
      const path = row.dataset.path
      const tag = row.dataset.tag
      const name = row.dataset.name
      if (tag === 'folder') {
        state.breadcrumbs.push({ name, path })
        loadFiles(path)
      } else {
        row.style.opacity = '0.6'
        showToast('A preparar download...', '')
        try {
          const link = await getDownloadLink(path)
          const a = document.createElement('a')
          a.href = link; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a)
          showToast('Download iniciado!', 'success')
        } catch(e) {
          showToast('Erro ao fazer download.', 'error')
        }
        row.style.opacity = '1'
      }
    })
  })
}

async function loadFiles(path) {
  const list = document.getElementById('file-list')
  if (list) list.innerHTML = '<div class="loading"><div class="spinner"></div> A carregar...</div>'
  state.currentPath = path
  state.files = await listFolder(path)
  renderBreadcrumb()
  renderFiles()
}

// Back button support
window.addEventListener('popstate', () => {
  if (state.breadcrumbs.length > 1) {
    state.breadcrumbs.pop()
    loadFiles(state.breadcrumbs[state.breadcrumbs.length - 1].path)
    history.pushState({ level: state.breadcrumbs.length }, '', location.pathname)
  }
})

async function init() {
  const { data: { session } } = await supabase.auth.getSession()
  state.user = session?.user || null
  if (!state.user) { renderAuth(); return }

  renderApp()

  const folder = await findAthleteFolder(state.user.email)
  const rootPath = folder || '/All In Sports - Online'
  const rootName = rootPath.split('/').pop() || 'Os meus ficheiros'

  state.breadcrumbs = [{ name: rootName, path: rootPath }]
  history.replaceState({ level: 1 }, '', location.pathname)
  await loadFiles(rootPath)

  supabase.auth.onAuthStateChange((event, session) => {
    state.user = session?.user || null
    if (!state.user) renderAuth()
    else if (event === 'SIGNED_IN') init()
  })
}

init()
