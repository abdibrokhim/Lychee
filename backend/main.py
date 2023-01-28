from backend import speechtotext, texttospeech, generate


def main():

    try:
        speech_result = speechtotext.recognize_from_microphone()
        print(speech_result)

        generated_text = generate.execute(speech_result)
        print(generated_text)

        to_speech = texttospeech.to_speech(generated_text)
        print(to_speech)

    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
