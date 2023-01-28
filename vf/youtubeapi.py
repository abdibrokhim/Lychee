import requests

api_key = "AIzaSyAu3lbrWAoQcfQ-j5eR2efxw2D5jS1Behk"
video_id = "33Qu3oilteU"

url = f"https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId={video_id}&key={api_key}"
response = requests.get(url)

print(response.json())