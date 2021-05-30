import * as React from "react";

function SvgImg3(props, svgRef) {
  return (
    <svg
      width="210mm"
      height="297mm"
      viewBox="0 0 210 297"
      ref={svgRef}
      {...props}
    >
      <g fillRule="evenodd">
        <path d="M49.137 52.827v59.93l15.265.418V59.523z" fill="#353564" />
        <path
          d="M64.402 59.523L82.42 34.629v68.663l-18.018 9.883z"
          fill="#e9e9ff"
        />
        <path
          d="M49.137 52.827l15.875-30.91L82.42 34.63 64.402 59.523z"
          fill="#4d4d9f"
        />
        <path
          d="M49.137 112.756l15.875-11.548 17.408 2.084-18.018 9.883z"
          fill="#afafde"
        />
        <path d="M65.012 21.918v79.29l17.408 2.084V34.629z" fill="#d7d7ff" />
        <path
          d="M49.137 52.827l15.875-30.91v79.291l-15.875 11.548z"
          fill="#8686bf"
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgImg3);
export default ForwardRef;
