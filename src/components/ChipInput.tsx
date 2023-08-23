import { ThemeContext } from "@/context/themeContext";
import { Tooltip } from "flowbite-react";
import React, {
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string, value: string) => ({
  label,
  value: value,
});

let selectedSuggestedOptions = 0;

const ChipInput = ({
  tooltipInfo,
  label,
  chipLabel,
  options,
  onChange,
}: any) => {
  const { isDarkMode }: { isDarkMode: boolean } = useContext(ThemeContext);
  const [filterData, setFilterData] = useState<any>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState<readonly Option[]>([]);

  const data = options || [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  let callBack = useCallback(() => {
    setFilterData(data);
  }, [data]);

  useEffect(() => {
    callBack();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(value, inputValue);
    }
  }, [value]);

  const styles = {
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
      "&:hover": {
        border: "1px solid #D1D5DB",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: isDarkMode ? "inherit" : "#6B7280",
    }),
    menu: (provided: any) => ({
      ...provided,
      background: "field",
      color: "inherit",
    }),
    multiValue: (provided: any) => {
      return {
        ...provided,
        backgroundColor: "#DBEAFE",
        color: "#38BDF8",
        borderRadius: "12px",
        overflow: "hidden",
      };
    },
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#1E40AF",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#38BDF8",
    }),
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue, inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <>
      <div className="flex flex-col mt-[24px]">
        <label
          className="text-sm flex items-center gap-[3px] leading-5 font-medium text-[#374151] dark:text-inherit"
          htmlFor="language"
        >
          {label ? label : "Label"}
          {tooltipInfo && (
            <Tooltip content={tooltipInfo} className="max-w-[300px]">
              <img src="/img/chat/info.svg" alt="info" />
            </Tooltip>
          )}
        </label>

        <CreatableSelect
          styles={styles}
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={(newValue) => {
            setValue(newValue);
            if (onChange) {
              onChange(newValue, inputValue);
            }
          }}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="Select"
          value={value}
        />
      </div>

      <p className="mt-[12px] text-sm leading-5 font-normal text-[#4B5563] dark:text-inherit">
        {chipLabel ? chipLabel : "Suggested:"}
      </p>

      <div className="mt-[8px] flex flex-wrap gap-[8px] md:gap-[16px]">
        {data &&
          data.length > 0 &&
          data.map((option: any, index: number) => {
            let isSelected =
              value.filter((el) => el.label === option.label).length === 0;

            return (
              isSelected && (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setValue((prev) => {
                      let newVal = [
                        ...prev,
                        createOption(option.label, option.value),
                      ];
                      if (onChange) {
                        onChange(newVal, inputValue);
                      }
                      return newVal;
                    });
                  }}
                  className="inline-flex items-center rounded-xl bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-gray-500/10"
                >
                  {option.label}
                </button>
              )
            );
          })}
      </div>
    </>
  );
};

export default ChipInput;
