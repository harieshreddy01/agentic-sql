def is_safe_sql(sql: str) -> bool:
    blacklist = ["update", "delete", "drop", "insert", "alter", "truncate"]
    sql_lower = sql.lower()
    return not any(term in sql_lower for term in blacklist)
