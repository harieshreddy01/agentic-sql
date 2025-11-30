from .connection import db_manager


def get_schema():
    conn = db_manager.get_connection()
    if conn is None:
        raise RuntimeError("No active database connection. Call /connect first.")

    cursor = conn.cursor()
    schema = {}

    cursor.execute("SHOW TABLES")
    tables = [t[0] for t in cursor.fetchall()]

    for table in tables:
        cursor.execute(f"DESCRIBE {table}")
        columns = cursor.fetchall()

        schema[table] = {
            "columns": [
                {
                    "name": col[0],
                    "type": col[1],
                    "nullable": col[2],
                    "key": col[3],
                    "default": col[4],
                    "extra": col[5],
                }
                for col in columns
            ]
        }

    cursor.close()
    return schema
