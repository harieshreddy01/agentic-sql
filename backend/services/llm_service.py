import os
from typing import Any

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set in environment variables.")

client = OpenAI(api_key=OPENAI_API_KEY)


def generate_sql_from_nl(nl_query: str, schema: Any) -> str:
    prompt = f"""You are a senior MySQL expert. Convert the natural language query into a safe SELECT SQL query.

SCHEMA (tables and columns):
{schema}

User question:
{nl_query}

Rules:
- Only generate SELECT queries (including JOINs, GROUP BY, ORDER BY if needed).
- Never generate UPDATE, DELETE, INSERT, DROP, ALTER, or TRUNCATE.
- Use only the tables and columns mentioned in the schema above.
- Do not add explanations, return only the SQL query.
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )

    sql = response.choices[0].message.content.strip()
    return sql
