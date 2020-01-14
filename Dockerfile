FROM python:3.7-slim-buster
WORKDIR /opt/todo
RUN apt-get update
RUN apt-get install -y build-essential
RUN python -m pip install poetry
COPY pyproject.toml ./
COPY poetry.lock ./
RUN poetry install
ENV FLASK_DEBUG 1
ENV FLASK_APP server/app.py
ENV FLASK_RUN_HOST 0.0.0.0
CMD ["poetry", "run", "flask", "run"]
