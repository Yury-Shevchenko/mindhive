import AddExperiment from '../../components/AddExperiment/index';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const AddExperimentPage = props => (
  <Page>
    <PageOnlyForScientists>
      <AddExperiment />
    </PageOnlyForScientists>
  </Page>
);

export default AddExperimentPage;
