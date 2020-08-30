const { exec } = require('child_process')
const http = require("http");
const request = require('request');

exec('monit status '+process.argv[2], (err, stdout, stderr) => {
	if (err) {
	  	console.error(err)
	} else {
		console.log(`${stdout}`)
		var text = `${stdout}`.replace(/\s+/g, ' ')

		var name = text.substring(text.search('Process')+9, text.search('status')-2)
		var status = text.substring(text.search('status')+7, text.search('monitoring status'))
		var memory = text.substring(text.search('memory total')+13, text.search('security attribute'))
		var uptime = text.substring(text.lastIndexOf('uptime')+7, text.search('threads'))
		var cpu = text.substring(text.search('cpu total')+10, text.search('memory'))
		var pid = text.substring(text.search('pid')+4, text.search('parent pid'))
		var data_collected = text.substring(text.search('data collected')+15)

		if (status == 'OK ') {
			var color = "#36a64f"
			var img = "https://adityaeka.com/happy.jpg"
			status = 'Up :grin:'
		} else {
			var color = "#FF0000"
			var img = "https://adityaeka.com/sad.jpg"
			pid = "-"
			cpu = "-"
			uptime = "-"
			memory = "-"
		}

		if (status == 'Does not exist ') {
			status = 'Down :sob:'
		}

		var options = {
		  	// uri: 'https://hooks.slack.com/services/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', // Aditya Eka
		  	uri: 'https://hooks.slack.com/services/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', // #server-status
		  	method: 'POST',
		  	json: {
		    	"attachments": [
		        	{
		            	"mrkdwn_in": ["text"],
		            	"color": color,
		            	// "text": text,
		            	"fields": [
							{
							    "title": "Process",
							    "value": name,
							    "short": true
							},
							{
							    "title": "Status",
							    "value": status,
							    "short": true
							},
							{
							    "title": "PID",
							    "value": pid,
							    "short": true
							},
							{
							    "title": "Memory",
							    "value": memory,
							    "short": true
							},
							{
							    "title": "Uptime",
							    "value": uptime,
							    "short": true
							},
							{
							    "title": "CPU",
							    "value": cpu,
							    "short": true
							}
		        		],
		        		"thumb_url": img,
		            	"footer": data_collected
		        	}
		    	]
		  	}
		}

		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		})
	}
})
