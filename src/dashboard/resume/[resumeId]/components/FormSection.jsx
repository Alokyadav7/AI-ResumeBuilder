import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import Summery from "./forms/Summery";
import PersonalDetail from "./forms/PersonalDeatil";
import Experience from "./forms/Experience";

const FormSection = () => {
  const [activeFormIndex, setActivateFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-3">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => {
                setActivateFormIndex(activeFormIndex - 1);
              }}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => {
              setActivateFormIndex(activeFormIndex + 1);
            }}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ?
      < Experience />
      : null
      }
    </div>
  );
};

export default FormSection;
