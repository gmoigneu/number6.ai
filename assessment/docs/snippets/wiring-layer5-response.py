# Wiring Layer 5 into response parsing
#
# After every LLM response, we run leak detection before the
# content reaches the user. This is the last line of defense.

def _parse_agent_response(raw: str) -> tuple[str, MessageMetadata]:
    data = _extract_json(raw)
    if data and "content" in data:
        content = data["content"]
        meta_raw = data.get("metadata", {})
        try:
            metadata = MessageMetadata.model_validate(meta_raw)
        except Exception:
            metadata = MessageMetadata()

        # Layer 5: check for system prompt leakage
        replacement = check_output_for_leaks(content, SYSTEM_PROMPT)
        if replacement:
            # Swap the response with a safe fallback
            return replacement, MessageMetadata()

        return content, metadata

    # Raw text fallback (model didn't return valid JSON)
    replacement = check_output_for_leaks(raw, SYSTEM_PROMPT)
    if replacement:
        return replacement, MessageMetadata()

    return raw, MessageMetadata()
