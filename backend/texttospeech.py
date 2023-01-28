import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv

load_dotenv()


def to_speech(text):
    # This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    speech_config = speechsdk.SpeechConfig(subscription=os.getenv('SPEECH_KEY'), region=os.getenv('SPEECH_REGION'))
    # audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

    FILE_PATH = ".././frontend/src/audios/"

    os.makedirs(FILE_PATH, exist_ok=True)
    audio_config = speechsdk.audio.AudioOutputConfig(filename=f'{FILE_PATH}output.wav')

    # The language of the voice that speaks.
    speech_config.speech_synthesis_voice_name='en-US-JennyNeural'

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

    # Get text from the console and synthesize to the default speaker.
    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}]".format(text))
        return True
    elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_synthesis_result.cancellation_details
        print("Speech synthesis canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                print("Error details: {}".format(cancellation_details.error_details))
                print("Did you set the speech resource key and region values?")


# test

# if __name__ == '__main__':
#     t = """have you ever thought to yourself before

# going to sleep

# tomorrow is the day i'll change

# tomorrow is the day i'll get up early in

# the morning have a healthy breakfast

# go for a morning jog

# breathe fresh air

# tomorrow

# is the day

# i want to change to who i really want to

# be

# the best

# version of myself

# while change doesn't come easy you have

# to incorporate certain habits in your

# life that'll eventually lead to you

# becoming the best

# version

# of yourself
# """
#     to_speech(t)
