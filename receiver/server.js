var express = require("express")
var app = express()
const { exec } = require('child_process')

app.post("/:app", (req, res, next) => {
	res.send("Tunggu bentar bos...")
	exec('/usr/bin/node /usr/local/bin/slack-monit/server.js '+req.params.app, (err, stdout, stderr) => {
		if (err) {
			console.log(err)
		} else {
			console.log('OK')
		}
	})
})

app.listen(7000, () => {
	console.log("Server running on port 3000")
})