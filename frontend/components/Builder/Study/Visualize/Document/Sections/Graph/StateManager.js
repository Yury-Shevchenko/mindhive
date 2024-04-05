import { useState } from "react";

import {
  MessageHeader,
  MessageContent,
  Message,
  Icon,
  AccordionTitle,
  AccordionContent,
  Accordion,
} from "semantic-ui-react";

import Render from "./Render";
import CodeEditor from "./Controller/CodeEditor";
import TemplateSelector from "./Controller/Templates";
import Selector from "./Controller/Selector";
import Dashboard from "./Controller/Dashboard";

const defaultCode = ``;

export default function StateManager({
  content,
  handleChange,
  pyodide,
  sectionId,
  data,
  variables,
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  // state of the python code
  const code = content?.code || defaultCode;
  // state of the selectors
  const selectors = content?.selectors || {};
  // get variable names
  const variablesToDisplay = variables.filter((column) => !column?.hide);

  const addToOutput = (s) => {
    if (typeof s === "undefined") {
      setOutput("");
    } else {
      setOutput(s);
    }
    setIsRunning(false);
  };

  const runCode = async ({ code }) => {
    if (pyodide) {
      try {
        setIsRunning(true);
        const res = await pyodide.runPythonAsync(code);
        addToOutput(res);
      } catch (err) {
        addToOutput(err);
      }
    }
  };

  return (
    <div className="graph">
      {!code && pyodide && (
        <TemplateSelector
          handleChange={handleChange}
          runCode={runCode}
          sectionId={sectionId}
        />
      )}
      {code && pyodide && (
        <CodeEditor code={code} handleChange={handleChange} runCode={runCode} />
      )}

      {isRunning && (
        <Message icon>
          <Icon name="circle notched" loading />
          <MessageContent>
            <MessageHeader>Just one second</MessageHeader>
            The code is running.
          </MessageContent>
        </Message>
      )}
      <div className="graphRenderContainer">
        <div className="graphContainer">
          {code && pyodide && (
            <Render
              data={data}
              code={code}
              pyodide={pyodide}
              runCode={runCode}
              sectionId={sectionId}
            />
          )}
        </div>
        <div className="dashboardContainer">
          <Dashboard
            variables={variablesToDisplay}
            code={code}
            pyodide={pyodide}
            runCode={runCode}
            sectionId={sectionId}
            selectors={selectors}
            handleChange={handleChange}
          />
        </div>
      </div>

      <Selector
        variables={variablesToDisplay}
        code={code}
        pyodide={pyodide}
        runCode={runCode}
        sectionId={sectionId}
        selectors={selectors}
        handleChange={handleChange}
      />

      <Accordion>
        <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Console
        </AccordionTitle>
        <AccordionContent active={activeIndex === 0}>
          <textarea
            className="outputArea"
            id="output"
            value={output}
            rows={12}
            disabled
          />
        </AccordionContent>
      </Accordion>
    </div>
  );
}
