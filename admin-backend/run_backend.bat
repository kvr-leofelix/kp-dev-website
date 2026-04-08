cd /d "%~dp0"
echo Setting up Python Virtual Environment...
python -m venv venv
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Starting FastAPI server...
uvicorn main:app --reload
