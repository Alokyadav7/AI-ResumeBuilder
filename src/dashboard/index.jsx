import { Button } from "@/components/ui/button";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";

const Dashboard = () => {

  const {user} = useUser();
  const [resumeList,setResumeList] = useState([]);

  useEffect (() => {
   user && GetResumeList()
  },[user])

  // user resume list

  const GetResumeList = () => {
    if (user?.primaryEmailAddress) {
      GlobalApi.GetUserResume(user.primaryEmailAddress).then(resp => {
        setResumeList(resp.data.data);
      });
    } else {
      console.error("User email address not available");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {/* <h2 className="font-semibold text-3xl">My Resume</h2> */}
      <Button>My Resume</Button>
      <p className="p-2">
        Start Creating your resume with the help to AI to get your dream job
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 
      lg:grid-cols-5 mt-12 gap-5" >
        <AddResume />
        {resumeList.length>0 && resumeList.map((resume,index) => (
         <ResumeItem resume={resume} key={index}/> 
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
