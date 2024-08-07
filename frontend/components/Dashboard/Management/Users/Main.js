import { useQuery } from "@apollo/client";
import { useState } from "react";
import moment from "moment";
import debounce from "lodash.debounce";

import { GET_ALL_USERS } from "../../../Queries/User";

import PaginationUsers from "./Pagination";

import { StyledInput } from "../../../styles/StyledForm";
import DownloadUsersData from "./Download";

import { Dropdown } from "semantic-ui-react";

export default function Users({ query, user }) {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);

  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      search: search,
    },
  });

  const users = data?.profiles || [];
  const debounceSearch = debounce((value) => {
    setSearch(value);
  }, 1000);

  const updateSearch = (value) => {
    setKeyword(value);
    debounceSearch(value);
  };

  const goToPage = (page) => {
    if (page > 0) {
      setPage(page);
    }
  };

  return (
    <div>
      <StyledInput>
        <div className="searchArea">
          <span>Search</span>
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={({ target }) => updateSearch(target.value)}
          />
        </div>
      </StyledInput>

      <div className="classHeader">
        <div>Readable ID</div>
        <div>Username</div>
        <div>Email</div>
        <div>Role</div>
        <div>Date created</div>
      </div>

      {users.map((user) => (
        <div className="classRow" key={user.id}>
          <div>{user?.publicReadableId}</div>
          <div>{user?.username}</div>
          <div>{user?.email}</div>
          <div>
            {user?.permissions.map((p) => (
              <span>{p.name} </span>
            ))}
          </div>
          <div>{moment(user?.dateCreated).format("LLLL")}</div>
        </div>
      ))}

      <PaginationUsers
        page={page}
        setPage={setPage}
        perPage={perPage}
        search={search}
        goToPage={goToPage}
      />

      <div>
        <span>Number of users per page</span>
        <Dropdown
          fluid
          selection
          options={[10, 30, 50, 100].map((n) => ({
            key: n,
            text: n,
            value: n,
          }))}
          value={perPage}
          onChange={(event, data) => setPerPage(data.value)}
        />
      </div>

      <DownloadUsersData ids={users.map((user) => user?.id)} />
    </div>
  );
}
