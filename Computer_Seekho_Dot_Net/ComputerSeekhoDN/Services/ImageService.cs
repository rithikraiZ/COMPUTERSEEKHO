using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Services
{
	public class ImageService : IImageService
	{
		private readonly ComputerSeekhoDBContext context;
		public ImageService(ComputerSeekhoDBContext context) { this.context = context; }

		public async Task addImage(Image image)
		{
			await context.Images.AddAsync(image);
			await context.SaveChangesAsync();
		}

		public async Task deleteImage(int imageId)
		{
			var image = await context.Images.FindAsync(imageId) ?? throw new NotFound($"No image with Id: {imageId} exists.");
			context.Images.Remove(image);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<Image>> getAllImages()
		{
			var imageList = await context.Images.ToListAsync();
			if(imageList.Count == 0) throw new NotFound($"No images");
			return imageList;
		}

		public async Task<Image> getImageById(int imageId)
		{
			var image = await context.Images.FindAsync(imageId);
			return image ?? throw new NotFound($"No image with Id: {imageId} exists.");
		}

		public async Task updateImage(Image image)
		{
			int imageId = image.ImageId;
			context.Images.Entry(image).State = EntityState.Modified;
			try{
				await context.SaveChangesAsync();
			}
			catch(Exception ex){
				if (!imageExists(imageId)) throw new NotFound($"No image with Id: {imageId} exists.");
				else {
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool imageExists(int id)
		{
			return context.Images.Find(id) != null;
		}
	}
}
