const handler = async (m, { conn, text }) => {
    var count;
    var zero

    if (!text) {
        throw '`enter count and zeros`'
    } else {
        count = parseInt(text.split('/')[0]);
        if (text.includes(',')) {
            zero = parseInt(text.split(',')[1]);
        } else {
            zero = 4
        }
    }

    try {

        if (!text.includes('edit')) {
            const numbers = [];

            for (let i = 0; i < count + 1; i++) {
                const paddedNumber = i.toString().padStart(zero, '0');
                numbers.push(paddedNumber);
            }

            const sik = numbers.join('\n');
            await m.reply(sik)

        } else {
            let { key } = await conn.sendMessage(m.chat, { text: '`starting..`' })

            let previousPrintedNumber = '';
            for (let i = 0; i < count + 1; i++) {
                const paddedNumber = i.toString().padStart(zero, '0');
                if (i === 0) {
                    await conn.sendMessage(m.chat, { text: paddedNumber, edit: key })
                    previousPrintedNumber = paddedNumber;
                } else {
                    const numbersToPrint = previousPrintedNumber + '\n' + paddedNumber;
                    await conn.sendMessage(m.chat, { text: numbersToPrint, edit: key })
                    previousPrintedNumber = numbersToPrint;
                }
                await sleep(1000);
            }
        }

    } catch (e) {
        m.reply('`error`')
    }

}

handler.command = ['num']
handler.owner = true;
export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
