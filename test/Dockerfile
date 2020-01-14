FROM python:3.7-slim-buster
WORKDIR /opt/todo
RUN apt-get update
RUN apt-get install -y build-essential
COPY pyproject.toml ./
COPY poetry.lock ./
RUN python -m pip install poetry
RUN  poetry install
CMD ["poetry", "run", "pytest"]