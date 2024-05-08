// ---- Structure ------
// Visualize (Main.js)
//  Pyodide wrapper (PyodideWrapper.js)
//    Journal manager (JournalManager.js)
//      StudyDataWrapper or UploadedDataWrapper (optional)
//        Part manager (PartManager.js)
//          Preprocessing manager (ProcessManager.js) - data and variables state
//            Overview and Document

import Navigation from "../Navigation/Main";
import PyodideWrapper from "./PyodideWrapper";

export default function Visualize({ query, user, tab, toggleSidebar }) {
  const studyId = query?.selector;

  return (
    <>
      <Navigation
        query={query}
        user={user}
        tab={tab}
        toggleSidebar={toggleSidebar}
      />
      {!studyId && <>No study found, please save your study first.</>}
      {studyId && <PyodideWrapper user={user} studyId={studyId} />}
    </>
  );
}
