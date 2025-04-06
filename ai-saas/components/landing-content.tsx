"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [ 
    {
        name: "Aarav Sharma",
        avatar: "A",
        title: "Software Developer",
        description: "The code generation tool saved me hours — it's like having a personal coder on demand!"
    },
    {
        name: "Meera Joshi",
        avatar: "M",
        title: "Content Writer",
        description: "The story and chatbot features help me brainstorm creative ideas effortlessly."
    },
    {
        name: "Rohan Verma",
        avatar: "R",
        title: "Digital Marketer",
        description: "Image and audio generation are top-notch — perfect for quick campaign assets!"

    },
    {
        name: "Priya Kapoor",
        avatar: "P",
        title: "UI/UX Designer",
        description: "I use the AI tools daily — everything from mockup images to engaging chatbot flows!"

    }
]

export const LandingContents = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 gap-4">
                        {testimonials.map((item) => (
                            <Card key={item.description} className="bg-[#192339] border-none
                            text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-x-2">
                                            <div>
                                                <p className="text-lg">{item.name}</p>
                                                <p className="text-zinc-400 text-sm">{item.title}</p>
                                            </div>
                                    </CardTitle>
                                    <CardContent className="pt-4 px-0">
                                        {item.description}
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        ))}
            </div>
        </div>
    )
}