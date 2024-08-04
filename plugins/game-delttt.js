const handler = async (m, {conn, usedPrefix, command}) => {
    const room = Object.values(conn.game).find((room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender));
    if (room == undefined) return m.reply('room ?')
    delete conn.game[room.id];
    await m.reply('game deleted!');
  };
  handler.command = /^(delttt|deltt|delxo|deltictactoe)$/i;
  handler.fail = null;
  export default handler;