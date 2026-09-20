import { checkStatus, getExpired } from '../../src/database.js';
import { formatDate } from '../../lib/function.js';
import { CommandIndex } from '../../lib/command-loader.js';

async function ownerCommand(ctx) {
	const { m, voxel } = ctx;
	const botNumber = voxel.decodeJid(voxel.user.id).split('@')[0];
	const ownerNumber = [...new Set([...(global.owner || []), botNumber])];
	return voxel.sendContact(m.chat, ownerNumber, m);
}

async function profileCommand(ctx) {
	const { m, db, isCreator } = ctx;
	const infoUser = db.users[m.sender];
	const user = Object.keys(db.users);
	const isVip = isCreator || (db.users[m.sender] ? db.users[m.sender].vip : false);
	const isPremium = isCreator || checkStatus(m.sender, db.premium || []) || false;
	return m.reply(`*👤Profile @${m.sender.split('@')[0]} :*\n🐋User Bot : ${user.includes(m.sender) ? 'True' : 'False'}\n🔥User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}${isPremium ? `\n⏳Expired : ${checkStatus(m.sender, db.premium || []) ? formatDate(getExpired(m.sender, db.premium)) : '-'}` : ''}\n🎫Limit : ${infoUser ? infoUser.limit : 0}\n💰Uang : ${infoUser ? infoUser.money.toLocaleString('id-ID') : '0'}`);
}

async function leaderboardCommand(ctx) {
	const { m, db } = ctx;
	const entries = Object.entries(db.users).sort((a, b) => b[1].money - a[1].money).slice(0, 10).map(entry => entry[0]);
	let teksnya = '╭──❍「 *LEADERBOARD* 」❍\n';
	for (let i = 0; i < entries.length; i++) {
		teksnya += `│• ${i + 1}. @${entries[i].split('@')[0]}\n│• Balance : ${db.users[entries[i]].money.toLocaleString('id-ID')}\n│\n`;
	}
	return m.reply(teksnya + '╰──────❍');
}

async function requestCommand(ctx) {
	const { m, text, voxel } = ctx;
	if (!text) return m.reply('Mau Request apa ke Owner?');
	await m.reply(`*Request Telah Terkirim Ke Owner*\n_Terima Kasih🙏_`);
	const ownerNumber = [...new Set([...(global.owner || []), voxel.decodeJid(voxel.user.id).split('@')[0]])];
	return voxel.sendFromOwner(ownerNumber[0], `Pesan Dari : @${m.sender.split('@')[0]}\nUntuk Owner\n\nRequest ${text}`, m, { contextInfo: { mentionedJid: [m.sender], isForwarded: true }});
}

async function totalFiturCommand(ctx) {
	const { m } = ctx;
	const legacyCases = Array.isArray(global.db?.cases) ? global.db.cases : [];
	const registryKeys = Array.from(CommandIndex.keys());
	const uniqueKeys = new Set(
		[...legacyCases, ...registryKeys]
			.map((key) => String(key).trim().toLowerCase())
			.filter(Boolean)
	);
	return m.reply(`Total Fitur : ${uniqueKeys.size}`);
}

export default {
	name: 'info',
	aliases: ['owner', 'listowner', 'profile', 'cek', 'leaderboard', 'req', 'request', 'totalfitur'],

	async execute(ctx) {
		const { command } = ctx;
		switch (command) {
			case 'owner':
			case 'listowner':
				return ownerCommand(ctx);
			case 'profile':
			case 'cek':
				return profileCommand(ctx);
			case 'leaderboard':
				return leaderboardCommand(ctx);
			case 'req':
			case 'request':
				return requestCommand(ctx);
			case 'totalfitur':
				return totalFiturCommand(ctx);
			default:
				return null;
		}
	},
};
