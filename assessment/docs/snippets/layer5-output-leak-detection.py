# Layer 5: Output leak detection
#
# Even if the model is successfully tricked into revealing its prompt
# (bypassing layers 1-4), the leaked content never reaches the user.
# Character-level n-grams catch both verbatim leaks and paraphrased
# versions where the model restates its instructions in different words.


def _get_ngrams(text: str, n: int) -> set[str]:
    """Extract character-level n-grams from text."""
    text = text.lower()
    return {text[i : i + n] for i in range(len(text) - n + 1)}


def check_output_for_leaks(
    response_content: str,
    system_prompt: str,
    threshold: float = 0.12,
    ngram_size: int = 5,
) -> str | None:
    """
    Returns None if the response is safe.
    Returns a replacement message if too many prompt fragments were detected.

    Threshold of 0.12 means: if more than 12% of the system prompt's
    n-grams appear in the response, replace it. Normal assessment
    responses share some vocabulary with the prompt ("assessment", "AI",
    "readiness"), so the threshold has to be high enough to avoid
    false positives.
    """
    # Too short to meaningfully leak anything
    if len(response_content) < 50:
        return None

    prompt_ngrams = _get_ngrams(system_prompt, ngram_size)
    response_ngrams = _get_ngrams(response_content, ngram_size)

    if not prompt_ngrams:
        return None

    overlap = len(prompt_ngrams & response_ngrams) / len(prompt_ngrams)

    if overlap > threshold:
        return (
            "I appreciate your curiosity! "
            "Let's get back to your AI readiness assessment. Where were we?"
        )

    return None
