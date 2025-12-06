import React from 'react'

const ServiceCard = ({title, description}) => {
  return (
      <div className="card h-100 hover">
                    <div className="card-body">
                        <h4 className="card-title fw-bolder">{title}</h4>
                        <p className="card-text">{description}.</p>
                    </div>
        </div>
  )
}

export default ServiceCard
