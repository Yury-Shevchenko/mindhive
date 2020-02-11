import ReviewExperiment from '../components/Experiment/Review/index';
import Page from '../components/Page/index';

const ExperimentPage = props => (
  <Page>
    <ReviewExperiment id={props.query.id} />
  </Page>
);

export default ExperimentPage;
