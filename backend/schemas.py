from pydantic import BaseModel

# STUDENT
class StudentCreate(BaseModel):
    name: str
    age: int
    course: str

class StudentResponse(StudentCreate):
    id: int

    class Config:
        from_attributes = True


# USER AUTH
class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str