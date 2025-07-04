﻿using Backend.Models.Database.Enum;

namespace Backend.Models.Dtos;

public class HostRequestDTO
{
    public Guid UserId { get; set; }
    public string Reason { get; set; } = null!;
    public List<string> Specialties { get; set; } = new();  
}
public class HostRequestSummaryDTO
{
    public Guid Id { get; set; }
    public string Reason { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public RequestStatus Status { get; set; } = RequestStatus.Pending;

    public DateTime? HostSince { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public List<string> Specialties { get; set; } = new();
}

public class HostSummaryDTO
{
    public Guid HostId { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public DateTime? HostSince { get; set; }
    public List<string> Specialties { get; set; } = new();
}

public class HostSearchDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Biography { get; set; }
    public string? AvatarUrl { get; set; }
    public string? School { get; set; }
    public string? City { get; set; }
    public string? Nationality { get; set; }
    public string? ErasmusCountry { get; set; }
    public List<SpecialityDTO> Specialties { get; set; } = new();
}

public class SpecialityDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
}