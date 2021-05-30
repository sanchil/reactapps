import * as React from "react";

function SvgImg1(props, svgRef) {
  return (
    <svg width={100} height={100} ref={svgRef} {...props}>
      <circle
        cx={50}
        cy={50}
        r={40}
        stroke="green"
        strokeWidth={4}
        fill="#ff0"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgImg1);
export default ForwardRef;
