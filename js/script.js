"use strict";

const worker = new Worker('js/chankLoader.js')

const startButt=document.querySelector(`.start`)
const stopButt=document.querySelector(`.stop`)
const resetButt=document.querySelector(`.reset`)
const hoursDisplay=document.querySelector(`.hours`)
const minutesDisplay=document.querySelector(`.minutes`)
const secondsDisplay=document.querySelector(`.seconds`)
const hoursInput=document.querySelector(`#h`)
const minutesInput=document.querySelector(`#m`)
const secondsInput=document.querySelector(`#s`)

let hours,minutes,seconds

hoursInput.addEventListener(`input`,()=>hoursInput.value=hoursInput.value==``?`00`:hoursInput.value)
minutesInput.addEventListener(`input`,()=>
	minutesInput.value=minutesInput.value>59?minutesInput.value=59:minutesInput.value==``?`00`:minutesInput.value)
secondsInput.addEventListener(`input`,()=>
	secondsInput.value=secondsInput.value>59?secondsInput.value=59:secondsInput.value==``?`00`:secondsInput.value)

startButt.addEventListener(`click`,startCount)
resetButt.addEventListener(`click`,()=>location.reload())

function startCount(){
	hours=hoursInput.value.length<2?`0`+hoursInput.value:hoursInput.value
	minutes=minutesInput.value.length<2?`0`+minutesInput.value:minutesInput.value
	seconds=secondsInput.value.length<2?`0`+secondsInput.value:secondsInput.value
	if(!+hours&&!+minutes&&!+seconds){return}
	startButt.removeEventListener(`click`,startCount)
	stopButt.addEventListener(`click`,stopCount)
	worker.postMessage({hours,minutes,seconds,condition:true})
}

function stopCount(){
	stopButt.removeEventListener(`click`,stopCount)
	startButt.addEventListener(`click`,continueCount)
	worker.postMessage({condition:false})
}

function continueCount(){
	stopButt.addEventListener(`click`,stopCount)
	startButt.removeEventListener(`click`,continueCount)
	worker.postMessage({condition:true})
}

function HTMLChange(){
	
}

worker.onmessage=(message)=>{
	if(!message.data.condition){
		stopButt.removeEventListener(`click`,stopCount)
		startButt.removeEventListener(`click`,continueCount)
		document.body.insertAdjacentHTML(`afterbegin`,`<audio loop src="audio/sound.mp3" autoplay></audio>`)
		setTimeout(()=>{location.reload()},5000)
	}
		hoursDisplay.innerHTML=(``+message.data.hours).length<2?`0`+message.data.hours:message.data.hours
		minutesDisplay.innerHTML=(``+message.data.minutes).length<2?`0`+message.data.minutes:message.data.minutes
		secondsDisplay.innerHTML=(``+message.data.seconds).length<2?`0`+message.data.seconds:message.data.seconds
	
}






