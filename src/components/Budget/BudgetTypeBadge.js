import React from 'react'

const BudgetTypeBadge = ({ type }) => {
    return (
        <span className="ml-1 text-sm">
            {type.id === 1 && <span className="badge rounded-pill bg-success">{type?.name}</span>}
            {type.id === 2 && <span className="badge rounded-pill bg-primary">{type?.name}</span>}
            {type.id === 3 && <span className="badge rounded-pill bg-danger">{type?.name}</span>}
        </span>
    );
};

export default BudgetTypeBadge;
