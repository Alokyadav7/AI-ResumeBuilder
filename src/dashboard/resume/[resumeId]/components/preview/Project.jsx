
const Project = ({resumeInfo}) => {
  return (
    <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{
        color: resumeInfo?.themeColor,
      }}
    >
      Project 
    </h2>
    <hr
      style={{
        borderColor: resumeInfo?.themeColor,
      }} />

    {resumeInfo?.Project.map((Project, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold"
          style={{
            color: resumeInfo?.themeColor,
          }}>{Project?.ProjectName || "Title Missing"} : </h2>
          <p className="text-xs my-2">{Project.description}</p>
          <h2 className="text-xs flex justify-between">
            <p className="text-xs"><u>Technology:</u></p>
            {Project?.Technology || "Company Missing"}
           
          </h2>
          <p className="text-xs my-2">
          </p>
        </div>
      ))}
      
    </div>
  )
}

export default Project
