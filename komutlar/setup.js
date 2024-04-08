const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    slash: true,                                //true Değeri Komutun Slash Olduğunu Gösteriyor
    yetki: 'SendMessages',                    //Kullanıcının Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    botyetki: 'Administrator',                 //Botun Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    cooldown: 5,                               //Komutun CoolDown Süresini(Saniye) Gösteriyor

    data: new SlashCommandBuilder()             //Slash Komut Oluşturma Alanı
    .setName('setup')
    .setDescription('setup'),
    /*
    .addStringOption(option =>
        option
            .setName('seçenek')
            .setDescription('Seçenek açıklaması')
            .setRequired(false)
    ),*/
    async execute(client, interaction) {        //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin
        

      const { Modal, TextInputComponent, showModal } = require('discord-modals')

     

      const modal = new Modal() 
      .setCustomId('riotidmodal')
      .setTitle('Kefo Setup')
      .addComponents(
        new TextInputComponent() 
        .setCustomId('riotid')
        .setLabel(`Riot ID'ni gir.`)
        .setStyle('SHORT') 
        .setMinLength(5)
        .setMaxLength(45)
        .setPlaceholder(`ANC phrotex#rona`)
        .setRequired(true)
        ); 

        showModal(modal, {
          client: client, 
       interaction: interaction 
    })
  }
}