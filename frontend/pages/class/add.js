import AddClass from '../../components/Class/Add/index';
import { PageOnlyForTeachers } from '../../components/Permissions/Teacher/index';
import Page from '../../components/Page/index';

const AddClassPage = props => (
  <Page>
    <PageOnlyForTeachers>
      <AddClass />
    </PageOnlyForTeachers>
  </Page>
);

export default AddClassPage;
