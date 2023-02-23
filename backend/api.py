# from typing import Union
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api.formatters import JSONFormatter
 
import transcript

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/video/{video_id}")
def get_transcript(video_id: str):
    # formatter = JSONFormatter()
    # json_formatted = formatter.format_transcript(transcript.get_transcript(video_id))
    
    # print(type(json_formatted))

    return transcript.get_transcript(video_id)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000, workers=4)
