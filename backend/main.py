from fastapi import FastAPI
from database import engine
from models import Base
from sqlalchemy.orm import Session
from fastapi import Depends
from database import SessionLocal
from models import Student
from schemas import StudentCreate
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import User
from schemas import UserCreate, UserLogin
from auth.utils import hash_password, verify_password
from auth.jwt import create_access_token
from auth.deps import get_current_user


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://student-manager-xi-three.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message":"Student Manager API"}


#this gives each request its own database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }




@app.get("/students")
def get_students(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return db.query(Student).all()

#student: StudentCreate recieve data from frontend/ Postman
@app.post("/students")
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    new_student = Student(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@app.get("/students/{id}")
def get_student(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    student = db.query(Student).filter(Student.id == id).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student

@app.put("/students/{id}")
def update_student(
    id: int,
    student: StudentCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    db_student = db.query(Student).filter(Student.id == id).first()

    if not db_student:
        return {"error": "Student not found"}

    db_student.name = student.name
    db_student.age = student.age
    db_student.course = student.course

    db.commit()
    return db_student

@app.delete("/students/{id}")
def delete_student(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    db_student = db.query(Student).filter(Student.id == id).first()

    if not db_student:
        return {"error": "Student not found"}

    db.delete(db_student)
    db.commit()

    return {"message": "Deleted successfully"}
