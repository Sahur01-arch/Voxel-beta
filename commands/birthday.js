export default {
	name: 'birthday',
	aliases: ['ultah'],

	async execute({ m, voxel }) {
		// Jalur utama: kartu ulang tahun versi HTML/CSS asli, dibuka lewat
		// webview (tombol cta_url) yang nunjuk ke server lokal + tunnel
		// Cloudflare (lihat web/server.js). Ini SATU-SATUNYA cara nampilin
		// HTML/CSS beneran ke-render di WhatsApp - bukan lewat richResponse.
		if (global.webBaseUrl) {
			try {
				await voxel.sendMessage(m.chat, {
					text: '🎂 Kartu ucapan ulang tahun spesial buat kamu!',
					footer: 'Ketuk tombol di bawah buat buka kartunya ✨',
					nativeFlow: [{
						text: '🎁 Buka Kartu',
						url: `${global.webBaseUrl}/birthday`,
						useWebview: true
					}]
				}, { quoted: m });
				return;
			} catch (e) {
				console.log('[Birthday] Gagal kirim tombol webview, fallback ke rich text:', e?.message || e);
			}
		}

		// Fallback: tunnel lagi mati (atau gagal kirim tombol di atas) -> kirim
		// kartu versi teks pakai fitur richResponse NATIVE bawaan
		// @sairidev/baileys-new (markdown + tabel asli WhatsApp).
		// PENTING: ini BUKAN render HTML/CSS - WhatsApp nggak punya browser
		// engine di dalam chat bubble, cuma nampilin teks/tabel/kode terformat.
		const content = [
			'🎂 *SELAMAT ULANG TAHUN!* 🎉',
			'',
			'✨ Semoga hari spesialmu dipenuhi kebahagiaan, kesehatan, dan hal-hal menyenangkan!',
			'',
			'| 🎁 | Wish |',
			'|---|---|',
			'| 🎂 | Happy Birthday! |',
			'| ❤️ | Semoga selalu bahagia |',
			'| ✨ | Semoga semua impian tercapai |',
			'| 🎉 | Semoga harimu menyenangkan! |',
			'',
			'🎉 *Have a wonderful day!* 🎉'
		].join('\n')

		await voxel.sendMessage(m.chat, {
			text: content,
			rich: true,
			title: '🎂 Birthday Card'
		}, { quoted: m })
	}
};
