import UpdateExperiment from '../../components/UpdateExperiment/index'
import OnlyForScientists from '../../components/Permissions/Scientist/index';

const UpdateExperimentPage = ({query}) => (
  <div>
    <OnlyForScientists>
      <UpdateExperiment id={query.id}/>
    </OnlyForScientists>
  </div>
);

export default UpdateExperimentPage;
