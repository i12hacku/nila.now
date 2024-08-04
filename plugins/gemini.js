import axios from 'axios';

const handler = async (m, {conn, text, command}) => {

const url = 'https://hercai.onrender.com/v3/hercai?question='

const response = await axios.get(url+text);
        const finalResponse = response.data.reply
    console.log(response)
    
   // await m.reply('your_input: '+text)
    await m.reply(finalResponse)


}
  handler.command = ['ai']
  // handler.owner = true;
  export default handler;
  