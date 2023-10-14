import { json } from '@sveltejs/kit'; // Import JSON for handling JSON data.
import { COHERE_API_KEY } from '$env/static/private';
import { YoutubeTranscript } from 'youtube-transcript'; // Import the YouTube transcript module.
import cohere from 'cohere-ai'; // Import the Cohere AI module.
// import { google } from 'googleapis'; // Import the Google APIs module.

// @ts-ignore
// const youtube = new google.youtube({
// 	version: 'v3',
// 	auth: 'AIzaSyAyHJjHeRE7KCkkm-690aYXAYUrfbqGpMA'
// });

// /**  @param {string} videoURL  */
// async function getVideoLanguage(videoURL) {
// 	const regex = /youtu\.be\/([a-zA-Z0-9_-]+)\?/; // Regular expression to match YouTube video IDs.

// 	const match = videoURL.match(regex);
// 	if (!match) return null;
// 	const videoId = match[1]; // Extract the video ID from the URL.

// 	const videos = await youtube.videos.list({
// 		part: 'snippet',
// 		id: videoId
// 	});

// 	return videos.data.items[0].snippet.defaultLanguage; // Return the default language of the video.
// }

export async function POST({ request }) {
	try {
		const { link } = await request.json(); // Get the video link from the request.

		if (!link) {
			return json({
				data: '',
				error: true,
				message: 'Invalid link'
			});
		}

		// const language = await getVideoLanguage(link); // Get the language of the video.

		// console.log(language);

		// if (!language || language !== 'en') {
		// 	return json({
		// 		data: [],
		// 		error: true,
		// 		// @ts-ignore
		// 		message: 'The video is not in English'
		// 	});
		// }

		cohere.init(COHERE_API_KEY); // Initialize the Cohere AI module.

		let text = '';

		const res = await YoutubeTranscript.fetchTranscript(link); // Fetch the transcript of the video.

		res.forEach((data) => (text = text + ' ' + data.text)); // Combine the transcript data into a single text.

		const response = await cohere.summarize({
			text: text,
			length: 'long',
			format: 'paragraph',
			model: 'command-nightly',
			additional_command: `This data is from youtube video. give me output so that I can use it to show the summary.video link ${link}`,
			temperature: 0.1
		});

		if (response.statusCode !== 200) {
			return json({
				data: '',
				error: true,
				// @ts-ignore
				message: 'something went wrong! maybe the video is too long'
			});
		}

		return json({
			data: response.body.summary,
			error: false,
			message: 'Summarized transcripts'
		});
	} catch (e) {
		console.log(e);
		return json({
			data: '',
			error: true,
			// @ts-ignore
			message: 'Something went wrong'
		});
	}
}
