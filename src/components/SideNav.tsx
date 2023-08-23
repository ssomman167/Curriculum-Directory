import React, { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import CoursePlanForm from "./CoursePlanForm";
import TabSelect from "./TabSelect";
import DayPlanForm from "./DayPlanForm";

const SideNav = ({
  activeTab,
  setUserData,
  setIsLoading,
  setActiveTab,
}: any) => {
  const { isDarkMode }: { isDarkMode: boolean } = useContext(ThemeContext);

  const curriculumPlan = {
    label: "What type of curriculum plan?",
    chips: [
      { label: "Course Plan", value: "Course Plan", active: true },
      { label: "Lecture Plan", value: "Lecture Plan", active: false },
    ],
  };

  return (
    <div className="w-full">
      <div className="overflow-y-auto w-full p-[20px]">
        <div className="max-h-screen">
          <h1 className="text-2xl leading-7 font-bold">Curriculum Generator</h1>

          <p className="mt-[16px] text-[#374151] dark:text-inherit text-base leading-5 font-normal">
            Fill the following fields to generate the curriculum plan of choice
          </p>

          <div className="mt-[24px]">
            {curriculumPlan && (
              <TabSelect
                options={curriculumPlan}
                onChange={(data: any, chipIndex: number) => {
                  setActiveTab(chipIndex);
                }}
              />
            )}
          </div>

          {activeTab === 0 ? (
            <>
              <CoursePlanForm
                setUserData={setUserData}
                setIsLoading={setIsLoading}
              />
              <div className="h-[100px] md:h-[400px] flex-shrink-0"></div>
            </>
          ) : (
            <>
              <DayPlanForm
                setUserData={setUserData}
                setIsLoading={setIsLoading}
              />
              <div className="h-[200px] md:h-[400px] flex-shrink-0"></div>
            </>
          )}
        </div>
      </div>

      <div
        className="sticky bottom-0 py-[8px] px-[20px] bg-white dark:bg-black"
        style={{
          boxShadow:
            "0px 0px 25px -5px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 0px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <button
          form="my-form"
          type="submit"
          className="w-full transition-colors ring-offset-1 focus:ring-2 focus-visible:ring-2 rounded-[6px] bg-[#2563EB] hover:bg-[#225bd7] h-[50px] text-white dark:text-inherit"
        >
          Generate Curriculum Plan
        </button>
      </div>
    </div>
  );
};

export default SideNav;
