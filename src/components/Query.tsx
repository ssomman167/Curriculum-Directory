import ClipBoardIcon from "@/assets/ClipBoardIcon";
import ShareIcon from "@/assets/ShareIcon";
import React, { useContext, useEffect, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import useClipboard from "react-use-clipboard";
import remarkGfm from "remark-gfm";

import { Tooltip } from "flowbite-react";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { ThemeContext } from "@/context/themeContext";

const Query = ({
  role,
  content,
  showUser = true,
  typeEffect,
  queryIndex,
}: {
  role: string;
  prompt: string;
  content: string;
  response: string;
  showUser: boolean;
  queryIndex: number;
  typeEffect: boolean;
}) => {
  const { isDarkMode }: any = useContext(ThemeContext);
  const [isCopied, setCopied] = useClipboard(content, {
    successDuration: 800,
  });

  // Typewriter effect start
  let index = 0;
  let timer: any = null;
  let markDownText = "";

  // const type = async () => {
  //   clearTimeout(timer);
  //   let id = ".typewriter" + queryIndex;

  //   const typewriter: any = document.querySelector(id);

  //   if (!typewriter) return;

  //   if (!markDownText) {
  //     markDownText = typewriter.innerHTML;
  //   }

  //   if (index < markDownText.length) {
  //     typewriter.innerHTML =
  //       markDownText.slice(0, index) +
  //       '<span className="blinking-cursor">|</span>';
  //     index++;
  //     timer = setTimeout(type, 60);
  //   } else {
  //     typewriter.innerHTML = markDownText.slice(0, index);
  //   }
  // };

  // React.useEffect(() => {
  //   if (
  //     Number(localStorage.getItem("typeEffectIndex")) !== queryIndex &&
  //     typeEffect
  //   ) {
  //     type();
  //     localStorage.setItem("typeEffectIndex", queryIndex.toString());
  //   }
  // }, [typeEffect]);
  // Typewriter effect end

  const handleGeneratePdf = () => {
    let id = ".typewriter" + queryIndex;

    const typewriter: any = document.querySelector(id);

    if (!typewriter) return;

    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });

    doc.html(typewriter, {
      async callback(doc) {
        await doc.save("Curriculum");
      },
    });
  };

  return (
    <div className="flex flex-col">
      {role === "user" ? (
        <div className="">
          {/* <div className="flex items-start gap-[1.5rem] py-[30px] mx-auto px-[16px]">
            {showUser && (
              <div className="bg-[#D4A486] flex items-center justify-center overflow-hidden rounded-[500px] min-w-[40px] min-h-[40px] sticky top-[10px]">
                You
              </div>
            )}
            <div className="w-[calc(100% - 50px)]">{content}</div>
          </div> */}
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-[12px] py-[8px] mx-auto px-[16px]">
            {showUser && (
              <div className="bg-[#3D8DFE] flex items-center justify-center overflow-hidden rounded-[500px] min-w-[40px] min-h-[40px] sticky top-[10px]">
                <img src="/img/chat/bot.svg" alt="bot" />
              </div>
            )}

            <div className="flex w-full gap-[8px] group h-full">
              <div className="w-[calc(100%-50px)] p-[16px] rounded-[12px] border border-[#D1D5DB]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className={`${
                    "typewriter" + queryIndex
                  }  prose prose-slatec dark:prose-invert lg:prose-lg break-words`}
                >
                  {content}
                </ReactMarkdown>
              </div>

              <div className=" sticky top-[10px] h-full flex flex-col gap-[16px] opacity-0 transition-opacity delay-200 group-hover:opacity-[1]">
                <Tooltip content="PDF">
                  <button
                    onClick={handleGeneratePdf}
                    className="text-[#6B7280] dark:text-white"
                  >
                    <ShareIcon />
                  </button>
                </Tooltip>
                <Tooltip content="Copy">
                  <button
                    onClick={() => {
                      toast("Copied to clipboard", {
                        position: "top-right",
                        autoClose: 5000,
                        type: "success",
                        hideProgressBar: false,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: isDarkMode ? "dark" : "light",
                      });
                      setCopied();
                    }}
                    data-tooltip="This is a tooltip"
                    className="fb-tooltip text-[#6B7280] dark:text-white"
                  >
                    {isCopied ? (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <ClipBoardIcon />
                    )}
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Query;
