import { Badge } from "react-bootstrap"

export const CarbohydrateBadge = () => {
    return(
        <Badge bg='success'>탄</Badge>
    )
}

export const ProteinBadge = () => {
    return (
        <Badge className='ms-3' bg='info'>단</Badge>
    )
}

export const FatBadge = () => {
    return (
        <Badge className='ms-3' bg='danger'>지</Badge>
    )
}
