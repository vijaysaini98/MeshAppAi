package com.anytimedr;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import android.app.Activity;
import android.os.Build;
import android.view.WindowManager;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;
import android.content.Context;

public class UnlockDevice extends ReactContextBaseJavaModule {

    @Override
    public String getName() {
        return "UnlockDevice";
    }

        private ReactContext mReactContext;
        private PowerManager.WakeLock sCpuWakeLock;
        private Activity activity;

    public UnlockDevice(ReactApplicationContext reactContext) {
        super(reactContext);
                mReactContext = reactContext;
    }

    /* React Methods */
   @ReactMethod
    public void unlock() {
                    activity = mReactContext.getCurrentActivity();

                    PowerManager pm = (PowerManager) mReactContext.getSystemService(Context.POWER_SERVICE);
                    int flags = PowerManager.SCREEN_BRIGHT_WAKE_LOCK 
                            | PowerManager.ACQUIRE_CAUSES_WAKEUP 
                            | PowerManager.ON_AFTER_RELEASE;
                    sCpuWakeLock = pm.newWakeLock(flags, activity.getClass().getName());
                    sCpuWakeLock.acquire();
    
                    activity.runOnUiThread(() -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                            activity.setShowWhenLocked(true);
                            activity.setTurnScreenOn(true);
                }

                    activity.getWindow().addFlags(
                           WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                            | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON 
                            | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                            | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
                            
                        });
                    }
                    
                    @ReactMethod
                    public void lock() {
                        sCpuWakeLock.release();
    
                        activity.runOnUiThread(() -> {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                                activity.setShowWhenLocked(false);
                                activity.setTurnScreenOn(false);
                    }
    
                        activity.getWindow().clearFlags( 
                                 WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                                | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON 
                                | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                                | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
                            });
                }
}
