using FluentValidation;

namespace EternalEchoesStore.Application.Commands.Products.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        private static readonly HttpClient _httpClient = new HttpClient
        {
            Timeout = TimeSpan.FromSeconds(5) 
        };

        public CreateProductCommandValidator()
        {
            // Validate Category
            RuleFor(x => x.Category)
                .NotEmpty()
                    .WithMessage($"{nameof(CreateProductCommand.Category)} cannot be empty.")
                .MaximumLength(30)
                    .WithMessage($"{nameof(CreateProductCommand.Category)} cannot be longer than 30 characters.");

            // Validate Description
            RuleFor(x => x.Description)
                .NotEmpty()
                    .WithMessage($"{nameof(CreateProductCommand.Description)} cannot be empty.")
                .MaximumLength(2000)
                    .WithMessage($"{nameof(CreateProductCommand.Description)} cannot be longer than 2000 characters.");

            // Validate Title
            RuleFor(x => x.Title)
                .NotEmpty()
                    .WithMessage($"{nameof(CreateProductCommand.Title)} cannot be empty.")
                .MaximumLength(50)
                    .WithMessage($"{nameof(CreateProductCommand.Title)} cannot be longer than 50 characters.");

            // Validate SubCategory
            RuleFor(x => x.SubCategory)
                .NotEmpty()
                    .WithMessage($"{nameof(CreateProductCommand.SubCategory)} cannot be empty.")
                .MaximumLength(30)
                    .WithMessage($"{nameof(CreateProductCommand.SubCategory)} cannot be longer than 30 characters.");

            // Validate ImageUrl
            RuleFor(x => x.ImageUrl)
                .NotEmpty()
                    .WithMessage($"{nameof(CreateProductCommand.ImageUrl)} cannot be empty.")
                .MaximumLength(1000)
                    .WithMessage($"{nameof(CreateProductCommand.ImageUrl)} cannot be longer than 1000 characters.")
                .Must(BeAValidUrl)
                    .WithMessage($"{nameof(CreateProductCommand.ImageUrl)} must be a valid URL.")
                .Must(HaveImageExtension)
                    .WithMessage($"{nameof(CreateProductCommand.ImageUrl)} must point to an image with a valid extension (e.g., .jpg, .png, .gif).")
                .MustAsync(async (url, cancellation) => await IsUrlAccessible(url, cancellation))
                    .WithMessage($"{nameof(CreateProductCommand.ImageUrl)} is not accessible or does not exist.");
        }

        /// <summary>
        /// Validates that the URL is in a correct format.
        /// </summary>
        /// <param name="url">The URL to validate.</param>
        /// <returns>True if the URL is valid; otherwise, false.</returns>
        private bool BeAValidUrl(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return false;

            return Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult)
                   && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }

        /// <summary>
        /// Checks if the URL has a valid image file extension.
        /// </summary>
        /// <param name="url">The URL to check.</param>
        /// <returns>True if the URL points to an image with a valid extension; otherwise, false.</returns>
        private bool HaveImageExtension(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return false;

            var validExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp" };
            string extension = Path.GetExtension(url).ToLower();

            return validExtensions.Contains(extension);
        }

        /// <summary>
        /// Asynchronously checks if the URL is accessible.
        /// </summary>
        /// <param name="url">The URL to check.</param>
        /// <param name="cancellationToken">Cancellation token to cancel the operation.</param>
        /// <returns>True if the URL is accessible; otherwise, false.</returns>
        private async Task<bool> IsUrlAccessible(string url, CancellationToken cancellationToken)
        {
            try
            {
                var response = await _httpClient.GetAsync(url, cancellationToken);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }
    }
}
