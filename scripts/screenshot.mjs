// Ferramenta de validação visual manual/assistida — não é suíte de teste E2E.
// Sobe o vite dev server, tira um screenshot full-page com Playwright e derruba o
// servidor. Uso: `npm run screenshot -- [caminho] [nome-do-arquivo.png]`
// Exemplos:
//   npm run screenshot                          -> screenshots/home.png
//   npm run screenshot -- /produtos produtos.png

import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`
const [, , pathArg = '/', fileArg = 'home.png'] = process.argv

function waitForServer(url, timeoutMs = 30_000) {
    const deadline = Date.now() + timeoutMs
    return new Promise((resolve, reject) => {
        const poll = async () => {
            try {
                const response = await fetch(url)
                if (response.ok) return resolve()
            } catch {
                // servidor ainda não subiu, continua tentando
            }
            if (Date.now() > deadline) return reject(new Error(`Timeout esperando ${url}`))
            setTimeout(poll, 300)
        }
        poll()
    })
}

async function main() {
    await mkdir('screenshots', { recursive: true })

    const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], {
        stdio: 'ignore',
    })

    try {
        await waitForServer(BASE_URL)

        const browser = await chromium.launch({ args: ['--no-sandbox'] })
        const page = await browser.newPage({ viewport: { width: 1441, height: 900 } })
        await page.goto(`${BASE_URL}${pathArg}`, { waitUntil: 'networkidle' })

        const outPath = `screenshots/${fileArg}`
        await page.screenshot({ path: outPath, fullPage: true })
        await browser.close()

        console.log(`Screenshot salvo em ${outPath}`)
    } finally {
        server.kill()
    }
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
