import { ThemeContext } from "@/context/themeContext";
import { axiosErrorHandler } from "@/util/error";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ChipInput from "./ChipInput";
import TabSelect from "./TabSelect";
import CreatableSelect from "react-select/creatable";
import { Tooltip } from "flowbite-react";

const SignupSchema = Yup.object().shape({
  CourseSubject: Yup.string(),
  CourseDuration: Yup.string(),
  CourseType: Yup.string(),
  TargetAudience: Yup.string(),
  SpecificCourseGoals: Yup.string(),
  CurrentSkillLevel: Yup.string(),
  PriorKnowledge: Yup.string(),
  // CurriculumPlan: Yup.string(),
});

const CoursePlanForm = ({ setIsLoading, setUserData }: any) => {
  const { isDarkMode }: { isDarkMode: boolean } = useContext(ThemeContext);

  const courseFor = {
    label: "Who is the course for?",
    chips: [
      { label: "Undergrads", value: "students", active: false },
      { label: "Graduates", value: "freshers", active: false },
      {
        label: "Experienced Professionals",
        value: "experienced professionals",
        active: false,
      },
    ],
  };

  const expertiseLevel = {
    label: "What is the expertise level?",
    chips: [
      { label: "Beginner", value: "beginner", active: false },
      { label: "Intermediate", value: "intermediate", active: false },
      { label: "Advanced", value: "advanced", active: false },
    ],
  };

  const curriculumPlan = {
    label: "What type of curriculum plan?",
    chips: [
      { label: "Lecture Plan", value: "Lecture Plan", active: false },
      { label: "Course Plan", value: "Course Plan", active: false },
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
    { value: "1 week", label: "1 week" },
    { value: "1 month", label: "1 month" },
    { value: "3 months", label: "3 months" },
    { value: "6 months", label: "6 months" },
    { value: "1 year", label: "1 year" },
  ];

  return (
    <Formik
      initialValues={{
        CourseType: "",
        CourseSubject: "",
        CourseDuration: "",
        TargetAudience: "",
        SpecificCourseGoals: "",
        CurrentSkillLevel: "",
        PriorKnowledge: "",
        // CurriculumPlan: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        // same shape as initial values
        console.log(values);

        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/?$/, "") +
              "/lessonplan",

            {
              CourseType: values.CourseType,
              CourseSubject: values.CourseSubject,
              CourseDuration: values.CourseDuration,
              TargetAudience: values.TargetAudience,
              SpecificCourseGoals: values.SpecificCourseGoals,
              CurrentSkillLevel: values.CurrentSkillLevel,
              PriorKnowledge: values.PriorKnowledge,
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
              pauseOnHover: false,
              hideProgressBar: false,
              closeOnClick: true,

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
                    label={"Course Subject"}
                    options={languages}
                    onChange={(data: any) => {
                      setFieldValue(
                        "CourseSubject",
                        data
                          .map((el: any) => {
                            if (el.value) {
                              return el.value;
                            }
                          })
                          .join(", ")
                      );
                    }}
                    tooltipInfo="What is the subject of the course? (e.g., Python, JavaScript, Node.js, Spring Boot, SQL, MongoDB, Angular.js, etc.)"
                  />
                  {errors.CourseSubject && touched.CourseSubject ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CourseSubject}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  <ChipInput
                    label={"Course Duration"}
                    options={duration}
                    onChange={(data: any) => {
                      setFieldValue(
                        "CourseDuration",
                        data
                          .map((el: any) => {
                            if (el.value) {
                              return el.value;
                            }
                          })
                          .join(", ")
                      );
                    }}
                    tooltipInfo="How long is the course going to be? Please provide the duration in weeks or months."
                  />
                  {errors.CourseDuration && touched.CourseDuration ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CourseDuration}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  <label
                    className="flex items-center gap-[3px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
                    htmlFor="CourseType"
                  >
                    Course Type
                    <Tooltip
                      className="max-w-[300px]"
                      content={
                        "Is this course outcome-based (focused on specific results like placements or achieving a certain skill level) or experience-based (focused on enriching the learning journey and broad pedagogical exploration)?"
                      }
                    >
                      <img src="/img/chat/info.svg" alt="info" />
                    </Tooltip>
                  </label>

                  <CreatableSelect
                    isClearable
                    name="CourseType"
                    options={[
                      { value: "Outcome Based", label: "Outcome Based" },
                      {
                        value: "Experience Based",
                        label: "Experience Based",
                      },
                    ]}
                    styles={{
                      input: (provided: any) => ({
                        ...provided,
                        color: "inherit",
                        boxShadow: "none",
                        "&>input": {
                          background: "transparent !important",
                        },
                        "&>input:focus": {
                          boxShadow: "none",
                        },
                      }),
                      control: (provided: any) => ({
                        ...provided,
                        marginTop: "4px",
                        minHeight: "42px",
                        border: "1px solid #D1D5DB",
                        background: "field",
                        color: "inherit",
                        borderRadius: "6px",
                        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                        "&:hover'": {
                          border: "1px solid #D1D5DB",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: isDarkMode ? "inherit" : "#6B7280", // Set the desired placeholder color here
                      }),
                      menu: (provided: any) => {
                        return {
                          ...provided,
                          backgroundColor: "field",
                          color: "inherit",
                          borderRadius: "12px",
                          overflow: "hidden",
                        };
                      },
                      option: (provided: any) => {
                        return {
                          ...provided,
                          "&:hover": {
                            color: isDarkMode ? "black" : "auto",
                          },
                        };
                      },
                      singleValue: (provided: any) => {
                        return {
                          ...provided,
                          color: "inherit",
                        };
                      },
                    }}
                    onChange={(data) => {
                      setFieldValue("CourseType", data?.value);
                    }}
                  />
                </div>

                <div className="mt-[24px] flex flex-col">
                  <label
                    className="flex items-center gap-[3px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
                    htmlFor="CourseOutcome"
                  >
                    Course Outcome
                    <Tooltip
                      className="max-w-[300px]"
                      content={
                        "What specific outcomes do you expect from this course? (e.g., placements, skill development, preparation for a specific role, etc.)"
                      }
                    >
                      <img src="/img/chat/info.svg" alt="info" />
                    </Tooltip>
                  </label>

                  <input
                    type="text"
                    name="CourseOutcome"
                    placeholder="Enter course outcome (Eg: Placement, Skill Development, etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("SpecificCourseGoals", e.target.value);
                    }}
                  />
                  {errors.SpecificCourseGoals && touched.SpecificCourseGoals ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.SpecificCourseGoals}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px] flex flex-col">
                  <label
                    className="flex items-center gap-[3px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
                    htmlFor="CourseOutcome"
                  >
                    Prior Knowledge
                    <Tooltip
                      className="max-w-[300px]"
                      content={
                        "What prior knowledge does the course taker have? (Eg: Html, React, etc)"
                      }
                    >
                      <img src="/img/chat/info.svg" alt="info" />
                    </Tooltip>
                  </label>

                  <input
                    type="text"
                    name="CourseOutcome"
                    placeholder="Enter prior knowledge (Eg: Html, React, etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[4px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("PriorKnowledge", e.target.value);
                    }}
                  />
                  {errors.PriorKnowledge && touched.PriorKnowledge ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.PriorKnowledge}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  {courseFor && (
                    <TabSelect
                      tooltipInfo={
                        "Who is the target audience for this course? (e.g., students, freshers, experienced professionals, etc.) What is their current skill level and what are their prior knowledge expectations for this course?"
                      }
                      options={courseFor}
                      onChange={(data: any) => {
                        setFieldValue("TargetAudience", data.value);
                      }}
                    />
                  )}
                  <input
                    type="text"
                    name="CourseOutcome"
                    placeholder="Enter Target Audience (Eg: students, freshers etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[8px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("TargetAudience", e.target.value);
                    }}
                  />
                  {errors.TargetAudience && touched.TargetAudience ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.TargetAudience}
                    </p>
                  ) : null}
                </div>

                <div className="mt-[24px]">
                  {expertiseLevel && (
                    <TabSelect
                      tooltipInfo={
                        "Who is the skill level of the target audience for this course? (e.g., Intermediate, Beginner etc.)"
                      }
                      options={expertiseLevel}
                      onChange={(data: any) => {
                        setFieldValue("CurrentSkillLevel", data.value);
                      }}
                    />
                  )}
                  <input
                    type="text"
                    name="CourseOutcome"
                    placeholder="Enter Current Skill Level (Eg: Intermediate, Beginner, etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[8px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("CurrentSkillLevel", e.target.value);
                    }}
                  />
                  {errors.CurrentSkillLevel && touched.CurrentSkillLevel ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CurrentSkillLevel}
                    </p>
                  ) : null}
                </div>

                {/* <div className="mt-[24px]">
                  {curriculumPlan && (
                    <TabSelect
                      options={curriculumPlan}
                      onChange={(data: any) => {
                        setFieldValue("CurriculumPlan", data.value);
                      }}
                    />
                  )}
                  <input
                    type="text"
                    name="CourseOutcome"
                    placeholder="Enter Curriculum Plan (Eg: Html, React, etc)"
                    className="w-full min-h-[42px] px-[13px] py-[9px] rounded-[6px] border border-[#D1D5DB] mt-[8px] placeholder:text-[#6B7280] dark:placeholder:text-inherit"
                    style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
                    onChange={(e: any) => {
                      setFieldValue("CurriculumPlan", e.target.value);
                    }}
                  />
                  {errors.CurriculumPlan && touched.CurriculumPlan ? (
                    <p className="text-[#d61e27] mt-[8px]">
                      {errors.CurriculumPlan}
                    </p>
                  ) : null}
                </div> */}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CoursePlanForm;
