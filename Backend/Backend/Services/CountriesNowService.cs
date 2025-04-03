

public class CountriesNowService
{
    private readonly HttpClient _httpClient;

    public CountriesNowService(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient("CountriesNow");
    }

    public async Task<List<CountryData>> GetAllCountriesAsync()
    {
        var response = await _httpClient.GetAsync("countries/flag/images");
        if (!response.IsSuccessStatusCode)
        {
            string errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error al obtener países. Status: {response.StatusCode}. Content: {errorContent}");
        }
        var result = await response.Content.ReadFromJsonAsync<CountryImagesResponse>();
        return result?.Data ?? new List<CountryData>();
    }

    public async Task<List<CountryData>> SearchCountriesAsync(string query)
    {
        var countries = await GetAllCountriesAsync();
        return countries.Where(c => c.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0)
                        .ToList();
    }

    public async Task<List<string>> GetCitiesByCountryAsync(string country)
    {
        var requestBody = new { country = country };
        var response = await _httpClient.PostAsJsonAsync("countries/cities", requestBody);
        if (!response.IsSuccessStatusCode)
        {
            string errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error al obtener ciudades de {country}. Status: {response.StatusCode}. Content: {errorContent}");
        }
        var result = await response.Content.ReadFromJsonAsync<CitiesResponse>();
        return result?.Data ?? new List<string>();
    }

    public async Task<List<string>> SearchCitiesAsync(string country, string query)
    {
        var cities = await GetCitiesByCountryAsync(country);
        return cities.Where(c => c.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0)
                     .ToList();
    }

}
