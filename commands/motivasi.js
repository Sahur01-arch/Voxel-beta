import { loadQuotes, pickWeightedQuote } from '../lib/quotes.js';

export default {
	name: 'motivasi',
	aliases: ['motivation', 'katamotivasi'],

	async execute({ m, prefix }) {
		const quotes = loadQuotes('motivasi');
		if (!quotes.length) return m.reply(`❌ Database quotes motivasi masih kosong.\n\nTambah dulu pakai: *${prefix}addmotivasi <kalimat>*`);
		const quote = pickWeightedQuote('motivasi', quotes);
		return m.reply(`🌱 *${quote}*`);
	},
};
