import DisplayIndividualResult from '../../components/Results/Display/individual';
import Page from '../../components/Page/index';

const DisplayIndividualResultPage = ({ query }) => (
  <Page>
    <DisplayIndividualResult resultId={query.id} />
  </Page>
);

export default DisplayIndividualResultPage;
