"use client";

import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import useDesigner from "./hooks/useDesigner";
import PreviewDialog from "./PreviewDialog";
import { ImSpinner2 } from "react-icons/im";

const FormBuilder = ({form}: {
    form: Form
}) => {
  const {setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    const  readyTimeout = setTimeout (() => setisReady(true), 500);
    return () => clearTimeout(readyTimeout);
  },[form, setElements]);
  if(!isReady) {
    return (
    <div className="flex flex-col items-center justify-center w-full  h-full">
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </div>
  );
    }

  return <DndContext sensors={sensors}>
     <main className="flex flex-col w-full">
      <nav className=" flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className=" truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.name}
          </h2>
          <div className="flex items-center gap-2">
          <PreviewDialog />
          {!form.published && (
              <>
              <SaveFormBtn id={form.id} />
              <PublishFormBtn />
              </>
          )}
          </div>
      </nav>
      <div className="flex w-full   flex-grow items-center justify-center relative overflow-y-auto h-auto bg-accent bg-[url('/food.svg')] dark:bg-[url('/food-dark.svg')]">
            <Designer />
      </div>
    </main>
    <DragOverlayWrapper />
  </DndContext>;
}

export default FormBuilder