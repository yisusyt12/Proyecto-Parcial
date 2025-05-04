from fastapi import FastAPI, Depends, HTTPException # type: ignore
from sqlalchemy.orm import Session # type: ignore
import models, schemas
from database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)



# bd
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# crear usuario
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#lista
@app.get("/users/", response_model=list[schemas.User])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

#crear tarea
@app.post("/users/{user_id}/tasks/", response_model=schemas.Task)
def create_task_for_user(user_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict(), user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

#lista tareas
@app.get("/tasks/", response_model=list[schemas.Task])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

