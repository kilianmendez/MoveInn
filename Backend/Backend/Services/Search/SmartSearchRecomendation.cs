using Backend.Models.Database;
using Backend.Models.Dtos;
using Backend.Models.Mappers;
using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;
using System.Globalization;
using System.Text;

namespace Backend.Services.Search
{
    public class SmartSearchRecommendationService
    {
        private readonly UnitOfWork _unitOfWork;
        private const double THRESHOLD = 0.80;
        private readonly INormalizedStringSimilarity _stringSimilarityComparer;

        public SmartSearchRecommendationService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _stringSimilarityComparer = new JaroWinkler();
        }

        public async Task<IEnumerable<RecommendationDto>> SearchRecommendationsAsync(string searchQuery)
        {
            var recommendations = await _unitOfWork.RecommendationRepository.GetAllAsync();

            if (string.IsNullOrWhiteSpace(searchQuery))
            {
                return recommendations.Select(r => RecommendationMapper.ToDto(r));
            }

            string query = RemoveDiacritics(searchQuery.ToLowerInvariant());

            var filtered = recommendations.Where(r =>
            {
                string textToSearch = (r.Title + " " + r.Description)?.ToLowerInvariant() ?? "";
                var tokens = textToSearch.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                return tokens.Any(token => token.Contains(query) ||
                                             _stringSimilarityComparer.Similarity(token, query) >= THRESHOLD);
            });

            return filtered.Select(r => RecommendationMapper.ToDto(r));
        }

        private string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            return new string(normalizedString.Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark).ToArray());
        }
    }
}
