import { sticker } from '../assets/lib/sticker.js'
import uploadFile from '../assets/lib/uploadFile.js'
import uploadImage from '../assets/lib/uploadImage.js'
import { webp2png } from '../assets/lib/webp2mp4.js'
import fs from 'fs'

let handler = async (m, { conn, args , text , usedPrefix, command }) => {
let stiker = false

var name = m.pushName

let packname;
let author;

if (text && text.includes("|")) packname = text.split("|")[0]
                     if (text && !text.includes("|") || !text.includes("/")) packname = text
                     

                     if (text && text.includes("|"))    author = text.split("|")[1]

                     if (text && text.includes("/")) packname = text.split("/")[0] 
                     if (text && text.includes("/")) author = text.split("/")[1]

                      if (!text) packname = name
                     if (!text) author = `Nila`

try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video|document/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 30) return m.reply('error')
let img = await q.download?.()

if (!img) return m.reply('error')

let out
try {
stiker = await sticker(img, false, packname, author)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, packname, author)
}}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], packname, author)

else return conn.sendMessage(m.chat, { text: `Error`, contextInfo:{"externalAdReply": {"title": `Undefind`,"body": `Cuddah , are you kidding me ?`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync('./media/song.jpg'),"sourceUrl": `c`}}}, { quoted: m})
  
}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)

else return conn.sendMessage(m.chat, { text: `Where is the Image/Video ?`, contextInfo:{"externalAdReply": {"title": `Undefind`,"body": `Cuddah , are you kidding me ?`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync('./media/song.jpg'),"sourceUrl": `c`}}}, { quoted: m})

}}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?$/i
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
