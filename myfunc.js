const { proto, delay, getContentType } = require('@adiwajshing/baileys')
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')

exports.smsg = (client, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = client.decodeJid(m.fromMe && client.user.id || m.participant || m.key.participant || m.chat || '')
        if (m.isGroup) m.participant = client.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = getContentType(quoted)
			m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
				type = getContentType(m.quoted)
				m.quoted = m.quoted[type]
			}
            if (typeof m.quoted === 'string') m.quoted = {
				text: m.quoted
			}
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
			m.quoted.sender = client.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === (client.user && client.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
			if (!m.quoted.id) return false
			let q = await store.loadMessage(m.chat, m.quoted.id, client)
 			return exports.smsg(client, q, store)
            }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.quoted.delete = () => client.sendMessage(m.quoted.chat, { delete: vM.key })
            m.quoted.download = () => client.downloadMediaMessage(m.quoted)
        }
    }
    if (m.msg.url) m.download = () => client.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
    return m
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})

exports.groupResponse_Remove = async (client, update) => {
try {
ppuser = await client.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'}

///// OUT 
const metadata = await client.groupMetadata(update.id)
for (let participant of update.participants) {
try{
let metadata = await client.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'remove'){
await client.sendMessage(update.id, {text: `Sayonara @${num.split("@")[0]} 👋`, mentions: [num] })
}}} catch (err) {
console.log(err)
}}}

// WELCOME  
exports.groupResponse_Welcome = async (client, update) => {
try {
ppuser = await client.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
}

const metadata = await client.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await client.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'add') {
await client.sendMessage( update.id, {  text: `Hi @${num.split("@")[0]} 👋, Welcome to *${metadata.subject}*`, mentions: [num] })}}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Promote = async (client, update) => {  
const metadata = await client.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await client.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'promote') {
await client.sendMessage(update.id, { text: `[ *SYSTEM DETECTED* ]\n Member *@${num.split("@")[0]}* sekarang menjadi admin group!`, mentions: [num] })}}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Demote = async (client, update) => {  
const metadata = await client.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await client.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'demote') {
await client.sendMessage(update.id, { text: `[ *SYSTEM DETECTED* ]\n Member *@${num.split("@")[0]}* sekarang *tidak* menjadi admin group!`, mentions: [num] })}}
} catch (err) {
console.log(err)
}
}   
}
