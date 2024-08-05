import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useContext } from "react"
import PersonalDetail from "./preview/PersonalDetail";
import SummaryPreview from "./preview/SummaryPreview";
import ProfessionalExperiencs from "./preview/ProfessionalExperiencs";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import Certificate from "./preview/Certificate";
import Project from "./preview/Project";

const ResumePreview = () => {

    const {resumeInfo, setResumeInfo} = useContext (ResumeInfoContext);


  return (
    <div className="shadow-lg h-full p-14 border-t-[25px]"style={{
        borderColor:resumeInfo?.themeColor
    }}>

        {/* Personal Detail */}

        <PersonalDetail resumeInfo={resumeInfo} />
        

        {/* Summery  */}

        <SummaryPreview resumeInfo={resumeInfo} />

        {/* Professional Experience  */}
        <ProfessionalExperiencs resumeInfo={resumeInfo}/>

        {/* Education  */}
        <EducationalPreview resumeInfo={resumeInfo} />

        {/* Skills  */}
        <SkillsPreview resumeInfo={resumeInfo} />

         {/* Porject  */}
         <Project resumeInfo={resumeInfo} />

        {/* Certificate  */}
        <Certificate resumeInfo={resumeInfo} />

    </div>
  )
}

export default ResumePreview
