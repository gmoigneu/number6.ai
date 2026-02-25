# Layer 1: Regex input filter
#
# Screens every user message before it reaches the LLM.
# Runs in microseconds, costs zero API tokens.

import re

# Each tuple is (compiled regex, label for logging).
_INJECTION_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(p, re.IGNORECASE), label)
    for p, label in [
        (r"ignore\s+(all\s+)?previous\s+instructions?", "ignore-instructions"),
        (r"(reveal|show|output|print|display)\s+(me\s+)?(your\s+)?(system\s+)?prompt", "prompt-extraction"),
        (r"repeat\s+(the\s+)?(text|words|instructions?)\s+(above|back)", "repeat-instructions"),
        (r"you\s+are\s+now\s+(in\s+)?(developer|debug|admin|test)\s+mode", "mode-switch"),
        (r"\bDAN\b.*do\s+anything\s+now", "dan-jailbreak"),
        (r"(system|admin)\s+(override|command|access)", "authority-claim"),
        (r"\[SYSTEM\]|\[ADMIN\]|\[DEVELOPER\]|\[DEBUG\]", "fake-system-tag"),
        (r"pretend\s+(you\s+are|to\s+be)\s+(a\s+different|another|an?\s+)", "persona-hijack"),
        (r"(what|tell\s+me)\s+(are\s+)?(your\s+)(instructions?|rules?|constraints?|guidelines?)", "instruction-probe"),
    ]
]

# Messages that look suspicious but might be legitimate.
# Logged as warnings, not blocked.
_SOFT_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(p, re.IGNORECASE), label)
    for p, label in [
        (r"base64", "encoding-mention"),
        (r"<!--.*-->", "html-comment"),
    ]
]


class InputBlocked(Exception):
    def __init__(self, reason: str):
        self.reason = reason
        super().__init__(reason)


def validate_input(text: str) -> str:
    """Returns input unchanged if safe. Raises InputBlocked if not."""
    for pattern, label in _INJECTION_PATTERNS:
        if pattern.search(text):
            raise InputBlocked(label)

    for pattern, label in _SOFT_PATTERNS:
        if pattern.search(text):
            logger.info("Soft pattern match [%s]: %.100s", label, text)

    return text
