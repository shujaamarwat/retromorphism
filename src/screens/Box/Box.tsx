import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";

export const Box = (): JSX.Element => {
  // Define button variations to make the code more maintainable
  const buttonVariants = [
    {
      type: "primary",
      states: [
        {
          label: "Normal",
          className:
            "bg-primarysolid-50 text-black-100 shadow-[-2px_4px_0px_#001428]",
          top: "top-4",
        },
        {
          label: "Light",
          className:
            "bg-primarysolid-10 text-black-100 shadow-[-2px_4px_0px_#001428]",
          top: "top-[72px]",
        },
        {
          label: "Dark",
          className:
            "bg-primarysolid-60 text-black-100 shadow-[-2px_4px_0px_#001428]",
          top: "top-32",
        },
        {
          label: "Disabled",
          className: "bg-primarysolid-50 opacity-[0.24] text-black-100",
          top: "top-[184px]",
        },
      ],
    },
    {
      type: "secondary",
      states: [
        {
          label: "Normal",
          className:
            "bg-secondarysolid-50 text-white-100 shadow-[-2px_4px_0px_#001428]",
          top: "top-60",
        },
        {
          label: "Light",
          className:
            "bg-secondarysolid-10 text-secondarysolid-60 shadow-[-2px_4px_0px_#001428]",
          top: "top-[296px]",
        },
        {
          label: "Dark",
          className:
            "bg-secondarysolid-60 text-white-100 shadow-[-2px_4px_0px_#001428]",
          top: "top-[352px]",
        },
        {
          label: "Disabled",
          className: "bg-secondarysolid-50 opacity-[0.24] text-white-100",
          top: "top-[408px]",
        },
      ],
    },
  ];

  // Define button layouts
  const buttonLayouts = [
    {
      type: "text-icon-right",
      left: "left-4",
      render: (variant) => (
        <Button
          className={`pl-4 pr-1 py-1 ${variant.top} ${variant.className} rounded-2xl border-2 border-solid border-[#001428] h-auto`}
        >
          <span
            className={`${variant.className.includes("text-") ? "" : "text-black-100"} relative w-fit mt-[-2.00px] font-text-16-med font-[number:var(--text-16-med-font-weight)] text-[length:var(--text-16-med-font-size)] tracking-[var(--text-16-med-letter-spacing)] leading-[var(--text-16-med-line-height)] whitespace-nowrap [font-style:var(--text-16-med-font-style)]`}
          >
            Btn
          </span>
          <div className="relative w-6 h-6">
            <ArrowRightIcon className="absolute w-3.5 h-2.5 top-[7px] left-[5px]" />
          </div>
        </Button>
      ),
    },
    {
      type: "text-only",
      left: "left-[103px]",
      render: (variant) => (
        <Button
          className={`px-4 py-1 ${variant.top} ${variant.className} rounded-2xl border-2 border-solid border-[#001428] h-auto`}
        >
          <span
            className={`${variant.className.includes("text-") ? "" : "text-black-100"} relative w-fit mt-[-2.00px] font-text-16-med font-[number:var(--text-16-med-font-weight)] text-[length:var(--text-16-med-font-size)] tracking-[var(--text-16-med-letter-spacing)] leading-[var(--text-16-med-line-height)] whitespace-nowrap [font-style:var(--text-16-med-font-style)]`}
          >
            Btn
          </span>
        </Button>
      ),
    },
    {
      type: "icon-left-text",
      left: "left-[170px]",
      render: (variant) => (
        <Button
          className={`pl-1 pr-4 py-1 ${variant.top} ${variant.className} rounded-2xl border-2 border-solid border-[#001428] h-auto`}
        >
          <div className="relative w-6 h-6">
            <ArrowLeftIcon className="absolute w-3.5 h-2.5 top-[7px] left-[5px]" />
          </div>
          <span
            className={`${variant.className.includes("text-") ? "" : "text-black-100"} relative w-fit mt-[-2.00px] font-text-16-med font-[number:var(--text-16-med-font-weight)] text-[length:var(--text-16-med-font-size)] tracking-[var(--text-16-med-letter-spacing)] leading-[var(--text-16-med-line-height)] whitespace-nowrap [font-style:var(--text-16-med-font-style)]`}
          >
            Btn
          </span>
        </Button>
      ),
    },
    {
      type: "icon-text-icon",
      left: "left-[257px]",
      render: (variant) => (
        <Button
          className={`p-1 ${variant.top} ${variant.className} rounded-2xl border-2 border-solid border-[#001428] h-auto`}
        >
          <div className="relative w-6 h-6">
            <ArrowLeftIcon className="absolute w-3.5 h-2.5 top-[7px] left-[5px]" />
          </div>
          <span
            className={`${variant.className.includes("text-") ? "" : "text-black-100"} relative w-fit mt-[-2.00px] font-text-16-med font-[number:var(--text-16-med-font-weight)] text-[length:var(--text-16-med-font-size)] tracking-[var(--text-16-med-letter-spacing)] leading-[var(--text-16-med-line-height)] whitespace-nowrap [font-style:var(--text-16-med-font-style)]`}
          >
            Btn
          </span>
          <div className="relative w-6 h-6">
            <ArrowRightIcon className="absolute w-3.5 h-2.5 top-[7px] left-[5px]" />
          </div>
        </Button>
      ),
    },
    {
      type: "icon-only",
      left: "left-[364px]",
      render: (variant) => (
        <Button
          className={`p-1 ${variant.top} ${variant.className} rounded-2xl border-2 border-solid border-[#001428] h-auto`}
        >
          <div className="relative w-6 h-6">
            <ArrowRightIcon className="absolute w-3.5 h-2.5 top-[7px] left-[5px]" />
          </div>
        </Button>
      ),
    },
  ];

  return (
    <div className="relative w-[412px] h-[456px]">
      <div className="fixed w-[412px] h-[456px] top-0 left-0 rounded-[5px] overflow-hidden border border-dashed border-[#7b61ff]">
        {/* Render all button variations */}
        {buttonVariants.map((variantGroup) =>
          variantGroup.states.map((variant) =>
            buttonLayouts.map((layout) => (
              <div
                key={`${variantGroup.type}-${variant.label}-${layout.type}`}
                className={`absolute ${layout.left} ${variant.top}`}
              >
                {layout.render(variant)}
              </div>
            )),
          ),
        )}
      </div>
    </div>
  );
};
