import { useEffect, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap"


export const EmailInvalidFormTooltip = ({target}) => {
    const [show, setShow] = useState(false);

    return (
        <Overlay target={target.current} show={true} placement='right'>
            {(props) => (
                <Tooltip {...props}>유효한 이메일 형식이어야 합니다.</Tooltip>
            )}
        </Overlay>
    )
}

export const PasswordShortLengthTooltip = ({target}) => {
    return (
        <Overlay target={target.current} show={true} placement='right'>
            {(props) => (
                <Tooltip {...props}>비밀번호는 최소 6자 이상이어야 합니다.</Tooltip>
            )}
        </Overlay>
    )
}

export const PasswordUnpermittedWordTooltip = ({target}) => {
    return (
        <Overlay target={target.current} show={true} placement='right'>
            {(props) => (
                <Tooltip {...props}>비밀번호는 영어, 숫자, 특수문자로 구성되어야 합니다.</Tooltip>
            )}
        </Overlay>
    )
}

export const PasswordNonSpecialTooltip = ({target}) => {
    return (
        <Overlay target={target.current} show={true} placement='right'>
            {(props) => (
                <Tooltip {...props}>최소 1개의 특수문자가 포함되어야 합니다.</Tooltip>
            )}
        </Overlay>
    )
}

export const PasswordConfirmationUnmatchTooltip = ({target}) => {
    return (
        <Overlay target={target.current} show={true} placement='right'>
            {(props) => (
                <Tooltip {...props}>두 비밀번호가 일치하지 않습니다.</Tooltip>
            )}
        </Overlay>
    )
}