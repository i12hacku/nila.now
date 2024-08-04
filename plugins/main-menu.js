import fs from 'fs';
const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys'));

const handler = async (m, { conn, text, usedPrefix, command }) => {

    await m.react('📂')

    let menu = `ʜᴇʏ 👋 ${conn.getName(m.sender)}

ɪ'ᴍ ɴɪʟᴀ -  ᴀ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ :-)

ᴍᴀɪɴ ᴍᴇɴᴜ 📁

1 - ᴀʟʟ
2 - ᴅᴏᴡɴʟᴏᴀᴅ
3 - ꜱᴇᴀʀᴄʜ
4 - ᴛᴏᴏʟꜱ
5 - ᴏᴡɴᴇʀ
6 - ɢʀᴏᴜᴘ
7 - ᴘʀᴏ

^ 🔢 ʀᴇᴘʟʏ ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ꜱᴇʟᴇᴄᴛ

ɴɪʟᴀ.ʙᴇᴛᴀ`

    await conn.sendMessage(m.chat, { video: fs.readFileSync('./plugins/video.mp4'), caption: menu, gifPlayback: true }, { quoted: m })

}

handler.all = async function (m, { conn }) {

    if (m.quoted &&
        m.quoted.sender == m.conn.my_id &&
        m.quoted.text.includes('ᴍᴀɪɴ ᴍᴇɴᴜ 📁')
    ) {

        await m.react('📂')

        let usedPrefix = '.'

        if (m.text === '1') {

let menu = `📂 ᴀʟʟ ᴍᴇɴᴜ

- ᴄᴍᴅ : ${usedPrefix}hd
- ᴜꜱᴀɢᴇ :  ${usedPrefix}hd (reply_a_image)
- ᴅᴇꜱᴄ : imgae enhancer beta

- ᴄᴍᴅ : ${usedPrefix}yt/song/video
- ᴜꜱᴀɢᴇ : ${usedPrefix}yt <query>
- ᴅᴇꜱᴄ : youtube beta

ɴɪʟᴀ.ʙᴇᴛᴀ`

await conn.sendMessage(m.chat, { video: fs.readFileSync('./plugins/video.mp4'), caption: menu, gifPlayback: true }, { quoted: m })

        }
        if (m.text === '2') {
            m.reply('_nila.beta_ : dl')
        }
        if (m.text === '3') {
            m.reply('_nila.beta_ : search')
        }
        if (m.text === '4') {
            m.reply('_nila.beta_ : tools')
        }
        if (m.text === '5') {
            m.reply('_nila.beta_ : owner')
        }
        if (m.text === '6') {
            m.reply('_nila.beta_ : group')
        }
        if (m.text === '7') {
            m.reply('_nila.beta_ : pro')
        }
    }
};

handler.command = /^(menu|m|panel)$/i
export default handler;