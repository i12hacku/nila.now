

import fs from 'fs';

const {downloadContentFromMessage} = (await import('@whiskeysockets/baileys'));

const handler = async (m, {conn}) => {

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
  
  await m.reply('processing');
  if (/video/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'error.mp4', msg[type].caption || '', m);
  } else if (/image/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'error.jpg', msg[type].caption || '', m);
  } else if (/audio/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'error.mp3', msg[type].caption || '', m, null, { forwarded : true });
  }
  
  await m.react('✅');
  
};
handler.help = ['readvo'];
handler.tags = ['tools'];
handler.command = /^(readviewonce|view|read|view|revelar|readvo)$/i;
export default handler;
