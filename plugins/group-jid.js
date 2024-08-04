const handler = async (m, {conn, command}) => {
    
    
    await conn.reply('120363311302344189@g.us', m.chat , m);
    
    await conn.reply(conn.my_id, m.chat , m);
   
    await m.react('✅');
}
  handler.command = ['jid','..']
  // handler.owner = true;
  export default handler;
  