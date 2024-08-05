import { Loader2, PlusSquare } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        Title: resumeTitle,  
        ResumeId: uuid,
        UserEmail: user?.primaryEmailAddress?.emailAddress,
        UserName: user?.fullName,
      },
    };

    try {
      const response = await GlobalApi.createNewResume(data);
      console.log("Resume created:", response.data);
      setLoading(false);
      navigation('/dashboard/resume/'+uuid+'/edit')
      setOpenDialog(false);
    } catch (error) {
      console.error("Error creating resume:", error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-15 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[300px] hover:scale-110 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <u>Create Your Resume</u>
            </DialogTitle>
            <br />
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-3"
                placeholder="Role: Software Developer"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)} // Ensure state updates correctly
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
