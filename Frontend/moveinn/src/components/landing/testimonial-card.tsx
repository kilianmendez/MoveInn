import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
    quote: string
    name: string
    role: string
    avatarUrl: string
}

export default function TestimonialCard({ quote, name, role, avatarUrl }: TestimonialCardProps) {
    return (
        <Card className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-all duration-300">
        <CardContent className="p-6">
            <div className="mb-4 text-[#FFBF00] text-4xl">&quot;</div>
            <p className="mb-6 text-white/90">{quote}</p>
            <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4 border-2 border-[#FFBF00]">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-[#4C69DD] text-white">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h4 className="font-medium text-white">{name}</h4>
                <p className="text-sm text-[#FFBF00]">{role}</p>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}

