# Testing Guide - YAML Smith v1.1.0

## New Features Added

### ✅ Complete Frontend Form Coverage
This release completes the frontend UI for all 7 Kubernetes resource types:

1. **SecretForm** - NEW ✨
2. **PVCForm (PersistentVolumeClaim)** - NEW ✨
3. **HPAForm (HorizontalPodAutoscaler)** - NEW ✨
4. DeploymentForm - Existing
5. ServiceForm - Existing
6. ConfigMapForm - Existing
7. IngressForm - Existing

---

## Local Testing Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Step 1: Install Dependencies

```bash
# From project root
cd "/Users/shivanshus/Desktop/Some App/k8s-manifest-generator"

# Install all workspace dependencies (if not already done)
npm install
```

### Step 2: Start Development Servers

#### Option A: Start Both Frontend and Backend (Recommended)

```bash
# From project root
npm run dev
```

This starts:
- **Backend**: http://localhost:3002
- **Frontend**: http://localhost:5174

#### Option B: Start Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:5174
```

---

## Testing Checklist

### 🧪 Test 1: Secret Form

1. Navigate to the Kubernetes Manifest Generator section
2. Click on **"Secret"** resource type button
3. Verify the form loads without errors
4. Test the following:
   - [ ] Change secret type dropdown (7 types available)
   - [ ] Add multiple key-value pairs
   - [ ] Remove key-value pairs
   - [ ] See type-specific hints (e.g., for TLS, basic-auth)
   - [ ] Verify security warning appears
   - [ ] Generate manifest
   - [ ] Copy to clipboard works
   - [ ] Download YAML works

**Example Test Data:**
```
Name: app-secrets
Namespace: production
Type: Opaque
Data:
  API_KEY: your-api-key-here
  DB_PASSWORD: your-db-password
```

**Expected Output:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: production
type: Opaque
stringData:
  API_KEY: your-api-key-here
  DB_PASSWORD: your-db-password
```

---

### 🧪 Test 2: PersistentVolumeClaim Form

1. Click on **"PersistentVolumeClaim"** resource type button
2. Verify the form loads without errors
3. Test the following:
   - [ ] Enter storage size (e.g., "10Gi")
   - [ ] Enter storage class name (optional)
   - [ ] Select multiple access modes (checkboxes)
   - [ ] Try to unselect all access modes (should keep at least one)
   - [ ] Select ReadWriteMany and verify warning appears
   - [ ] Switch volume mode between Filesystem and Block
   - [ ] Generate manifest
   - [ ] Copy to clipboard works
   - [ ] Download YAML works

**Example Test Data:**
```
Name: app-data
Namespace: production
Storage Size: 10Gi
Storage Class: gp2
Access Modes: ReadWriteOnce (checked)
Volume Mode: Filesystem
```

**Expected Output:**
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
  namespace: production
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: gp2
  resources:
    requests:
      storage: 10Gi
  volumeMode: Filesystem
```

---

### 🧪 Test 3: HorizontalPodAutoscaler Form

1. Click on **"HorizontalPodAutoscaler"** resource type button
2. Verify the form loads without errors
3. Test the following:

   **Simple Mode:**
   - [ ] Select target kind (Deployment, StatefulSet, ReplicaSet)
   - [ ] Enter target name
   - [ ] Set min replicas (try setting to 1, verify warning appears)
   - [ ] Set max replicas
   - [ ] Adjust CPU utilization percentage slider
   - [ ] Verify preview text updates dynamically
   - [ ] Generate manifest

   **Advanced Mode:**
   - [ ] Click "Switch to Advanced Mode"
   - [ ] Click "Add Metric"
   - [ ] Change metric type (Resource, Pods, Object, External)
   - [ ] Configure CPU metric with utilization
   - [ ] Configure Memory metric with average value
   - [ ] Add multiple metrics
   - [ ] Remove a metric
   - [ ] Switch back to Simple Mode (verify data converts)
   - [ ] Generate manifest

**Example Test Data (Simple Mode):**
```
Name: app-hpa
Namespace: production
Target Kind: Deployment
Target Name: myapp
Min Replicas: 2
Max Replicas: 10
CPU Target: 80%
```

**Expected Output:**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

---

### 🧪 Test 4: Integration Testing

Test switching between all 7 resource types without errors:

1. [ ] Deployment → Generate manifest
2. [ ] Service → Generate manifest
3. [ ] ConfigMap → Generate manifest
4. [ ] Secret → Generate manifest
5. [ ] Ingress → Generate manifest
6. [ ] PersistentVolumeClaim → Generate manifest
7. [ ] HorizontalPodAutoscaler → Generate manifest

**Verify:**
- [ ] No console errors in browser DevTools
- [ ] Forms reset data when switching types
- [ ] Generated YAML is valid for each type
- [ ] Copy and download work for all types

---

### 🧪 Test 5: API Backend Testing

Test that the backend correctly processes all resource types:

**Terminal Test:**
```bash
# Test Secret generation
curl -X POST http://localhost:3002/api/manifest/generate \
  -H "Content-Type: application/json" \
  -d '{
    "resourceType": "Secret",
    "secret": {
      "metadata": {"name": "test-secret", "namespace": "default"},
      "type": "Opaque",
      "stringData": {"key": "value"}
    }
  }'

# Test PVC generation
curl -X POST http://localhost:3002/api/manifest/generate \
  -H "Content-Type: application/json" \
  -d '{
    "resourceType": "PersistentVolumeClaim",
    "pvc": {
      "metadata": {"name": "test-pvc", "namespace": "default"},
      "accessModes": ["ReadWriteOnce"],
      "resources": {"requests": {"storage": "10Gi"}},
      "volumeMode": "Filesystem"
    }
  }'

# Test HPA generation
curl -X POST http://localhost:3002/api/manifest/generate \
  -H "Content-Type: application/json" \
  -d '{
    "resourceType": "HorizontalPodAutoscaler",
    "hpa": {
      "metadata": {"name": "test-hpa", "namespace": "default"},
      "scaleTargetRef": {"apiVersion": "apps/v1", "kind": "Deployment", "name": "myapp"},
      "minReplicas": 2,
      "maxReplicas": 10,
      "targetCPUUtilizationPercentage": 80
    }
  }'
```

**Expected:** All requests return 200 OK with valid YAML in response

---

## Troubleshooting

### Issue: Port Already in Use

```bash
# Find and kill process on port 3002 (backend)
lsof -i :3002
kill -9 <PID>

# Find and kill process on port 5174 (frontend)
lsof -i :5174
kill -9 <PID>
```

### Issue: Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
npm install
```

### Issue: TypeScript Errors

```bash
# Rebuild TypeScript
cd backend
npm run build

cd ../frontend
npm run build
```

### Issue: CORS Errors

Verify backend `.env` file:
```bash
cat backend/.env
```

Should contain:
```
PORT=3002
CORS_ORIGIN=http://localhost:5174
```

Verify frontend `.env` file:
```bash
cat frontend/.env
```

Should contain:
```
VITE_API_URL=http://localhost:3002/api
```

---

## Success Criteria

All tests pass if:

✅ All 7 resource type forms load without errors
✅ All form interactions work correctly
✅ All forms generate valid YAML
✅ Copy to clipboard works for all types
✅ Download YAML works for all types
✅ No console errors in browser DevTools
✅ Backend API responds correctly to all resource types
✅ Form data resets properly when switching types

---

## Next Steps

Once testing is complete and all forms work correctly:

1. Consider adding the 5 new resource types from the roadmap:
   - StatefulSet
   - Job
   - CronJob
   - ServiceAccount
   - DaemonSet

2. Run production build:
   ```bash
   npm run build
   ```

3. Deploy using Docker:
   ```bash
   docker-compose up -d
   ```

---

## Report Issues

If you encounter any issues during testing:

1. Check browser console for errors (F12 → Console tab)
2. Check backend logs in terminal
3. Verify all dependencies are installed (`npm list`)
4. Try clearing cache and restarting servers
5. Document the issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser and OS information
