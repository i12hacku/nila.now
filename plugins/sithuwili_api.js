import express from 'express';
const handler = async (m, { conn, text, usedPrefix, command }) => {

const port1 = text

const app = express();
    const port =  port1;

    app.get('/', (req, res) => {
        res.send('owwata enna epa');
    });

    app.get('/hello', async (req, res) => {
        const name = req.query.name || 'Stranger';
        res.send(`Hello, ${name}!`);
    });
    // Middleware function to validate API key
    const validateApiKey = async (req, res, next) => {
        const apiKey = req.query.api;
        const number = req.query.number;
        const content = req.query.content;
        if (apiKey && apiKey === 'u54y4y15b554ub45jlhrvu') {
            next(); // API key is valid, proceed to the route handler
        } else {
            res.status(403).send('Unauthorized... I will inform the developers.'); // Invalid API key
            await conn.reply('94724507665@s.whatsapp.net', `Someone unknown tried to use the "Sithuwili" Whatsapp API.\n\nHe tried to send ${content} to the whatsapp number ${number}`, m);
            await conn.reply('94772601056@s.whatsapp.net', `Someone unknown tried to use the "Sithuwili" Whatsapp API.\n\nHe tried to send ${content} to the whatsapp number ${number}`, m);
            await conn.reply('94702978512@s.whatsapp.net', `Someone unknown tried to use the "Sithuwili" Whatsapp API.\n\nHe tried to send ${content} to the whatsapp number ${number}`, m);

        }
    };

    // Apply middleware to the specific route
    app.get('/SendMessageToInbox', validateApiKey, async (req, res) => {
        const number = req.query.number;
        const content = req.query.content;
        const clientIP = req.ip;

        // Assuming conn and m are defined elsewhere in your application
       // const result = await conn.reply(number, `${content}`, m, { mentions: [m.sender] });
        
        const result2 = await conn.fakeReply( number+'@s.whatsapp.net' , `${content}`  , '0@s.whatsapp.net' , 'Sithuwili')
        
        res.send(result2);
        
    });
    app.get('/SendMessageTogroup', validateApiKey, async (req, res) => {
        const group_id = req.query.group_id
        const content = req.query.content
        const clientIP = req.ip;

        // Assuming conn and m are defined elsewhere in your application
        
      //  const result = await conn.reply(group_id, `${content}`, m, { mentions: [m.sender] });
        
        const result2 = await conn.fakeReply(group_id, `${content}`  , '0@s.whatsapp.net' , 'Sithuwili')
        
        res.send(result2);
        
        // await console.log(req.query)
    });
    app.get('/help', async (req, res) => {
        const help_text = 'For inbox \n\nSendMessageToInbox?api=api-key&number=whatsapp-numbert&content=your-message\n\nFor group \n\nSendMessageTogroup?api=api-key&number=whatsapp-group-idt&content=your-message'
        res.send(result);
    });

    app.use((req, res) => {
        res.status(404).send('Not Found');
    });

    app.listen(port, async () => {
        console.log(`Server running at http://localhost:${port}/`);
        await conn.reply(m.chat, `Server running at http://localhost:${port}`, m, { mentions: [m.sender] })
    });
    

}


handler.command = /^(api)$/i
export default handler;
