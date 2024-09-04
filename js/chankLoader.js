'use strict'

let fullTime,
	condition,
	hours,
	minutes,
	seconds

onmessage=(message)=>{
	condition=message.data.condition
	if(condition){
		if(message.data.hours){
			fullTime=+message.data.hours*3600+ +message.data.minutes*60+ +message.data.seconds
			hours=message.data.hours
			minutes=message.data.minutes
			seconds=message.data.seconds
		}
		startCount(),1000
	}
}

function startCount(){
	if(!condition){return}

	fullTime-=1

	if(!fullTime)condition=false

	if(seconds>0){
		seconds--
	}else if(minutes>0){
		minutes--
		seconds=59
	}else if(hours>0){
		hours--
		minutes=59
		seconds=59
	}
	
	postMessage({hours,minutes,seconds,condition})
	setTimeout(startCount,1000)
}



