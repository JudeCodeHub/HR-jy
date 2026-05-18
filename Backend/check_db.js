const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

async function checkDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to DB');

    const HR = mongoose.model('HR', new mongoose.Schema({ email: String }), 'hrs');
    const Employee = mongoose.model('Employee', new mongoose.Schema({ email: String }), 'employeees');

    const hrCount = await HR.countDocuments();
    const empCount = await Employee.countDocuments();

    console.log(`HR count: ${hrCount}`);
    console.log(`Employee count: ${empCount}`);

    const hrs = await HR.find().limit(5);
    console.log('Sample HRs:', hrs.map(h => h.email));

    const emps = await Employee.find().limit(5);
    console.log('Sample Employees:', emps.map(e => e.email));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDb();
