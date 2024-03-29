import { Dropdown, DropdownMenu, DropdownItem } from "semantic-ui-react";
import DeleteChapter from "../../Document/DeleteChapter";
import DeletePart from "../../Document/DeletePart";

import CreateChapter from "./CreateChapter";
import BrowseTemplates from "./BrowseTemplates";
import PartSettings from "./PartSettings";

export default function Contents({
  user,
  studyId,
  journal,
  chapterId,
  selectChapter,
}) {
  return (
    <div className="contents">
      {journal?.vizParts.map((part, num) => (
        <div key={num} className="part">
          <div className="menuOriginaDataTitle">
            <div>
              {part?.title || (
                <>
                  {part?.dataOrigin?.charAt(0) +
                    part?.dataOrigin?.toLowerCase().slice(1)}{" "}
                  Data
                </>
              )}
            </div>
            <Dropdown
              icon={<img src={`/assets/icons/visualize/more_vert.svg`} />}
              direction="left"
            >
              <DropdownMenu>
                <PartSettings user={user} studyId={studyId} part={part} />
                <DeletePart studyId={studyId} part={part} />
              </DropdownMenu>
            </Dropdown>
            {part?.description && (
              <div className="menuDescription">{part?.description}</div>
            )}
          </div>

          <div>
            {part?.vizChapters.map((chapter, num) => (
              <div
                key={num}
                className={
                  chapter?.id === chapterId ? "selected chapter" : "chapter"
                }
              >
                <div
                  className="title"
                  onClick={() =>
                    selectChapter({ partId: part?.id, chapterId: chapter?.id })
                  }
                >
                  <div>{chapter?.title}</div>
                  <Dropdown
                    icon={<img src={`/assets/icons/visualize/more_vert.svg`} />}
                    direction="left"
                  >
                    <DropdownMenu>
                      <DeleteChapter studyId={studyId} chapter={chapter} />
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div>
                  {chapter?.vizSections.map((section, num) => (
                    <div key={num} className="section">
                      {section?.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="addNewChapter">
            <CreateChapter studyId={studyId} part={part} />
            {/* <Dropdown
              icon={<img src={`/assets/icons/visualize/add_notes.svg`} />}
              direction="right"
            >
              <DropdownMenu>
                <CreateChapter studyId={studyId} part={part} />
                <BrowseTemplates
                  studyId={studyId}
                  journal={journal}
                  part={part}
                />
              </DropdownMenu>
            </Dropdown> */}
          </div>
        </div>
      ))}
    </div>
  );
}
