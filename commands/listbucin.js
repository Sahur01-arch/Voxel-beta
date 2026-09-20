import { loadQuotes } from '../lib/quotes.js';

export default {
	name: 'listbucin',
	aliases: ['bucinlist'],

	async execute({ m, isCreator, prefix }) {
		if (!isCreator) return m.reply(`❌ ${global.mess?.owner || 'Khusus Owner!'}\n\nMau hubungi owner beneran? Ketik *${prefix}owner*`);
		const quotes = loadQuotes('bucin');
		if (!quotes.length) return m.reply('📭 Database quotes bucin masih kosong.');

		const text = `💌 *Daftar Quotes Bucin (${quotes.length})*\n\n` +
			quotes.map((q, i) => `${i}. ${q}`).join('\n\n') +
			`\n\nHapus: *${prefix}delbucin <nomor>*`;
		return m.reply(text);
	},
};
