import * as React from "react"

const  ForwardRef = (props, svgRef)=>{
  return (
    <svg height={210} width={400} ref={svgRef} {...props}>
      <path d="M150 0L75 200h150z" />
    </svg>
  )
}

const SvgComponent = React.forwardRef(ForwardRef)
export default SvgComponent;
