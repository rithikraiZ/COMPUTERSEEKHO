using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IImageService
	{
		Task<Image> getImageById(int imageId);
		Task<IEnumerable<Image>> getAllImages();
		Task addImage(Image image);
		Task updateImage(Image image);
		Task deleteImage(int imageId);
	}
}
