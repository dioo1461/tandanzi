import { useEffect, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap"


export const SignupErrorTooltip = ({target, show, text}) => {
    return (
        <Overlay target={target.current} show={show} placement='right'>
            {(props) => (
                <Tooltip {...props}>{text}</Tooltip>
            )}
        </Overlay>
    )
}
