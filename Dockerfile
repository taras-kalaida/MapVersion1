FROM python
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirments.txt /code/
RUN pip install -r requirments.txt
COPY . /code/