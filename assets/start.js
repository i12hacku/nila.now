console.log('Starting Bot...')

import yargs from 'yargs'; 
import { fileURLToPath } from 'url'; 
import { join, dirname } from 'path'; 
import { createRequire } from 'module'; 
import { createInterface } from 'readline'; 
import { setupMaster, fork } from 'cluster'; 
import { watchFile, unwatchFile } from 'fs';

// https://stackoverflow.com/a/50052194
const rl = createInterface(process.stdin, process.stdout)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

console.log('NilaBot.demo')

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  console.log([process.argv[0], ...args].join(' '))
  setupMaster({ exec: args[0], args: args.slice(1) })
  let p = fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('Exited with code:', code)
    if (code !== 0) return start(file)
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('connect.js')
