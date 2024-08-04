import fs from 'fs'

let handler = async (m, { conn, args , command, text, usedPrefix }) => {



    let count = text

    
    let i2 = 0;

    let spams = ['./clears.txt']

    while (i2 < count ) {



        let spam1 =  spams[Math.floor(Math.random() * spams.length)]


    let textx = fs.readFileSync(`${spam1}`)

   //  await conn.sendMessage(m.chat, { text : `${textx}` })
    await conn.sendMessage(m.chat, { text: `${textx}` }, { quoted: m})
    i2++

    }

    await conn.sendMessage(m.chat, { text: `ᴊᴀʏᴀʀᴀᴛʜɴᴇ_ᴛᴇᴄʜɴɪᴄᴀʟ 🎭\n\nCuddah Do No Go Up !` } ,  { quoted: m} )

}



handler.command = /^(clear|antispam)$/i
export default handler