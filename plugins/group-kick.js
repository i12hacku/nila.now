const handler = async (m, {conn, participants, args, text, command}) => {
    const kicktext = `mention or ~give a number~`

    if (/^\d{10}$/.test(text)) {
    let victim = text.replace(/ /g,'')

if (victim.length == 10 ) {
    victim = '94'+victim.slice(1);
}

if (victim.startsWith('+')) { 
    victim = victim.slice(1);
}

var victim2 = victim.replace(/[^0-9]/g, '')+'@s.whatsapp.net'

    }
   throw victim2 ? victim2 : '`no text`'
   // if (!m.mentionedJid[0] && !m.quoted || !args[0]) return m.reply(kicktext, m.chat, {mentions: conn.parseMention(kicktext)});
    
    const user = victim2 ? victim2+' `from text`' : m.quoted.sender ? m.quoted.sender+ ' `from quoted`' : m.mentionedJid[0]+ ' `from mention`';
    return m.reply(user)
    if (user.includes(conn.user.jid)) return;
    const owr = m.chat.split`-`[0];
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    m.reply('sucess');
  };
  handler.command = /^(kick)$/i;
  handler.admin = true;
  handler.group = true;
  handler.botAdmin = true;
  export default handler;
  