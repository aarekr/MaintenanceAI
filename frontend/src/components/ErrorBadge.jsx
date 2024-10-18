import Badge from 'react-bootstrap/Badge';

const ErrorBadge = (errorCode) => {
    if (errorCode == 101) return <Badge pill bg='danger'>{errorCode}</Badge>
    else if (errorCode == 102 || errorCode == 103) return <Badge pill bg='warning'>{errorCode}</Badge>
    else if (errorCode == 104 || errorCode == 105) return <Badge pill bg='secondary'>{errorCode}</Badge>
    else return <Badge pill bg='info'>{errorCode}</Badge>
}

export default ErrorBadge
