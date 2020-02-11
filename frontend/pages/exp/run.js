import RunExperiment from '../../components/Experiment/Run/index';

const RunExperimentPage = ({ query }) => (
  <RunExperiment experimentId={query.id} />
);

export default RunExperimentPage;
