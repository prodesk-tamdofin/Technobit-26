# Database Optimization Guide

## Current Situation
- **Database Size**: ~115MB (seems high for initial stage)
- **Database Type**: MongoDB Atlas (Free Tier - 512MB limit)
- **Status**: Need to optimize to stay under limits

## Issues Identified & Fixed

### 1. ✅ Schema Optimization (FIXED)
**Participant Model Changes:**
- ❌ Removed: `events: { type: Map, of: Mixed }` - This was storing large objects
- ✅ Added: `registeredEvents: [String]` - Simple array of event IDs
- ✅ Added: Database indices on frequently queried fields
  - `qrCode`, `email`, `userName` (unique indices)
  - `college`, `className`, `institute` (lookup indices)
  - Compound indices for faster queries

### 2. What's Using Space
The 115MB likely includes:
- **Unique Indices** (~15-20MB) - MongoDB requires indices for unique fields
- **Participant Data** - Each registration with photos, details
- **Event Data** - Event descriptions and configurations
- **Timestamps** - createdAt/updatedAt on every document

### 3. Recommendations

#### A. Database Cleanup
```javascript
// 1. Remove duplicate participants (if any)
// 2. Clear old test data
// 3. Archive completed events
```

#### B. Storage Optimization
- **Don't store images in MongoDB** - Use Cloudinary (already configured)
- **Keep image field as URL only** - Should be small string, not base64
- **Compress event descriptions** - Remove unnecessary text
- **Archive old data** - Move completed event records to archive

#### C. Code Changes
```javascript
// BAD - Storing large Base64 images
image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."  // 50KB+

// GOOD - Storing just URL
image: "https://res.cloudinary.com/...jpg"  // < 1KB
```

### 4. Immediate Actions to Reduce Size

#### Step 1: Check Image Storage
```bash
# Login to MongoDB Atlas
# Go to Collections > Participants
# Check if any 'image' fields contain large Base64 data
# If yes, update all to use empty string:
db.participants.updateMany(
  { image: { $regex: "^data:" } },
  { $set: { image: "" } }
)
```

#### Step 2: Remove Unused Fields
```bash
# If there are any old fields, remove them:
db.participants.updateMany({}, { $unset: { events: "", otp: "", otpCount: "" } })
```

#### Step 3: Build Indices
```bash
# The new indices will help with query performance
# They use more space initially but speed up searches
```

### 5. MongoDB Atlas Free Tier Limits
- **Storage**: 512MB total
- **Current**: ~115MB used (22% of limit)
- **Remaining**: ~397MB
- **Action needed**: When reaching 400MB, consider:
  - Upgrading to paid tier ($10/month)
  - Archiving old data
  - Deleting test participants

### 6. Future Optimization

#### Use Collections Properly
Instead of storing all event registrations in one field:

```javascript
// BAD - Current approach
Participant { events: { event1: {...}, event2: {...} } }  // Large

// GOOD - Future approach (separate collection)
EventRegistration {
  participantId: ObjectId,
  eventId: String,
  registrationDate: Date,
  status: String
}
// This allows better queries and smaller documents
```

#### Implement Data Sharding
If database grows very large, split by college or event.

### 7. Monitoring Storage

**Check database size regularly:**
1. Go to MongoDB Atlas Dashboard
2. Click your cluster
3. Go to **Metrics** tab
4. Check **Storage**

### 8. Current Code Fixes Applied
- ✅ Removed `Map<Mixed>` type (was inefficient)
- ✅ Added proper indices for fast queries
- ✅ Simplified event tracking to array of IDs
- ✅ Kept timestamps for audit trail

## Next Steps
1. ✅ Deploy optimized Participant model
2. ⏳ Monitor database growth
3. ⏳ When needed: Implement event registration collection
4. ⏳ Consider upgrade if needed

## Commands to Check Database Size

```bash
# In MongoDB shell
db.stats()  # Shows collection size info
db.participants.stats()  # Shows participants collection size
```

---

**Status**: ✅ Code optimized. Ready to deploy.
**Storage Goal**: Keep under 300MB before upgrade decision
**Upgrade Threshold**: 400MB of 512MB
