import axios from 'axios'
import fetch from "node-fetch"

import uploadImage from '../assets/lib/uploadImage.js'



let handler = async (m) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!mime) throw `reply picture|video|audio|sticker|document with command .tour..l`
	let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
	let media = await q.download()
	if (isTele && media.length < 5242880) {
		let data = await uploadImage(media)
		m.reply(data)
	} else if (/image|video|audio|sticker|document/.test(mime)) {
	m.reply('null')
	} else throw 'No media found'
}
handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(upload|tourl|url)$/i

export default handler

async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}
