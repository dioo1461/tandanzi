import { forwardRef } from "react"
import { Button } from "react-bootstrap"

export const DuplicationCheckedButton = () => {
    return(
        <Button disabled className='ms-2' size='sm' variant='outline-primary'>
            확인 완료
        </Button>
    )
}

export const CheckDuplicationButton = forwardRef((props, ref) => {
    const {onClick, ...rest} = props;
    return (
        <Button
            className='ms-2'
            size='sm'
            variant='outline-primary'
            ref={ref}
            onClick={onClick}
            {...rest} >
            중복 확인
        </Button>
    )
})