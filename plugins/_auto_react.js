export async function before(m, {isAdmin, isBotAdmin, text}) {
    if (m.isBaileys && m.fromMe) {
        return !0;
    }
    
    if (!global.db.data.users[m.sender].react) return

    if (m.text.match(/(huthth|හුත්තා|pakaya|පකයා|wesi|වේසි|hukanna|හුකන්න|වේසිගෙම පුතෝ|කල්ලතෝනි පොන්නයා|මානසික ලාමක|ගූ පිත්තමෙන්|බොක|ගර්භාෂ බිත්තිය කඩාගෙන පුකෙන් එලියට එන්න|හුත්තිගෙ පුතෝ|කැරි අබ්බගාත|කැරි|මුඩුක්කු පොන්නයො|පයියක්|හුජ්ජ|පකා|හුකාරිස්|වේස|තිප්පිලි පොන්නය)/gi)) {
    return conn.sendMessage(m.chat, { react: { text: `🔞`, key: m.key } })
  }

  if (m.text.match(/(ක්ක්|nuwa)/gi)) {
    return conn.sendMessage(m.chat, { react: { text: `🖕`, key: m.key } })
  }
    
        await conn.sendMessage(m.chat, { react: { text: global.db.data.users[m.sender].react, key: m.key }})
    
        /* console.log(m.mtype)
        
        if(m.message.stickerMessage) {
            await conn.sendMessage(m.chat, { delete: m.key })
            m.reply('Stickers are not allowed!')
        }
            // Get information about the sticker
            const stickerInfo = {
              id: m.id,
              from: m.key.remoteJID,
              timestamp: m.timestamp,
              mediaType: m.message.mimetype,
              fileLength: m.message.fileLength,
            };
    
            let stickerUrl = m.message.stickerMessage.url;

            if(m.message.stickerMessage.url == 'https://mmg.whatsapp.net/v/t62.15575-24/34574291_868762387943163_365672521236768313_n.enc?ccb=11-4&oh=01_AdRsgZkO5RNkc3xjDNsyuY5YiQ1J2JwflWXW0goX6wCSQQ&oe=6547D481&_nc_sid=000000&mms3=true') {
                m.reply('sorry , this sticker is not allowed to use!')
                await conn.sendMessage(m.chat, { delete: m.key })
            }

        // Console log the sticker URL
        console.log('Sticker URL:', m); */
    
    
        
    
    
    
    };
    
