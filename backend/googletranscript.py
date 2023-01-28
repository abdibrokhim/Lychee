import googleapiclient.discovery

# Set up the API client
youtube = googleapiclient.discovery.build("youtube", "v3", developerKey="AIzaSyAu3lbrWAoQcfQ-j5eR2efxw2D5jS1Behk")

# Get the caption tracks for a video
request = youtube.captions().list(
    part="snippet",
    videoId="g85WsxE1gAU"
)
response = request.execute()
print(response)