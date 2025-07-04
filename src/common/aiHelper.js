import axiosInstance from "../config/axiosInstance";
import commonApi from "./api";

export const getAIFeedback = async ({ language, code, input, expected, actual }) => {
  try {
    const response = await axiosInstance.post(commonApi.aiFeedback.url, {
      language,
      code,
      input,
      expected,
      actual,
    });
    return response.data.suggestion || "No suggestion received.";
  } catch (err) {
    console.error("AI Feedback Error:", err);
    return "AI could not analyze this issue.";
  }
};
