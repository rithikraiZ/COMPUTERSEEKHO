using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IAlbumService
	{
		Task<Album> getAlbumById(int albumId);
		Task<IEnumerable<Album>> getAllAlbums();
		Task addAlbum(Album album);
		Task updateAlbum(Album album);
		Task deleteAlbum(int albumId);
	}
}
