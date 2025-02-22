import express from 'express';
import {
  testDbConnection,
  submitInsuranceForm,
  getTableRecords,
  deleteRecord,
  updateRecord,
  verifyTables,
  viewTableData  // Add this import
} from '../controllers/insuranceController.js';

const router = express.Router();

// Put specific routes first
router.get('/test-db', testDbConnection);
router.get('/verify-tables', verifyTables);  // Moved before /:table
router.post('/insurance', submitInsuranceForm);
router.get('/view/:table', viewTableData);  // Add this route with the specific routes

// Put parameter routes last
router.get('/:table', getTableRecords);
router.delete('/:table/:id', deleteRecord);
router.put('/:table/:id', updateRecord);

export default router;
