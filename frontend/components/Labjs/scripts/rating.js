import * as path from 'path';

const rootFolder = __dirname;
const assetsDirectory = path.join(
  rootFolder,
  'static',
  'content',
  'experiments',
  'Rating',
  'images'
);

// Define study
const studyObject = {
  title: 'root',
  type: 'lab.flow.Sequence',
  parameters: {},
  plugins: [],
  metadata: {
    title: 'Rating',
    description: 'mindHive task',
    repository: '',
    contributors: '',
  },
  files: {},
  responses: {},
  content: [
    {
      type: 'lab.flow.Sequence',
      files: {
        'charity.png': path.join(
          assetsDirectory,
          'aecb16bda37b929b7ad7ecde76625b5ac2bfff8b7236ad027157a6ebe97b1477.png'
        ),
        'adults.png': path.join(
          assetsDirectory,
          '8fb942fc3c41b47a3752cfd5dfca1d75e5d2c0f7d4df904fe02e455fbd54ebf7.png'
        ),
        'teenager.png': path.join(
          assetsDirectory,
          '0ebf21d82af0067ad17840711991919da3d30d2f6fbc80978369facdca4815d1.png'
        ),
        'recycle.png': path.join(
          assetsDirectory,
          '48ac68f8ed9ad20afd156c53c45a26025328487d83db1510145990ac994fde8d.png'
        ),
      },
      parameters: {},
      responses: {},
      messageHandlers: {},
      title: 'Rating task',
      content: [
        {
          type: 'lab.html.Form',
          content:
            '\u003Cheader\u003E\n\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n  \u003Ch1\u003EExperiment\u003C\u002Fh1\u003E\n  \n  \u003Cp\u003EWelcome to the experiment\u003C\u002Fp\u003E\n\n  \u003Cform\u003E\n    \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n  \u003C\u002Fform\u003E\n\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n\n\u003C\u002Ffooter\u003E\n\n',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Welcome',
        },
        {
          type: 'lab.html.Frame',
          context:
            '\u003Cmain data-labjs-section="frame"\u003E\n  \u003C!-- Content gets inserted here --\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  Experiment\n\u003C\u002Ffooter\u003E',
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
                console.log('assets folder', assetsDirectory);
                // construct trials
                const testParameters = [
                  {
                    number: 1,
                    statement: 'Raise money for charity',
                    image: 'charity.png',
                    referenceGroup: 'Adults',
                    providedRating: 9,
                  },
                  {
                    number: 2,
                    statement: 'Recycle garbage',
                    image: 'recycle.png',
                    referenceGroup: 'Adolescents',
                    providedRating: 1,
                  },
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
                  number: trial.number,
                  statement: trial.statement,
                  image: trial.image,
                  referenceGroup: trial.referenceGroup,
                  providedRating: trial.providedRating,
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
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Statement',
                  content:
                    '\u003Cmain\u003E\n\n  \u003Ch2\u003E ${parameters.statement} \u003C\u002Fh2\u003E\n\n  \u003Cp\u003E\n      \u003Cimg src=${this.files[parameters.image]} alt=${parameters.image} height="400" width="400"\u003E\n  \u003C\u002Fp\u003E\n\n\n\u003C\u002Fmain\u003E',
                  timeout: '30000',
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cmain\u003E\n\n\u003Cform\u003E\n  \n  \u003Ch3\u003EHow likely are you to do this?\u003C\u002Fh3\u003E\n\n  \u003Cdiv class="slidecontainer"\u003E\n   \u003Cinput type="range" name="rating_pre" min="1" max="10" class="slider" id="rating_pre"\u003E\n    \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n      \u003Cdiv style="display:grid; justify-content: start;"\u003ENot at all\u003C\u002Fdiv\u003E\n      \u003Cdiv style="display:grid; justify-content: end;"\u003EVery\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E \n  \u003C\u002Fdiv\u003E\n\n  \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n\n\u003C\u002Fform\u003E\n\n\u003C\u002Fmain\u003E',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Rating 1',
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Others',
                  content:
                    '\u003Cmain\u003E\n\n  \u003Ch2\u003E ${parameters.referenceGroup} \u003C\u002Fh2\u003E\n\n  \u003Cp\u003E\n      \u003Cimg src=${this.files[parameters.referenceGroup === \'Adults\' ? \'adults.png\': \'teenager.png\']} alt="Charity" height="400" width="400"\u003E\n  \u003C\u002Fp\u003E\n\n  \u003C!-- Clarify whether the condition (adults or adolescents) is the same for each participant, or it changes in each trial)\n  (show for 2 seconds)--\u003E\n\n\u003C\u002Fmain\u003E',
                  timeout: '2000',
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Provided rating',
                  content:
                    '\u003Cmain\u003E\n\n  \u003Ch2\u003E ${parameters.referenceGroup} rated the statement \u003C\u002Fh2\u003E\n\n  \u003Cp\u003E ${parameters.statement} \u003C\u002Fp\u003E\n\n  \u003Cdiv class="slidecontainer"\u003E\n   \u003Cinput type="range" name="providedRating" min="1" max="10" class="slider" id="providedRating" value=${parameters.providedRating} readonly disabled\u003E\n    \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n      \u003Cdiv style="display:grid; justify-content: start;"\u003ENot at all\u003C\u002Fdiv\u003E\n      \u003Cdiv style="display:grid; justify-content: end;"\u003EVery\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E \n  \u003C\u002Fdiv\u003E\n\n    \u003C!-- Show the rating for 2 seconds with the fixed value (that can\'t be changed). Re-use the design from the screen "Rating 1".--\u003E\n\n\n\u003C\u002Fmain\u003E',
                  timeout: '2000',
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Please rate again',
                  content:
                    '\u003Cmain\u003E\n\n  \u003Ch2\u003EPlease rate again!\u003C\u002Fh2\u003E\n\n\u003C\u002Fmain\u003E',
                  timeout: '1000',
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cmain\u003E\n\n\u003Cform\u003E\n  \n  \u003Ch3\u003EHow likely are you to do this?\u003C\u002Fh3\u003E\n  \n  \u003Cdiv class="slidecontainer"\u003E\n   \u003Cinput type="range" name="rating_post" min="1" max="10" class="slider" id="rating_pre"\u003E\n    \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n      \u003Cdiv style="display:grid; justify-content: start;"\u003ENot at all\u003C\u002Fdiv\u003E\n      \u003Cdiv style="display:grid; justify-content: end;"\u003EVery\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E \n  \u003C\u002Fdiv\u003E\n\n  \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n\n\u003C\u002Fform\u003E\n\n\u003C\u002Fmain\u003E',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Rating 2',
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Inter-trial interval',
                  timeout: '1000',
                  content: '\u003Cmain\u003E\n\n\n\u003C\u002Fmain\u003E',
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
