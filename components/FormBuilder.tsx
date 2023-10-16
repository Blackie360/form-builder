"use client";
import { Form } from "@prisma/client";
import React from 'react';
import PreviewDialog from "./PreviewDialog";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";

const FormBuilder = ({form}: {
    form: Form
}) => {
  return  <main className="flex flex-col w-full">
    <div className=" flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className=" truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
        </h2>
        <div className="flex items-center gap-2">
        <PreviewDialog />
        {!form.published && (
            <>
            <SaveFormBtn />
            <PublishFormBtn />
            </>
        )}
        </div>
    </div>
  </main>;
}

export default FormBuilder