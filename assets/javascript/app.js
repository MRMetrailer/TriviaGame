var triviaQuestions = [{
	question: "What is the oldest hotel and casino in Las Vegas?",
	answerList: ["Las Vegas Palace", "Golden Gate", "Four Queens", "Bugsy's"],
	answer: 1
},{
	question: "What is NOT a strategy the casinos use to get gamblers to spend more money?",
	answerList: ["they provide a breakdown of the mathematics of gambling", "they hide the progression of time", "they make sure everyone sees a win", "they provide 'free' perks"],
	answer: 0
},{
	question: "This hotel and casino was the first to feature topless showgirls in a show called Minsky's Follies.",
	answerList: ["The Flamingo", "Four Queens", "The Dunes", "Central Casino"],
	answer: 2
},{
	question: "How many miles of neon lights are spread throughout the strip and downtown Vegas?",
	answerList: ["15,000", "13,150", "12,500", "20,000"],
	answer: 0
},{
	question: "This hotel and casino is home to the largest chocolate fountain in the world according to the Guiness Book of World Records.",
	answerList: ["Mandalay Bay", "Wynn", "MGM Grand", "Bellagio"],
	answer: 3
},{
	question: "What is currently the oldest casino still standing on the Las Vegas Strip?",
	answerList: ["Circus Circus", "MGM Grand", "The Stratosphere", "The Flamingo"],
	answer: 3
},{
	question: "This casino hosted the last show by Abbot & Costello before their eventual break-up.",
	answerList: ["The Luxor", "The Sahara", "Bugsy's", "Golden Nugget"],
	answer: 1
},{
	question: "Which casino on the Las Vegas Strip is home to the largest bronze sculpture in North America?",
	answerList: ["Caesars Palace", "Venetian", "SLS", "MGM Grand"],
	answer: 3
},{
	question: "This entertainer headlined at the Las Vegas Hilton in the 1970s, playing for sold out crowds and earning a meager $300,000 per week.",
	answerList: ["Liberace", "Barbra Streisamd", "Woody Allen", "Burt Reynolds"],
	answer: 0
},{
	question: "The largest Las Vegas slot machine jackpot ever was paid out on a Megabucks machine at the Excalibur hotel in march of 2003. What was the winning amount rounded to the nearest million?",
	answerList: ["$173 million", "$40 million", "$28 million", "$14 million"],
	answer: 1
}];

var gifArray = ['GoldenGate', 'GamblingMath', 'Showgirls', 'VegasNeon', 'ChocolateFountain', 'Flamingo', 'Sahara', 'MgmLion', 'Liberace', 'SlotWinner'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
	correct: "Correct! You are a true gambler.",
	incorrect: "Wrong! Back to the drawing board.",
	endTime: "Out of time!",
	finished: "You're finished! Let's tally up your score."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html(triviaQuestions[currentQuestion].question);
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('Time Remaining: ' + seconds);
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('Time Remaining: ' + seconds);
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.jpg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}