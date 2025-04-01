using Backend.Models.Database;
using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Mappers;

namespace Backend.Services
{
    public class RecommendationService
    {
        private readonly UnitOfWork _unitOfWork;

        public RecommendationService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<RecommendationDto?> CreateRecommendationAsync(RecommendationCreateRequest request, Guid? userId = null)
        {
            var recommendation = RecommendationMapper.ToEntity(request);
            if (userId.HasValue)
            {
                recommendation.UserId = userId;
            }
            await _unitOfWork.RecommendationRepository.InsertAsync(recommendation);
            await _unitOfWork.SaveAsync();
            return RecommendationMapper.ToDto(recommendation);
        }

        public async Task<RecommendationDto?> GetRecommendationByIdAsync(Guid id)
        {
            var recommendation = await _unitOfWork.RecommendationRepository.GetByIdAsync(id);
            return recommendation != null ? RecommendationMapper.ToDto(recommendation) : null;
        }

        public async Task<IEnumerable<RecommendationDto>> GetAllRecommendationsAsync()
        {
            var recommendations = await _unitOfWork.RecommendationRepository.GetAllAsync();
            return recommendations.Select(r => RecommendationMapper.ToDto(r));
        }

        public async Task<RecommendationDto?> UpdateRecommendationAsync(Guid id, RecommendationUpdateRequest request)
        {
            var recommendation = await _unitOfWork.RecommendationRepository.GetByIdAsync(id);
            if (recommendation == null) return null;
            RecommendationMapper.UpdateEntity(recommendation, request);
            await _unitOfWork.RecommendationRepository.UpdateAsync(recommendation);
            bool saved = await _unitOfWork.SaveAsync();
            return saved ? RecommendationMapper.ToDto(recommendation) : null;
        }

        public async Task<bool> DeleteRecommendationAsync(Guid id)
        {
            var recommendation = await _unitOfWork.RecommendationRepository.GetByIdAsync(id);
            if (recommendation == null) return false;
            await _unitOfWork.RecommendationRepository.DeleteAsync(recommendation);
            return await _unitOfWork.SaveAsync();
        }
    }
}
