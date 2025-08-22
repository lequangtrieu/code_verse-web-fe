import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  message,
  Switch,
  Divider,
  Typography,
} from "antd";
import UploadImage from "../../../../common/UploadImage";
import commonApi from "../../../../common/api";
import axiosInstance from "../../../../config/axiosInstance";
import LoadingOverlay from "../../../../common/LoadingOverlay";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export default function CourseDescription({
  form: externalForm,
  formData,
  onSave,
  onCancel,
}) {
  const [form] = Form.useForm();
  const activeForm = externalForm || form;
  const [categories, setCategories] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // === NEW: AI modal states ===
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [cfgForm] = Form.useForm();
  const [customForm] = Form.useForm();
  const [cfgSnapshot, setCfgSnapshot] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [aiOutline, setAiOutline] = useState(null);

  const levels = [
    { levelId: "BEGINNER", name: "Beginner" },
    { levelId: "INTERMEDIATE", name: "Intermediate" },
    { levelId: "ADVANCED", name: "Advanced" },
  ];

  const languages = [
    { language: "JAVA", name: "Java" },
    { language: "PYTHON", name: "Python" },
    { language: "C", name: "C" },
    { language: "JAVASCRIPT", name: "JavaScript" },
    { language: "CPP", name: "C++" },
    { language: "CSHARP", name: "C#" },
    { language: "RUBY", name: "Ruby" },
    { language: "KOTLIN", name: "Kotlin" },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const result = await axiosInstance.get(commonApi.category.url);
      setCategories(result.data.result);
    } catch (error) {
      message.error("Error when fetching category data.");
      setCategories([]);
    } finally {
      setTimeout(() => setInitialLoading(false), 400);
    }
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && formData && categories.length > 0) {
      const initialValues = {
        ...formData.description,
        ...formData.bonus,
        categoryId: formData.description?.categoryId ?? categories[0]?.id,
        levelId: formData.bonus?.levelId ?? levels[0]?.levelId,
        language: formData.bonus?.language ?? languages[0]?.language,
      };
      activeForm.setFieldsValue(initialValues);
      hasInitialized.current = true;
    }
    // eslint-disable-next-line
  }, [formData, categories.length, activeForm]);

  const isPaid = Form.useWatch("isPaid", activeForm);
  const coverFileList = Form.useWatch("cover", activeForm) || [];

  const openSuggestModal = () => {
    const title = activeForm.getFieldValue("title");
    const description = activeForm.getFieldValue("description");
    const language = activeForm.getFieldValue("language");
    const levelId = activeForm.getFieldValue("levelId");
    const categoryId = activeForm.getFieldValue("categoryId");

    if (!title || !description || !language || !levelId || !categoryId) {
      message.warning(
        "Please fill Title, Description, Language, Level and Category before using AI."
      );
      return;
    }
    // reset steps & forms
    setAiStep(0);
    cfgForm.resetFields();
    customForm.resetFields();
    setCfgSnapshot(null);
    setIsSuggestOpen(true);
  };

  const values = activeForm.getFieldsValue([
    "title",
    "description",
    "language",
    "levelId",
    "categoryId",
    "isPaid",
    "price",
  ]);

  const categoryName = categories.find((c) => c.id === values.categoryId)?.name;
  const levelName = levels.find((l) => l.levelId === values.levelId)?.name;
  const languageName = languages.find(
    (l) => l.language === values.language
  )?.name;

  // === Modal footer logic ===
  const onCloseModal = () => setIsSuggestOpen(false);

  const onContinueFromPreview = () => {
    cfgForm.setFieldsValue({
      moduleCount: 6,
      lessonStrategy: "UNIFORM",
      lessonsPerModule: 5,
      includeExercises: true,
      includeQuizzes: true,
      quizStyle: "PER_MODULE",
      questionsPerQuiz: 5,
      pointsPerLesson: 10,
      pointsPerQuizQuestion: 1,
      timePerLesson: 20,
    });
    setAiStep(1);
  };

  // Day nha em Hien`
  const onContinueFromConfigure = async () => {
    try {
      const cfg = await cfgForm.validateFields();
      setCfgSnapshot(cfg);
      if (cfg.lessonStrategy === "CUSTOM") {
        const rows = Array.from({ length: cfg.moduleCount }).map((_, i) => ({
          titleSeed: `Module ${i + 1}`,
          lessons: 5,
        }));
        customForm.setFieldsValue({ modules: rows });
        setAiStep(2);
      } else {
        try {
          const base = activeForm.getFieldsValue([
            "title",
            "description",
            "language",
            "levelId",
            "categoryId",
            "isPaid",
            "price",
          ]);

          const payload = {
            base: {
              courseTitle: base.title,
              courseDescription: base.description,
              language: base.language,
              levelId: base.levelId,
              categoryId: base.categoryId,
              isPaid: base.isPaid || false,
              price: base.price || null,
            },
            structure: {
              moduleCount: cfg.moduleCount,
              lessonStrategy: "UNIFORM",
              lessonsPerModule: cfg.lessonsPerModule,
              timePerLesson: cfg.timePerLesson,
            },
            exercises: {
              include: cfg.includeExercises,
            },
            quiz: {
              include: cfg.includeQuizzes,
              style: cfg.quizStyle,
              questionsPerQuiz: cfg.questionsPerQuiz,
              types: ["SINGLE"],
            },
            scoring: {
              pointsPerLesson: cfg.pointsPerLesson,
              pointsPerQuizQuestion: cfg.pointsPerQuizQuestion,
            },
          };

          setGenerating(true);
          const { data } = await axiosInstance.post(
            commonApi.aiCourseSuggest.url,
            payload
          );
          setAiOutline(data?.outline || null);
          message.success("AI outline generated.");
        } catch (err) {
          message.error("Failed to generate AI outline");
        } finally {
          setGenerating(false);
        }
      }
    } catch {}
  };

  const onBack = () => setAiStep((s) => (s === 2 ? 1 : 0));

  return (
    <>
      <Form
        name="courseDescription"
        form={activeForm}
        layout="vertical"
        className="max-w-3xl mx-auto"
      >
        {initialLoading && <LoadingOverlay />}

        <div className="flex items-center justify-end mb-4">
          <Button onClick={openSuggestModal}>Suggest with AI</Button>
        </div>

        <Form.Item
          label="Course Title"
          name="title"
          rules={[{ required: true, message: "Please enter the course title" }]}
        >
          <Input placeholder="e.g., Learn React from Scratch" />
        </Form.Item>

        <Form.Item
          label="Course Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <TextArea
            rows={5}
            placeholder="Write a short overview about the course"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Course Cover Image"
          name="cover"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload a cover image" }]}
        >
          <UploadImage
            label="Upload Cover"
            maxCount={1}
            value={coverFileList}
          />
        </Form.Item>

        <Form.Item
          name="isPaid"
          label="Is this course paid?"
          rules={[{ required: true, message: "Please choose Free or Paid" }]}
        >
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={false}>Free</Radio>
            <Radio value={true}>Paid</Radio>
          </Radio.Group>
        </Form.Item>

        {isPaid && (
          <Form.Item
            name="price"
            label="Course Price (VND)"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={1} placeholder="e.g. 100000" className="w-full" />
          </Form.Item>
        )}

        <Form.Item
          name="levelId"
          label="Course Level"
          rules={[{ required: true, message: "Please select level" }]}
        >
          <Select placeholder="Select level">
            {levels.map((level) => (
              <Option key={level.levelId} value={level.levelId}>
                {level.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="language"
          label="Course Language"
          rules={[{ required: true, message: "Please select language" }]}
        >
          <Select placeholder="Select language">
            {languages.map((language) => (
              <Option key={language.language} value={language.language}>
                {language.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space className="flex justify-end">
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                onSave?.(activeForm);
              }}
            >
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        open={isSuggestOpen}
        getContainer={false}
        title={
          aiStep === 0
            ? "Suggest with AI"
            : aiStep === 1
            ? "Suggest with AI — Configure"
            : "Suggest with AI — Custom per module"
        }
        onCancel={onCloseModal}
        footer={
          <Space>
            {aiStep > 0 && <Button onClick={onBack}>Back</Button>}
            <Button onClick={onCloseModal}>Close</Button>
            {aiStep === 0 && (
              <Button type="primary" onClick={onContinueFromPreview}>
                Continue
              </Button>
            )}
            {aiStep === 1 && (
              <Button type="primary" onClick={onContinueFromConfigure}>
                Continue
              </Button>
            )}
            {aiStep === 2 && (
              <Button type="primary" disabled>
                Generate (coming next)
              </Button>
            )}
          </Space>
        }
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {/* Step 0: Preview base info */}
        {aiStep === 0 && (
          <div className="prose max-w-none">
            <p className="mb-3 text-gray-600">
              Review the base information before configuring AI suggestions.
            </p>
            <Descriptions
              bordered
              size="small"
              column={1}
              className="rounded-xl"
            >
              <Descriptions.Item label="Course Title">
                {values.title || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <div className="whitespace-pre-wrap">
                  {values.description || "-"}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {categoryName || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Level">
                {levelName || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Language">
                {languageName || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Pricing">
                {values.isPaid
                  ? `Paid${values?.price ? ` — ${values.price} VND` : ""}`
                  : "Free"}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-4 text-sm text-gray-500">
              Next: configure structure (modules, lessons), exercises, and
              quizzes, then generate a draft outline via AI.
            </div>
          </div>
        )}

        {/* Step 1: Configure */}
        {aiStep === 1 && (
          <Form
            form={cfgForm}
            layout="vertical"
            className="space-y-2"
            initialValues={{
              lessonStrategy: "UNIFORM",
              includeExercises: true,
              includeQuizzes: true,
              quizStyle: "PER_MODULE",
              questionsPerQuiz: 5,
              pointsPerLesson: 10,
              pointsPerQuizQuestion: 1,
              timePerLesson: 20,
            }}
          >
            <Title level={5} className="!mt-0">
              Structure
            </Title>
            <Form.Item
              name="moduleCount"
              label="Number of modules"
              rules={[
                { required: true, message: "Please input number of modules" },
              ]}
            >
              <InputNumber
                min={1}
                max={20}
                className="w-full"
                placeholder="e.g. 6"
              />
            </Form.Item>

            <Form.Item name="lessonStrategy" label="Lessons per module">
              <Radio.Group>
                <Radio value="UNIFORM">Uniform</Radio>
                <Radio value="CUSTOM">Custom per module</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Only show for UNIFORM */}
            <Form.Item shouldUpdate noStyle>
              {() =>
                cfgForm.getFieldValue("lessonStrategy") !== "CUSTOM" && (
                  <Form.Item
                    name="lessonsPerModule"
                    label="Lessons per module (uniform)"
                    rules={[
                      {
                        required: true,
                        message: "Please input lessons per module",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      max={20}
                      className="w-full"
                      placeholder="e.g. 5"
                    />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Divider />

            <Title level={5}>Exercises</Title>
            <Form.Item
              name="includeExercises"
              label="Include coding exercises?"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Divider />

            <Title level={5}>Quizzes</Title>
            <Form.Item
              name="includeQuizzes"
              label="Include quizzes?"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="quizStyle"
              label="Quiz style"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: "Per lesson", value: "PER_LESSON" },
                  { label: "Per module", value: "PER_MODULE" },
                  { label: "Final only", value: "FINAL_ONLY" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="questionsPerQuiz"
              label="Questions per quiz"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={1}
                max={50}
                className="w-full"
                placeholder="e.g. 5"
              />
            </Form.Item>

            <Divider />

            <Title level={5}>Scoring & Time</Title>
            <Form.Item
              name="pointsPerLesson"
              label="Points per lesson"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                max={100}
                className="w-full"
                placeholder="e.g. 10"
              />
            </Form.Item>

            <Form.Item
              name="pointsPerQuizQuestion"
              label="Points per quiz question"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                max={10}
                className="w-full"
                placeholder="e.g. 1"
              />
            </Form.Item>

            <Form.Item
              name="timePerLesson"
              label="Estimated time per lesson (mins)"
            >
              <Select
                options={[
                  { label: "10", value: 10 },
                  { label: "20", value: 20 },
                  { label: "30", value: 30 },
                  { label: "45", value: 45 },
                ]}
              />
            </Form.Item>

            {cfgSnapshot && (
              <>
                <Divider />
                <Text type="secondary">
                  Last saved config: {JSON.stringify(cfgSnapshot)}
                </Text>
              </>
            )}
          </Form>
        )}

        {/* Step 2: Custom per module (placeholder UI) */}
        {aiStep === 2 && (
          <Form form={customForm} layout="vertical" className="space-y-2">
            <Text className="text-gray-600">
              Define lessons count and optional title seed for each module.
            </Text>
            <div className="space-y-2">
              {(customForm.getFieldValue("modules") || []).map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 items-center border rounded-lg p-2"
                >
                  <div className="col-span-8">
                    <Form.Item
                      name={["modules", idx, "titleSeed"]}
                      label={`Module ${idx + 1} title seed`}
                      rules={[{ required: false }]}
                    >
                      <Input placeholder={`Module ${idx + 1}`} />
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item
                      name={["modules", idx, "lessons"]}
                      label="Lessons"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <InputNumber min={1} max={20} className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
            <Divider />
            <Text type="secondary">
              Next: “Generate” will send this configuration to AI and create a
              draft course.
            </Text>
          </Form>
        )}
      </Modal>
    </>
  );
}
