import { addQuote } from '../lib/quotes.js';

export default {
	name: 'addmotivasi',
	aliases: ['tambahmotivasi'],

	async execute({ m, text, isCreator, prefix, command }) {
		if (!isCreator) return m.reply(`❌ ${global.mess?.owner || 'Khusus Owner!'}\n\nMau hubungi owner beneran? Ketik *${prefix}owner*`);
		if (!text) return m.reply(`Contoh: *${prefix}${command} Jangan berhenti cuma karena lelah*`);

		try {
			const total = addQuote('motivasi', text);
			return m.reply(`✅ Kalimat motivasi baru ditambahkan!\nTotal sekarang: *${total}* kalimat.`);
		} catch (e) {
			return m.reply(`❌ ${e.message}`);
		}
	},
};
