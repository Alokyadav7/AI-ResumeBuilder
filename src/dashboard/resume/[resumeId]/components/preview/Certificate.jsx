import React from 'react'

const Certificate = ({resumeInfo}) => {
  return (
    <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{
        color: resumeInfo?.themeColor,
      }}
    >
      Certificate
    </h2>
    <hr
      style={{
        borderColor: resumeInfo?.themeColor,
      }} />

{resumeInfo?.Certificate.map((Certificate, index) => (
  <div key={index} className="my-5">
    <h2 className="text-sm font-bold"
    style={{
        color: resumeInfo?.themeColor,
    }}>{Certificate.issuingOrganization}</h2>
    <h2 className="text-xs flex justify-between">{Certificate?.name} {Certificate?.major}
    <span>{Certificate?.startDate} - {Certificate.issueDate}</span>
    </h2>
    <p className="text-xs my-2">
        {Certificate?.description}
    </p>
  </div>
))}
      
    </div>
  )
}

export default Certificate
