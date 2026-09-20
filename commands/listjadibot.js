import { listJadibotSessions } from '../src/jadibot.js';

export default {
	name: 'listjadibot',
	aliases: ['jadibotlist', 'listserbot'],

	async execute({ m, isCreator }) {
		if (!isCreator) return m.reply(global.mess?.owner || 'Khusus Owner!');

		const list = listJadibotSessions();
		if (!list.length) return m.reply('📭 Belum ada sesi Jadibot yang aktif.');

		const text = `🤖 *Sesi Jadibot Aktif (${list.length})*\n\n` + list.map((entry, i) => {
			const since = entry.connectedAt ? `terhubung sejak ${new Date(entry.connectedAt).toLocaleString('id-ID')}` : 'sedang menghubungkan...';
			const by = entry.requesterJid ? ` — dibuat oleh @${entry.requesterJid.split('@')[0]}` : '';
			return `${i + 1}. wa.me/${entry.number} (${since})${by}`;
		}).join('\n');

		return m.reply(text, { mentions: list.map((e) => e.requesterJid).filter(Boolean) });
	},
};
