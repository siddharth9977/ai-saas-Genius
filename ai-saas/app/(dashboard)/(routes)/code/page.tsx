"use client"
import axios from "axios"
import * as  z from "zod";
import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
type ChatMessage = {
    role: "user" | "assistant" | "system";
    content: string;
  };

const CodePage = () => {
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

            const response = await axios.post("/api/code", {
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
           title="Code Generation"
           description="Generate code using descriptive text."
           icon={Code}
           iconColor="text-green-700"
           bgColor="bg-green-700/10"
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
                                focus-visible:ring-0
                                focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="Simple toggle button using react hooks."
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
                    <Empty label="No conversation started."/>
                )}
                   <div className="flex flex-col-reverse gap-y-4">
  {messages.map((message, index) => (
    <div
      key={index}
      className={cn(
        "w-full rounded-lg shadow-sm p-6",
        message.role === "user"
          ? "bg-white border border-gray-200"
          : "bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700"
      )}
    >
      <div className="flex items-start gap-x-4 mb-4">
        {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
        <span className="text-sm text-muted-foreground capitalize">
          {message.role}
        </span>
      </div>
      <div className="prose max-w-none dark:prose-invert w-full">
      <ReactMarkdown
  components={{
    pre: (props) => (
      <div className="my-4 rounded-lg bg-[#0f172a] overflow-x-auto w-full custom-scroll">
        <pre className="min-w-full text-sm text-white font-mono p-4" {...props} />
      </div>
    ),
    code: ({ className, children, ...props }) => {
      const isInline = !(className && className.includes("language-"));
      return isInline ? (
        <code className="bg-zinc-200 text-black px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      ) : (
        <code className="text-sm" {...props}>
          {children}
        </code>
      );
    },
    p: (props) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-2" {...props} />
    ),
  }}
>
  {message.content}
</ReactMarkdown>
      </div>
    </div>
  ))}
</div>

            </div>
        </div>
        </div>
    );
   
}
export default CodePage;