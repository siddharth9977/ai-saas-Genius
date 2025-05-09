"use client"
import axios from "axios"
import * as z from "zod";
import { Heading } from "@/components/heading";
import { NotebookIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

type ChatMessage = {
    role: "user" | "assistant" | "system";
    content: string;
};

const StoryPage = () => {
    const router = useRouter();
    const [messages, setMessages ] = useState<ChatMessage[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit =  async( values: z.infer<typeof formSchema>) => {
       try {
        const userMessage: ChatMessage = {
            role: "user",
            content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages
            });
           setMessages((current) => [...current, userMessage, response.data]); 

           form.reset();
       } finally{
            router.refresh();
       }
    };

    return (
        <div>
           <Heading
           title="Story Generation"
           description="Our most advanced conversation model."
           icon={NotebookIcon}
           iconColor="text-orange-700"
           bgColor="bg-orange-700/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2
                    "
                    >
                    <FormField 
                    name="prompt"
                    render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className="m-0 p-0">
                                <Input className="border-0 outline-none
                                focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-50
                                bg-white/50 p-4 rounded-lg
                                transition-all duration-300 ease-in-out"
                                disabled={isLoading}
                                placeholder="Tell me a story about Lino King..."
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button className="col-span-12
                    lg:col-span-2 w-full" disabled={isLoading}>
                        Generate
                    </Button>

                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center
                    justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                {messages.length === 0 && !isLoading && (
                    <Empty label="No story started."/>
                )}
                   <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                             key={message.content}
                             className={cn(
                                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                        )}
                            >
                                {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                <p className="text-sm break-words whitespace-pre-line">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                   </div>
            </div>
        </div>
        </div>
    );
};

export default StoryPage;
