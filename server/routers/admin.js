const router = require('express').Router()
const {
  getAllAdmins,
  adminReg,
  isAdminValidated,
  setEventSetting,
  deleteEventSetting,
  getEventSetting,
  updateBannnerImg,
  editEventSetting,
} = require('../controllers/admin')
const { adminLogin, adminAuth, adminLogout } = require('../controllers/adminSimple')
const { eventSettingValidate } = require('../middlewares/adInputValidate')
const adminValidate = require('../middlewares/adminTokenVerify')
const upload = require('../middlewares/uploadFile')

router.get('/', adminValidate, getAllAdmins)
router.post('/login', adminLogin)
router.get('/logout', adminLogout)
router.get('/auth', adminAuth)

//event creator page settings
router.get('/setting', getEventSetting)
router.post(
  '/setting',
  adminValidate,
  upload.single('banner'),
  eventSettingValidate,
  setEventSetting
)
router.post(
  '/updateBanner',
  adminValidate,
  upload.single('banner'),
  updateBannnerImg
)
router.put('/editSetting/:id', adminValidate, editEventSetting)

router.delete('/deleteSetting/:id', adminValidate, deleteEventSetting)

module.exports = router
