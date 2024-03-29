import { useState } from "react";

import {
  MessageHeader,
  MessageContent,
  Message,
  Icon,
} from "semantic-ui-react";

import Render from "./Render";
import CodeEditor from "./Controller/CodeEditor";
import TemplateSelector from "./Controller/Templates";
import Selector from "./Controller/Selector";

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

  // state of the python code
  const code = content?.code || defaultCode;
  // state of the selectors
  const selectors = content?.selectors || {};
  // get variable names
  const variablesToDisplay = variables.filter((column) => !column?.hide);
  // .map((column) => column?.field);

  const addToOutput = (s) => {
    setOutput(output + ">>>" + "\n" + s + "\n");
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
      {code && pyodide && (
        <Render
          data={data}
          code={code}
          pyodide={pyodide}
          runCode={runCode}
          sectionId={sectionId}
        />
      )}
      <Selector
        variables={variablesToDisplay}
        code={code}
        runCode={runCode}
        sectionId={sectionId}
        selectors={selectors}
        handleChange={handleChange}
      />
      <div>Output:</div>
      <textarea
        className="outputArea"
        id="output"
        value={output}
        rows={12}
        disabled
      />
      <div>
        <button
          onClick={() => {
            setOutput("");
          }}
        >
          Clean output
        </button>
      </div>
    </div>
  );
}
