from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
import os
from dotenv import load_dotenv
load_dotenv()

beginSentence = "Hi! Thank you for calling The Exquisite Salon. How can I assist you today?"
agentPrompt = """
    Task: You are a virtual phone agent for The Exquisite Salon, a haircut salon in Spain. Your goal is to assist customers by answering their inquiries and guiding them through appointment bookings.
    You provide information about:
    1. Services offered by the salon like hair styling, hair color, nail services, hair blonding service, hair color correction.
    2. Location/address of the salon branches Madrid, Barcelona, and Sevilla.
    3. Hours of Operation 10:00am to 8:00pm.
    
    When Handling booking requests:
    1. Collect and confirm personal information details, including name, email address, mobile number.
    2. Let them choose the salon branch between Madrid, Barcelona, and Sevilla.
    3. Ask them about the service they would like to have hair styling, hair treatment, nails, hair color.
    4. Inquire about their preferred date to visit and the time. Let the, choose between 10:00am to 8:00pm.
    5. Lastly ask them about any special remarks that they would like the salon to know.
    
    Conversation Style:
    - Be concise and polite. Use simple and professional language.
    - Avooid repeating content verbatim; instead, paraphrase for variety.
     - End your respnses with a helpful follow-up question or action prompt.
     
    Personality:
    - Be warm, approachable, and professional.
    - Be empathetic and attentive to the customer's needs without being overly formal.
    
    Guidelines:
    - If a question is uncler, ask politely for clarification.
    - Handle potential misunderstandings naturally (e.g., "Sorry, could you repeat that?").
    - Always aim to create a smooth, human-like conversational flow.
    
    Example Behaviour:
    - Customer: "Can I book a haircut for tomorrow?
      Agent: Sure! May I know your name and preferred time for the appointment?"
    
    """

class LlmClient:
    def __init__(self):
        self.client = OpenAI(
            # organization=os.environ['OPENAI_ORGANIZATION_ID'],
            api_key=os.environ['OPENAI_API_KEY'],
        )
    
    def draft_begin_messsage(self):
        return {
            "response_id": 0,
            "content": beginSentence,
            "content_complete": True,
            "end_call": False,
        }
    
    def convert_transcript_to_openai_messages(self, transcript):
        messages = []
        for utterance in transcript:
            if utterance["role"] == "agent":
                messages.append({
                    "role": "assistant",
                    "content": utterance['content']
                })
            else:
                messages.append({
                    "role": "user",
                    "content": utterance['content']
                })
        return messages
    def prepare_prompt(self, request):
        prompt: list[ChatCompletionMessageParam] = [{
            "role": "system",
            "content": agentPrompt,
        }]
        transcript_messages = self.convert_transcript_to_openai_messages(request['transcript'])
        for message in transcript_messages:
            prompt.append(message)

        if request['interaction_type'] == "reminder_required":
            prompt.append({
                "role": "user",
                "content": "(Now the user has not responded in a while, you would say:)",
            })
        return prompt

    def draft_response(self, request):      
        prompt = self.prepare_prompt(request)
        stream = self.client.chat.completions.create(
            model="gpt-4o",
            messages=prompt,
            stream=True,
            ) # type: ignore

        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield {
                    "response_id": request['response_id'],
                    "content": chunk.choices[0].delta.content,
                    "content_complete": False,
                    "end_call": False,
                }
        
        yield {
            "response_id": request['response_id'],
            "content": "",
            "content_complete": True,
            "end_call": False,
        }
