import axios from 'axios';
import chalk from 'chalk';

/**
 * Client polling buat dashboard private di Vercel kamu sendiri -- GANTI dari
 * setupDashboard() lama (Socket.io ke bot.voxel.biz.id, server pihak ketiga
 * yang nggak kamu kontrol). Bot nge-poll endpoint /api/poll tiap beberapa
 * detik nanya "ada perintah baru?" -- bukan koneksi nyala terus, jadi cocok
 * buat backend serverless kayak Vercel.
 *
 * Dua jenis command yang didukung dari dashboard:
 * - { type: 'sendmessage', jid, text } -- bot kirim pesan langsung ke jid itu.
 * - { type: 'command', text } -- teks itu dikirim SEBAGAI PESAN KE DIRI
 *   SENDIRI (self-chat), jadi diproses lewat sistem command yang udah ada di
 *   voxel.js (isCreator otomatis true karena fromMe) -- semua command owner
 *   yang udah ada (ganti setting, broadcast, dll) otomatis kepake tanpa perlu
 *   ditulis ulang satu-satu di sini.
 *
 * Wajib di-set (env var atau langsung di settings.js):
 *   DASHBOARD_URL = https://nama-project-kamu.vercel.app
 *   DASHBOARD_KEY = (secret sama yang di-set di Vercel env DASHBOARD_KEY)
 */
function startDashboardClient(voxel, { intervalMs = 5000 } = {}) {
	const baseUrl = process.env.DASHBOARD_URL || global.dashboardUrl;
	const key = process.env.DASHBOARD_KEY || global.dashboardKey;

	if (!baseUrl || !key) {
		console.log(chalk.gray('[DASHBOARD] DASHBOARD_URL/DASHBOARD_KEY belum di-set, dashboard private nggak diaktifkan.'));
		return;
	}

	const client = axios.create({
		baseURL: baseUrl.replace(/\/+$/, ''),
		headers: { 'x-dashboard-key': key },
		timeout: 15000
	});

	async function report(id, status, message) {
		await client.post('/api/report', { id, status, message }).catch(() => {});
	}

	async function pollOnce() {
		try {
			const { data } = await client.get('/api/poll');
			for (const cmd of data.commands || []) {
				try {
					if (cmd.type === 'sendmessage' && cmd.jid) {
						await voxel.sendMessage(cmd.jid, { text: cmd.text });
					} else if (cmd.type === 'command') {
						// Kirim ke diri sendiri -- diproses lewat command handler
						// normal yang udah ada, sama kayak kalau owner ngetik
						// langsung dari WhatsApp-nya sendiri.
						await voxel.sendMessage(voxel.user.id, { text: cmd.text });
					}
					await report(cmd.id, 'done');
				} catch (e) {
					console.log(chalk.red(`[DASHBOARD] Gagal jalanin command ${cmd.id}:`), e.message);
					await report(cmd.id, 'error', e.message);
				}
			}
		} catch (e) {
			// Diem-diem aja kalau lagi gagal poll (mis. internet putus sebentar)
			// -- nggak perlu bikin berisik log tiap 5 detik.
		}
	}

	console.log(chalk.cyan(`[DASHBOARD] Polling ke ${baseUrl} tiap ${intervalMs / 1000} detik.`));
	pollOnce();
	setInterval(pollOnce, intervalMs);
}

export { startDashboardClient };
