import { stopJadibotSession, sanitizeNumber } from '../src/jadibot.js';

export default {
	name: 'delbot',
	aliases: ['stopbot', 'unjadibot'],

	async execute({ m, voxel, args, isCreator }) {
		// Dipakai dari DALAM sesi Jadibot: matikan sesi itu sendiri (cuma pemiliknya).
		if (voxel.isJadibot) {
			if (!isCreator) return m.reply('❌ Cuma pemilik nomor Jadibot ini yang boleh mematikannya.');
			await m.reply('📴 Oke, mematikan sesi Jadibot ini...');
			await stopJadibotSession(voxel.jadibotNumber);
			return;
		}

		// Dipakai dari bot utama: cuma owner utama yang boleh paksa matikan sesi orang lain.
		if (!isCreator) return m.reply(global.mess?.owner || 'Khusus Owner!');

		const number = sanitizeNumber(args[0]);
		if (!number) return m.reply('❌ Masukkan nomor Jadibot yang mau dimatikan.\nContoh: *.delbot 628xxxxxxxxxx*');

		const ok = await stopJadibotSession(number);
		return m.reply(ok ? `✅ Sesi Jadibot *${number}* berhasil dimatikan.` : `❌ Tidak ditemukan sesi Jadibot aktif untuk nomor *${number}*.`);
	},
};
