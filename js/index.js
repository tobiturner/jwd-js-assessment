/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
          the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  // the timer interval id
  let timerId = null;
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
    // obtain timer span element
    const timer = document.getElementById("time");
    // set a minute variable
    let time = 60;
    // every 1000 miliseconds, execute the callback function
    timerId = setInterval(() => {
      // decrement the time by one, every second
      time--;
      // change the span element after its been decremented
      timer.textContent = `00:${time}`;
      // if it reaches 0, then execute calculateScore() aka the submit button
      if (time <= 0) {
        // keep it 00:00
        timer.textContent = `00:00`;
        // retrieve the score, and highlight correct answers
        calculateScore();
      }
    }, 1000);
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "How long did it take to make this app?",
      o: ["20 Minutes", "3 Hour", "5 Hours", "It depends"],
      a: 3,
    },
    {
      q: "Did the owner of the app have fun while making it",
      o: ["No", "A little", "To be decided", "Maybe"],
      a: 2,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                  Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = (e) => {
    // if submitted or timer ran out, stop the timer by clearing the interval
    clearInterval(timerId);
    let score = 0;
    let wasOptionsChecked = [];
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        if (quizItem.a == i) {
          //change background color of li element here

          liElement.style.backgroundColor = "green";
          liElement.style.color = "white";
        }
        // console.log(quizItem);
        if (radioElement.checked) {
          // code for task 1 goes here
          // note inside an array an option was checked for this question out of the four answers
          wasOptionsChecked.push(true);
          //Check if it is the correct answer
          if (i === quizItem.a) {
            // Add to the score
            score += 1;
          } else {
            // indicating the answer was wrong
            liElement.style.backgroundColor = "red";
            liElement.style.color = "white";
          }
        }
      }
    });

    // comparing if button was clicked with e or timer ranout (then there is no event object passed), and if all the options were checked by comparing the number of questions to how many radioboxes were checked
    if (e && wasOptionsChecked.length !== quizArray.length) {
      alert("You have not answered all the questions, there is still time, its worth a guess");
      // don't show the answers, set colors back to default, highlight missing answers
      quizArray.map((quizItem, index) => {
        for (let i = 0; i < 4; i++) {
          // remove answers
          let li = `li_${index}_${i}`;
          liElement = document.querySelector("#" + li);
          liElement.style.backgroundColor = "";
          liElement.style.color = "";

          // highlight missing answers
          let r = `radio_${index}_${i}`;
          radioElement = document.querySelector("#" + r);
          
          if (radioElement.checked) {
            liElement.style.border = "2px solid blue";
          }
        }
      });
    } else {
      const scoreSpan = document.getElementById("score");
      scoreSpan.innerHTML = `Score: ${score}`;
      scoreSpan.style.display = "inline";

      // add message
      const timer = document.getElementById("time");
      const message = document.createElement("div");
      message.innerHTML =
        "<div class='message'><h6>In <span class=\"green\"> green</span> is the correct answers</h6><h6 class='message'>In <span class=\"red\"> red</span> is the incorrect</h6></div>";
      timer.appendChild(message);
    }
  };

  // call the displayQuiz function
  displayQuiz();
  // Be listening for the click on the submit button
  document.getElementById("btnSubmit").addEventListener("click", calculateScore);
  // add event listener to btnReset
  document.getElementById("btnReset").addEventListener("click", () => {
    //change the current location (or url), to the current location (or url) (so reloading it)
    window.location.assign(window.location.href);
  });
});
