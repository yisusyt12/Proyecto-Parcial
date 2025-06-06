from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext


SECRET_KEY = "your_secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hashear_password(password: str) -> str:
    return pwd_context.hash(password)

def verificar_password(password_sin_hash, password_con_hash):
    return pwd_context.verify(password_sin_hash, password_con_hash)

def crear_token(datos: dict, expiracion: timedelta = None):
    datos_a_codificar = datos.copy()
    expira = datetime.utcnow() + (expiracion or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    datos_a_codificar.update({"exp": expira})
    return jwt.encode(datos_a_codificar, SECRET_KEY, algorithm=ALGORITHM)


def decodificar_token(token: str):
    try: 
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None