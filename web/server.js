import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { bin as cloudflaredBin, install as installCloudflared } from 'cloudflared';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Menyajikan folder 'birthday' dan 'flappybird' sebagai static files
const app = express();
app.use('/birthday', express.static(path.join(__dirname, 'birthday')));
app.use('/flappybird', express.static(path.join(__dirname, 'flappybird')));

const PORT = process.env.WEB_PORT || 3000;

let tunnelProcess = null;
let reconnectTimer = null;

/**
 * Buka Cloudflare Quick Tunnel (trycloudflare.com) ke server lokal ini, simpan
 * URL-nya di global.webBaseUrl supaya fitur lain (mis. commands/birthday.js)
 * bisa pakai URL yang selalu up-to-date, bukan domain hardcode.
 *
 * Dipilih dibanding localtunnel karena:
 * - localtunnel nampilin halaman interstitial "Click to Continue" ke IP yang
 *   belum pernah akses -- webview bawaan WhatsApp gak bisa klik lanjut itu,
 *   jadi kartunya nggak pernah kelihatan (cuma halaman peringatan/blank).
 * - trycloudflare.com nggak punya halaman interstitial itu, gratis, gak perlu
 *   akun/login, dan didukung langsung sama Cloudflare (bukan server komunitas).
 *
 * Quick tunnel ini juga bisa putus sendiri, jadi ada auto-reconnect sama
 * seperti sebelumnya. Kalau tunnel lagi mati, global.webBaseUrl di-reset ke
 * null supaya fitur pemanggil (birthday.js) tahu harus fallback ke pesan teks.
 */
async function openTunnel() {
	try {
		if (!fs.existsSync(cloudflaredBin)) {
			console.log(chalk.cyan('[WEB] Mengunduh binary cloudflared (sekali saja, disimpan buat run berikutnya)...'));
			await installCloudflared(cloudflaredBin);
		}
	} catch (e) {
		console.log(chalk.red(`[WEB] Gagal mengunduh cloudflared: ${e?.message || e}`));
		global.webBaseUrl = null;
		scheduleReconnect();
		return;
	}

	const proc = spawn(cloudflaredBin, ['tunnel', '--url', `http://localhost:${PORT}`, '--no-autoupdate'], {
		stdio: ['ignore', 'pipe', 'pipe']
	});
	tunnelProcess = proc;
	let urlFound = false;

	// cloudflared nulis semua log-nya (termasuk URL trycloudflare.com yang
	// dikasih) ke stderr, bukan stdout -- makanya dua-duanya di-dengerin di sini.
	const handleOutput = (data) => {
		const str = data.toString();
		const match = str.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
		if (match && !urlFound) {
			urlFound = true;
			global.webBaseUrl = match[0];
			console.log(chalk.green(`[WEB] Tunnel publik aktif: ${match[0]}`));
		}
	};
	proc.stdout.on('data', handleOutput);
	proc.stderr.on('data', handleOutput);

	proc.on('exit', (code) => {
		if (tunnelProcess !== proc) return; // proses lama yang emang sengaja diganti, abaikan
		console.log(chalk.yellow(`[WEB] Tunnel cloudflared berhenti (code ${code}), mencoba reconnect...`));
		global.webBaseUrl = null;
		tunnelProcess = null;
		scheduleReconnect();
	});

	proc.on('error', (err) => {
		console.log(chalk.red(`[WEB] Gagal menjalankan cloudflared: ${err?.message || err}`));
		global.webBaseUrl = null;
		tunnelProcess = null;
		scheduleReconnect();
	});

	// Kalau dalam 20 detik nggak ada URL yang ke-parse dari log, anggap gagal
	// start dan coba ulang -- daripada global.webBaseUrl nyangkut undefined selamanya.
	setTimeout(() => {
		if (!urlFound && tunnelProcess === proc) {
			console.log(chalk.yellow('[WEB] Timeout nunggu URL tunnel, restart cloudflared...'));
			proc.kill();
		}
	}, 20000);
}

function scheduleReconnect() {
	if (reconnectTimer) return;
	reconnectTimer = setTimeout(() => {
		reconnectTimer = null;
		openTunnel();
	}, 15000);
}

/**
 * Start server lokal + tunnel publiknya. Dipanggil sekali dari index.js
 * supaya jalan di proses yang sama dengan bot (biar global.webBaseUrl
 * bisa dibaca langsung oleh command handler tanpa perlu file/DB perantara).
 */
function startWebServer() {
	app.listen(PORT, () => {
		console.log(chalk.cyan(`[WEB] Server lokal jalan di port :${PORT}`));
		openTunnel();
	});
}

export { startWebServer, app };
