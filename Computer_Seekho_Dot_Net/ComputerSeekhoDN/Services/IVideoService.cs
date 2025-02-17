using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IVideoService
	{
		Task addVideo(Video video);
		Task updateVideo(Video video);
		Task deleteVideo(int videoId);
		Task<Video> getVideoById(int recruiterId);
		Task<IEnumerable<Video>> getAllVideos();
	}
}
