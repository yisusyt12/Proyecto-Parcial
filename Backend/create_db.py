import os
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import load_dotenv

load_dotenv()  

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")



conn = psycopg2.connect(
    dbname="railway",
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)  
cursor = conn.cursor()


cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
exists = cursor.fetchone()
if not exists:
    cursor.execute(f'CREATE DATABASE "{DB_NAME}"')
    print(f"Base de datos '{DB_NAME}' creada.")
else:
    print(f"La base de datos '{DB_NAME}' ya existe.")

cursor.close()
conn.close()



