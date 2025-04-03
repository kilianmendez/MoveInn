using Backend.Models.Database.Entities;
using Backend.Models.Database.Enum;
using Backend.Models.Dtos;
using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text;

namespace Backend.Services;

public class SmartSearchService
{
    private const double THRESHOLD = 0.75;
    private readonly INormalizedStringSimilarity _stringSimilarityComparer;
    private readonly DataContext _context;

    public SmartSearchService(DataContext context)
    {
        _context = context;
        _stringSimilarityComparer = new JaroWinkler();
    }

    public async Task<IEnumerable<AccommodationDTO>> SearchAccommodationAsync(string query)
    {
        List<Accommodation> result;

        if (string.IsNullOrWhiteSpace(query))
        {
            result = await _context.Accommodations.ToListAsync();
        }
        else
        {
            string[] queryKeys = GetKeys(ClearText(query));
            result = new List<Accommodation>();

            var accommodations = await _context.Accommodations.ToListAsync();

            foreach (var accommodation in accommodations)
            {
                string[] itemKeys = GetKeys(ClearText(accommodation.Title));

                if (IsMatch(queryKeys, itemKeys))
                {
                    result.Add(accommodation);
                }
            }
        }

        return result.Select(a => new AccommodationDTO
        {
            Id = a.Id,
            Title = a.Title,
            Description = a.Description,
            Address = a.Address,
            City = a.City,
            Country = a.Country,
            PricePerMonth = a.PricePerMonth,
            NumberOfRooms = a.NumberOfRooms,
            Bathrooms = a.Bathrooms,
            SquareMeters = a.SquareMeters,
            HasWifi = a.HasWifi,
            OwnerId = a.OwnerId,
            AvailableFrom = a.AvailableFrom,
            AvailableTo = a.AvailableTo
        });
    }

    public async Task<IEnumerable<RecommendationDto>> SearchReccomendationAsync(string query)
    {
        List<Recommendation> result;

        if (string.IsNullOrWhiteSpace(query))
        {
            result = await _context.Recommendations.ToListAsync();
        }
        else
        {
            string[] queryKeys = GetKeys(ClearText(query));
            result = new List<Recommendation>();

            var recommendations = await _context.Recommendations.ToListAsync();

            foreach (var recomendation in recommendations)
            {
                string[] itemKeys = GetKeys(ClearText(recomendation.Title));

                if (IsMatch(queryKeys, itemKeys))
                {
                    result.Add(recomendation);
                }
            }
        }

        return result.Select(r => new RecommendationDto
        {
            Id = r.Id,
            Title = r.Title,
            Description = r.Description,
            Category = r.Category,
            Address = r.Address,
            City = r.City,
            Country = r.Country,
            Rating = r.Rating,
            CreatedAt = r.CreatedAt
        });
    }
    private bool IsMatch(string[] queryKeys, string[] itemKeys)
    {
        bool isMatch = false;

        for (int i = 0; !isMatch && i < itemKeys.Length; i++)
        {
            string itemKey = itemKeys[i];

            for (int j = 0; !isMatch && j < queryKeys.Length; j++)
            {
                string queryKey = queryKeys[j];

                isMatch = IsMatch(itemKey, queryKey);
            }
        }

        return isMatch;
    }

    private bool IsMatch(string itemKey, string queryKey)
    {
        return itemKey == queryKey
            || itemKey.Contains(queryKey)
            || _stringSimilarityComparer.Similarity(itemKey, queryKey) >= THRESHOLD;
    }

    private string[] GetKeys(string query)
    {
        return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    }

    private string ClearText(string text)
    {
        return RemoveDiacritics(text.ToLower());
    }

    private string RemoveDiacritics(string text)
    {
        string normalizedString = text.Normalize(NormalizationForm.FormD);
        StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

        for (int i = 0; i < normalizedString.Length; i++)
        {
            char c = normalizedString[i];
            UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }
}
