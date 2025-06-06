from fastapi import FastAPI, Depends, HTTPException  
from sqlalchemy.orm import Session  
import models, schemas
from database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
from routes import login, users
 


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(login.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/tasks/{task_id}/", response_model=schemas.Task)
def update_task(task_id: int, task_data: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    
    db_task.title = task_data.title
    db_task.description = task_data.description
    db_task.status = task_data.status
    db_task.user_id = task_data.user_id
    db.commit()
    db.refresh(db_task)
    return db_task


@app.get("/users/", response_model=list[schemas.User])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.post("/users/{user_id}/tasks/", response_model=schemas.Task)
def create_task_for_user(user_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    task_data = task.dict()
    task_data.pop("user_id", None)  
    db_task = models.Task(**task_data, user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task



@app.get("/tasks/", response_model=list[schemas.Task])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


@app.delete("/tasks/{task_id}/")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    
    db.delete(db_task)
    db.commit()
    return {"detail": "Tarea eliminada correctamente"}



@app.put("/users/{user_id}/", response_model=schemas.User)
def update_user(user_id: int, user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    db_user.name = user_data.name
    db_user.email = user_data.email

    db.commit()
    db.refresh(db_user)
    return db_user


@app.delete("/users/{user_id}/")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    db.delete(db_user)
    db.commit()
    return {"detail": "Usuario eliminado correctamente"}