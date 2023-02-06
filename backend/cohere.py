import cohere

co = cohere.Client('y4i7tF0VHIAV8VwQsQLwfDaVaRdYTwMEe74eEdHU')


def complete(prompt):
    response = co.generate(
        model='command-xlarge-20221108',
        prompt=prompt,
        max_tokens=300,
        temperature=0.9,
        k=0,
        p=0.75,
        frequency_penalty=0,
        presence_penalty=0,
        stop_sequences=[],
        return_likelihoods='NONE')

    print('Prediction: {}'.format(response.generations[0].text))


if __name__ == "__main__":
    a = complete("""
    Summarize the Article

    Here is the Article:

    language is essential to our lives it's
    how we learn about the world share
    information and how we communicate
    but language is messy
    our ability to understand the meaning of
    the words we see and hear is influenced
    by factors such as syntax semantics and
    context
    people are pretty good at making sense
    of all that
    but computers
    they're not so good
    but they've recently gotten better
    thanks to a technology called large
    language models which are computer
    programs that use ai to go through a ton
    of text to identify patterns in order to
    understand the meaning of the words
    people use
    [Music]
    there's just one thing
    building these models takes a ton of
    expertise time and money
    cohere builds large language models and
    makes them available through an api
    so with just one line of code developers
    and businesses can add advanced language
    understanding to their system or app
    quickly and easily
    [Music]
    businesses can use their own data
    whether it's text from customer service
    requests legal contracts or social media
    posts to create their own custom models
    to understand text or even generate it
    [Music]
    so if you're an online retailer the
    cohere api can help write new product
    descriptions for your store
    or improve your product search and make
    it easier for customers to find exactly
    what they're looking for
    use cohere models to better understand
    messages from customers even if they're
    a little confusing
    so if your business gets a message like
    this
    your customer service system will
    automatically understand it's about a
    wrong order
    even if they didn't specifically say
    wrong order
    or if you're a healthcare provider you
    can use coheres models to better
    organize classify and retrieve medical
    records
    these days we interact a lot with
    computers
    but we often have to change the way we
    use language so they can understand us
    which makes for clunky unnatural
    interactions
    but maybe one day soon language models
    will give computers everywhere the
    ability to understand language
    just as well as we can
    language models like the ones built by
    cohere are powerful and therefore must
    be managed responsibly to learn about
    our approach visit cohere dot a i slash
    responsibility
    [Music]
    cohere helping computers understand
    language
    """)
    print(a)