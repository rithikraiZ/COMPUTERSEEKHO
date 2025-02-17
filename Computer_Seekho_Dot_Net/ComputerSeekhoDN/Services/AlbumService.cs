using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Services
{
	public class AlbumService : IAlbumService
	{
		private readonly ComputerSeekhoDBContext context;
		public AlbumService(ComputerSeekhoDBContext context) { this.context = context; }

		public async Task addAlbum(Album album)
		{
			await context.Albums.AddAsync(album);
			await context.SaveChangesAsync();
		}

		public async Task deleteAlbum(int albumId)
		{
			var album = await context.Albums.FindAsync(albumId) ?? throw new NotFound($"No Album with Id: {albumId} exists.");
			context.Albums.Remove(album);
			await context.SaveChangesAsync();
		}

		public async Task<Album> getAlbumById(int albumId)
		{
			var album = await context.Albums.FindAsync(albumId);
			return album ?? throw new NotFound($"No Album with Id: {albumId} exists.");
		}

		public async Task<IEnumerable<Album>> getAllAlbums()
		{
			var albumList = await context.Albums.ToListAsync();
			if(albumList.Count == 0) throw new NotFound($"No albums");
			return albumList;
		}

		public async Task updateAlbum(Album album)
		{
			int albumId = album.AlbumId;
			context.Albums.Entry(album).State = EntityState.Modified;
			try
			{
				await context.SaveChangesAsync();
			}
			catch (Exception ex) {
				if (!albumExists(albumId)) throw new NotFound($"No Album with Id: {albumId} exists.");
				else
				{
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool albumExists(int id)
		{
			return context.Albums.Find(id) != null;
		}
	}
}
