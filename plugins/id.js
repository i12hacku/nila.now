const {getDevice} = (await import('@whiskeysockets/baileys'));

const handler = async (m, {conn, command}) => {
    
    let device = await getDevice(m.quoted.id)
  // return m.reply(device)
    await conn.reply('120363305092995607@g.us', `quoted device --> `+ '`' + device + '`' , m);
    
  //  await conn.reply(conn.my_id, m.chat , m);
   
   // await m.react('✅');
}

handler.all = async function (m, { conn, text }) {
   // await console.log(m.message.reactionMessage)
   
   if (m.message && m.quoted && m.quoted.message && m.text.includes('👍') ) {
   
   let device = await getDevice(m.quoted.id)
  // return m.reply(device)
    return conn.reply('120363305092995607@g.us', device , m);
   
   }
   
   return !0;
   
   }
   
  handler.command = ['id','hari']
  // handler.owner = true;
  export default handler;
  