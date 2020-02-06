import AddExperiment from '../../components/AddExperiment/index'
import OnlyForScientists from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const AddExperimentPage = props => (
  <Page>
    <OnlyForScientists>
      <AddExperiment />
    </OnlyForScientists>
  </Page>
);

export default AddExperimentPage;
