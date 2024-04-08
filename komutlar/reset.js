const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')
const puppeteer = require('puppeteer')

module.exports = {
    slash: true,                                //true Değeri Komutun Slash Olduğunu Gösteriyor
    yetki: 'SendMessages',                    //Kullanıcının Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    botyetki: 'Administrator',                 //Botun Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    cooldown: 5,                               //Komutun CoolDown Süresini(Saniye) Gösteriyor

    data: new SlashCommandBuilder()             //Slash Komut Oluşturma Alanı
    .setName('reset')
    .setDescription('reset'),
    /*
    .addStringOption(option =>
        option
            .setName('seçenek')
            .setDescription('Seçenek açıklaması')
            .setRequired(false)
    ),*/
    async execute(client, interaction) {        //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin

        const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Onayla')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Vazgeç')
			.setStyle(ButtonStyle.Secondary);


            const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);

             
        const embed = new EmbedBuilder()
        .setTitle(`kefo`)
        .setDescription(`Seni çok sevmiştik, kefo sisteminden ayrılmak istediğine emin misin?`)
        .addFields(
            { name: `Silinecek Verilerin:`, value: `Riot ID, Valorant Rank`},
        )
        .setColor("Blurple")


		const response = await interaction.reply({
            embeds: [embed],
            components: [row],
        });


        const collectorFilter = i => i.user.id === interaction.user.id;
try {
	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

	if (confirmation.customId === 'confirm') {
        var rank = db.get(`rank_${interaction.member.id}`)
        var rank = rank.split(' ')
        var rank = rank[0]
        db.unpush(`${rank[0]}${rank[1]}_oyuncular`, interaction.member.id)
        db.delete(`rank_${interaction.member.id}`)
        db.delete(`riotid_${interaction.member.id}`)
        await confirmation.update({ content: `Verilerin silindi ve sistemden ayrıldın. Kendine iyi bak.`, components: [] });


	} else if (confirmation.customId === 'cancel') {
		await confirmation.update({ content: `Bi'an çok korktum gidiyorsun diye, işlem iptal edildi.`, components: [] });
	}
} catch (e) {
	await interaction.editReply({ content: '1 dakika içerisinde cevap alamadım, işlemi iptal ediyorum.', components: [] });
    console.log(e)
}
    }
}