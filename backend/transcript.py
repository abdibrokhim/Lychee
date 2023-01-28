from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import JSONFormatter
import os


def get_transcript(video_id: str):
    """Get transcript from YouTube video."""
    FILE_PATH = ".././frontend/src/transcripts/"
    # Must be a single transcript.
    transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=("en",))

    formatter = JSONFormatter()

    # .format_transcript(transcript) turns the transcript into a JSON string.
    json_formatted = formatter.format_transcript(transcript)

    os.makedirs(FILE_PATH, exist_ok=True)

    # Now we can write it out to a file.
    with open(f'{FILE_PATH}script.json', 'w', encoding='utf-8') as json_file:
        json_file.write(json_formatted)

    # Now should have a new JSON file that you can easily read back into Python.

    return json_formatted

# get_transcript(input())