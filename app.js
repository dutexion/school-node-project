const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// CORS 미들웨어를 가장 먼저 설정
app.use(
  cors({
    origin: 'http://127.0.0.1:50025', // 클라이언트 URL을 명시적으로 지정
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 나머지 미들웨어 설정
app.use(bodyParser.json());
app.use(morgan('dev'));

// 데이터베이스 동기화
db.sequelize.sync();

// 라우트 설정
const deptRoutes = require('./routes/dept');
const employeeRoutes = require('./routes/employee');

app.use('/dept', deptRoutes);
app.use('/employee', employeeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
