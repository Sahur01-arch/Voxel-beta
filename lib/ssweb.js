import { firefox } from 'playwright-core';

/**
 * Screenshot website pakai Firefox beneran yang jalan LOKAL di device sendiri
 * -- request ke situsnya kepake IP device sendiri (HP/VPS), bukan IP
 * datacenter provider API pihak ketiga.
 *
 * Dipilih Firefox (bukan Chromium) karena Chromium butuh syscall namespace
 * (clone/unshare) buat sandbox multi-process-nya, dan itu sering nggak
 * ke-emulasi dengan benar di PRoot (ptrace-based, bukan namespace asli) --
 * bikin Chromium crash/hang di banyak setup Termux/PRoot-Distro. Firefox
 * punya arsitektur proses yang lebih toleran di lingkungan kayak gini.
 *
 * Browser Firefox-nya dikelola Playwright sendiri (build khusus yang udah
 * dipatch buat automation) -- install sekali pakai:
 *   npx playwright install firefox
 * BUKAN Firefox dari pacman/apt, karena Playwright butuh build spesifik yang
 * kompatibel sama protokol automation-nya, bukan Firefox rilis biasa.
 */
async function screenshotWebsite(url, { fullPage = true, width = 1280, height = 800, timeout = 45000 } = {}) {
	const browser = await firefox.launch({ headless: true });
	try {
		const page = await browser.newPage({
			viewport: { width, height },
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0'
		});
		await page.goto(url, { waitUntil: 'networkidle', timeout });
		return await page.screenshot({ fullPage, type: 'png' });
	} finally {
		await browser.close().catch(() => {});
	}
}

export { screenshotWebsite };
