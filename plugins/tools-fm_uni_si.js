import { dlManelToUnicode, singlishToUnicode, unicodeToDlManel } from "sinhala-unicode-coverter"
import ExplorerTranslate from 'explorer-translate';

const handler = async (m, { conn, text, command }) => {

  if(!m.quoted) throw '`mention some text`'
  
  if (m.quoted && m.quoted.sender === '94702978512@s.whatsapp.net') {
    if (!m.sender.includes('94702978512')) throw 'ema ukanna denna ba'
  }

  await m.react('💬')

  if (command == 'uni') {
    const a = dlManelToUnicode(m.quoted.text)
    m.reply(a)

  }

  if (command == 'fm') {
    const b = unicodeToDlManel(m.quoted.text)
    m.reply(b)

  }

  if (command == 'singlish') {
    const c = singlishToUnicode(m.quoted.text)
    m.reply(c)
  }

  if (command == 'bin' || command == 'binary') {
    const c = stringToBinary(m.quoted.text)
    m.reply(c)
  }

  if (command == 'str' || command == 'string') {
    const c = binaryToString(m.quoted.text)
    m.reply(c)
  }

  if (command == 'trans-si' || command == 'si') {

    ExplorerTranslate.translate({
      sourcelanguage: '',
      targetLanguage: 'si',
      content: m.quoted.text
    }).then(function (content) {
      m.reply(content);
    });
  }

  if (command == 'trans-en' || command == 'en') {

    ExplorerTranslate.translate({
      sourcelanguage: '',
      targetLanguage: 'en',
      content: m.quoted.text
    }).then(function (content) {
      m.reply(content);
    });
  }

  await m.react('✅')

};
handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['premium'];
handler.command = ["uni", "fm", 'si' , 'trans-si' , 'en' , 'trans-en' , "si", 'bin', 'binary', 'string', 'str' , 'singlish']
export default handler;

function stringToBinary(str) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);
  let binary = '';
  for (let byte of encoded) {
    binary += byte.toString(2).padStart(8, '0') + ' '; // Ensure each byte representation has 8 digits
  }
  return binary.trim();
}

function binaryToString(binary) {
  const bytes = binary.split(' ');
  const uint8Array = new Uint8Array(bytes.map(byte => parseInt(byte, 2)));
  const decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}