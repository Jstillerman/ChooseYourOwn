/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import faker from 'faker'


	//Locate panel
	var panel = document.getElementsByClassName('panel')[0]

	function type(str) {
	  return new Promise(function(resolve, reject) {
	    var i = 0;
	    var timer = window.setInterval(() => {
	      if(i >= str.length) {
	        window.clearInterval(timer)
	        resolve()
	      }
	      else{

	        panel.innerHTML += str[i] == '\n' ? "<br>" : str[i]
	        panel.scrollTop = panel.scrollHeight //Lock scroll to bottom
	        i++
	      }
	    }, 50)
	  });
	}

	function ask(opts){
	  panel.innerHTML += "<br><br>" // Add a newline
	  Object.keys(opts).forEach(opt => {
	    var el = document.createElement("button")
	    el.innerHTML = opt
	    el.onclick = function(){
	      panel.innerHTML += "<br>"
	      play(opts[opt])
	    }
	    panel.appendChild(el)
	  })
	}


	function story(text, opts){
	  var s = {}
	  s.text = text
	  if(opts) s.options = opts
	  return s
	}

	function play(scene) {
	  type(scene.text)
	  .then(() => {
	    if(scene.options){
	      ask(scene.options)
	    }
	  })
	}

	var storyline = story("What do you want to do?", {
	    "eat": story("You eat"),
	    "sleep": story("You sleep"),
	    "watch": story("You flip on the TV. What do you watch?", {
	      "Modern Family": story("You watch Modern Family"),
	      "Family Guy": story("You watch Family Guy")
	    })
	})

	var cast = {
	  you: faker.name.lastName(),
	  doctor: faker.name.lastName(),
	  geologist: faker.name.findName(),
	  pilot: faker.name.firstName(),
	  stranger: [
	    faker.name.findName(),
	    faker.name.findName()
	  ]
	}

	function getLost(direction){
	  return story(`Everybody boards the mini jet and prepares for liftoff. A little red indicator tells you to buckle up. Dr. ${cast.geologist} sits down next to you. Over the next few hours you come to really dislike ${cast.geologist}.\n\n
	    Suddenly, ${cast.pilot} comes onto the loud speaker.\n\n "Attention all passengers. Do not be alarmed but it seems we are lost. We are supposed to be over the north pole right now, but my radar picks up nothing but water for miles in all direcrions. We are running low on gas and there is no where to land. Everybody please start reading the safety protocol pamflets under your seat. It's looking like we're going to need them"\n\n
	    You knew you shouldn't have flown ${direction}, and you knew you shouldn't have accepted Dr. ${cast.doctor}'s offer.`)
	}

	var quest = story("You hear the chime of your phone recieving an email. Who could possibly be emailing you at this hour? You claw at your beside table, fumbling to get your cell phone. " +
	`The screen illuminates, searing your night-time eyes. 1 new email from ${cast.doctor}.\n\n` +
	"Dear Professor " + cast.you + ",\n  This is of the utmost importance. I am assembling a team of high calliber scientists for an expedition. You, being the top Oceanographer in the feild, would make an excellent addition to the team. Are you up for the challenge? We leave in a weeks time.\n\nA word of warning: these expeditions have the possibility of getting dangerous.\n\nLet me know by the end of the day tomorrow,\nDr. "+ cast.doctor + ", PhD",
	{
	  "Accept the invitation": story("The next week flies by. There is so much to do in preparation for the trip.\n\n" +
	  "You meet up with the rest of the team, and introduce yourself. You meet a geologist named " + cast.geologist + ", and a pilot named " + cast.pilot + ". " +
	  `You get to talking with ${cast.pilot}, and it becomes clear they are not the most experienced pilot. ${cast.pilot} starts to tell you how it is impossible to fall off course, as we are going to fly directly north all the way to the pole.`, {
	    'Whatever you say': getLost('north'),
	    'That\'s not right, the plane must be angled north-east': getLost('north-east'),
	    'That\'s not right, the plane ought to fly southwards': getLost('south'),
	    'That\'s not right, the plane should point north-west': story(`Everybody boards the mini jet and prepares for liftoff. A little red indicator tells you to buckle up. Dr. ${cast.geologist} sits down next to you. Over the next few hours you come to really dislike ${cast.geologist}.\n\n
	      Suddenly, ${cast.pilot} comes onto the loud speaker.\n\n"Attention all passengers. We will be arriving at our destination in about 20 minutes. Everybody please remain seated through the end of the flight."\n\nYou can't wait to get away from ${cast.geologist.split(" ")[0]}.\n\nTwo days into the expedition, everyone is hard at work. There are daily discussions about the teams findings. You show up to the meeting 5 mins late, and ${cast.geologist} is already yapping.\n\n
	      "...and this unequal heating causes air in some regions to rise. This results in the wind belts stretching across the globe."\n\nEvery scientist in the room has taken basic geology. There's absolutely no reason for ${cast.geologist.split(" ")[0]} to explain it to us. Who let this guy come?\n\n${cast.doctor} gets up in front of everyone and announces "Everybody should have finialized their rooming arrangement by the end of the day. Just a reminder, you must record your room mate on the slip at the front, then cross your name off."\n\nYou have yet to find a room mate, so you slide up to the front of the room and look at the sheet. There are only 4 names not crossed off: ${cast.you}, ${cast.geologist}, ${cast.stranger[0]}, and ${cast.stranger[1]}. What's worse? Rooming with a stranger or ${cast.geologist}?`, getRoomMateOpts())
	  }),
	  "Decline the invitation": story("He fires you the next day. You clearly are not very commited to the field...")
	})

	function getRoomMateOpts() {
	  var opts = {}
	  opts[cast.geologist] = continueStory(cast.geologist, true)
	  opts[cast.stranger[0]] = continueStory(cast.stranger[0])
	  opts[cast.stranger[1]] = continueStory(cast.stranger[1])
	  return opts
	}

	function continueStory(roomMate, pickedGeologist){
	  return story(`The next few days are brutal. ${roomMate} has taken to your side. You'd think that they would have gotten the hint by now that you aren't interested in forging a friendship...\n\n
	  On top of that, at this time of year at the pole, due to the tilt of the eart, it is continously dark. After the first few days, the darkness has taken a toll on everybody, and no one is in a good mood.`)
	}

	play(quest)


/***/ }
/******/ ]);