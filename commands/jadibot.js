import QRCode from 'qrcode';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { checkStatus } from '../src/database.js';
import { startJadibotSession, listJadibotSessions, sanitizeNumber } from '../src/jadibot.js';

export default {
	name: 'jadibot',
	aliases: ['serbot'],

	async execute({ m, voxel, db, args, command, prefix, isCreator }) {
		// Cegah bikin Jadibot baru dari DALAM sesi Jadibot (bot-di-dalam-bot).
		if (voxel.isJadibot) {
			const mainBotNumber = voxel.decodeJid(voxel.user.id).split('@')[0];
			return m.reply(`❌ Perintah ini cuma bisa dipakai lewat bot utama, bukan dari sesi Jadibot ini.\n\nChat bot utama: https://wa.me/${mainBotNumber}`);
		}

		if (global.jadibotMode === false) {
			return m.reply('❌ Fitur Jadibot sedang dinonaktifkan oleh owner.');
		}

		// Urutan hak akses: owner selalu boleh. Kalau jadibotOwnerOnly aktif, cuma
		// owner yang boleh (paling ketat, premium tetap ditolak). Kalau tidak, dan
		// jadibotPremiumOnly aktif, member Premium juga boleh selain owner.
		if (global.jadibotOwnerOnly && !isCreator) {
			return m.reply('❌ Fitur Jadibot saat ini dibatasi khusus owner.');
		}

		const isPremiumUser = isCreator || checkStatus(m.sender, db.premium || []);
		if (global.jadibotPremiumOnly && !isPremiumUser) {
			return m.reply('❌ Fitur Jadibot saat ini dibatasi khusus member *Premium* (dan owner).\n\nHubungi owner buat upgrade ke Premium ya.');
		}

		const limit = global.jadibotLimit ?? 50;
		if (!isCreator && listJadibotSessions().length >= limit) {
			return m.reply(`❌ Slot Jadibot lagi penuh (maks ${limit} sesi aktif). Coba lagi nanti ya.`);
		}

		const rawNumber = (args[0] || '').replace(/[^0-9]/g, '');
		const useQr = !rawNumber;
		// Untuk mode QR kita asumsikan yang scan = nomor yang sama dengan pengirim
		// perintah ini (kasus paling umum). Kalau mau nomor lain, pakai mode pairing
		// code dengan menyebut nomornya langsung: .jadibot 628xxxxxxxxxx
		const number = useQr ? sanitizeNumber(m.sender.split('@')[0]) : sanitizeNumber(rawNumber);
		const mainBotNumber = sanitizeNumber(voxel.decodeJid(voxel.user.id).split('@')[0]);

		if (number === mainBotNumber) {
			return m.reply(`❌ Nomor *${number}* itu nomor bot utama sendiri, jadi tidak perlu di-Jadibot-kan — semua fiturnya sudah otomatis aktif di sini.`);
		}

		if (!useQr) {
			const parsed = parsePhoneNumber('+' + number);
			if (!parsed.valid) {
				return m.reply(`❌ Nomor tidak valid.\n\nContoh: *${prefix}${command} 628xxxxxxxxxx*\nAtau ketik *${prefix}${command}* saja (tanpa nomor) buat pakai QR Code.`);
			}
		}

		if (global.jadibots?.has(number)) {
			return m.reply('❌ Nomor ini sudah punya sesi Jadibot aktif. Ketik *.delbot* dari chat Jadibot itu dulu kalau mau mengulang dari awal.');
		}

		await m.reply(useQr ? '🔄 Menyiapkan QR Code, tunggu sebentar...' : `🔄 Meminta kode pairing untuk *${number}*, tunggu sebentar...`);

		try {
			await startJadibotSession({
				number,
				mode: useQr ? 'qr' : 'pairing',
				requesterJid: m.sender,
				onCode: async (type, code) => {
					try {
						if (type === 'pairing') {
							await voxel.sendMessage(m.chat, {
								text: `🔑 *Kode Pairing Jadibot*\n\n*${code}*\n\nBuka WhatsApp di HP nomor *${number}* → Perangkat Tertaut → Tautkan dengan nomor telepon, lalu masukkan kode di atas.\n\n_Kode berlaku sekitar 60 detik, kalau expired ketik ulang perintahnya._`,
							}, { quoted: m });
						} else {
							const qrBuffer = await QRCode.toBuffer(code, { width: 512, margin: 1 });
							await voxel.sendMessage(m.chat, {
								image: qrBuffer,
								caption: '📷 Scan QR ini pakai WhatsApp di HP yang mau dijadikan Jadibot (Perangkat Tertaut → Tautkan Perangkat).\n\n_QR ini cuma berlaku sebentar, kalau keburu kedaluwarsa ketik ulang perintahnya._',
							}, { quoted: m });
						}
					} catch (e) {
						console.log('[JADIBOT] Gagal kirim kode ke chat:', e?.message || e);
					}
				},
				onStatus: async (status, info) => {
					try {
						if (status === 'open') {
							await voxel.sendMessage(m.chat, {
								text: `✅ Jadibot untuk *${number}* berhasil terhubung!\n\nNomor itu sekarang jadi bot pribadi buat kamu, dengan fitur yang sama persis seperti bot utama. Ketik *.menu* dari chat pribadinya buat lihat fiturnya, dan *.delbot* kapan aja kalau mau mematikannya.`,
							}, { quoted: m });
						} else if (status === 'logged-out') {
							await voxel.sendMessage(m.chat, { text: `📴 Sesi Jadibot *${number}* logout / dihentikan.` }, { quoted: m }).catch(() => {});
						} else if (status === 'failed') {
							await voxel.sendMessage(m.chat, { text: `❌ Gagal menghubungkan Jadibot *${number}*.${info ? `\nAlasan: ${info}` : ''}` }, { quoted: m }).catch(() => {});
						}
					} catch (e) {}
				},
			});
		} catch (e) {
			await m.reply(`❌ Gagal membuat Jadibot: ${e.message}`);
		}
	},
};
