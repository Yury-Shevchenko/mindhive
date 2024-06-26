import { validate } from "graphql";
import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { Draggable } from "react-smooth-dnd";

import { Image, Popup } from "semantic-ui-react";

export default function Card({
  card,
  proposalBuildMode,
  adminMode,
  openCard,
  onDeleteCard,
  settings,
}) {
  let status = card?.settings?.status ? card.settings.status : "Not started";

  let statusStyle = null;
  switch (status) {
    default:
      statusStyle = "status-not-started";
      break;
    case "Started":
      statusStyle = "status-started";
      break;
    case "Needs feedback":
      statusStyle = "status-needs-feedback";
      break;
    case "Feedback given":
      statusStyle = "status-feedback-given";
      break;
    case "Completed":
      statusStyle = "status-completed";
      break;
    // in case any cards are still tagged 'Closed' or 'On-Hold'
    case "Closed":
      status = "Started";
      statusStyle = "status-started";
      break;
    case "On-Hold":
      status = "Needs feedback";
      statusStyle = "status-needs-feedback";
  }

  return (
    <Draggable key={card.id}>
      <div
        className="card"
        onClick={() => {
          openCard(card);
        }}
      >
        <div className="card-drag-handle">
          {!proposalBuildMode && (
            <div className="card-information">
              <div>
                <Popup
                  content={
                    card?.assignedTo.length
                      ? card?.assignedTo.map((user, i) => (
                          <div key={i} className="info-assigned">
                            {`The card is assigned to ${
                              adminMode
                                ? user?.username ||
                                  user?.publicReadableId ||
                                  "John Doe"
                                : user?.username
                            }`}
                          </div>
                        ))
                      : "The card is not assigned to anyone"
                  }
                  trigger={
                    <Image
                      src={`/assets/icons/proposal/${statusStyle}.svg`}
                      avatar
                    />
                  }
                  size="huge"
                />
              </div>
              <div>
                <div>{ReactHtmlParser(card.title)}</div>
                {status && <div className="status">{status}</div>}
              </div>

              <div>
                {card?.isEditedBy?.username && (
                  <div className="editedByAvatar">
                    <Popup
                      content={`The card is currently being edited by ${card?.isEditedBy?.username}`}
                      trigger={
                        card?.isEditedBy?.image?.image?.publicUrlTransformed ? (
                          <Image
                            src={
                              card?.isEditedBy?.image?.image
                                ?.publicUrlTransformed
                            }
                            avatar
                          />
                        ) : (
                          <Image src="/assets/icons/builder/page.svg" avatar />
                        )
                      }
                      size="huge"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {settings?.allowAddingCards && (
          <div className="deleteCardBtn">
            <img
              src="/assets/icons/proposal/delete.svg"
              onClick={(e) => {
                e.stopPropagation();
                if (
                  confirm(
                    "Are you sure you want to delete this card? This action cannot be undone."
                  )
                ) {
                  onDeleteCard(card.id);
                }
              }}
            />
          </div>
        )}
      </div>
    </Draggable>
  );
}
