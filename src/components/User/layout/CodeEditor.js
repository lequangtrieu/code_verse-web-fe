import React, { useState, useRef, useEffect, useMemo } from "react";
import { Select, Button, notification, Tooltip, Modal } from "antd";
import Editor from "@monaco-editor/react";
import commonApi from "../../../common/api";
import axiosInstance from "../../../config/axiosInstance";
import { getAIFeedback } from "../../../common/aiHelper";
import party from "party-js";

const { Option } = Select;

const CodeEditor = ({
  lessonId = null,
  userId = null,
  defaultCode = "",
  testCases = [],
  language: fixedLanguage,
  exercise = [],
  onChangeLesson,
  allLessons = [],
  onRefreshLessonData,
}) => {
  const defaultCodeMap = useMemo(
    () => ({
      javascript: `function run() {\n  // Your JS code here\n}`,
      python: `def run():\n    # Your Python code here\n    pass`,
      java: `import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    // Your Java code here\n  }\n}`,
      c: `#include <stdio.h>\nint main() {\n  // Your C code here\n  return 0;\n}`,
      cpp: `#include <iostream>\nint main() {\n  // Your C++ code here\n  return 0;\n}`,
    }),
    []
  );

  const [showCourseCompletionModal, setShowCourseCompletionModal] =
    useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiSuggestion, setAISuggestion] = useState("");
  const languageList = ["javascript", "python", "java", "c", "cpp"];
  const themeList = ["vs-dark", "light", "hc-black"];
  const editorRef = useRef();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const language = fixedLanguage || selectedLanguage;
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(
    defaultCode || (fixedLanguage ? defaultCodeMap[fixedLanguage] : "")
  );
  const [testResults, setTestResults] = useState([]);
  const [lastPassedCode, setLastPassedCode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const canShowSubmitButton = useMemo(() => {
    const currentCode = editorRef.current?.getValue() || "";
    return (
      testResults.length > 0 &&
      testResults.every((r) => r.description === "Pass") &&
      lastPassedCode &&
      lastPassedCode === currentCode
    );
  }, [testResults, lastPassedCode]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const formatInputForAI = (rawInput) => {
    return rawInput
      ?.split("#@ip!")
      .filter((line) => line.trim() !== "")
      .join("\n")
      .trim();
  };

  const runTests = async () => {
    setIsRunning(true);
    const userCode = editorRef.current.getValue();
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];
      const startTime = performance.now();

      try {
        const response = await axiosInstance.post(commonApi.executionCode.url, {
          language,
          code: userCode,
          input: test.input,
        });

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

        results.push({
          ...test,
          actual: actualOutput,
          executionTime: Math.floor(endTime - startTime),
          description: passed ? "Pass" : "Fail",
        });
      } catch (err) {
        const endTime = performance.now();
        results.push({
          ...test,
          actual: err.response?.data?.error || "Execution failed",
          executionTime: Math.floor(endTime - startTime),
          description: "Error",
        });
      }

      if (i !== testCases.length - 1) await delay(1);
    }

    setTestResults(results);
    setIsRunning(false);
    setSelectedIndex(0);

    const hasError = results.some(
      (r) => r.description === "Error" || r.description === "Fail"
    );

    if (hasError) {
      setLastPassedCode(null);
      const firstError = results.find(
        (r) => r.description === "Error" || r.description === "Fail"
      );

      if (firstError) {
        const suggestion = await getAIFeedback({
          language,
          code: userCode,
          input: formatInputForAI(firstError.input),
          expected: firstError.expected,
          actual: firstError.actual,
          exerciseTitle: exercise?.title,
          exerciseTasks: exercise?.tasks?.map((t) => `• ${t}`).join("\n"),
          exerciseDescription: exercise?.instruction || "",
        });

        setAISuggestion(suggestion);

        notification.info({
          message: "💡 AI Feedback on Failed Test Case",
          description: "See AI's explanation for why your code failed.",
          placement: "topLeft",
          duration: 5,
        });
      }

      return;
    }

    const aiInput = results[0];

    const suggestion = await getAIFeedback({
      language,
      code: userCode,
      input: formatInputForAI(aiInput.input),
      expected: aiInput.expected,
      actual: aiInput.actual,
      exerciseTitle: exercise?.title,
      exerciseTasks: exercise?.tasks?.map((t) => `• ${t}`).join("\n"),
      exerciseDescription: exercise?.instruction || "",
    });

    setAISuggestion(suggestion);

    const resultTag = suggestion.match(/\[RESULT\]:\s*(PASS|FAIL)/i);
    const isHardcoded = resultTag?.[1]?.toUpperCase() === "FAIL";

    if (isHardcoded) {
      setLastPassedCode(null);
      notification.warning({
        message: "⚠️ AI detected hardcoded or invalid logic",
        description:
          "Your code passes the test cases, but appears to be hardcoded or not generalized. Please revise it before submitting.",
        placement: "topLeft",
      });
    } else {
      setLastPassedCode(userCode);
      notification.success({
        message: "All test cases passed and AI approved!",
        description: "Great job, your code is valid and algorithmic!",
        placement: "topLeft",
      });
    }
  };

  const handleSubmit = async () => {
    const currentCode = editorRef.current.getValue();

    if (currentCode !== lastPassedCode) {
      return notification.warning({
        message: "Cannot Submit",
        description:
          "Code has changed or failed AI verification. Please rerun tests.",
        placement: "topLeft",
      });
    }

    if (userId && lessonId) {
      const hasFailed = testResults.some((r) => r.description !== "Pass");
      if (hasFailed) {
        return notification.warning({
          message: "Cannot Submit",
          description: "Please pass all test cases before submitting.",
          placement: "topLeft",
        });
      }

      const userCode = editorRef.current.getValue();
      const response = await axiosInstance.post(commonApi.submitCode.url(), {
        lessonId,
        userId,
        code: userCode,
      });

      const statusDone = response?.data?.message;

      if (statusDone === "completed") {
        setShowCourseCompletionModal(true);
      } else {
        party.confetti(document.body, {
          count: 100,
          spread: 70,
          speed: 300,
        });

        setShowSuccessModal(true);
      }
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timeout = setTimeout(() => {
        if (typeof onRefreshLessonData === "function") {
          onRefreshLessonData({ initialLoad: false });
        }
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [onRefreshLessonData, showSuccessModal]);

  useEffect(() => {
    if (!fixedLanguage) {
      setCode(defaultCodeMap[selectedLanguage] || "");
    }
  }, [selectedLanguage, fixedLanguage, defaultCodeMap]);

  return (
    <div
      style={{ overflow: "hidden", position: "relative" }}
      className="w-full p-4 bg-gray-900 rounded-lg shadow h-[calc(100vh-85px)] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4 space-x-4">
        <div className="flex gap-2">
          {fixedLanguage ? (
            <div className="px-3 py-1 bg-white text-gray-800 rounded border border-gray-300">
              {fixedLanguage}
            </div>
          ) : (
            <Select
              value={selectedLanguage}
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
          )}

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
          {canShowSubmitButton && (
            <Button
              onClick={handleSubmit}
              type="primary"
              className="bg-green-500 text-white hover:bg-green-600 border-none"
            >
              Submit
            </Button>
          )}
        </div>
      </div>

      <div className="border border-gray-700 h-[calc(100vh-420px)] rounded overflow-hidden mb-6">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={theme}
          onMount={(editor) => (editorRef.current = editor)}
          onChange={(newValue) => setCode(newValue)}
        />
      </div>

      <div className="bg-[#2e2f45] text-white rounded-lg shadow-lg p-4 mt-6 h-[230px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-400">Test Results</h3>

          {aiSuggestion && (
            <Button
              onClick={() => setShowAIModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 rounded-md shadow-md border-none"
            >
              <span>💡 View AI Suggestion</span>
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 overflow-y-auto h-[160px]">
          {/* Left: Test case buttons */}
          <div className="flex flex-row md:flex-col gap-2 md:w-1/4">
            {testCases.map((_, index) => (
              <Button
                key={index}
                type={selectedIndex === index ? "primary" : "default"}
                className={`w-full ${
                  selectedIndex === index
                    ? "bg-blue-500 text-white"
                    : testResults[index]?.description === "Fail"
                    ? "bg-red-500 text-white"
                    : testResults[index]?.description === "Pass"
                    ? "bg-green-500 text-white"
                    : "bg-[#2e2f45] text-white border border-gray-600"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                Test {index + 1}
              </Button>
            ))}
          </div>

          {/* Right: Details of selected test */}
          <div className="flex-1 bg-[#1e1f33] rounded-lg p-4 h-[max-content]">
            {selectedIndex !== null && testCases[selectedIndex] && (
              <div className="space-y-2 text-sm text-white">
                <div>
                  <span className="text-gray-400">Input:</span>{" "}
                  {testCases[selectedIndex].input
                    .split("#@ip!")
                    .filter((line) => line.trim() !== "")
                    .join(" | ")}
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

      <Modal
        title="💡 AI Suggestion"
        open={showAIModal}
        onCancel={() => setShowAIModal(false)}
        footer={null}
        centered
        className="custom-modal"
        getContainer={false}
        width={800}
        styles={{
          body: {
            maxHeight: "70vh",
            overflowY: "auto",
            backgroundColor: "#1e1f33",
            color: "#e5e5e5",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            padding: "1.5rem",
            borderRadius: "0.5rem",
          },
        }}
      >
        <div className="space-y-4">
          {aiSuggestion.split("```").map((block, i) =>
            i % 2 === 0 ? (
              <div key={i} className="text-sm leading-relaxed">
                {block}
              </div>
            ) : (
              <pre
                key={i}
                className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto text-sm"
              >
                {block.replace(/^(java|python|c|cpp|javascript)?/, "").trim()}
              </pre>
            )
          )}
        </div>
      </Modal>
      <Modal
        getContainer={false}
        title="🎉 Congratulations!"
        open={showSuccessModal}
        onCancel={() => {
          setShowSuccessModal(false);
          if (typeof onRefreshLessonData === "function") {
            onRefreshLessonData({ initialLoad: false });
          }
        }}
        centered
        okText="Next Lesson →"
        onOk={() => {
          setShowSuccessModal(false);

          if (typeof onChangeLesson === "function" && allLessons?.length > 0) {
            const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
            const nextLesson = allLessons[currentIndex + 1];
            if (nextLesson) {
              onChangeLesson(nextLesson);
            }
          }

          if (typeof onRefreshLessonData === "function") {
            onRefreshLessonData({ initialLoad: false });
          }
        }}
        className="custom-modal"
        width={600}
        styles={{
          body: {
            backgroundColor: "#f0fdf4",
            color: "#065f46",
            padding: "2rem",
            borderRadius: "0.75rem",
            textAlign: "center",
          },
        }}
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🏆</div>
          <p className="font-bold text-xl mb-2">
            You've passed all test cases!
          </p>
          <p className="text-gray-700">
            Ready for the next challenge? Let’s keep going! 💪
          </p>
        </div>
      </Modal>
      <Modal
        title={null}
        getContainer={false}
        open={showCourseCompletionModal}
        onCancel={() => setShowCourseCompletionModal(false)}
        centered
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => {
              setShowCourseCompletionModal(false);
              if (typeof onRefreshLessonData === "function") {
                onRefreshLessonData({ initialLoad: true });
              }
            }}
          >
            Back to My Courses
          </Button>,
        ]}
        className="custom-modal"
        width={640}
        styles={{
          body: {
            background: "linear-gradient(to right, #dbeafe, #f0fdf4)",
            color: "#0f172a",
            padding: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          },
        }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎓</div>
          <h2 className="text-2xl font-bold mb-2 text-green-700">
            Congratulations!
          </h2>
          <p className="text-lg text-gray-800 mb-4">
            You've successfully completed the entire course.
          </p>
          <p className="text-sm text-gray-600 italic">
            We're proud of your progress. Keep learning and growing! 🚀
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CodeEditor;
