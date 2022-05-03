const lugar = require('../utils/lugar/lugar');
const clima = require('../utils/clima/clima');

const express = require('express');
const dotenv = require('dotenv');
const Telegraf = require('telegraf');

const PORT = process.env.PORT || 3000;

app = express();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    console.log(`${process.env.NODE_ENV} environment`);
}

const bot = new Telegraf(process.env.TOKEN_API);

bot.start((ctx)=>{
    console.log(ctx.from);
    ctx.reply(`Hola ${ctx.from.first_name}!`)
})

bot.help((ctx)=>{
    ctx.reply('Ayuda!!')
})

bot.settings((ctx)=>{
    ctx.reply('Settings')
})

bot.command('mycommand', (ctx)=>{
    ctx.reply('My custom command!')
})

bot.hears('cat', (ctx)=>{
    ctx.reply('Tu gato es asombroso!')
})

dir= 'Santiago';

const getInfo = async(direccion) => {
    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${coords.direccion} es de ${temp}°C.`;
    } catch (e) {
        return `No se pudo determinar el clima de ${direccion}`;
    }
}

bot.hears(/clima*/gmi, async (ctx)=>{
    console.log(`Mensaje enviado: ${ctx.update.message.text}`);
    ciudad = (ctx.update.message.text).split(" ")[1];
    console.log(`Ciudad: ${ciudad}`);
    ctx.reply(await getInfo(ciudad))
})


bot.on('sticker', (ctx)=>{
    ctx.reply('Me gustan los stickers')
})

bot.launch()

app.get('/', (req, res) => {
    res.send('Takechi Bot');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});