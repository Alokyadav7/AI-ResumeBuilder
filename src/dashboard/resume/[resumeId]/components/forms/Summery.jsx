import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../../../../service/AIModel";

const Summery = ({ enabledNext = () => {} }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);

  const prompt =
    "Job Title: {jobTitle}, Depend on job title give me summery for my resume within 10 lines in JSON format with field experience level and summary within Experience level for Fresher, Mid-level and Experienced";

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery, resumeInfo, setResumeInfo]);

  const GenerateSummaryFormAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || "Full Stack Developer");
    console.log("Prompt:", PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);

      if (!result || !result.response) {
        console.error("No response from AI model");
        setLoading(false);
        return;
      }

      const responseText = await result.response.text();
      console.log("AI Response Text:", responseText);

      // Check if responseText is valid JSON
      let responseObject;
      try {
        // Attempt to wrap the responseText in an array if it's not already an array
        const wrappedResponseText = `[${responseText}]`;
        responseObject = JSON.parse(wrappedResponseText);
      } catch (jsonError) {
        console.error("Invalid JSON response:", responseText);
        setLoading(false);
        toast("Failed to generate summary: Invalid response from AI");
        return;
      }

      console.log("Parsed Response Object:", responseObject);

      setAiGeneratedSummeryList(responseObject || []);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    enabledNext(true);
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };

    const resumeId = params.resumeId;
    if (!resumeId) {
      console.error("Resume ID is undefined");
      setLoading(false);
      return;
    }

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        console.error("Error updating resume:", error);
        setLoading(false);
        toast("Failed to update details");
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-12">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your Job</p>

        <form className="mt-8" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummaryFormAI()}
              type="button"
              size="sm"
              className="border-purple-600"
            >
              Generate from AI
            </Button>
          </div>
          <textarea
            required
            className="w-full mt-8 h-32 border border-l-gray-300 rounded-md p-2"
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="mt-8 p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4">
          <h2 className="font-bold text-lg mb-4">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-md text-purple-700">Level: {item.experience_level}</h3>
              <p className="text-gray-700 mt-2">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;
