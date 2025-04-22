"use client"
import {
    CalendarIcon,
    Users2Icon,
    MessageCircleIcon,
    MapPin,
    PlusCircleIcon,
    MapPinIcon,
    ChevronRightIcon,
    GlobeIcon,
    TrendingUpIcon,
    UsersIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { EventCard } from "@/components/dashboard/event-card"
import { NotificationItem } from "@/components/dashboard/notification-item"
import { RecommendationCard } from "@/components/dashboard/recommendation-card"
import { GroupCard } from "@/components/dashboard/group-card"
import { HostCard } from "@/components/dashboard/host-card"

import { useAuth } from "@/context/authcontext"

export default function DashboardPage() {
    const { user } = useAuth()

    console.log("User data:", user)

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">
        <div className="container mx-auto">
            {/* Welcome Section */}
            <section className="mb-8">
            <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7F8C8]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#62C3BA]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, <span className="text-4xl text-accent">{user?.name}</span></h1>
                    {/* Cambiar a futuro Ciudad de Erasmus */}
                    <p className="text-white/80 mb-4">Bet your Erasmus journey in {user?.city} is going great!</p>
                    <div className="flex items-center space-x-4">
                    
                    <div className="h-10 border-l border-white/20"></div>
                    <div>
                        {/* Cambiar a futuro Ciudad de Erasmus y dias */}
                        <p className="text-sm text-white/70">Days in {user?.city}</p>
                        <p className="text-4xl font-bold text-primary">{user?.erasmusDate}</p>
                    </div>
                    </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex flex-col items-start gap-2 space-y-3 md:space-y-0 md:space-x-3">
                    <Button className="bg-[#B7F8C8] text-[#0E1E40] hover:bg-[#B7F8C8]/90 font-semibold">
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-none text-white hover:bg-white/10">
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        Explore The City
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-none text-white hover:bg-white/10">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        Make New Friends
                    </Button>
                </div>
                </div>
            </div>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-none shadow-sm bg-gradient-to-br from-white to-[#B7F8C8]/10">
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm text-gray-500">Upcoming Events</p>
                    <p className="text-2xl font-bold text-[#0E1E40]">5</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#B7F8C8]/50 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-[#0E1E40]" />
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-white to-[#4C69DD]/10">
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm text-gray-500">New Messages</p>
                    <p className="text-2xl font-bold text-[#0E1E40]">12</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#4C69DD]/30 flex items-center justify-center">
                    <MessageCircleIcon className="h-5 w-5 text-white" />
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-white to-[#62C3BA]/10">
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm text-gray-500">Group Invites</p>
                    <p className="text-2xl font-bold text-[#0E1E40]">3</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#62C3BA]/40 flex items-center justify-center">
                    <Users2Icon className="h-5 w-5 text-[#0E1E40]" />
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-white to-[#0E1E40]/10">
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm text-gray-500">New Recommendations</p>
                    <p className="text-2xl font-bold text-[#0E1E40]">8</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#0E1E40]/70 flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-white" />
                    </div>
                </div>
                </CardContent>
            </Card>
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Events */}
                <Card className="border-none shadow-sm bg-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                    <CardTitle className="text-xl text-[#0E1E40]">Upcoming Events</CardTitle>
                    <CardDescription>Events you&apos;ve joined or might be interested in</CardDescription>
                    </div>
                    <Button variant="ghost" className="text-primary">
                    View all <ChevronRightIcon className="ml-1 h-4 w-4"/>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    <EventCard
                        title="Language Exchange Night"
                        date="Today, 7:00 PM"
                        location="Café del Mar, Barcelona"
                        attendees={18}
                        category="Social"
                        joined={true}
                    />
                    <EventCard
                        title="Weekend Trip to Montserrat"
                        date="Saturday, 9:00 AM"
                        location="Meeting at Plaça Catalunya"
                        attendees={24}
                        category="Trip"
                        joined={true}
                    />
                    <EventCard
                        title="International Food Festival"
                        date="Next Tuesday, 6:30 PM"
                        location="University Campus"
                        attendees={42}
                        category="Cultural"
                        joined={false}
                    />
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full bg-foreground border-primary-dark text-primary-dark hover:bg-primary hover:text-white">
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    Create New Event
                    </Button>
                </CardFooter>
                </Card>

                {/* Your Groups */}
                <Card className="border-none shadow-sm bg-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2 text-text">
                    <div>
                    <CardTitle className="text-xl text-[#0E1E40]">Your Groups</CardTitle>
                    <CardDescription className="text-text-secondary">Residence groups and communities you&apos;re part of</CardDescription>
                    </div>
                    <Button variant="ghost" className="text-[#4C69DD]">
                    View all <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GroupCard
                        name="Barcelona Central Residence"
                        members={42}
                        type="Residence"
                        lastActivity="10 minutes ago"
                        unreadMessages={5}
                    />
                    <GroupCard
                        name="UB Economics Students"
                        members={68}
                        type="Academic"
                        lastActivity="2 hours ago"
                        unreadMessages={0}
                    />
                    <GroupCard
                        name="Weekend Travelers"
                        members={124}
                        type="Interest"
                        lastActivity="Yesterday"
                        unreadMessages={3}
                    />
                    <GroupCard
                        name="Language Exchange Club"
                        members={56}
                        type="Interest"
                        lastActivity="3 days ago"
                        unreadMessages={0}
                    />
                    </div>
                </CardContent>
                </Card>

                {/* Local Recommendations */}
                <Card className="border-none shadow-sm bg-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                    <CardTitle className="text-xl text-[#0E1E40]">Local Recommendations</CardTitle>
                    <CardDescription>Places and activities recommended by hosts and other students</CardDescription>
                    </div>
                    <Button variant="ghost" className="text-[#4C69DD]">
                    View all <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RecommendationCard
                        name="La Sagrada Familia"
                        category="Sightseeing"
                        rating={4.9}
                        priceRange="€€"
                        description="Gaudí's famous basilica. Book tickets online to avoid long queues!"
                        recommendedBy="Maria (Host)"
                    />
                    <RecommendationCard
                        name="El Xampanyet"
                        category="Restaurant"
                        rating={4.7}
                        priceRange="€€"
                        description="Traditional tapas bar with great atmosphere and local cava."
                        recommendedBy="Thomas (Student)"
                    />
                    <RecommendationCard
                        name="Parc de la Ciutadella"
                        category="Outdoors"
                        rating={4.6}
                        priceRange="Free"
                        description="Perfect for picnics, studying outdoors, or rowing on the lake."
                        recommendedBy="Anna (Host)"
                    />
                    <RecommendationCard
                        name="Bunkers del Carmel"
                        category="Viewpoint"
                        rating={4.8}
                        priceRange="Free"
                        description="Best sunset view of Barcelona. Bring snacks and drinks!"
                        recommendedBy="Carlos (Student)"
                    />
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                {/* Notifications */}
                <Card className="border-none shadow-sm bg-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                    <CardTitle className="text-xl text-[#0E1E40]">Notifications</CardTitle>
                    <CardDescription>Recent updates and activities</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#4C69DD]">
                    Mark all as read
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    <NotificationItem
                        type="message"
                        content="Carlos sent you a message about the weekend trip"
                        time="10 minutes ago"
                        read={false}
                    />
                    <NotificationItem
                        type="event"
                        content="'Language Exchange Night' starts in 3 hours"
                        time="1 hour ago"
                        read={false}
                    />
                    <NotificationItem
                        type="group"
                        content="You were added to 'UB Economics Students' group"
                        time="Yesterday"
                        read={true}
                    />
                    <NotificationItem
                        type="recommendation"
                        content="Anna recommended 'Parc de la Ciutadella' to you"
                        time="2 days ago"
                        read={true}
                    />
                    <NotificationItem
                        type="system"
                        content="Complete your profile to get personalized recommendations"
                        time="3 days ago"
                        read={true}
                    />
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full text-[#4C69DD]">
                    View all notifications
                    </Button>
                </CardFooter>
                </Card>

                {/* Your Hosts */}
                <Card className="border-none shadow-sm bg-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                    <CardTitle className="text-xl text-[#0E1E40]">Your Hosts</CardTitle>
                    <CardDescription>Local students helping you navigate Barcelona</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#4C69DD]">
                    Find more
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    <HostCard
                        name="Maria Rodriguez"
                        university="Universitat de Barcelona"
                        languages={["Spanish", "English", "Catalan"]}
                        lastActive="Online"
                    />
                    <HostCard
                        name="Jordi Puig"
                        university="Universitat Pompeu Fabra"
                        languages={["Spanish", "English", "French"]}
                        lastActive="2 hours ago"
                    />
                    <HostCard
                        name="Anna Costa"
                        university="Universitat Autònoma de Barcelona"
                        languages={["Spanish", "English", "Italian"]}
                        lastActive="Yesterday"
                    />
                    </div>
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
        </div>
    )
}
