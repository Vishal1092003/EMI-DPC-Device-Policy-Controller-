package com.vishal1092003.emiBlocker;

import android.app.admin.DeviceAdminReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class MyDeviceAdminReceiver extends DeviceAdminReceiver {
  @Override
  public void onEnabled(Context context, Intent intent) {
    Toast.makeText(context, "Device Owner enabled", Toast.LENGTH_SHORT).show();
  }

  @Override
  public void onDisabled(Context context, Intent intent) {
    Toast.makeText(context, "Device Owner disabled", Toast.LENGTH_SHORT).show();
  }
}
