import { addQuote } from '../lib/quotes.js';

export default {
	name: 'addbucin',
	aliases: ['tambahbucin'],

	async execute({ m, text, isCreator, prefix, command }) {
		if (!isCreator) return m.reply(`❌ ${global.mess?.owner || 'Khusus Owner!'}\n\nMau hubungi owner beneran? Ketik *${prefix}owner*`);
		if (!text) return m.reply(`Contoh: *${prefix}${command} Aku kangen kamu tiap detik, kamu tau?*`);

		try {
			const total = addQuote('bucin', text);
			return m.reply(`✅ Kalimat bucin baru ditambahkan!\nTotal sekarang: *${total}* kalimat.`);
		} catch (e) {
			return m.reply(`❌ ${e.message}`);
		}
	},
};
