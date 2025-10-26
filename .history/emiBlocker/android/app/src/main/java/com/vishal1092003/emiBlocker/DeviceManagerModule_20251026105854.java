package com.vishal1092003.emiBlocker;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceManagerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final DevicePolicyManager dpm;
    private final ComponentName admin;

    public DeviceManagerModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.dpm = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        this.admin = new ComponentName(context, MyDeviceAdminReceiver.class);
    }

    @NonNull
    @Override
    public String getName() {
        return "DeviceManagerModule";
    }

    @ReactMethod
    public void lockNow() {
        if (dpm.isAdminActive(admin)) {
            dpm.lockNow();
        }
    }

    // Start our LockActivity in Lock Task (kiosk) mode
    @ReactMethod
    public void startKiosk() {
        if (!dpm.isDeviceOwnerApp(reactContext.getPackageName())) {
            return;
        }

        String[] packages = new String[]{reactContext.getPackageName()};
        dpm.setLockTaskPackages(admin, packages);

        Activity act = getCurrentActivity();
        if (act != null) {
            Intent i = new Intent(reactContext, LockActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            reactContext.startActivity(i);
            act.startLockTask(); // kiosk
        }
    }

    @ReactMethod
    public void stopKiosk() {
        Activity act = getCurrentActivity();
        if (act != null) {
            try {
                act.stopLockTask();
            } catch (Exception ignored) {
            }
        }
    }
}
