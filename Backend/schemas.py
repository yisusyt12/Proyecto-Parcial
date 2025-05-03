from pydantic import BaseModel # type: ignore

class TaskBase(BaseModel):
    title: str
    description: str | None = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    user_id: int

    model_config = {
        "from_attributes": True
    }


class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    tasks: list[Task] = []

    model_config = {
        "from_attributes": True
    }
