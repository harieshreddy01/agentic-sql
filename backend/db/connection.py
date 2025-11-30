import mysql.connector
from mysql.connector import Error
from typing import Optional, Dict, Any


class MySQLConnectionManager:
    def __init__(self):
        self.connection: Optional[mysql.connector.connection.MySQLConnection] = None
        self.config: Optional[Dict[str, Any]] = None

    def connect(self, host: str, user: str, password: str, database: str):
        try:
            self.config = {
                "host": host,
                "user": user,
                "password": password,
                "database": database,
            }
            self.connection = mysql.connector.connect(**self.config)
            if self.connection.is_connected():
                return True
            return "Connection failed for unknown reasons."
        except Error as e:
            return str(e)

    def get_connection(self) -> Optional[mysql.connector.connection.MySQLConnection]:
        return self.connection


db_manager = MySQLConnectionManager()
