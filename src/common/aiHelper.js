import axiosInstance from "../config/axiosInstance";
import commonApi from "./api";

export const getAIFeedback = async ({
  language,
  code,
  input,
  expected,
  actual,
  exerciseTitle,
  exerciseTasks,
  exerciseDescription,
}) => {
  try {
    const response = await axiosInstance.post(commonApi.aiFeedback.url, {
      language,
      code,
      input,
      expected,
      actual,
      exerciseTitle,
      exerciseTasks,
      exerciseDescription,
    });

    return response.data.suggestion || "No suggestion received.";
  } catch (err) {
    console.error("AI Feedback Error:", err);
    return "AI could not analyze this issue.";
  }
};
