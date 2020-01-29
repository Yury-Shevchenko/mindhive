import ReviewExperiment from '../components/Experiment/Review/index';

const ExperimentPage = props => (
    <div>
        <ReviewExperiment id={props.query.id} />
    </div>
);

export default ExperimentPage;
