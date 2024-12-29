import express from 'express';
import {
  testDbConnection,
  submitInsuranceForm,
  getTableRecords,
  deleteRecord,
  updateRecord
} from '../controllers/insuranceController.js';

const router = express.Router();

router.get('/test-db', testDbConnection);
router.post('/insurance', submitInsuranceForm);
router.get('/:table', getTableRecords);
router.delete('/:table/:id', deleteRecord);
router.put('/:table/:id', updateRecord);

export default router;
