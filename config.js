const chalk = require("chalk")
const fs = require("fs")

global.ownerNumber = ["6285655636044@s.whatsapp.net","6283143971352@s.whatsapp.net"]
global.nomerOwner = "6285655636044"
global.nomorOwner = ['6285655636044',"6283143971352"]
global.nameGEDE = "LuxxyBOTz⚡"
global.namaDeveloper = "LuxxyBOTz⚡"
global.namaBot = "LuxxyBOTz⚡ WhatsApp"
global.thumb = fs.readFileSync("./thumb.png")
global.packdazz = 'DazzBotz
global.authordaz = '© Dazz'

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})

/*

Thanks To By KirBotz
DI UPDATE Dan Di Tulis Ulang Oleh Ziro-MD 
Ubah Nomor Owner?
Ganti Di File ./owner.json
Panel Unlimited : 5K
Panel : 1k
Chat Wa : 085655636044

*/