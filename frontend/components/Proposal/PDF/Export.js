import absoluteUrl from "next-absolute-url";
import { useQuery } from "@apollo/client";
import { PROPOSAL_QUERY } from "../../Queries/Proposal";

import moment from "moment";
import Head from "next/head";
import JoditEditorProExportPDF from "../../Jodit/EditorProExportPDF";

export default function ExportProposalPDF({ proposalId }) {
  const { origin } = absoluteUrl();
  const { data, loading, error } = useQuery(PROPOSAL_QUERY, {
    variables: { id: proposalId },
  });

  const proposal = data?.proposalBoard || {};

  const title = proposal?.title || "";
  const description = proposal?.description || "";
  const sections = proposal?.sections || [];
  const study = proposal?.study || {};

  // order sections by position
  const orderedSections = [...sections].sort((a, b) => a.position - b.position);
  const allCardsContent = orderedSections.map((section) => {
    // order cards inside each section
    const orderedCards = [...section.cards].sort(
      (a, b) => a.position - b.position
    );
    // get the content of completed cards together with titles
    const completedCardsWithTitles = orderedCards
      .filter((card) => card?.settings?.status === "Completed")
      .map((card) => `<h3>${card?.title}</h3>${card?.content}`);
    // append the section title
    const cardsWithSectionTitles = `<h2>${
      section?.title
    }</h2>${completedCardsWithTitles.join("")}`;
    return cardsWithSectionTitles;
  });
  // put all cards content together
  const cardsContent = allCardsContent.flat().join("");
  let studyURL = "";
  if (study?.slug) {
    studyURL = `<h3>Study URL: ${origin}/studies/${study?.slug}</h3>`;
  }
  // put all proposal content together
  const content = `<h1>${title}</h1><h2>${description}</h2>${studyURL}${cardsContent}`;

  // extracting the study title is problematic as there are several classes
  const studyTitle = study?.title;
  const date = moment().format("MM-D-YYYY");

  return (
    <>
      <Head>
        <title>
          {studyTitle}-{date}
        </title>
      </Head>
      <div className="proposalPDF">
        <JoditEditorProExportPDF content={content} setContent={() => {}} />
      </div>
    </>
  );
}
