using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ComputerSeekhoDN.Services
{
	public class VideoService : IVideoService
	{
		private readonly ComputerSeekhoDBContext context;
		public VideoService(ComputerSeekhoDBContext context) { this.context = context; }

		public async Task addVideo(Video video)
		{
			await context.AddAsync(video);
			await context.SaveChangesAsync();
		}

		public async Task deleteVideo(int videoId)
		{
			var video = await context.Videos.FindAsync(videoId) ?? throw new NotFound($"No Video with Id: {videoId} exists.");
			context.Videos.Remove(video);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<Video>> getAllVideos()
		{
			var videoList = await context.Videos.ToListAsync();
			if (videoList.Count == 0) throw new NotFound($"No videos.");
			return videoList;
		}

		public async Task<Video> getVideoById(int videoId)
		{
			var video = await context.Videos.FindAsync(videoId);
			return video ?? throw new NotFound($"No Video with Id: {videoId} exists.");
		}

		public async Task updateVideo(Video video)
		{
			int videoId = video.VideoId;
			context.Videos.Entry(video).State = EntityState.Modified;
			try
			{
				await context.SaveChangesAsync();
			}
			catch (DBConcurrencyException ex)
			{
				if (!videoExists(videoId)) throw new NotFound($"No Video with Id: {videoId} exists.");
				else
				{
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool videoExists(int id)
		{
			return context.Videos.Find(id) != null;
		}
	}
}
