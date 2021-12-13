FROM python

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN mkdir -p /map

WORKDIR /map

COPY . /map/

RUN pip install -r requirments.txt