import { ThemeContext } from "@/context/themeContext";
import { Tooltip } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";

const TabSelect = ({ options, onChange, tooltipInfo }: any) => {
  const isDarkMode = useContext(ThemeContext);
  const [data, setData] = useState<any | null>(options);

  // useEffect(() => {
  //   setData(options);
  // }, [options]);

  return (
    <>
      <label
        className="flex items-center gap-[3px] mt-[24px] text-sm leading-5 font-medium text-[#374151] dark:text-inherit"
        htmlFor="language"
      >
        {data?.label ? data?.label : "Label"}
        {tooltipInfo && (
          <Tooltip content={tooltipInfo} className="max-w-[300px]">
            <img src="/img/chat/info.svg" alt="info" />
          </Tooltip>
        )}
      </label>

      <div className="flex flex-wrap mt-[8px] gap-[16px]">
        {data &&
          data?.chips &&
          data?.chips?.length > 0 &&
          data?.chips?.map((el: any, chipIndex: number) => {
            return (
              <button
                key={el.value}
                type="button"
                style={{
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  border: el.active ? "1px solid #1D4ED8" : "1px solid #D1D5DB",
                  color: el.active
                    ? "#2563EB"
                    : isDarkMode
                    ? "inherit"
                    : "#374151",
                }}
                onClick={(e) => {
                  setData((prev: any) => {
                    let data = prev.chips.map((el: any, index: number) => {
                      if (chipIndex === index) {
                        return { ...el, active: true };
                      } else {
                        return { ...el, active: false };
                      }
                    });
                    return { ...prev, chips: data };
                  });
                  if (onChange) {
                    onChange(el, chipIndex);
                  }
                }}
                className={`rounded-[6px]  hover:bg-[#F9FAFB] dark:hover:bg-[#222222] dark:text-inherit border p-[9px_17px]`}
              >
                {el.label}
              </button>
            );
          })}
      </div>
    </>
  );
};

export default TabSelect;
