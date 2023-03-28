import { forwardRef } from "react"
import { Badge } from "react-bootstrap"



export const UnwrittenBadge = () => {
    return(
        <Badge bg='secondary' >미작성</Badge>
    )
}

export const ConfirmedBadge = forwardRef((props, ref) => {
    return (
        <Badge bg='success' ref={ref}>사용 가능</Badge>
    )
})


export const ErrorBadge = forwardRef((props, ref) => {
    return(
        <Badge bg='danger' ref={ref}>사용 불가</Badge>
    )
})