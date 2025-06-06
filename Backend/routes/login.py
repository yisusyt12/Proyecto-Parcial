from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from models import LoginCredential
from auth import verificar_password, crear_token
from schemas import Token

router = APIRouter()

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    cred = db.query(LoginCredential).filter(LoginCredential.email == form_data.username).first()

    if not cred or not verificar_password(form_data.password, cred.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = crear_token({"sub": cred.email})
    return {
        "access_token": token,
        "token_type": "bearer"
    }
