import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare ";
import VisitBtn from "@/components/VisitBtn ";
import React from "react";
import { SingleStatsCard } from "../../page";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

async function FormDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }

  
  const { visits, submissions } = form;
 let submissionsRate =  0;
 
 if (visits > 0){
  submissionsRate = (submissions / visits) * 100;
 }
 const bounceRate = 100 - submissionsRate;

  return(
    <>
    <div className="py-10 border-b border-muted">
      <div className="flex justify-between container">
        <h1 className="text-4xl font-bold truncate">{form.name}</h1>
        <VisitBtn shareUrl={form.shareURL} />
      </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
         <div className="container flex gap-2 items-center justify-between">
         <FormLinkShare shareUrl={form.shareURL} />
         </div>
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
      <SingleStatsCard
        title='Total Visits'
        icon={<LuView className='text-blue-600' />}
        helperText="All time Form Visits"
        value={visits.toLocaleString() || ""}
        loading={false}
        className='shadow-md shadow-blue-600'
      />
      <SingleStatsCard
        title='Total Submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        helperText="All time Form Submissions"
        value={visits.toLocaleString() || ""}
        loading={false}
        className='shadow-md shadow-orange-600'
      />
      <SingleStatsCard
        title='Submission Rate '
        icon={<HiCursorClick className='text-green-600' />}
        helperText="Visits that results in form submission"
        value={visits.toLocaleString() + "%" || ""}
        loading={false}
        className='shadow-md shadow-green-600'
      />
      <SingleStatsCard
        title='Bounce Rate '
        icon={<TbArrowBounce className='text-purple-600' />}
        helperText="Visits with out interaction"
        value={visits.toLocaleString() + "%"|| ""}
        loading={false}
        className='shadow-md shadow-purple-600'
      />
         </div>
         <div className="container pt-10">
          <SubmissionsTable id={form.id} />
         </div>

    
    </>
  );
}

export default FormDetails;

function SubmissionsTable ({id}: {id: number}) {
  return (
    <>
    <h1 className="text-2xl font-bold my-4">Submissions</h1>
    </>
  );
}
