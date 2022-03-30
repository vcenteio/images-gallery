FROM python:alpine

WORKDIR /app

EXPOSE 5050

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/

CMD ["flask", "run"]