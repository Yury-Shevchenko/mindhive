// Define study
const studyObject = {
  title: 'root',
  type: 'lab.flow.Sequence',
  parameters: {},
  plugins: [
    {
      type: 'lab.plugins.Metadata',
    },
    {
      type: 'lab.plugins.Download',
      filePrefix: 'risk-taking-task',
    },
  ],
  metadata: {
    title: 'Risk taking task',
    description:
      'mindHive task based on Rutledge, R. B., Smittenaar, P., Zeidman, P., Brown, H. R., Adams, R. A., Lindenberger, U., ... & Dolan, R. J. (2016). Risk taking for potential reward decreases across the lifespan. Current Biology, 26(12), 1634-1639.',
    repository: '',
    contributors: '',
  },
  files: {},
  responses: {},
  content: [
    {
      type: 'lab.flow.Sequence',
      files: {},
      parameters: {},
      responses: {},
      messageHandlers: {},
      title: 'Risk-taking task',
      content: [
        {
          type: 'lab.html.Form',
          content:
            '\u003Cheader\u003E\n  \u003Ch1\u003EAm I a risk taker?\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n  \u003Cp\u003EWe all view rewards differently and some people are more willing to take risks.\u003C\u002Fp\u003E\n\n  \u003Cp\u003ESee how good you are at making decisions by winning as many points as you can. At the same time, help scientists study happiness by reporting how you feel during the game.\u003C\u002Fp\u003E\n\n  \u003Cform\u003E\n    \u003Cbutton type="submit"\u003EPlay\u003C\u002Fbutton\u003E\n  \u003C\u002Fform\u003E\n\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n\n\u003C\u002Ffooter\u003E\n\n',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Welcome',
        },
        {
          type: 'lab.html.Form',
          content:
            '\u003Cheader\u003E\n  \u003Ch1\u003EHow to play\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n  \u003Cp\u003EYou start with 500 points. Win as many points as you can. Click (or tap) on the certain option or spin the spinner to try to get more points. Choose wisely!\u003C\u002Fp\u003E\n\n  \u003Cp\u003EHelp us study happiness. When asked how you feel, move the slider to the right when you feel happy and to the left when you feel unhappy. Mark exactly how you feel at that moment.\u003C\u002Fp\u003E\n\n  \u003Cp\u003E\u003Ci\u003EHere is the image with the game dashboard\u003C\u002Fi\u003E\u003C\u002Fp\u003E\n  \n  \u003Cform\u003E\n    \u003Cbutton type="submit"\u003EStart Game\u003C\u002Fbutton\u003E\n  \u003C\u002Fform\u003E\n\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n\n\u003C\u002Ffooter\u003E\n\n',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'How to play',
        },
        {
          type: 'lab.html.Frame',
          context:
            '\u003Cmain data-labjs-section="frame"\u003E\n  \u003C!-- Content gets inserted here --\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \n\u003C\u002Ffooter\u003E',
          contextSelector: '[data-labjs-section="frame"]',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Frame',
          tardy: false,
          content: {
            type: 'lab.flow.Loop',
            files: {},
            parameters: {},
            templateParameters: [
              {
                '': '',
              },
              {
                '': '',
              },
              {
                '': '',
              },
            ],
            sample: {
              mode: 'draw-shuffle',
            },
            responses: {},
            messageHandlers: {
              'before:prepare': function anonymous() {
                // construct trials
                const testParameters = [
                  { id: 1, type: 'gain', fixed: 30, win: 49, lose: 0 },
                  { id: 2, type: 'gain', fixed: 35, win: 57, lose: 0 },
                  { id: 3, type: 'gain', fixed: 45, win: 74, lose: 0 },
                  { id: 4, type: 'gain', fixed: 55, win: 90, lose: 0 },
                  { id: 5, type: 'gain', fixed: 30, win: 51, lose: 0 },
                  { id: 6, type: 'gain', fixed: 35, win: 60, lose: 0 },
                  { id: 7, type: 'gain', fixed: 45, win: 77, lose: 0 },
                  { id: 8, type: 'gain', fixed: 55, win: 94, lose: 0 },
                  { id: 9, type: 'gain', fixed: 30, win: 53, lose: 0 },
                  { id: 10, type: 'gain', fixed: 35, win: 62, lose: 0 },
                  { id: 11, type: 'lose', fixed: -30, win: 0, lose: -49 },
                  { id: 12, type: 'lose', fixed: -35, win: 0, lose: -57 },
                  { id: 13, type: 'lose', fixed: -45, win: 0, lose: -74 },
                  { id: 14, type: 'lose', fixed: -55, win: 0, lose: -90 },
                  { id: 15, type: 'lose', fixed: -30, win: 0, lose: -51 },
                  { id: 16, type: 'lose', fixed: -35, win: 0, lose: -60 },
                  { id: 17, type: 'lose', fixed: -45, win: 0, lose: -77 },
                  { id: 18, type: 'lose', fixed: -55, win: 0, lose: -94 },
                  { id: 19, type: 'lose', fixed: -30, win: 0, lose: -53 },
                  { id: 20, type: 'lose', fixed: -35, win: 0, lose: -62 },
                  { id: 21, type: 'mixed', fixed: 0, win: 40, lose: -8 },
                  { id: 22, type: 'mixed', fixed: 0, win: 55, lose: -11 },
                  { id: 23, type: 'mixed', fixed: 0, win: 75, lose: -15 },
                  { id: 24, type: 'mixed', fixed: 0, win: 40, lose: -14 },
                  { id: 25, type: 'mixed', fixed: 0, win: 55, lose: -19 },
                  { id: 26, type: 'mixed', fixed: 0, win: 75, lose: -26 },
                  { id: 27, type: 'mixed', fixed: 0, win: 40, lose: -20 },
                  { id: 28, type: 'mixed', fixed: 0, win: 55, lose: -28 },
                  { id: 29, type: 'mixed', fixed: 0, win: 75, lose: -38 },
                  { id: 30, type: 'mixed', fixed: 0, win: 40, lose: -26 },
                ];

                // take the parameters from the outside or fallback to test parameters
                const initParameters =
                  this.parameters.stimuli || testParameters;
                // take the number of trials from outside of fallback to the length of provided parameters
                const numberTrials =
                  this.parameters.nbExperimentalTrials || initParameters.length;
                // randomize is either false or true, if there is no external parameter, the default is true
                const randomize = this.parameters.randomize || true;

                // a helper function to shuffle the array
                function shuffle(a) {
                  let j;
                  let x;
                  let i;
                  for (i = a.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = a[i];
                    a[i] = a[j];
                    a[j] = x;
                  }
                  return a;
                }

                // constructor function which takes the information about trial and put in the object with the structure that fits the trial
                const trialConstructor = trial => ({
                  id: trial.id,
                  type: trial.type,
                  fixed: trial.fixed,
                  win: trial.win,
                  lose: trial.lose,
                });

                let trialParameters = [];
                for (let i = 0; i < numberTrials; i++) {
                  trialParameters = trialParameters.concat(
                    trialConstructor(initParameters[i])
                  );
                }

                // assign options values to parameters of this task
                this.options.templateParameters = trialParameters;
                // randomize if needed
                if (randomize) {
                  this.options.shuffle = true;
                }
                this.options.shuffle = false;
              },
            },
            title: 'Loop',
            shuffleGroups: [],
            template: {
              type: 'lab.flow.Sequence',
              files: {},
              parameters: {},
              responses: {},
              messageHandlers: {},
              title: 'Sequence',
              content: [
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n  \n  .slidecontainer {\n      width: 50%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: #d3d3d3; \u002F* Grey background *\u002F\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 50px; \u002F* Set a specific slider handle width *\u002F\n      height: 50px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #4CAF50; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n  }\n\n  .slider::-moz-range-thumb {\n      width: 50px; \u002F* Set a specific slider handle width *\u002F\n      height: 50px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #4CAF50; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n  }\n\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E\n\n\u003Cform\u003E\n  \n  \u003Ch3\u003EHow happy are you right now?\u003C\u002Fh3\u003E\n\n  \u003Cdiv class="slidecontainer"\u003E\n   \u003Cinput type="range" name="rating_pre" min="1" max="10" class="slider" id="rating"\u003E\n    \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n      \u003Cdiv style="display:grid; justify-content: start;"\u003EVery unhappy\u003C\u002Fdiv\u003E\n      \u003Cdiv style="display:grid; justify-content: end;"\u003EVery happy\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E \n  \u003C\u002Fdiv\u003E\n\n  \u003Cbutton type="submit" id="continueBtn" style="visibility:hidden"\u003EContinue\u003C\u002Fbutton\u003E\n\n\u003C\u002Fform\u003E\n\n\n\n\u003C\u002Fmain\u003E',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    run: function anonymous() {
                      document.getElementById('rating').onclick = function() {
                        document.getElementById(
                          'continueBtn'
                        ).style.visibility = 'visible';
                      };
                      document.getElementById('rating').ontouch = function() {
                        document.getElementById(
                          'continueBtn'
                        ).style.visibility = 'visible';
                      };
                      document.getElementById('rating').oninput = function() {
                        document.getElementById(
                          'continueBtn'
                        ).style.visibility = 'visible';
                      };
                    },
                  },
                  title: 'Happiness rating',
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    'before:prepare': function anonymous() {
                      const preScore = this.state.score || 500;
                      let waitingForChoice = true;

                      this.options.events.click = e => {
                        const { id } = e.target;
                        console.log('Clicking', id, e);
                        // if choice is the safe option
                        if (id === 'fixed' && waitingForChoice) {
                          waitingForChoice = false;
                          // 1. highlight the chosen option
                          // 2. update the score
                          this.data.score =
                            (this.state.score || 500) + this.parameters.fixed;
                          // 3. play animation of adding up the points in the score
                          const safeDiv = document.querySelector('#fixed');
                          safeDiv.style.background = 'lightgreen';
                          // increment the score
                          animateValue(
                            'score',
                            this.state.score || 500,
                            this.data.score,
                            2000
                          );
                          // 4. end this screen
                          setTimeout(() => {
                            this.end();
                          }, 4000);
                        }
                        // if choice is the risky option
                        if (id.startsWith('gamble') && waitingForChoice) {
                          waitingForChoice = false;
                          const riskyLeftDiv = document.querySelector(
                            '#gamble_win'
                          );
                          const riskyRightDiv = document.querySelector(
                            '#gamble_lose'
                          );

                          // 1. highlight the chosen option
                          // 2. play the lottery and update the score
                          const outcome = Math.random();
                          const spinnerOutcome =
                            Math.round(outcome) === 0 ? 'lose' : 'win';
                          this.data.spinnerOutcome = spinnerOutcome;

                          if (spinnerOutcome === 'win') {
                            this.data.score = preScore + this.parameters.win;
                          } else if (spinnerOutcome === 'lose') {
                            this.data.score = preScore + this.parameters.lose;
                          }
                          // 3. play animation of spinning the spinner
                          const spinner = document.querySelector('.spinner');
                          spinner.style.display = 'block';
                          spinner.style.animationDuration = '1s';
                          spinner.style.animationFillMode = 'forwards';
                          spinner.style.animationIterationCount = 3 + outcome;

                          // 4. show the feedback dependent on whether it is loss or win and play the animation of adding up the points in the score
                          setTimeout(() => {
                            if (spinnerOutcome === 'win') {
                              riskyLeftDiv.style.background = 'lightgreen';
                            } else if (spinnerOutcome === 'lose') {
                              riskyRightDiv.style.background = 'pink';
                            }
                            // increment the score
                            console.log(
                              'scores:',
                              this.state.score || 500,
                              this.data.score
                            );
                            animateValue(
                              'score',
                              this.state.score || 500,
                              this.data.score,
                              2000
                            );
                          }, 4000);
                          // 5. end this screen
                          setTimeout(() => {
                            this.end();
                          }, 8000);
                        }
                      };

                      function animateValue(id, start, end, duration) {
                        if (start === end) return;
                        const range = end - start;
                        let current = start;
                        const increment = end > start ? 1 : -1;
                        const stepTime = Math.abs(Math.floor(duration / range));
                        const obj = document.getElementById(id);
                        var timer = setInterval(function() {
                          current += increment;
                          obj.innerHTML = current;
                          if (current == end) {
                            clearInterval(timer);
                          }
                        }, stepTime);
                      }
                    },
                  },
                  title: 'Awaiting decision',
                  content:
                    '\u003Cstyle\u003E\n  .info {\n    font-size: 1.5em;\n  }\n  .option {\n    border: 1px solid cornflowerblue;\n    border-radius: 10px;\n    height: 100%;\n    display: grid;\n    align-items: baseline;\n    padding: 10px;\n  }\n  .option:hover {\n    background-color: cornflowerblue;\n    cursor: pointer;\n  }\n\n.spinner {\n  margin: 100px auto;\n  font-size: 25px;\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n\n  animation-name: load5;\n  animation-duration: 0s;\n  animation-timing-function: ease;\n  animation-delay: 0s;\n  animation-iteration-count: 0;\n  animation-direction: normal;\n  animation-fill-mode: forwards;\n}\n\n  @-webkit-keyframes load5 {\n    0%,\n    100% {\n      box-shadow: 0em -2.6em 0em 0em #2b2b2b, 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.5), -1.8em -1.8em 0 0em rgba(43,43,43, 0.7);\n    }\n    12.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.7), 1.8em -1.8em 0 0em #2b2b2b, 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.5);\n    }\n    25% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.5), 1.8em -1.8em 0 0em rgba(43,43,43, 0.7), 2.5em 0em 0 0em #2b2b2b, 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    37.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.5), 2.5em 0em 0 0em rgba(43,43,43, 0.7), 1.75em 1.75em 0 0em #2b2b2b, 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    50% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.5), 1.75em 1.75em 0 0em rgba(43,43,43, 0.7), 0em 2.5em 0 0em #2b2b2b, -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    62.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.5), 0em 2.5em 0 0em rgba(43,43,43, 0.7), -1.8em 1.8em 0 0em #2b2b2b, -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    75% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.5), -1.8em 1.8em 0 0em rgba(43,43,43, 0.7), -2.6em 0em 0 0em #2b2b2b, -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    87.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.5), -2.6em 0em 0 0em rgba(43,43,43, 0.7), -1.8em -1.8em 0 0em #2b2b2b;\n    }\n  }\n  @keyframes load5 {\n    0%,\n    100% {\n      box-shadow: 0em -2.6em 0em 0em #2b2b2b, 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.5), -1.8em -1.8em 0 0em rgba(43,43,43, 0.7);\n    }\n    12.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.7), 1.8em -1.8em 0 0em #2b2b2b, 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.5);\n    }\n    25% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.5), 1.8em -1.8em 0 0em rgba(43,43,43, 0.7), 2.5em 0em 0 0em #2b2b2b, 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    37.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.5), 2.5em 0em 0 0em rgba(43,43,43, 0.7), 1.75em 1.75em 0 0em #2b2b2b, 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    50% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.5), 1.75em 1.75em 0 0em rgba(43,43,43, 0.7), 0em 2.5em 0 0em #2b2b2b, -1.8em 1.8em 0 0em rgba(43,43,43, 0.2), -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    62.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.5), 0em 2.5em 0 0em rgba(43,43,43, 0.7), -1.8em 1.8em 0 0em #2b2b2b, -2.6em 0em 0 0em rgba(43,43,43, 0.2), -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    75% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.5), -1.8em 1.8em 0 0em rgba(43,43,43, 0.7), -2.6em 0em 0 0em #2b2b2b, -1.8em -1.8em 0 0em rgba(43,43,43, 0.2);\n    }\n    87.5% {\n      box-shadow: 0em -2.6em 0em 0em rgba(43,43,43, 0.2), 1.8em -1.8em 0 0em rgba(43,43,43, 0.2), 2.5em 0em 0 0em rgba(43,43,43, 0.2), 1.75em 1.75em 0 0em rgba(43,43,43, 0.2), 0em 2.5em 0 0em rgba(43,43,43, 0.2), -1.8em 1.8em 0 0em rgba(43,43,43, 0.5), -2.6em 0em 0 0em rgba(43,43,43, 0.7), -1.8em -1.8em 0 0em #2b2b2b;\n    }\n}\n  \n\u003C\u002Fstyle\u003E\n\n\u003Cheader\u003E\n  Spin the spinner or play it safe!\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n  \u003Cdiv style="display: grid; grid-template-columns: 1fr 1fr; width: 50%; margin: 0 auto; grid-column-gap: 50px; min-height: 300px; align-items: center; padding: 10px;" class="info"\u003E\n\n    \u003Cdiv class="option" id="gamble" style="grid-template-columns: 1fr 1fr;"\u003E\n      \u003Cdiv id="gamble_win" style="height: 100%; display: grid; align-items: baseline; border-radius: 10px;"\u003E\n       Gain ${parameters.win}\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv id="gamble_lose" style="height: 100%; display: grid; align-items: baseline; border-radius: 10px;"\u003E\n        Lose ${parameters.lose}\n      \u003C\u002Fdiv\u003E      \n      \u003Cdiv id="gamble_spinner" class="spinner" style="display:none; grid-column-start: 1; grid-column-end: 3;"\u003ELoading...\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv class="option" id="fixed"\u003E\n     Gain ${parameters.fixed}\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\n  \n\n  \u003Ch3\u003E Score \u003C\u002Fh3\u003E\n  \u003Cp id="score" class="info"\u003E ${state.score || 500} \u003C\u002Fp\u003E\n\n\u003C\u002Fmain\u003E',
                  tardy: true,
                },
              ],
            },
          },
        },
        {
          type: 'lab.html.Form',
          content:
            '\u003Cheader\u003E\n\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n  \u003Ch1\u003EExperiment\u003C\u002Fh1\u003E\n  \n  \u003Cp\u003EThank you for taking part\u003C\u002Fp\u003E\n\n  \u003Cform\u003E\n    \u003Cbutton type="submit"\u003EFinish\u003C\u002Fbutton\u003E\n  \u003C\u002Fform\u003E\n\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n\n\u003C\u002Ffooter\u003E',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'End',
        },
      ],
    },
  ],
};

// export
export default studyObject;
