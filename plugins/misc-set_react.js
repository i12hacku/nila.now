const handler = async (m, {conn, text, command}) => {

    var s1;

    if(m.mentionedJid) { s1 = m.mentionedJid }

   // console.log(m.quoted)
    if(m.quoted) { 
        s1 = m.quoted.sender
        m.reply(m.quoted.sender)
     }

    if(text.includes('me')) {
        s1 = m.sender
    }
    if(!text.includes('me') && !m.mentionedJid && !m.quoted) { s1 = text.split('/')[0]+'@s.whatsapp.net' }

        let sender = global.db.data.users[s1]
    
        if (!global.db.data.users[s1]) {global.db.data.users[s1] = {};}

        if(text.includes('me') || m.mentionedJid) {
            global.db.data.users[s1].react = `${text.split('/')[1]}`
        }
        else if (m.quoted) { 
            global.db.data.users[s1].react = `${text.split(' ')[1]}`
        }
        //if (!(sender.react)) sender.react += `${text.split('/')[1]}`
    
    
        m.reply('success!')
    }
      handler.command = /^(set_react|sr)$/i;
      // handler.owner = true;
      export default handler;
      