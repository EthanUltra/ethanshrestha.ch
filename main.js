// ─── Google Translate ────────────────────────────────────────────────────────

window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', autoDisplay: false },
    'google_translate_element'
  )
}

window.doGTranslate = function (lang_pair) {
  if (!lang_pair) return
  const targetLang = lang_pair.split('|')[1]
  // Poll until Google Translate's hidden <select> is ready
  const tryTranslate = setInterval(() => {
    const select = document.querySelector('.goog-te-combo')
    if (select) {
      select.value = targetLang
      select.dispatchEvent(new Event('change'))
      clearInterval(tryTranslate)
    }
  }, 300)
  // Give up after 5 seconds to avoid polling forever
  setTimeout(() => clearInterval(tryTranslate), 5000)
  if (document.activeElement) document.activeElement.blur()
}

// Hide Google's injected banner bar
function hideGoogleTranslateBanner() {
  const banner = document.querySelector('iframe.goog-te-banner-frame')
  if (banner) banner.style.display = 'none'
  const container = document.querySelector('.goog-te-banner-frame.skiptranslate')
  if (container) container.style.display = 'none'
  document.body.style.top = '0px'
}
window.addEventListener('load', () => {
  setInterval(hideGoogleTranslateBanner, 500)
})

// ─── Floating dots ────────────────────────────────────────────────────────────

function createDots() {
  const container = document.getElementById('dotsContainer')
  const dotsCount = 50
  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div')
    dot.className = 'dot'
    const size = Math.random() * 4 + 2
    dot.style.width = `${size}px`
    dot.style.height = `${size}px`
    dot.style.left = `${Math.random() * 100}%`
    dot.style.top = `${Math.random() * 100}%`
    dot.style.animation = `float ${
      Math.random() * 3 + 2
    }s infinite ease-in-out alternate, fadeInOut ${
      Math.random() * 2 + 2
    }s infinite ease-in-out alternate`
    container.appendChild(dot)
  }
}

// ─── Matrix rain ──────────────────────────────────────────────────────────────

const matrixCanvas = document.getElementById('matrixCanvas')
const mctx = matrixCanvas.getContext('2d')

function resizeMatrix() {
  matrixCanvas.width = window.innerWidth
  matrixCanvas.height = window.innerHeight
}
resizeMatrix()
window.addEventListener('resize', resizeMatrix)

const fontSize = 14
let columns = Math.floor(matrixCanvas.width / fontSize)
let drops = new Array(columns).fill(1)
const chars = 'ABCDEFGHIKLMNOPQRSTUVWXYZ1234567890'

function drawMatrix() {
  mctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  mctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)
  mctx.fillStyle = '#0F0'
  mctx.font = fontSize + 'px monospace'
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)]
    mctx.fillText(text, i * fontSize, drops[i] * fontSize)
    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.9) {
      drops[i] = 0
    }
    drops[i]++
  }
  requestAnimationFrame(drawMatrix)
}
requestAnimationFrame(drawMatrix)

// ─── Particle system ──────────────────────────────────────────────────────────

const particleCanvasEl = document.getElementById('particleCanvas')
const pctx = particleCanvasEl.getContext('2d')
let particles = []
let mouseTrail = []

function resizeParticles() {
  particleCanvasEl.width = window.innerWidth
  particleCanvasEl.height = window.innerHeight
  initParticles()
}
function initParticles() {
  particles = []
  const count = Math.floor(
    (particleCanvasEl.width * particleCanvasEl.height) / 22000
  )
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * particleCanvasEl.width,
      y: Math.random() * particleCanvasEl.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1 + 1,
    })
  }
}
function updateParticles() {
  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > particleCanvasEl.width) p.vx *= -1
    if (p.y < 0 || p.y > particleCanvasEl.height) p.vy *= -1
  })
}
function drawParticles() {
  pctx.clearRect(0, 0, particleCanvasEl.width, particleCanvasEl.height)
  pctx.fillStyle = '#ffffff'
  particles.forEach((p) => {
    pctx.beginPath()
    pctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
    pctx.fill()
  })
}
function drawMouseTrail() {
  mouseTrail.forEach((p, i) => {
    pctx.fillStyle = `rgba(0, 255, 221, ${p.alpha})`
    pctx.beginPath()
    pctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
    pctx.fill()
    p.alpha -= 0.02
    p.radius += 0.05
    if (p.alpha <= 0) mouseTrail.splice(i, 1)
  })
}
function animateParticles() {
  requestAnimationFrame(animateParticles)
  updateParticles()
  drawParticles()
  drawMouseTrail()
  if (window.innerWidth < 768) {
    effectsEnabled = false
    toggleEffects()
  }
}
resizeParticles()
window.addEventListener('resize', resizeParticles)
animateParticles()

// ─── Scroll progress + back-to-top ───────────────────────────────────────────

const progressEl = document.getElementById('scrollProgress')
const scrollToTopBtn = document.getElementById('scrollToTop')
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = (scrollTop / docHeight) * 100
  progressEl.style.width = `${scrolled}%`
  scrollToTopBtn.style.opacity = scrollTop > 300 ? '1' : '0'
})
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function toggleTheme(btn) {
  const html = document.documentElement
  html.classList.toggle('light-mode')
  const isLight = html.classList.contains('light-mode')
  btn.textContent = isLight ? 'Dark Mode' : 'Light Mode'
}

// ─── Effects toggle ───────────────────────────────────────────────────────────

// Declared outside the function so state persists between calls
let effectsEnabled = true

function toggleEffects() {
  effectsEnabled = !effectsEnabled
  const layers = [
    matrixCanvas,
    particleCanvasEl,
    document.getElementById('dotsContainer'),
  ]
  layers.forEach((el) => el.classList.toggle('effects-hidden'))
  const isOff = layers[0].classList.contains('effects-hidden')
  const btns = [
    document.getElementById('toggleEffectsDesktop'),
    document.getElementById('toggleEffectsMobile'),
  ]
  btns.forEach((btn) => {
    if (btn) btn.textContent = isOff ? 'Turn On Effects' : 'Turn Off Effects'
  })
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'IT Help Desk Ticketing System',
    description:
      'A full-stack IT support ticketing system where users can submit issues and support agents manage, prioritize, and resolve them through a centralized dashboard.',
    image: '/assets/projects/ticket-system.png',
    link: 'https://api-ticket-system.ethanshrestha.ch/',
    github: 'https://github.com/EthanUltra/IT-Ticketing-System',
    categories: ['js'],
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker'],
  },
  {
    title: 'Blue Team Log Analysis Lab',
    description:
      'A security-focused log analysis platform that simulates a blue team environment. The system analyzes authentication, web access, and process logs to detect threats such as brute-force attacks, suspicious commands, anomalies, and common web exploits using MITRE ATT&CK aligned detection rules.',
    image: './assets/projects/blue-team.png',
    link: 'https://blue-team.ethanshrestha.ch',
    github: 'https://github.com/EthanUltra/Blue-Team-Log-Analysis-Lab',
    categories: ['cybersecurity'],
    tech: [
      'React', 'Node.js', 'Express', 'Log Analysis',
      'Cybersecurity', 'MITRE ATT&CK', 'Render',
    ],
  },
  {
    title: 'Secure Authentication Patterns',
    description:
      'A production-style authentication system demonstrating modern security practices including Argon2 password hashing, rotating JWT refresh tokens, HTTP-only cookies, rate limiting, and account lockout protection. Built as a secure reference implementation for web authentication flows.',
    image: './assets/projects/secure-auth.png',
    link: 'https://auth.ethanshrestha.ch',
    github: 'https://github.com/EthanUltra/secure-auth-web',
    categories: ['react'],
    tech: [
      'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma',
      'JWT', 'Argon2', 'Neon Database', 'Railway',
    ],
  },
  {
    title: 'AI-Code Review',
    description:
      'An AI-powered code review tool that analyzes code for bugs, security vulnerabilities, performance issues, and style problems. Paste any code into the embedded Monaco editor (the same editor that powers VS Code), click review, and get structured feedback with a quality score, line-number references, and concrete fix suggestions — powered by Claude.',
    image: './assets/projects/code-review.png',
    link: 'https://codereview.ethanshrestha.ch/',
    github: 'https://github.com/EthanUltra/codereview',
    categories: ['react'],
    tech: [
      'React', 'Vite', 'Python', 'FastAPI', 'Anthropic Claude',
      'Monaco Editor', 'Docker', 'Render', 'Tailwind CSS',
    ],
  },
  {
    title: 'WatchTower',
    description:
      'A SOC monitoring platform and mini SIEM dashboard for real-time log analysis, threat detection, and incident management. Stream security logs through WebSockets, detect threats using 13 MITRE ATT&CK-mapped rules, visualize active tactics with a MITRE heatmap, monitor severity breakdowns and threat scores, and create, track, and resolve security incidents — all backed by persistent SQLite storage.',
    image: './assets/projects/watchtower.png',
    link: 'https://watchtower.ethanshrestha.ch',
    github: 'https://github.com/EthanUltra/WatchTower',
    categories: ['react', 'cybersecurity'],
    tech: [
      'React', 'Vite', 'Python', 'FastAPI', 'SQLite', 'WebSockets',
      'MITRE ATT&CK', 'Recharts', 'Docker', 'Render', 'Hostpoint', 'Tailwind CSS',
    ],
  },
  {
    title: 'ChatSphere',
    description:
      'A real-time chat platform with WebSocket-powered messaging, public channels, private direct messages, online presence indicators, and typing indicators. Messages appear instantly across all connected clients, with persistent history stored in PostgreSQL and unread badges tracking new activity.',
    image: './assets/projects/chatsphere.png',
    link: 'https://chatsphere.ethanshrestha.ch',
    github: 'https://github.com/EthanUltra/chatsphere',
    categories: ['js', 'react'],
    tech: [
      'React', 'Vite', 'Node.js', 'Express', 'PostgreSQL',
      'Prisma', 'WebSockets', 'Zustand', 'Docker', 'Render', 'Tailwind CSS',
    ],
  },
  {
    title: 'PipelineWatch',
    description:
      'A full-stack task board built as a CI/CD showcase. Every pull request triggers an automated GitHub Actions pipeline that runs the Jest test suite and linting, and merges to main build a multi-stage Docker image, push it to Docker Hub, and deploy to Render with a post-deploy health check. Demonstrates a complete production workflow from commit to live deployment.',
    image: './assets/projects/pipelinewatch.png',
    link: 'https://pipelinewatch.ethanshrestha.ch',
    github: 'https://github.com/EthanUltra/pipelinewatch',
    categories: ['js', 'react'],
    tech: [
      'React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Prisma',
      'GitHub Actions', 'Docker', 'Docker Hub', 'Jest', 'Render', 'Tailwind CSS',
    ],
  }
]

function createProjectCard(project) {
  const card = document.createElement('div')
  card.className =
    'project-card bg-bg-darker rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2'
  card.setAttribute('data-categories', project.categories.join(' '))
  card.innerHTML = `
    <div class="relative">
      <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div class="space-x-2">
          <a href="${project.link}" target="_blank" class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Live Demo</a>
          ${project.github
            ? `<a href="${project.github}" target="_blank" class="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700">Source Code</a>`
            : ''}
        </div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
      <p class="text-gray-400 text-sm mb-3">${project.description}</p>
      <div class="flex flex-wrap gap-2">
        ${project.tech
          .map((t) => `<span class="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">${t}</span>`)
          .join('')}
      </div>
    </div>
  `
  return card
}

function loadProjects() {
  const grid = document.getElementById('projectsGrid')
  projects.forEach((project) => {
    const card = createProjectCard(project)
    grid.appendChild(card)
  })
}

function filterProjects() {
  const activeBtn = document.querySelector('.filter-btn.active')
  const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all'
  const searchValue = document.getElementById('projectSearch').value.toLowerCase()
  document.querySelectorAll('.project-card').forEach((card) => {
    const categories = card.getAttribute('data-categories')
    const title = card.querySelector('h3').textContent.toLowerCase()
    const description = card.querySelector('p').textContent.toLowerCase()
    const matchesFilter = filter === 'all' || categories.includes(filter)
    const matchesSearch =
      title.includes(searchValue) || description.includes(searchValue)
    card.classList.toggle('hidden', !(matchesFilter && matchesSearch))
  })
}

function initProjectControls() {
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      document
        .querySelectorAll('.filter-btn')
        .forEach((b) => b.classList.remove('active', 'bg-blue-600'))
      this.classList.add('active', 'bg-blue-600')
      filterProjects()
    })
  })
  document.getElementById('projectSearch').addEventListener('input', filterProjects)
}

// ─── Typed hero tagline ───────────────────────────────────────────────────────

const typedPhrases = [
  'Application Developer',
  'Full-Stack System Builder',
  'Cloud & Docker Practitioner',
  'Security-Conscious Engineer',
]
let typedIndex = 0
let charIndex = 0
let isDeleting = false

function type() {
  const currentPhrase = typedPhrases[typedIndex]
  if (isDeleting) {
    charIndex--
  } else {
    charIndex++
  }
  document.getElementById('typedText').textContent = currentPhrase.substring(0, charIndex)
  let delay = isDeleting ? 50 : 100
  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    typedIndex = (typedIndex + 1) % typedPhrases.length
    delay = 500
  }
  setTimeout(type, delay)
}

// ─── DOMContentLoaded — wire everything up ────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  createDots()
  loadProjects()
  initProjectControls()
  type()

  // Mobile menu
  document.getElementById('mobileMenuToggle').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('hidden')
  })

  // Language dropdowns
  document.getElementById('langToggleDesktop').addEventListener('click', () => {
    document.getElementById('langMenuDesktop').classList.toggle('hidden')
  })
  document.getElementById('langToggleMobile').addEventListener('click', () => {
    document.getElementById('langMenuMobile').classList.toggle('hidden')
  })

  // Language buttons — replaces all onclick="doGTranslate(...)" handlers
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.doGTranslate(btn.dataset.lang)
      // Also close the dropdown after selecting a language
      document.getElementById('langMenuDesktop').classList.add('hidden')
      document.getElementById('langMenuMobile').classList.add('hidden')
    })
  })

  // Theme toggles
  document.getElementById('toggleThemeDesktop').addEventListener('click', function () {
    toggleTheme(this)
  })
  document.getElementById('toggleThemeMobile').addEventListener('click', function () {
    toggleTheme(this)
  })

  // Effects toggles
  document.getElementById('toggleEffectsDesktop').addEventListener('click', toggleEffects)
  document.getElementById('toggleEffectsMobile').addEventListener('click', toggleEffects)

  // Language dropdown close listeners
  document.querySelectorAll('#langMenuDesktop button').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('langMenuDesktop').classList.add('hidden')
    })
  })
  document.querySelectorAll('#langMenuMobile button').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('langMenuMobile').classList.add('hidden')
    })
  })

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          form.reset()
          document.getElementById('successMessage').classList.remove('hidden')
          document.getElementById('errorMessage').classList.add('hidden')
        } else {
          throw new Error('Network response was not ok')
        }
      })
      .catch(() => {
        document.getElementById('successMessage').classList.add('hidden')
        document.getElementById('errorMessage').classList.remove('hidden')
      })
  })

  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => e.preventDefault())
})

document.addEventListener('visibilitychange', () => {
  if (document.hidden && effectsEnabled) toggleEffects()
})
