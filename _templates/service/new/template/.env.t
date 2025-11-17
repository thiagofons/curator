---
to: apps/backend/<%=name%>-service/.env
---
RABBITMQ_URI=amqp://admin:admin@rabbitmq:5672
DATABASE_URL=postgres://postgres:$password@postgres:5432/<%=name%>
PORT=<%=port%>