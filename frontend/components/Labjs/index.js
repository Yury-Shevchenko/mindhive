import React, { Component } from 'react';
import clonedeep from 'lodash.clonedeep';
import * as lab from './lib/lab';

import visualsearch from './scripts/visualsearch';
import stroop from './scripts/stroop';
import multitasking from './scripts/multitasking';
import faceshouses from './scripts/faceshouses';
import rating from './scripts/rating';
import risk from './scripts/risktaking';

class ExperimentWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { props } = this;
    switch (props.settings.script) {
      case 'Risk':
        risk.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(risk), lab);
        break;
      case 'Rating Task':
        rating.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(rating), lab);
        break;
      case 'Multi-tasking':
        multitasking.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(multitasking), lab);
        break;
      case 'Visual search':
        visualsearch.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(visualsearch), lab);
        break;
      case 'Stroop Task':
      default:
        stroop.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(stroop), lab);
        break;
      case 'Faces and Houses':
        faceshouses.parameters = props.settings.params;
        // inject files with their addresses from parameters values
        faceshouses.files = props.settings.params.stimuli
          .map(image => ({
            [image.filename]: `${image.dir}/${image.filename}`,
          }))
          .reduce((obj, item) => {
            obj[Object.keys(item)[0]] = Object.values(item)[0];
            return obj;
          }, {});
        this.study = lab.util.fromObject(clonedeep(faceshouses), lab);
        break;
    }
    this.study.run();
    this.study.on('end', () => {
      // const csv = this.study.options.datastore.exportCsv();
      const json = this.study.options.datastore.data;
      this.study = undefined;
      props.settings.on_finish(json);
    });
    this.study.parameters.callbackForEEG = e => {
      props.settings.eventCallback(e);
    };
    this.study.options.events.keydown = async e => {
      if (e.code === 'Escape') {
        if (this.study) {
          await this.study.internals.controller.audioContext.close();
          this.study.end();
        }
      }
    };
  }

  componentWillUnmount() {
    try {
      if (this.study) {
        this.study.internals.controller.audioContext.close();
        this.study.end();
      }
    } catch (e) {
      console.log('Experiment closed before unmount');
    }
  }

  render() {
    return (
      <div className="container fullscreen" data-labjs-section="main">
        <main className="content-vertical-center content-horizontal-center">
          <div>
            <h2>Loading Experiment</h2>
            <p>The experiment is loading and should start in a few seconds</p>
          </div>
        </main>
      </div>
    );
  }
}

export { ExperimentWindow };
