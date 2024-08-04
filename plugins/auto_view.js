
// import pkg from '../assets/chem.js'

// import PQueue from 'p-queue';

// const queue = new PQueue({ concurrency: 1 });

import fs from 'fs';

const {downloadContentFromMessage} = (await import('@whiskeysockets/baileys'));

import uploadImage from '../assets/lib/uploadImage.js'


/* const JSONToFile = (obj, filename) =>
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));

 JSONToFile(await conn.chats, 'testJsonFile');
*/

const view = {
auto: true,
react: '👁'
}

async function react (conn,id,key,text) {

await conn.sendMessage(id, {
       react: {
          text,
         key: key
                    }
                })

}


const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!m.quoted) throw 'quote';
  if (!m.quoted.mtype.includes('viewOnceMessageV2')) throw '*_not view once_* '+m.quoted.mtype
  const msg = m.quoted.message;
  const type = Object.keys(msg)[0];
  
 //  return m.reply(type)
  const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'audioMessage' ? 'audio' : 'video');
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  
const toSend1 = conn.user.id

  await m.reply('processing');
  if (/video/.test(type)) {
    return conn.sendFile(toSend1, buffer, 'error.mp4', msg[type].caption || '', m);
  } else if (/image/.test(type)) {
    return conn.sendFile(toSend1, buffer, 'error.jpg', msg[type].caption || '', m);
  } else if (/audio/.test(type)) {
    return conn.sendFile(toSend1, buffer, 'error.mp3', msg[type].caption || '', m, null, { forwarded : true });
  }
  
  await m.react('👁️‍🗨️');
}

handler.all = async function (m, { conn, text }) {
   // await console.log(m.message.reactionMessage)
   
   if (m.message && m.quoted && m.quoted.message && m.text.includes('👁') && m.quoted.message.viewOnceMessageV2Extension || m.message && m.quoted && m.quoted.message && m.quoted.message.viewOnceMessageV2) {
   
   if (!m.quoted) throw 'quote';
  if (!m.quoted.mtype.includes('viewOnceMessageV2')) throw '*_not view once_* '+m.quoted.mtype
  const msg = m.quoted.message;
  const type = Object.keys(msg)[0];
  
 //  return m.reply(type)
  const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'audioMessage' ? 'audio' : 'video');
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }

     const toSend2 = conn.user.id
     
  // await m.reply('processing');
  if (/video/.test(type)) {
    return conn.sendFile(toSend2, buffer, 'error.mp4', msg[type].caption || '', m);
  } else if (/image/.test(type)) {
    return conn.sendFile(toSend2, buffer, 'error.jpg', msg[type].caption || '', m);
  } else if (/audio/.test(type)) {
    return conn.sendFile(toSend2, buffer, 'error.mp3', msg[type].caption || '', m, null, { forwarded : true });
  }
  
  await m.react('👁️‍🗨️');
   
   
   }
   
   
   
    if (view.react !== false && m.message && m.message.reactionMessage && m.text.includes(view.react)) {
    
    const messageKey = m.message.reactionMessage.key

  //  await m.reply(messageKey.remoteJid)

const message = await conn.loadMessage(messageKey.id);

let msg2;

if (message ) {
msg2 = message.message
   // console.log('Found message:', msg2);
} else {
msg2 = null
  // console.log('Message not found');
  await conn.sendMessage(conn.user.id, { text: 'Message id not found, try quoting' } , { quoted : m })
    
}

if (msg2 && msg2.viewOnceMessageV2 || msg2 && msg2.viewOnceMessageV2Extension) {
 //  if (m.message) {
      await react(conn,m.chat,m.message.reactionMessage.key,'👁');

const msg = msg2;
// return console.log(msg)
  // const type = Object.keys(msg)[0];
  
 // const msg = m.message;

let typ;
let msgD;

if (msg.viewOnceMessageV2Extension && msg.viewOnceMessageV2Extension.message.audioMessage) {
  typ = 'audioMessage'
  msgD = msg.viewOnceMessageV2Extension.message[typ]
} else if (msg.viewOnceMessageV2 && msg.viewOnceMessageV2.message.imageMessage) {
  typ = 'imageMessage'
  msgD = msg.viewOnceMessageV2.message[typ]
} else if (msg.viewOnceMessageV2 && msg.viewOnceMessageV2.message.videoMessage) {
  typ = 'videoMessage';
  msgD = msg.viewOnceMessageV2.message[typ]
} else {
 typ = 'null'
// return m.reply('error: _unkown message type_')
}

// await m.reply(typ)



let type = typ;
 // return m.reply(type)
  const media = await downloadContentFromMessage(msgD, type == 'imageMessage' ? 'image' : 'audioMessage' ? 'audio' : 'videoMessage' ? 'video' : null );
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  
  const toSend = conn.user.id
  
//  await m.reply('processing');
  if (/video/.test(type)) {
  let data = await uploadImage(buffer)
  // await m.reply(data)
    await conn.sendFile(toSend, buffer, 'error.mp4', msgD.caption || '', m);
  } else if (/image/.test(type)) {
    let data = await uploadImage(buffer)
    // await m.reply(data)
    await conn.sendFile(toSend, buffer, 'error.jpg', msgD.caption || '', m);
  } else if (/audio/.test(type)) {
    await conn.sendFile(toSend, buffer, 'error.mp3', msgD.caption || '', m, null, { forwarded : true });
  }
  
      return await react(conn,m.chat,m.message.reactionMessage.key,'👁️‍🗨️');
      
     // m.react('👁️‍🗨️');
    

} else {
return m.reply('fail')
}

return

    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     if (view.auto && m.message && m.message.viewOnceMessageV2 || view.auto && m.message && m.message.viewOnceMessageV2Extension) {
 //  if (m.message) {
        await m.react('👁');

const msg = m.message;
// return console.log(msg)
  // const type = Object.keys(msg)[0];
  
 // const msg = m.message;

let typ;
let msgD;

if (msg.viewOnceMessageV2Extension && msg.viewOnceMessageV2Extension.message.audioMessage) {
  typ = 'audioMessage'
  msgD = msg.viewOnceMessageV2Extension.message[typ]
} else if (msg.viewOnceMessageV2 && msg.viewOnceMessageV2.message.imageMessage) {
  typ = 'imageMessage'
  msgD = msg.viewOnceMessageV2.message[typ]
} else if (msg.viewOnceMessageV2 && msg.viewOnceMessageV2.message.videoMessage) {
  typ = 'videoMessage';
  msgD = msg.viewOnceMessageV2.message[typ]
} else {
 typ = 'null'
// return m.reply('error: _unkown message type_')
}

// await m.reply(typ)



let type = typ;
 // return m.reply(type)
  const media = await downloadContentFromMessage(msgD, type == 'imageMessage' ? 'image' : 'audioMessage' ? 'audio' : 'videoMessage' ? 'video' : null );
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  
  const toSend = conn.user.id
  
//  await m.reply('processing');
  if (/video/.test(type)) {
  let data = await uploadImage(buffer)
  // await m.reply(data)
    await conn.sendFile(toSend, buffer, 'error.mp4', msgD.caption || '', m);
  } else if (/image/.test(type)) {
    let data = await uploadImage(buffer)
    // await m.reply(data)
    await conn.sendFile(toSend, buffer, 'error.jpg', msgD.caption || '', m);
  } else if (/audio/.test(type)) {
    await conn.sendFile(toSend, buffer, 'error.mp3', msgD.caption || '', m, null, { forwarded : true });
  }
  
      return m.react('👁️‍🗨️');
    }

    return !0;

}

handler.command = ['.👁️']
export default handler;
