package com.vishal1092003.emiBlocker;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;

import java.util.List;
import java.util.Arrays;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost
            = new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // ✅ Register DeviceManagerModule manually
            packages.add(new ReactPackage() {
                @Override
                public List<NativeModule> createNativeModules(ReactApplicationContext context) {
                    return Arrays.<NativeModule>asList(new DeviceManagerModule(context));
                }

                @Override
                public List<ViewManager> createViewManagers(ReactApplicationContext context) {
                    return Arrays.asList();
                }
            });
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return ".expo/.virtual-metro-entry";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            DefaultNewArchitectureEntryPoint.load();
        }
    }
}
