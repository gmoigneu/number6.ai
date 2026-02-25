# Wiring Layer 1 into the API route
#
# When the regex catches an injection, we return a polite redirect
# instead of an error. The attacker gets no signal about what
# triggered the block. Both messages are stored so the conversation
# history stays coherent.

@app.post("/api/conversations/{session_id}/messages")
async def send_message(session_id: uuid.UUID, body: SendMessageRequest, request: Request):
    # ... rate limiting and session checks ...

    # Layer 1: input validation (regex patterns)
    try:
        validate_input(body.content)
    except InputBlocked:
        redirect_msg = MessageOut(
            role="assistant",
            content=(
                "Let's stay focused on your AI readiness assessment! "
                "Could you tell me a bit about your organisation?"
            ),
            metadata=MessageMetadata(),
        )
        # Store both the user's blocked message and the redirect
        await db.add_message(session_id, "user", body.content)
        await db.add_message(
            session_id, "assistant", redirect_msg.content,
            redirect_msg.metadata.model_dump(mode="json"),
        )
        return SendMessageResponse(message=redirect_msg)

    # If we get here, the message passed validation. Send to the LLM.
    response_msg = await agent.handle_message(session_id, body.content)
    return SendMessageResponse(message=response_msg)
