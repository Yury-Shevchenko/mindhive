import ReviewClass from '../../components/Class/Review/index';
import Page from '../../components/Page/index';

const ReviewClassPage = props => (
  <Page>
    <ReviewClass id={props.query.id} />
  </Page>
);

export default ReviewClassPage;
