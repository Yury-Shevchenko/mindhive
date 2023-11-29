import Manager from "./Manager";

import { StyledStudyRun } from "../../styles/StyledStudyPage";

// have one landing page to run the study
// the function should check what is the status of the user (new, ongoing)
// and assign correct task to show
export default function RunStudy({ user, study, task, version }) {
  const { flow } = study;
  const studiesInfo = user?.studiesInfo || {};
  let info = studiesInfo[study?.id]?.info;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  };

  const selectCondition = ({ conditions }) => {
    const probabilities = conditions
      .map((condition, num) =>
        Array.from(`${num}`.repeat(parseInt(condition?.probability)))
      )
      .flat();
    const rand = getRandomInt(0, probabilities.length);
    const conditionNumber = parseInt(probabilities[rand]);
    return {
      conditionName: conditions[conditionNumber]?.name,
      conditionLabel: conditions[conditionNumber]?.label,
    };
  };

  const getNextStep = ({ stages, currentFlow, currentPosition }) => {
    if (!currentFlow || currentFlow.length === 0) {
      return stages;
    }

    const currentStage = currentFlow[currentPosition];
    if (!currentStage) {
      return stages;
    }

    // registration
    if (currentStage?.type === "my-anchor") {
      stages.push({
        ...currentStage,
        type: "registration",
        timestampFinished: Date.now(),
      });
      return getNextStep({
        stages,
        currentFlow,
        currentPosition: 1,
      });
    }

    // task
    if (currentStage?.type === "my-node") {
      stages.push({
        ...currentStage,
        type: "task",
        timestampStarted: Date.now(),
      });
      return stages;
    }

    // between-subjects conditions block
    if (currentStage?.type === "design") {
      const { conditionName, conditionLabel } = selectCondition({
        conditions: currentStage?.conditions,
      });
      stages.push({
        ...currentStage,
        type: "branching",
        timestampRun: Date.now(),
        conditionName,
        conditionLabel,
      });
      const [branchedFlow] = currentStage?.conditions
        .filter((c) => c?.label === conditionLabel)
        .map((c) => c.flow);
      return getNextStep({
        stages,
        currentFlow: branchedFlow,
        currentPosition: 0,
      });
    }
  };

  // initiate a new path if there is no information about the user path
  if (!info && !task) {
    info = {};
    info.path = [];
    const nextStep = getNextStep({
      stages: [],
      currentFlow: flow,
      currentPosition: 0,
    });
    info.path = info.path.concat(nextStep);
  }

  // find any updates in the current structure of the study
  let blockWithNextTask = [];
  const findTask = ({ taskId, flow }) => {
    for (let stage of flow) {
      if (stage?.type === "my-node") {
        if (stage?.id === taskId) {
          blockWithNextTask.push(...flow);
        }
      }
      if (stage?.type === "design") {
        stage?.conditions?.forEach((condition) => {
          findTask({
            taskId: taskId,
            flow: condition?.flow,
          });
        });
      }
    }
  };
  const comparePathWithFlow = ({ path, flow }) => {
    let nextTask;
    const lastTaskId = path[path?.length - 2]?.id;
    // search for the lastTaskId in the study flow
    findTask({
      taskId: lastTaskId,
      flow: flow,
    });
    // get the index of the lastTaskId
    const indexLastTask = blockWithNextTask
      .map((task) => task?.id)
      .indexOf(lastTaskId);
    if (blockWithNextTask[indexLastTask + 1]) {
      nextTask = blockWithNextTask[indexLastTask + 1];
    }
    return nextTask;
  };

  if (info && info?.path) {
    const { path } = info;
    const nextTaskType = path[path?.length - 1]?.type;
    if (nextTaskType === "end") {
      const nextStep = comparePathWithFlow({ path: path, flow: study?.flow });
      info.path = info.path.concat({
        ...nextStep,
        type: "task",
        timestampStarted: Date.now(),
      });
    }
  }

  return (
    <StyledStudyRun>
      {info && user && (
        <Manager
          user={user}
          study={study}
          task={task}
          version={version}
          studiesInfo={studiesInfo}
          info={info}
        />
      )}
    </StyledStudyRun>
  );
}
