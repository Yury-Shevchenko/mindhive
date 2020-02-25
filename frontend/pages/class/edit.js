import UpdateClass from '../../components/Class/Update/index';
import { PageOnlyForTeachers } from '../../components/Permissions/Teacher/index';
import Page from '../../components/Page/index';

const UpdateClassPage = ({ query }) => (
  <Page>
    <PageOnlyForTeachers>
      <UpdateClass id={query.id} />
    </PageOnlyForTeachers>
  </Page>
);

export default UpdateClassPage;
