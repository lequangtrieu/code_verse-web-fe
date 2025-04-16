import React, { useState } from "react";
import { Select, Button, message } from "antd";
import Editor from "@monaco-editor/react";

const { Option } = Select;

const CodeEditor = ({ defaultCode, testCases = [] }) => {
  const languageList = ["javascript", "python", "java", "c", "cpp"];
  const themeList = ["vs-dark", "light", "hc-black"];
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const runTests = () => {
    setIsRunning(true);

    const updatedResults = testCases.map((test) => {
      const isPassed = test.input === test.expected;
      return {
        ...test,
        description: isPassed ? "Pass" : "Fail",
        actual: isPassed ? test.expected : "Some error occurred",
        executionTime: Math.floor(Math.random() * 100),
      };
    });

    setTimeout(() => {
      setTestResults(updatedResults);
      setIsRunning(false);
      setSelectedIndex(0);
      message.success("Tests completed!");
    }, 500);
  };

  const handleSubmit = () => {
    message.success("Code submitted successfully!");
  };

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg shadow max-h-[850px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4 space-x-4">
        <div className="flex gap-2">
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: 180 }}
            className="bg-white"
          >
            {languageList.map((lang) => (
              <Option key={lang} value={lang}>
                {lang}
              </Option>
            ))}
          </Select>

          {/* Select theme */}
          <Select
            value={theme}
            onChange={setTheme}
            style={{ width: 180 }}
            className="bg-white"
          >
            {themeList.map((themeOption) => (
              <Option key={themeOption} value={themeOption}>
                {themeOption}
              </Option>
            ))}
          </Select>
        </div>

        <div className="space-x-2">
          <Button
            type="primary"
            loading={isRunning}
            onClick={runTests}
            className="bg-blue-500"
          >
            Run Test
          </Button>
          <Button onClick={handleSubmit} className="bg-green-500 text-white">
            Submit
          </Button>
        </div>
      </div>

      <div className="border border-gray-700 rounded overflow-hidden mb-6">
        <Editor
          height="450px"
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          theme={theme}
        />
      </div>

      <div className="bg-[#2e2f45] text-white rounded-lg shadow-lg p-4 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-green-400">
          Test Results
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1e1f33] rounded-lg p-3 space-y-2">
            {testCases.map((_, index) => (
              <Button
                key={index}
                type={selectedIndex === index ? "primary" : "default"}
                className={`w-full ${
                  selectedIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-[#2e2f45] text-white border border-gray-600"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                Test {index + 1}
              </Button>
            ))}
          </div>

          <div className="col-span-2 bg-[#1e1f33] rounded-lg p-4">
            {selectedIndex !== null && testCases[selectedIndex] && (
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Input:</span>{" "}
                  {testCases[selectedIndex].input}
                </div>
                <div>
                  <span className="text-gray-400">Expected:</span>{" "}
                  {testCases[selectedIndex].expected}
                </div>
                <div>
                  <span className="text-gray-400">Actual:</span>{" "}
                  {testResults[selectedIndex]
                    ? testResults[selectedIndex].actual
                    : "Not run yet"}
                </div>
                <div>
                  <span className="text-gray-400">Execution Time:</span>{" "}
                  {testResults[selectedIndex]
                    ? `${testResults[selectedIndex].executionTime} ms`
                    : "N/A"}
                </div>
                <div>
                  <span className="text-gray-400">Result:</span>{" "}
                  <span
                    className={`font-medium ${
                      testResults[selectedIndex]
                        ? testResults[selectedIndex].description === "Pass"
                          ? "text-green-400"
                          : "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {testResults[selectedIndex]
                      ? testResults[selectedIndex].description
                      : "Not run yet"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
