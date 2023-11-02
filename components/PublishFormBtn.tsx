import React, {  useTransition } from 'react'
import { Button } from './ui/button';
import { MdOutlinePublish } from 'react-icons/md';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {  FaSpinner } from 'react-icons/fa';
import { toast } from './ui/use-toast';
import { PublishForm } from '@/actions/form';
import { useRouter } from 'next/navigation';

const PublishFormBtn = ({id}: {id: number }) => {
  const [loading, startTransition] =useTransition();
  const router = useRouter();

async function publishForm() {
  try{
    await PublishForm(id);
    toast({
      title: "Form Published",
      description: "Your form is now available to the public",
    });
    router.refresh();
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
    });
  }
}


  return(
   <AlertDialog>
    <AlertDialogTrigger asChild>
    <Button variant={"outline"} className='gap-2 bg-green-800'> 
      <MdOutlinePublish  className="h-6 w-6"/>
        Publish
  </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
     <AlertDialogHeader>
     <AlertDialogTitle> You are about to publish .Are you sure ?</AlertDialogTitle>
      <AlertDialogDescription>This action can not be undone .After publishing you will 
      not be able to edit this form .<br />
      <br />
      <span className='font-meduim'>
        By publishing this form you will make it available to the public 
        and you will be able to  collect feedback .
      </span>
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel className='bg-red-800'>Cancel</AlertDialogCancel>
      <AlertDialogAction className='bg-orange-800' disabled={loading} onClick={(e) => {
        e.preventDefault();
        startTransition(publishForm);

      }} >
        Publish {loading && <FaSpinner className="animate-spin h-6 w-6" />}       
  </AlertDialogAction>
       </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  );
}

export default PublishFormBtn