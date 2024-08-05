import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeItem = ({ resume }) => {
  // Logging the resume object to debug
  console.log('Resume object:', resume);

  if (!resume || !resume.attributes) {
    console.warn('Invalid resume object:', resume);
    return null;
  }

  return (
    <Link to={`/dashboard/resume/${resume.id}/edit`} className="block">
      <div className="p-14 bg-secondary flex items-center justify-center h-[300px] border border-purple-950 rounded-lg hover:scale-110 transition-all hover:shadow-md shadow-cyan-950">
        <Notebook />
      </div>
      <h2 className="text-center my-2">{resume.attributes.Title}</h2>
    </Link>
  );
};

export default ResumeItem;
