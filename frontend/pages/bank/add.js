import AddExperiment from '../../components/AddExperiment/index'
import OnlyForScientists from '../../components/Permissions/Scientist/index';

const AddExperimentPage = props => (
  <div>
    <OnlyForScientists>
      <AddExperiment />
    </OnlyForScientists>
  </div>
);

export default AddExperimentPage;
