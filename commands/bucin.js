import { loadQuotes, pickWeightedQuote } from '../lib/quotes.js';

export default {
	name: 'bucin',
	aliases: ['gombalan', 'gombal'],

	async execute({ m, prefix }) {
		const quotes = loadQuotes('bucin');
		if (!quotes.length) return m.reply(`❌ Database quotes bucin masih kosong.\n\nTambah dulu pakai: *${prefix}addbucin <kalimat>*`);
		const quote = pickWeightedQuote('bucin', quotes);
		return m.reply(`💌 *${quote}*`);
	},
};
