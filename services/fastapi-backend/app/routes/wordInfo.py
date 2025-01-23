from fastapi import APIRouter
import nltk
from app.models.word_info import WordInfoResponse
from word.wordNet import get_word_info_extended
import asyncio

router = APIRouter()

#Download Libraries
nltk.download('wordnet')
nltk.download('omw-1.4')

@router.get("/wordInfo/{word}" , response_model=WordInfoResponse)
async def get_word_info(word: str):
    # Call the function to get word information
    word_info = await asyncio.to_thread(get_word_info_extended, word)
    return word_info