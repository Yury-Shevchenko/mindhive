import { useState } from "react";
import { useQuery } from "@apollo/client";

import ProposalOverview from "./Overview";
import CreateProposal from "./Create";
import ProposalPage from "./ProposalPage";

import { STUDY_PROPOSALS_QUERY } from "../../../Queries/Proposal";

export default function ProposalWrapper({ query, user, templates }) {
  const studyId = query?.selector;

  const { data, loading, error } = useQuery(STUDY_PROPOSALS_QUERY, {
    variables: {
      studyId: studyId,
    },
  });

  const refetchQueries = [
    {
      query: STUDY_PROPOSALS_QUERY,
      variables: { studyId },
    },
  ];

  const proposals = data?.proposalBoards || [];

  const [page, setPage] = useState("overview");
  const [isCopy, setIsCopy] = useState(false);
  const [proposalId, setProposalId] = useState(null);

  const openProposal = (proposalId) => {
    setPage("proposal");
    setProposalId(proposalId);
  };

  const copyProposal = (proposalId) => {
    setPage("create");
    setIsCopy(true);
    setProposalId(proposalId);
  };

  const createProposal = () => {
    setPage("create");
    setIsCopy(false);
  };

  const goToOverview = () => {
    setPage("overview");
  };

  if (page === "create") {
    return (
      <CreateProposal
        studyId={studyId}
        templates={templates}
        isCopy={isCopy}
        goToOverview={goToOverview}
      />
    );
  }

  if (page === "proposal" && proposalId) {
    return (
      <ProposalPage
        user={user}
        studyId={studyId}
        proposalId={proposalId}
        goToOverview={goToOverview}
        refetchQueries={refetchQueries}
      />
    );
  }

  return (
    <ProposalOverview
      user={user}
      studyId={studyId}
      templates={templates}
      proposals={proposals}
      openProposal={openProposal}
      copyProposal={copyProposal}
      createProposal={createProposal}
    />
  );
}
