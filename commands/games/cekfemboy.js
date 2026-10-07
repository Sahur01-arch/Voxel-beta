export default {
  name: 'cekfemboy',
  aliases: ['cekbencong'],

  async execute(ctx) {
    const { m, voxel } = ctx;

    // kalau command-nya di-tag ke orang lain (@xxxx), pake itu. kalau enggak, pake pengirim sendiri
    const target = m.mentionedJid?.[0] || m.sender;
    const hasil = Math.floor(Math.random() * 100);

    let jawaban = `Femboy : ${hasil}%`;

    if (hasil >= 90) {
      jawaban += `\nkamu femboy sejati 😳`;
    } else if (hasil >= 70) {
      jawaban += `\nkamu femboy sepuh 😌`;
    } else if (hasil >= 40) {
      jawaban += `\nlumayan, dikit lagi nih 👀`;
    } else {
      jawaban += `\naman, bukan femboy 😎`;
    }

    await voxel.sendMessage(m.chat, {
      text: jawaban,
      mentions: [target]
    }, { quoted: m });
  }
}
