package com.emiblocker;

import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;

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

    @Override
    public String getName() {
        return "DeviceManager";
    }

    @ReactMethod
    public void lockNow() {
        if (dpm.isAdminActive(admin)) {
            dpm.lockNow();  // 🔒 Lock the screen
        }
    }
}
