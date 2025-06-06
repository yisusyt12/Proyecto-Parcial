from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from auth import hashear_password
from database import get_db
from models import LoginCredential 
from schemas import UserRegister

router = APIRouter()

@router.post("/register/")
def registrar_usuario(data: UserRegister, db: Session = Depends(get_db)):
    existe_cred = db.query(LoginCredential).filter(LoginCredential.email == data.email).first()

    if existe_cred:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    nueva_credencial = LoginCredential(
        email=data.email,
        hashed_password=hashear_password(data.password)
    )
    db.add(nueva_credencial)
    db.commit()

    return {
        "email": data.email,
        "msg": "Usuario registrado correctamente"
    }