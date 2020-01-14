FROM python:3.7-alpine
WORKDIR /opt/todo
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers libffi-dev
RUN python -m pip install poetry
COPY . .
RUN  poetry install
CMD ["poetry", "run", "flask", "run"]