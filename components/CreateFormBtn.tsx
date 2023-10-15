"use client";
import { formSchema, formSchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import {BsFileEarmarkPlusFill} from "react-icons/bs";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";


const CreateFormBtn = () => {
    const form =useForm<formSchemaType>({
        resolver:zodResolver(formSchema),
    });

 async function onSubmit(values: formSchemaType){
        try{
            const formId = await CreateForm(values);
            toast({
                title: "Success",
                description: "Form generated Successfully "
            })
                console.log("FORM ID", formId);
        } catch (error) {
            toast({
                title: "Error",
                description:"Something went wrong try Again",
                variant: "destructive"
            })
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button  className="group border  border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 ">
            <BsFileEarmarkPlusFill className="h-8 w-8 text-muted-foreground hover:text-red-600 text-purple-600" />                Generate new form </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Create Form</DialogTitle> 
        <DialogDescription>
            Create  new Form to start collecting  Feedback
        </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                       <FormLabel>Name</FormLabel> 
                       <FormControl>
                        <Input {...field} />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                    <FormItem>
                       <FormLabel>Description</FormLabel> 
                       <FormControl>
                        <Textarea  rows={5} {...field} />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                )}
                />
            </form>
        </Form>
        <DialogFooter>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && <ImSpinner9 className="animate-spin" />}
          </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateFormBtn