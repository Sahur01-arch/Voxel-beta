import { deleteQuote } from '../lib/quotes.js';

export default {
	name: 'delmotivasi',
	aliases: ['hapusmotivasi'],

	async execute({ m, args, isCreator, prefix, command }) {
		if (!isCreator) return m.reply(`❌ ${global.mess?.owner || 'Khusus Owner!'}\n\nMau hubungi owner beneran? Ketik *${prefix}owner*`);
		const index = parseInt(args[0]);
		if (isNaN(index)) return m.reply(`Contoh: *${prefix}${command} 0*\n\nLihat nomornya lewat *${prefix}listmotivasi* dulu.`);

		try {
			const removed = deleteQuote('motivasi', index);
			return m.reply(`🗑️ Dihapus: "${removed}"`);
		} catch (e) {
			return m.reply(`❌ ${e.message}`);
		}
	},
};
