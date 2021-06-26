const TelegramBot = require('node-telegram-bot-api')
const dialogflow = require('./dialogflow')
const youtube = require('./youtube')
const token =  '1854936333:AAGu0CepNsxSQwQpaNEp6ZxAG_RG0oXi_nU'

const bot = new TelegramBot(token,{ polling: true})

bot.on('message', async function (msg){
    const chatId = msg.chat.id
    console.log(msg.text)

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text)
    let responseText = dfResponse.text;
    if(dfResponse === 'Treino específico'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.Corpo.stringValue)

    }
    bot.sendMessage(chatId, responseText)
})