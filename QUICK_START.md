# Quick Start Guide - Test New Features

## 🎉 What's New in v1.1.0

Three new forms have been added to complete the Kubernetes manifest generator:

1. **SecretForm** - Manage Kubernetes Secrets with 7 types
2. **PVCForm** - Configure PersistentVolumeClaims with multiple access modes
3. **HPAForm** - Setup HorizontalPodAutoscalers with simple or advanced metrics

All 7 Kubernetes resource types now have complete UI forms!

---

## 🚀 Start Testing in 3 Steps

### Step 1: Ensure Dependencies (if not already installed)

```bash
cd "/Users/shivanshus/Desktop/Some App/k8s-manifest-generator"
npm install
```

### Step 2: Start the Application

```bash
npm run dev
```

This will start both servers:
- ✅ Backend: http://localhost:3002
- ✅ Frontend: http://localhost:5174

### Step 3: Open in Browser

```
http://localhost:5174
```

---

## 🧪 Quick Test: Secret Form

1. In the UI, click the **"Secret"** button
2. You'll see a form with:
   - Secret type dropdown (7 types)
   - Key-value pairs
   - Security warning
3. Try adding data:
   ```
   Name: test-secret
   Type: Opaque
   Data:
     API_KEY: my-secret-key
     DB_PASS: my-password
   ```
4. Click **"Generate Manifest"**
5. See the YAML output on the right panel
6. Try **"Copy to Clipboard"** or **"Download"**

**✅ Success!** The Secret form is working if YAML generates without errors.

---

## 🧪 Quick Test: PVC Form

1. Click the **"PersistentVolumeClaim"** button
2. You'll see a form with:
   - Storage size input
   - Access modes (checkboxes)
   - Volume mode (radio buttons)
3. Try these settings:
   ```
   Name: app-storage
   Storage Size: 5Gi
   Storage Class: standard
   Access Modes: ☑️ ReadWriteOnce
   Volume Mode: Filesystem
   ```
4. Click **"Generate Manifest"**
5. See the YAML output

**✅ Success!** The PVC form is working if YAML generates without errors.

---

## 🧪 Quick Test: HPA Form

1. Click the **"HorizontalPodAutoscaler"** button
2. You'll see a form with Simple Mode by default:
   - Target workload selection
   - Min/Max replicas
   - CPU utilization slider
3. Try these settings:
   ```
   Name: app-hpa
   Target Kind: Deployment
   Target Name: myapp
   Min Replicas: 2
   Max Replicas: 10
   CPU Target: 75%
   ```
4. See the preview: "Will scale between 2-10 replicas when CPU > 75%"
5. Click **"Generate Manifest"**
6. Try clicking **"Switch to Advanced Mode"** to see custom metrics

**✅ Success!** The HPA form is working if YAML generates without errors.

---

## 🎯 What to Verify

For each of the 3 new forms, check:

- [ ] Form loads without errors in browser console (F12)
- [ ] All input fields are interactive
- [ ] Form validation works (try invalid values)
- [ ] "Generate Manifest" button creates YAML
- [ ] Copy to clipboard works
- [ ] Download YAML works
- [ ] Backend logs show no errors

---

## ❓ Troubleshooting

### Servers won't start?

```bash
# Kill any existing processes on ports
lsof -i :3002 && kill -9 $(lsof -t -i:3002)
lsof -i :5174 && kill -9 $(lsof -t -i:5174)

# Restart
npm run dev
```

### Frontend shows errors?

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. If you see import errors, reinstall:
   ```bash
   rm -rf node_modules */node_modules
   npm install
   ```

### Can't connect to backend?

Check these files exist and have correct values:

**backend/.env:**
```
PORT=3002
CORS_ORIGIN=http://localhost:5174
```

**frontend/.env:**
```
VITE_API_URL=http://localhost:3002/api
```

---

## 📖 More Information

- Full testing guide: [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- Usage examples: [README.md](./README.md) - Search for "Creating a Secret"
- Changelog: [CHANGELOG.md](./CHANGELOG.md) - See v1.1.0 section

---

## ✅ Ready for Production?

Once all tests pass:

1. Build for production:
   ```bash
   npm run build
   ```

2. Or use Docker:
   ```bash
   docker-compose up -d
   ```

3. Access at: http://localhost

---

**Happy Testing! 🚀**

For the full testing checklist and advanced scenarios, see [TESTING_GUIDE.md](./TESTING_GUIDE.md).
