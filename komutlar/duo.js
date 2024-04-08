const Discord = require('discord.js')
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ChannelType, PermissionsBitField, Client, Partials } = require('discord.js');
const db = require('croxydb')
//const clientt = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })

module.exports = {
    slash: true,                                //true Değeri Komutun Slash Olduğunu Gösteriyor
    yetki: 'SendMessages',                    //Kullanıcının Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    botyetki: 'ManageMessages',                 //Botun Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    cooldown: 10,                               //Komutun CoolDown Süresini(Saniye) Gösteriyor

    data: new SlashCommandBuilder()             //Slash Komut Oluşturma Alanı
    .setName('duo')
    .setDescription('Kendine, seni'),
    async execute(client, interaction) {        //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin

        async function bekle() {
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Merhaba Dünya!');
          }

        const d = new EmbedBuilder()
        .setTitle("Kefo | Oyuncu Arama")
        .setColor("Blurple")
        .setDescription("Senin için Duo arıyorum.")


        interaction.reply({embeds: [d]})

        var rank = db.get(`rank_${interaction.member.id}`)
        var rank = rank.split(' ')
        var rank = rank[0]
        var players = db.get(`${rank[0]}${rank[1]}_oyuncular`)
        var bulunan = players[Math.floor(Math.random() * players.length)]

        while(bulunan == interaction.user.id) {
            bulunan = players[Math.floor(Math.random() * players.length)]
        }

        const accept = new ButtonBuilder()
        .setCustomId('accept')
        .setLabel('Kabul Et')
        .setStyle(ButtonStyle.Success)

        const reject = new ButtonBuilder()
        .setCustomId('reject')
        .setLabel('Reddet')
        .setStyle(ButtonStyle.Danger)


        const dmembed = new EmbedBuilder()
.setTitle(`kefo | Oyuncu Bul`)
.setDescription(`Senin seviyendeki bir oyuncu seninle oynamak istiyor?`)
.addFields(
    { name: `Rankı `, value: db.get(`rank_${interaction.member.id}`) }
)

        const user = client.users.cache.get(bulunan)
        const row = new ActionRowBuilder()
        .addComponents(accept,reject)
        const response = await user.send({
            embeds: [dmembed],
            components: [row]
        })
        
        const confirmation1 = await response.awaitMessageComponent({ time: 60_000 })
        
        if(confirmation1.customId === 'accept') {

            var guild = client.guilds.cache.get("1226653680506376325")
            var bulunann = client.users.cache.get(bulunan)

            guild.channels.create({
                name: `${interaction.user.username} & ${bulunann.username}`,
                type: ChannelType.GuildVoice,
                userLimit: 2,
                parent: "1226659140110258247",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
                    },
                    {
                        id: bulunan,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
                    },
                ],
            });

            
            
    
            


            setTimeout(() => {
                x = client.channels.cache.find(c => c.name === `${interaction.user.username} & ${bulunann.username}`)
                x.delete();
            }, 7200000)

            
            const bulunanlara = new EmbedBuilder()
            .setTitle(`kefo | Oyuncu Bul`)
            .setColor("#3cff00")
            .setDescription(`Lütfen kaptanı Discord ve VALORANT üzerinden ekle.`)
            .addFields(
                { name: `Kaptanın Discord Hesabı `, value: `<@${interaction.member.id}>` },
                { name: `Kaptanın Riot ID'si `, value: db.get(`riotid_${interaction.member.id}`) },
                { name: `Kaptanın Rankı `, value: db.get(`rank_${interaction.member.id}`) }
            )


            await confirmation1.update({ embeds: [bulunanlara] })



        } else {


            const kaptanared1 = new EmbedBuilder()
.setTitle(`kefo | **1. Oyuncu** oynamak istemiyor.`)
.setColor("#d61a1a")
.setDescription(`1 kişi arıyorsan tekrar dene, 1'den fazla kişi arıyorsan lütfen diğer oyuncuların cevap vermesini bekle (Max 1dk)`)

            await interaction.editReply({ embeds: [kaptanared1] })
            return await confirmation1.update({content: `Reddettin.`})
        }


        const kaptanaonay1 = new EmbedBuilder()
.setTitle(`kefo | 1. Oyuncu Bulundu`)
.setColor("#3cff00")
.setDescription(`Lütfen oyuncuyu Discord ve VALORANT üzerinden ekle.`)
.addFields(
    { name: `1. Oyuncunun Discord Hesabı `, value: `<@${bulunan}>` }, //atmaya basla kg
    { name: `1. Oyuncunun Riot ID'si `, value: db.get(`riotid_${bulunan}`) },
    { name: `1. Oyuncunun Rankı `, value: db.get(`rank_${bulunan}`) }
)

await interaction.editReply({ embeds: [kaptanaonay1] })

      var channel = client.channels.cache.find(c => c.name === `${interaction.user.username} & ${bulunann.username}`);
        var channell = client.channels.cache.get(channel.id)
       const invite = await channell.createInvite({
            maxAge: Infinity,
            maxUses: 2
        }).then(invitee => {
          console.log(`Davet bağlantısı oluşturuldu: ${invitee.url}`);

         const kanalembed = new EmbedBuilder()
         .setColor("#3cff00")
         .addFields(
             { name: `Ses kanalı oluşturuldu:`, value: `[Bağlan](${invitee.url})` } 
         )
          interaction.channel.send({embeds: [kanalembed]})
          client.users.cache.get(bulunan).send({embeds: [kanalembed]})
          client.channels.cache.get('1226657232272232569').send(`${invitee.url}`)
      })
        
    }
}