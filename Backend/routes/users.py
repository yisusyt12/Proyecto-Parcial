from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from auth import hashear_password
from database import get_db
from models import LoginCredential 

router = APIRouter()

@router.post("/register/")
def registrar_usuario(email: str, password: str, db: Session = Depends(get_db)):
    
    existe_cred = db.query(LoginCredential).filter(LoginCredential.email == email).first()

    if existe_cred:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    nueva_credencial = LoginCredential(
        email=email,
        hashed_password=hashear_password(password)
    )
    db.add(nueva_credencial)
    db.commit()

    return {
        "email": email,
        "msg": "Usuario registrado correctamente"
    }
