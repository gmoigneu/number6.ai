from __future__ import annotations

TIERS = [
    (0, 30, "Early Stage"),
    (31, 55, "Building Foundations"),
    (56, 75, "Progressing"),
    (76, 100, "Advanced"),
]

DIMENSIONS = [
    "Data Readiness",
    "Process Maturity",
    "Team Capability",
    "Strategic Alignment",
]


def score_to_tier(score: int) -> str:
    for low, high, label in TIERS:
        if low <= score <= high:
            return label
    return "Unknown"


def overall_score(dimension_scores: dict[str, int]) -> int:
    values = list(dimension_scores.values())
    if not values:
        return 0
    return round(sum(values) / len(values))
