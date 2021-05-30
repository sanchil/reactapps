import * as React from "react";

function SvgImg2(props, svgRef) {
  return (
    <svg width={300} height={100} ref={svgRef} {...props}>
      <rect
        width={300}
        height={100}
        rx={10}
        ry={10}
        stroke="#0affff"
        strokeWidth={10}
        fill="#00f"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgImg2);
export default ForwardRef;
