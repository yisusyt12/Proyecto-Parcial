from pydantic import BaseModel
from typing import Optional, List


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreateSimple(BaseModel):
    name: str
    email: Optional[str] = None

class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class TaskBase(BaseModel):
    title: str
    description: str

class TaskCreate(TaskBase):
    status: str
    user_id: int

class Task(TaskBase):
    id: int
    user_id: int
    status: str

    model_config = {
        "from_attributes": True
    }


class UserBase(BaseModel):
    name: str
    email: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    tasks: List[Task] = []

    model_config = {
        "from_attributes": True
    }
    
    
class CredentialCreate(BaseModel):
    email: str
    password: str
