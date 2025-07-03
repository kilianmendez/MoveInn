from enum import Enum

class Role(str, Enum):
    Administrator = "Administrator"
    Banned = "Banned"
    User = "User"
    Host = "Host"

class LanguageLevel(str, Enum):
    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"
    C2 = "C2"
    Native = "Native"

class Rating(int, Enum):
    One = 1
    Two = 2
    Three = 3
    Four = 4
    Five = 5

class SocialMedia(str, Enum):
    Instagram = "Instagram"
    Facebook = "Facebook"
    X = "X"

class Category(str, Enum):
    Restaurant = "Restaurant"
    Cafeteria = "Cafeteria"
    Museum = "Museum"
    LeisureZone = "LeisureZone"
    Park = "Park"
    HistoricalSite = "HistoricalSite"
    Shopping = "Shopping"
    Bar = "Bar"
    Other = "Other"

class EventCategory(str, Enum):
    Trip = "Trip"
    Social = "Social"
    Cultural = "Cultural"
    Food = "Food"
    Academic = "Academic"
    Sports = "Sports"
    Workshop = "Workshop"
    Party = "Party"
    Other = "Other"

class ForumCategory(str, Enum):
    ProceduresAndDocumentation = "ProceduresAndDocumentation"
    UniversityAndAcademicLife = "UniversityAndAcademicLife"
    CulturalAndSocialIntegration = "CulturalAndSocialIntegration"
    ScholarshipsAndFinances = "ScholarshipsAndFinances"
    MobilityAndTransportation = "MobilityAndTransportation"
    LeisureTourismAndNightlife = "LeisureTourismAndNightlife"
    MeetupsAndEvents = "MeetupsAndEvents"
    TipsAndExperiences = "TipsAndExperiences"
    FAQ = "FAQ"
    Other = "Other"

class RequestStatus(str, Enum):
    Approved = "Approved"
    Pending = "Pending"
    Rejected = "Rejected"

class ReservationStatus(str, Enum):
    Pending = "Pending"
    Confirmed = "Confirmed"
    Cancelled = "Cancelled"
    Completed = "Completed"

class AcommodationType(str, Enum):
    Room = "Room"
    House = "House"
    Apartment = "Apartment"
    Rural = "Rural"
    Others = "Others" 