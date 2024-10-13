import Badge from 'react-bootstrap/Badge';

const StatusBadge = (status) => {
    if (status == 'OK') return <Badge bg='success'>{status}</Badge>
    else if (status == 'BROKEN') return <Badge bg='danger'>{status}</Badge>
    else if (status == 'ASKED MAINTENANCE TO FIX') return <Badge bg='info'>{status}</Badge>
    else if (status == 'RESIDENT FIXES') return <Badge bg='warning'>{status}</Badge>
    else if (status == 'MAINTENANCE') return <Badge bg='warning'>{status}</Badge>
    else if (status == 'IGNORED') return <Badge bg='secondary'>{status}</Badge>
    else if (status == 'REPAIR STARTED') return <Badge bg='dark'>{status}</Badge>
    else if (status == 'REPAIR COMPLETED') return <Badge bg='success'>{status}</Badge>
    return <Badge bg='primary'>{status}</Badge>
}

export default StatusBadge
