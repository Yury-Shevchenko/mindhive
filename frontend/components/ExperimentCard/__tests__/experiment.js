import { shallow } from 'enzyme';
import ExperimentCard from '../index';

const fakeExperiment = {
  id: 'QWE',
  description: 'Test description',
  image: 'Test image',
  largeImage: 'Test large image',
  title: 'Cool fake experiment',
};

// shallow rendering documentation
// https://airbnb.io/enzyme/docs/api/shallow.html
describe('<ExperimentCard />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ExperimentCard experiment={fakeExperiment} />);
    // get the tag
    const deleteExperiment = wrapper.find('DeleteExperiment');
    console.log(deleteExperiment.text());
  });
});
