import { ThemeContext } from "@/context/themeContext";
import { axiosErrorHandler } from "@/util/error";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ChipInput from "./ChipInput";
import TabSelect from "./TabSelect";
import { Tooltip } from "flowbite-react";

const SignupSchema = Yup.object().shape({
  CourseType: Yup.string(),
  LearningObjectives: Yup.string(),
  CoursePlan: Yup.string(),
  SessionDuration: Yup.string(),
  TeachingMode: Yup.string(),
  LearnerProfile: Yup.string(),
  RealWorldContexts: Yup.string(),
  CourseComplexityLevel: Yup.string(),
});

const CoursePlanForm = ({ setIsLoading, setUserData }: any) => {
  const { isDarkMode }: { isDarkMode: boolean } = useContext(ThemeContext);

  const expertiseLevel = {
    label: "Learner Profile",
    chips: [
      { label: "Beginner", value: "beginner", active: false },
      { label: "Intermediate", value: "intermediate", active: false },
      { label: "Advanced", value: "advanced", active: false },
    ],
  };

  const languages = [
    { value: "React", label: "React" },
    { value: "Javascript", label: "Javascript" },
    { value: "Angular", label: "Angular" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "CSS", label: "CSS" },
  ];

  const duration = [
    { value: "1 hour", label: "1 hour" },
    { value: "2 hours", label: "2 hours" },
    { value: "4 hours", label: "3 hours" },
    { value: "6 hours", label: "6 hours" },
    { value: "10 hours", label: "10 hours" },
  ];

  // simple, moderate, or complex
  const CourseComplexityLevelTabs = {
    label: "Course Complexity Level",
    chips: [
      { value: "Simple", label: "Simple", active: false },
      { value: "Moderate", label: "Moderate", active: false },
      { value: "Complex", label: "Complex", active: false },
    ],
  };

  const RealWorldExamples = [
    { value: "E-commers", label: "E-commers" },
    { value: "Health Care", label: "Health Care" },
    { value: "Edutech", label: "Edutech" },
  ];

  return (
    <Formik
      initialValues={{
        CourseType: "",
        LearningObjectives: "",
        CoursePlan: "",
        SessionDuration: "",
        TeachingMode: "",
        LearnerProfile: "",
        RealWorldContexts: "",
        CourseComplexityLevel: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        console.log("values:", values);
        setIsLoading(true);
        // same shape as initial values
        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/?$/, "") +
              "/dayplan",
            {
              CourseType: values.CourseType,
              LearningObjectives: values.LearningObjectives,
              CoursePlan: values.CoursePlan,
              SessionDuration: values.SessionDuration,
              LearnerProfile: values.LearnerProfile,
              RealWorldContexts: values.RealWorldContexts,
              TeachingMode: values.TeachingMode,
              CourseComplexityLevel: values.CourseComplexityLevel,
            }
          );

          if (res.data?.["GPT Output"]) {
            setUserData((prev: any) => {
              localStorage.setItem(
                "userData",
                JSON.stringify([
                  ...prev,
                  { role: "assistant", content: res?.data?.["GPT Output"] },
                ])
              );
              return [
                ...prev,
                { role: "assistant", content: res?.data?.["GPT Output"] },
              ];
            });
          }
        } catch (error) {
          const err: any = axiosErrorHandler(error);
          console.log("err:", err);
          if (err.massage) {
            toast(err.massage, {
              position: "top-right",
              autoClose: 5000,
              type: "error",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              theme: isDarkMode ? "dark" : "light",
            });
          } else {
            toast("Something went wrong", {
              position: "top-right",
              autoClose: 5000,
              type: "error",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              theme: isDarkMode ? "dark" : "light",
            });
          }
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => {
        // console.log("errors:", errors);
        return (
          <Form id="my-form" className="max-h-screen">
            <div className="max-h-screen">
              <div className="w-full ">
                <div className="mt-[24px]">
                  <ChipInput
                    label={"Course Type"}
                    tooltipInfo="This helps to set the context for the type of content to be generated. Examples include programming languages (Java, JavaScript, Python, etc.), databases (SQL, MongoDB, etc.), frameworks (Spring Boot, React, Node.js, AngularJS, etc.)."
                    options={languages}
                    onChange={(data: any) => {
                      setFieldValue(
                        "CourseType",
                        data
                          .map((el: any) => {
                            if (el.value) {
                              return el.value;
                            }
                          })
                          .join(", ")
                      );
                    }}
                  />
                  {errors.CourseType && touched.CourseType ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CourseType}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  <ChipInput
                    label={"Session Duration"}
                    tooltipInfo="The estimated time that will be spent on teaching and learning during the session. This will influence the depth of coverage for each topic and the number of activities or tasks."
                    options={duration}
                    onChange={(data: any) => {
                      setFieldValue(
                        "SessionDuration",
                        data
                          .map((el: any) => {
                            if (el.value) {
                              return el.value;
                            }
                          })
                          .join(", ")
                      );
                    }}
                  />
                  {errors.SessionDuration && touched.SessionDuration ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.SessionDuration}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  <label
                    className="flex items-center gap-[3px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
                    htmlFor="LearningObjectives"
                  >
                    Learning Objectives
                    <Tooltip
                      content={`These would be the specific objectives or topics for the day's session. For instance, "Data Types and Operators in SQL" or "Introduction to React Hooks".`}
                      className="max-w-[300px]"
                    >
                      <img src="/img/chat/info.svg" alt="info" />
                    </Tooltip>
                  </label>

                  <input
                    type="text"
                    name="LearningObjectives"
                    placeholder="Enter Learning Objectives (Eg: Data Types and Operators in SQL)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("LearningObjectives", e.target.value);
                    }}
                  />
                  {errors.LearningObjectives && touched.LearningObjectives ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.LearningObjectives}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  <label
                    className="flex items-center gap-[3px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
                    htmlFor="CourseOutcome"
                  >
                    Course Plan
                    <Tooltip
                      content={`If available, this will provide a broader context for the day's session, giving an understanding of what has been covered before and what will be covered in future sessions. This allows for better continuity and relevance in the lessons.`}
                      className="max-w-[300px]"
                    >
                      <img src="/img/chat/info.svg" alt="info" />
                    </Tooltip>
                  </label>

                  <input
                    type="text"
                    name="CoursePlan"
                    placeholder="Enter Course Plan (Eg: a broader context for the day's session)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("CoursePlan", e.target.value);
                    }}
                  />
                  {errors.CoursePlan && touched.CoursePlan ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CoursePlan}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px] flex flex-col">
                  <label
                    className="flex items-center gap-[3px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
                    htmlFor="TeachingMode"
                  >
                    Teaching Mode
                    <Tooltip
                      content={`This could be offline (classroom), online (live sessions), or self-paced online learning. This will influence the design of the tasks and interaction points in the day plan.`}
                      className="max-w-[300px]"
                    >
                      <img src="/img/chat/info.svg" alt="info" />
                    </Tooltip>
                  </label>

                  <input
                    type="text"
                    name="TeachingMode"
                    placeholder="Enter teaching mode (Eg: offline, online, etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("TeachingMode", e.target.value);
                    }}
                  />
                  {errors.TeachingMode && touched.TeachingMode ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.TeachingMode}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  {expertiseLevel && (
                    <TabSelect
                      tooltipInfo={
                        "Understanding the target audience is key to tailoring the content appropriately. Input parameters here could be beginner, intermediate, or advanced."
                      }
                      options={expertiseLevel}
                      onChange={(data: any) => {
                        setFieldValue("LearnerProfile", data.value);
                      }}
                    />
                  )}
                  <input
                    type="text"
                    name="LearnerProfile"
                    placeholder="Enter Learner Profile (Eg: beginner, intermediate, or advanced etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[8px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("LearnerProfile", e.target.value);
                    }}
                  />
                  {errors.LearnerProfile && touched.LearnerProfile ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.LearnerProfile}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  <ChipInput
                    tooltipInfo={
                      "Any specific industries or companies that you would like the lessons to refer to for real-world examples. Examples could be tech companies like Uber, Swiggy, or traditional sectors like banking, healthcare, etc."
                    }
                    label={"Real-World Contexts"}
                    options={RealWorldExamples}
                    onChange={(data: any) => {
                      setFieldValue(
                        "RealWorldContexts",
                        data
                          .map((el: any) => {
                            if (el.value) {
                              return el.value;
                            }
                          })
                          .join(", ")
                      );
                    }}
                  />

                  {errors.RealWorldContexts && touched.RealWorldContexts ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.RealWorldContexts}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  {CourseComplexityLevelTabs && (
                    <TabSelect
                      tooltipInfo={
                        "This gives an indication of how challenging the tasks and assignments should be. This could be simple, moderate, or complex."
                      }
                      options={CourseComplexityLevelTabs}
                      onChange={(data: any) => {
                        setFieldValue("CourseComplexityLevel", data.value);
                      }}
                    />
                  )}
                  <input
                    type="text"
                    name="CourseComplexityLevel"
                    placeholder="Enter Course Complexity Level (Eg: simple, moderate etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[8px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("CourseComplexityLevel", e.target.value);
                    }}
                  />
                  {errors.CourseComplexityLevel &&
                  touched.CourseComplexityLevel ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CourseComplexityLevel}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CoursePlanForm;
