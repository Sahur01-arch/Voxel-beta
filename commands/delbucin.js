import { deleteQuote } from '../lib/quotes.js';

export default {
	name: 'delbucin',
	aliases: ['hapusbucin'],

	async execute({ m, args, isCreator, prefix, command }) {
		if (!isCreator) return m.reply(`❌ ${global.mess?.owner || 'Khusus Owner!'}\n\nMau hubungi owner beneran? Ketik *${prefix}owner*`);
		const index = parseInt(args[0]);
		if (isNaN(index)) return m.reply(`Contoh: *${prefix}${command} 0*\n\nLihat nomornya lewat *${prefix}listbucin* dulu.`);

		try {
			const removed = deleteQuote('bucin', index);
			return m.reply(`🗑️ Dihapus: "${removed}"`);
		} catch (e) {
			return m.reply(`❌ ${e.message}`);
		}
	},
};
