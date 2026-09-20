import { loadQuotes } from '../lib/quotes.js';

export default {
	name: 'listmotivasi',
	aliases: ['motivasilist'],

	async execute({ m, isCreator, prefix }) {
		if (!isCreator) return m.reply(`❌ ${global.mess?.owner || 'Khusus Owner!'}\n\nMau hubungi owner beneran? Ketik *${prefix}owner*`);
		const quotes = loadQuotes('motivasi');
		if (!quotes.length) return m.reply('📭 Database quotes motivasi masih kosong.');

		const text = `🌱 *Daftar Quotes Motivasi (${quotes.length})*\n\n` +
			quotes.map((q, i) => `${i}. ${q}`).join('\n\n') +
			`\n\nHapus: *${prefix}delmotivasi <nomor>*`;
		return m.reply(text);
	},
};
