FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your API folder (since main.py is in api/ folder)
COPY api/ ./api/

EXPOSE 5000

CMD ["python", "api/main.py"]