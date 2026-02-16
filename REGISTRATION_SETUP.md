# Registration System Setup Guide

## ✅ What's Been Done

1. **Registration Form Updated** - Simplified form with your required fields:
   - Profile Picture Upload
   - Full Name
   - Roll Number (**NEW**)
   - Class (dropdown)
   - College Selection: BNMPC / BMARPC (**NEW**)
   - Email
   - WhatsApp Number (relabeled from "Phone Number")
   - Facebook Profile URL (Optional) (**NEW**)
   - Password + Confirm Password
   - Terms & Conditions checkbox

2. **Backend Model Updated** - `server/models/Participants.js` now includes:
   - `roll` field (required)
   - `college` field (required)
   - `fb` field (optional - changed from required)

3. **Auto-Redirect** - After successful registration, users are automatically redirected to `/events` page

4. **Migration Script Created** - Ready to update your database with new columns

## 🔧 Setup Steps

### Step 1: Configure Backend Environment

1. Navigate to the server folder:
   ```bash
   cd /workspaces/Technobit-26/server
   ```

2. Create `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your MySQL database credentials:
   ```bash
   nano .env
   ```

   **Required configuration:**
   ```env
   # Database Configuration
   DB_HOST=localhost          # Your MySQL host
   DB_USER=root              # Your MySQL username
   DB_PASS=your_password     # Your MySQL password
   DB_NAME=technobit26       # Your database name

   # Security Keys (Generate random 32+ character strings)
   CLIENT_SECRET=your_very_long_random_secret_key_here
   ADMIN_SECRET=another_very_long_random_secret_key_here

   # Cloudinary (for image uploads - get from cloudinary.com)
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Server Port
   PORT=5000
   ```

   **To generate secure secrets:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 2: Update Database Schema

Run the migration to add `roll`, `college`, and update `fb` columns:

```bash
cd /workspaces/Technobit-26/server
node migrations/001-add-roll-college.js
```

**Expected output:**
```
✓ Database connection established
Adding "roll" column...
✓ Added "roll" column
Adding "college" column...
✓ Added "college" column
Modifying "fb" column to allow null...
✓ Modified "fb" column

✅ Migration completed successfully!
```

### Step 3: Configure Frontend Environment

1. Navigate to client folder:
   ```bash
   cd /workspaces/Technobit-26/client
   ```

2. Create or update `.env.local`:
   ```bash
   nano .env.local
   ```

   Add:
   ```env
   NEXT_PUBLIC_API=http://localhost:5000
   ```

   **For production:** Change to your deployed backend URL

### Step 4: Install Dependencies (if needed)

**Backend:**
```bash
cd /workspaces/Technobit-26/server
npm install
```

**Frontend:**
```bash
cd /workspaces/Technobit-26/client
npm install
```

### Step 5: Start the Application

**Option A: Development Mode (both terminals)**

Terminal 1 - Backend:
```bash
cd /workspaces/Technobit-26/server
npm start
```

Terminal 2 - Frontend:
```bash
cd /workspaces/Technobit-26/client
npm run dev
```

**Option B: Production Build**

```bash
cd /workspaces/Technobit-26/client
npm run build
npm start
```

## 🧪 Testing the Registration

1. Open browser: `http://localhost:3000`

2. Navigate to: `http://localhost:3000/register`

3. Fill out the form:
   - Upload a profile picture
   - Enter Full Name: `Test User`
   - Enter Roll Number: `12345`
   - Select Class: `XI` or any available
   - Select College: `BNMPC` or `BMARPC`
   - Enter Email: `test@gmail.com`
   - Enter WhatsApp: `01712345678`
   - (Optional) Facebook URL: `https://facebook.com/testuser`
   - Enter Password: `Test1234` (min 8 chars, 1 uppercase, 1 digit)
   - Confirm Password: `Test1234`
   - Check terms and conditions

4. Click **Register Now**

5. **Expected behavior:**
   - Success message: "You successfully registered! Redirecting to events..."
   - Automatic redirect to `/events` page
   - Check backend terminal for database insert logs

## 🔍 Troubleshooting

### Registration fails with "Database connection error"
- Check MySQL is running: `sudo service mysql status`
- Verify `.env` credentials are correct
- Test connection: `mysql -u root -p` then `USE technobit26;`

### "Email already exists" error
- This email is already registered
- Use a different email or delete the test record:
  ```sql
  DELETE FROM participants WHERE email = 'test@gmail.com';
  ```

### Image upload fails
- Check Cloudinary credentials in `.env`
- Verify image size < 5MB
- Check file format is jpg/png

### Redirect not working
- Check browser console for errors
- Verify frontend environment variable `NEXT_PUBLIC_API` is set
- Check backend is returning success response

## 📊 Viewing Registered Data

**Option 1: MySQL Command Line**
```bash
mysql -u root -p
USE technobit26;
SELECT fullName, roll, college, email, phone FROM participants;
```

**Option 2: Admin Panel**
- Navigate to: `http://localhost:3000/admin/login`
- Login with admin credentials
- Go to "Participants" section

## 🚀 Next Steps

1. **Email Verification**: The backend already has OTP functionality
2. **Event Registration**: After user registration, they can register for specific events
3. **Profile Management**: Users can update their profiles at `/profile`
4. **CA System**: Campus Ambassador applications available at `/apply/ca`

## 📝 New Database Schema

### `participants` table (updated columns):

| Field      | Type    | Nullable | Description                    |
|------------|---------|----------|--------------------------------|
| roll       | VARCHAR | NO       | Student roll number            |
| college    | VARCHAR | NO       | BNMPC or BMARPC                |
| fb         | VARCHAR | **YES**  | Facebook profile URL (optional)|
| fullName   | VARCHAR | NO       | Student's full name            |
| email      | VARCHAR | NO       | Email address (unique)         |
| phone      | VARCHAR | NO       | WhatsApp number                |
| className  | VARCHAR | NO       | Class (XI, XII, etc.)          |
| password   | VARCHAR | NO       | Hashed password                |
| image      | VARCHAR | YES      | Profile picture URL            |

## 🔐 Security Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication
- Email validation enforces Gmail, Outlook, Yahoo, iCloud
- Password requirements: Min 8 chars, 1 uppercase, 1 digit
- HTTPS recommended for production deployment

## 💡 Tips

- **Test thoroughly** before opening registration
- **Backup database** before running migrations
- **Monitor logs** during registration period
- **Set up email notifications** for new registrations
- **Enable admin panel** for managing participants

---

**Need help?** Check the console logs in both frontend and backend terminals for detailed error messages.
