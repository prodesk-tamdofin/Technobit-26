// const so = 'https://eventapi.nditc.net';
export const so = process.env.NEXT_PUBLIC_API || "http://localhost:5000";

export const reqImgWrapper = (src: any) => {
  if (!src) return null;
  let prefix =
    "https://res.cloudinary.com/dxvw2ccph/image/upload/v1741932775/init";

  if (src.startsWith("https://")) return src;

  return (
    "https://res.cloudinary.com/dxvw2ccph/image/upload/v1741932775/init" +
    "/" +
    src
  );
};

const reqs = {
  GET_ALL_ADMINS: so + "/api/admin/",
  ADMIN_LOGIN: so + "/api/admin/login", //
  IS_ADMIN_LOGGED: so + "/api/admin/auth", //
  ADMIN_LOGOUT: so + "/api/admin/logout",

  //admin action
  SET_PERMIT: so + "/api/adAction/setPermit/",
  BLOCK_CA: so + "/api/adAction/blockCA", //
  UPDATE_CA_POINT: so + "/api/adAction/updateCode",
  UPDATE_EVENT_CHECKED: so + "/api/adAction/updateEventInfo/",
  GET_ALL_SETTING: so + "/api/adAction/setting",
  DOWNLOAD_FILE: so + "/api/adAction/downloadFile",

  //page settings
  EVENT_SETTING_CREATOR: so + "/api/admin/setting",
  EVENT_SETTING_DELETE: so + "/api/admin/deleteSetting/",
  EVENT_SETTING: so + "/api/admin/setting",
  UPDATE_BANNER: so + "/api/admin/updateBanner",
  EDIT_EVENT_SETTING: so + "/api/admin/editSetting/",

  //sponsors
  ADD_SPONSOR: so + "/api/sponsor/create",
  GET_ALL_SPONSOR: so + "/api/sponsor",
  DELETE_SPONSOR: so + "/api/sponsor/",

  //gallery
  ADD_GALLERY_IMG: so + "/api/admin/gallery/addImage", //
  UPDATE_GALLERY_IMG: so + "/api/admin/gallery/update/", //
  ALL_GALLERY_IMG: so + "/api/admin/gallery", //
  DELETE_GALLERY_IMG: so + "/api/admin/gallery/delete/", //

  //events
  ALL_EVENTS: so + "/api/events", //
  ALL_EVENTS_DATA: so + "/api/events/allData",
  ADD_EVENT: so + "/api/events/addEvent", //
  EDIT_EVENT: so + "/api/events/editBody/", //
  EDIT_EVENT_IMG: so + "/api/events/editImg/",
  DELETE_EVENT: so + "/api/events/", //
  SINGLE_EVENT: so + "/api/events/", //
  UPDATE_REG_PORTAL: so + "/api/events/regPortal/", //
  UPDATE_FIELD_PERMIT: so + "/api/events/fieldPermit/",
  ALL_CATEGORIES: so + "/api/events/allCategories", //
  //qr scanner
  QR_REG: so + "/api/qr/reg",
  QR_LOGIN: so + "/api/qr/login",
  QR_USER: so + "/api/qr/qrAdmin",
  ALL_QR_USERS: so + "/api/qr/all",
  DELETE_QR_USER: so + "/api/qr/delete/",
  QR_SCAN_INFO: so + "/api/qr/scan/",
  UPDATE_SCANNED_EVENT: so + "/api/qr/updateEvent/",
  QR_LOGOUT: so + "/api/qr/logOut",
  QR_SEARCH_TEXT: so + "/api/qr/search/",
  QR_SET_CHEKIN: so + "/api/qr/checkIn/",

  //CONTACT
  SEND_CONTACT_MESSAGE_CLIENT: so + "/api/contact/sendMessage", //
  ALL_CONTACT_MESSAGES: so + "/api/contact/messages",
  EMAIL_MESSAGE: so + "/api/contact/emailToClient/",
  SEND_SMS: so + "/api/contact/smsToClient/",

  //NOTICES
  CREATE_NOTICE: so + "/api/notice/new",
  UPDATE_NOTICE: so + "/api/notice/edit/",
  WARN_NOTICE: so + "/api/notice/warn/",
  DELETE_NOTICE: so + "/api/notice/delete/",
  ALL_NOTICES: so + "/api/notice",

  //FAQ
  ADD_FAQ: so + "/api/faq", //
  EDIT_FAQ: so + "/api/faq/", //
  ALL_FAQS: so + "/api/faq", //
  DELETE_FAQ: so + "/api/faq/", //

  ALL_CLIENTS_ONEVENT: so + "/api/client/getAll/", //
  ALL_COUNT_ONEVENT: so + "/api/client/parCount/", //
  LOGGED_CLIENT: so + "/api/client/getClient", //
  FULL_SINGLE_DATA_CLIENT: so + "/api/client/fullSingle/",
  
  // Admin participant management
  DELETE_PARTICIPANT: so + "/api/client/participant/", // DELETE /:id
  ADMIN_UPDATE_PARTICIPANT: so + "/api/client/admin/participant/", // PATCH /:id
  ADMIN_UPDATE_GAMING_DATA: so + "/api/client/admin/gaming-data/", // PATCH /:id
  ADMIN_REFCODE_STATS: so + "/api/client/admin/refcode-stats",
  ADMIN_BACKUP: so + "/api/client/admin/backup",
  REMOVE_SEGMENT: so + "/api/client/participant/", // POST /:id/remove-segment
  VERIFY_PAYMENT: so + "/api/client/verify-payment",
  DASHBOARD_STATS: so + "/api/client/dashboard-stats",
  CLEAR_ALL_PARTICIPANTS: so + "/api/client/clear-all",
  DOWNLOAD_GROUP_CSV: so + "/api/client/download-csv/",
  GROUP_WHATSAPP: so + "/api/client/whatsapp-numbers/",
  UNREGISTERED_NUMBERS: so + "/api/client/unregistered-numbers",

  // Profile management
  UPDATE_PROFILE: so + "/api/client/update-profile",
  
  //PARTICIPANTS
  PAR_REG: so + "/api/client/reg/par", //
  PAR_LOGIN: so + "/api/client/login", //
  //event participation
  SINGLE_EVENT_PARTICIPATION: so + "/api/client/singlePart", //
  TEAM_EVENT_PARTICIPATION: so + "/api/client/teamPart", //
  PAYMENT_VERIFICATION: so + "/api/client/paidVerify/", //
  FIND_TEAM_INFO: so + "/api/client/findTeam/", //
  EVENT_CAPACITY: so + "/api/client/event-capacity/", //
  //client logout
  CLIENT_LOGOUT: so + "/api/client/logout", //
  DELETE_ACCOUNT_CLIENT: so + "/api/client/deleteAcc",

  //CA
  CA_REG: so + "/api/client/reg/ca",
  CA_LOGIN: so + "/api/client/login",
  CA_ORDEREDBY_POINT: so + "/api/client/ca", //

  //password reset
  RESET_PASSWORD_TOKEN: so + "/api/client/rPassToken", //
  OTP_VERIFY_RESET_PASSWORD: so + "/api/client/rPassVerify", //
  FORGOT_PASSWORD: so + "/api/client/forgot-password",
  RESET_PASSWORD_OTP: so + "/api/client/reset-password-otp",

  //profile edits
  TRANSACTION_ID_EDIT: so + "/api/client/editTransaction",
  PROFILE_EDIT: so + "/api/client/editProfile", //
  PARTICIPANT_IMG_EDIT: so + "/api/client/editParImg", //
  CA_IMG_EDIT: so + "/api/client/editCAImg",

  //submit files and links
  CLEAR_SUBMIT_INFO: so + "/api/client/clearSubInfo/",
  SUBMIT_FILE: so + "/api/client/submitFile/",
  SUBMIT_LINK: so + "/api/client/submitLinks/", //

  //profile view
  PROFILE_VIEW: so + "/api/client/view/",

  ADMIN_PAR_REG: so + "/api/client/registerAdmin",
  ADMIN_SINGLE_EVENT: so + "/api/client/singlePartAdmin",
  ADMIN_TEAM_EVENT: so + "/api/client/teamPartAdmin",

  DELETE_EVENT_PARTICIPATION: so + "/api/adAction/deleteEventInfo",

  ADD_RESULT: so + "/api/prize/add",
  GET_RESULT: so + "/api/prize/",
  REMOVE_RESULT: so + "/api/prize/delete/",
};

export default reqs;
