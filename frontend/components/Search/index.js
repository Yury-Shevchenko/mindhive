import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles';

const SEARCH_EXPERIMENTS_QUERY = gql`
  query SEARCH_EXPERIMENTS_QUERY($searchTerm: String!) {
    experiments(
      where: {
        OR: [{ title_contains: $searchTerm }, { description: $searchTerm }]
      }
    ) {
      id
      title
    }
  }
`;

function routeToExperiment(experiment) {
  console.log('experiment', experiment);
  Router.push({
    pathname: '/exp',
    query: { id: experiment.id },
  });
}

class AutoComplete extends Component {
  state = {
    experiments: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    console.log('Running search...');
    // turn loading on
    this.setState({ loading: true });
    // manually query apollo client
    const res = await client.query({
      query: SEARCH_EXPERIMENTS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    // put results in the state
    this.setState({ experiments: res.data.experiments, loading: false });
  }, 400);

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToExperiment}
          itemToString={item => (item === null ? '' : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    type="search"
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search for an experiment',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.experiments.map((exp, index) => (
                    <DropDownItem
                      {...getItemProps({ item: exp })}
                      key={exp.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img
                        width="50"
                        src="/static/favicon.png"
                        alt={exp.title}
                      />
                      {exp.title}
                    </DropDownItem>
                  ))}
                  {!this.state.experiments.length && !this.state.loading && (
                    <DropDownItem>Nothing found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
