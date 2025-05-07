import React, { useState, useRef, useEffect, useMemo } from "react";
import { Select, Button, notification } from "antd";
import Editor from "@monaco-editor/react";
import commonApi from "../../../common/api";
import axiosInstance from "../../../config/axiosInstance";

const { Option } = Select;

const CodeEditor = ({
  defaultCode = "",
  testCases = [],
  language: fixedLanguage,
}) => {
  const defaultCodeMap = useMemo(() => ({
    javascript: `function run() {\n  // Your JS code here\n}`,
    python: `def run():\n    # Your Python code here\n    pass`,
    java: `public class Main {\n  public static void main(String[] args) {\n    // Your Java code here\n  }\n}`,
    c: `#include <stdio.h>\nint main() {\n  // Your C code here\n  return 0;\n}`,
    cpp: `#include <iostream>\nint main() {\n  // Your C++ code here\n  return 0;\n}`,
  }), []);

  const languageList = ["javascript", "python", "java", "c", "cpp"];
  const themeList = ["vs-dark", "light", "hc-black"];
  const editorRef = useRef();

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const language = fixedLanguage || selectedLanguage;
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(
    defaultCode || (fixedLanguage ? defaultCodeMap[fixedLanguage] : "")
  );
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const runTests = async () => {
    setIsRunning(true);
    const userCode = editorRef.current.getValue();

    const results = await Promise.all(
      testCases.map(async (test) => {
        const startTime = performance.now();
        try {
          const response = await axiosInstance.post(
            commonApi.executionCode.url,
            {
              language,
              code: userCode,
              input: test.input,
            }
          );

          const endTime = performance.now();
          const actualOutput = response.data.output
            ?.toString()
            .trim()
            .replace(/\s+/g, " ");
          const expectedOutput = test.expected
            ?.toString()
            .trim()
            .replace(/\s+/g, " ");
          const passed = actualOutput === expectedOutput;

          return {
            ...test,
            actual: actualOutput,
            executionTime: Math.floor(endTime - startTime),
            description: passed ? "Pass" : "Fail",
          };
        } catch (err) {
          const endTime = performance.now();
          return {
            ...test,
            actual: err.response?.data?.error || "Execution failed",
            executionTime: Math.floor(endTime - startTime),
            description: "Error",
          };
        }
      })
    );

    setTestResults(results);
    setIsRunning(false);
    setSelectedIndex(0);

    const hasError = results.some(
      (r) => r.description === "Error" || r.description === "Fail"
    );

    if (hasError) {
      notification.error({
        message: "Some test cases failed",
        description: "Please check the result details.",
        placement: "bottomLeft",
      });
    } else {
      notification.success({
        message: "All test cases passed!",
        description: "Great job, everything works perfectly!",
        placement: "bottomLeft",
      });
    }
  };

  const handleSubmit = () => {
    notification.success({
      message: "Code Submitted",
      description: "Your code has been submitted successfully!",
      placement: "bottomLeft",
    });
  };

  useEffect(() => {
    if (!fixedLanguage) {
      setCode(defaultCodeMap[selectedLanguage] || "");
    }
  }, [selectedLanguage, fixedLanguage, defaultCodeMap]);

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg shadow max-h-[850px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4 space-x-4">
        <div className="flex gap-2">
          <Select
            value={fixedLanguage || selectedLanguage}
            onChange={setSelectedLanguage}
            style={{ width: 180 }}
            className="bg-white"
          >
            {languageList.map((lang) => (
              <Option key={lang} value={lang}>
                {lang}
              </Option>
            ))}
          </Select>

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
          language={language}
          value={code}
          theme={theme}
          onMount={(editor) => (editorRef.current = editor)}
          onChange={(newValue) => setCode(newValue)}
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
