    var correct = 0;
    var incorrect = 0;
    var qCounter = 0;
    var userPick = "";
    var wrong = new Audio("assets/sounds/wrong.mp3");
    var answerRight = new Audio("assets/sounds/correct.mp3");
    var beginSound = new Audio("assets/sounds/onStart.mp3");
    var onhold = new Audio("assets/sounds/onhold.mp3");
    var endPos = 100;
    var timer;



    function countDown(secs, elem) {

        $("#timer").html(secs + " remaining");
        secs--;
        if (secs <= 0) {
            clearTimeout(timer);

            wrong.play();
            incorrect++;
            $("#errors").html("errors-" + incorrect);
            console.log("incorrect due to time out, total incorrect: " + incorrect);
            createQuestion(qCounter++);
            return;
        }
        
        timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000);

    }


    var questions = [

        { //question 1}
            guesses: ["MDK 187", "DM 66", "ED 209", "K1 LL"],
            image: '<img src="assets/images/robotA.jpg"/>',
            correctAnswer: "ED 209",
        },

        { //question2
            guesses: ["DAVid", "Marvin", "Wall - E", "BB8"],
            image: '<img src="assets/images/robotB.jpg"/>',
            correctAnswer: "Marvin",
        },

        { //question3
            guesses: ["Cylon", "Borg", "Cyclops", "Cycloid"],
            image: '<img src="assets/images/robotC.jpg"/>',
            correctAnswer: "Cylon",
        },

        { //question4
            guesses: ["Carlos", "stab-0", "Roboterto", "Roberto"],
            image: '<img src="assets/images/robotD.jpg"/>',
            correctAnswer: "Roberto",
        },

        { //question 5
            guesses: ["Tinny", "Merlin", "Bubo", "Whoot"],
            image: '<img src="assets/images/robotE.jpg"/>',
            correctAnswer: "Bubo",
        },

        { //question6
            guesses: ["Iron Man", "Iron Giant", "Steel Giant", "Friendly Giant"],
            image: '<img src="assets/images/robotF.jpg"/>',
            correctAnswer: "Iron Giant",
        },

        { //question7
            guesses: ["Maschinenmensch", "Metal Mary", "MetallO", "Sue Z D00M"],
            image: '<img src="assets/images/robotG.jpg"/>',
            correctAnswer: "Maschinenmensch",
        },

        { //question 8
            guesses: ["Ultimas", "Maxitron", "Ultimo", "Ultron"],
            image: '<img src="assets/images/robotI.jpg"/>',
            correctAnswer: "Ultron",
        },

        { //question 9
            guesses: ["Tom Servo", "Gumboltron", "Crow", "Diane"],
            image: '<img src="assets/images/robotH.jpg"/>',
            correctAnswer: "Tom Servo",
        },

        { //question 10
            guesses: ["GlaDyS", "GlaDOS", "Ger-T", "GravaDOS"],
            image: '<img src="assets/images/robotJ.jpg"/>',
            correctAnswer: "GlaDOS",
        },

        { //question 11
            guesses: ["Sentry", "Warden", "Sentinel", "Zealot"],
            image: '<img src="assets/images/robotK.jpg"/>',
            correctAnswer: "Sentinel",
        },

        { //question 12
            guesses: ["HAL 9000", "Mars Rover", "iSuck", "DJ Roomba"],
            image: '<img src="assets/images/robotL.jpg"/>',
            correctAnswer: "DJ Roomba",
        },

        { //question 1
            guesses: ["Johnny 5", "Freebie", "Answer", "Dang"],
            image: '<img src="assets/images/j5.jpg"/>',
            correctAnswer: "Johnny 5",
        },


    ]; ///end question block

    $(document).ready(function() {

        beginSound.play();

        $('#imageDisplay').animate({ left: endPos }, 1000);

        $("#gameBtn").on("click", function() {
            onhold.play();
            createQuestion();

        });



    }); //-------------doc on ready end


    function createQuestion() {
        countDown(10, "timer");
        $("#answerDiv").html("");
        $("#gameBtn").hide();
        $("#imageDisplay").html(questions[qCounter].image);
        $("#answerDiv").show("fast");
        for (var i = 0; i < questions[qCounter].guesses.length; i++) {
            $('<button class="userGuess">').val(questions[qCounter].guesses[i]).html(questions[qCounter].guesses[i]).appendTo("#answerDiv");
            $(".userGuess").unbind('click').bind('click', function(guess) {
                clearTimeout(timer);
                console.log(this.value);
                userPick = this.value;
                console.log("userPick = " + userPick);
                checkAnswer();


            });


        }

    }

    function checkAnswer() {
        

        if (qCounter === 12) {
            checkScore();
            gameOver();

        } else if (userPick === questions[qCounter].correctAnswer) {
            answerRight.play();
            correct++;
            console.log("correct");
            $("#accepted").html("valid-" + correct);
            createQuestion(qCounter++);


        } else {
            wrong.play();
            incorrect++;
            console.log("incorrect");
            $("#errors").html("errors-" + incorrect);
            createQuestion(qCounter++);

        }

    }

    function timeOut(){
        clearTimeout(timer);
        incorrect++;
        createQuestion(qCounter++);
    }

    function checkScore() {
        $("#errors").hide();
        $("#accepted").hide();
        onhold.play();
        if (correct === 0) {
            $("#answerDiv").html("Did you just whack your face on the keyboard?");
        }
        if (correct === 1) {
            $("#answerDiv").html("Terrible Job!  We are guessing you got DJ Roomba right...");
        }
        if (correct >= 2 && correct <= 3) {
            $("#answerDiv").html("Not Great, you probably have some semblance of a social life");
        }
        if (correct >= 4 && correct <= 6) {
            $("#answerDiv").html("Good Job, you seem to familiar with some of pop culture's great robots");
        }
        if (correct >= 7 && correct <= 10) {
            $("#answerDiv").html("Impressive, you can live and be a pet when Skynet goes live");
        }
        if (correct >= 11 && correct <= 12) {
            $("#answerDiv").html("Amazing the Robot overlords will spare you after the singularity");
        }
    }



    function gameOver() {
        $("#results").html("You got " + correct + " correct, and " + incorrect + " incorrect");
        $("#gameBtn").show();
        $("#gameBtn").html("play again");
        $("#gameBtn").on("click", function() {
            location.reload();


        });

    }


    //https://www.youtube.com/watch?v=HdeYwObD-j4//