FROM python:alpine

WORKDIR /app

EXPOSE 5000

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/

CMD ["flask", "run"]