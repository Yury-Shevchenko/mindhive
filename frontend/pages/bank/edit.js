import UpdateExperiment from '../../components/UpdateExperiment/index'
import OnlyForScientists from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const UpdateExperimentPage = ({query}) => (
  <Page>
    <OnlyForScientists>
      <UpdateExperiment id={query.id}/>
    </OnlyForScientists>
  </Page>
);

export default UpdateExperimentPage;
