package com.lmig.pm.internet.mobile.cordova.zipcode;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.view.View;

import java.io.IOException;
import java.util.List;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ZipCode extends CordovaPlugin {
    private Context context = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        if(webView instanceof View){// Will always be true, but technically need to test and cast since CordovaWebView is an interface
            context = ((View)webView).getContext();
        }
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if ("getZipCodeFromLocation".equals(action)) {
            try{
                double scratchLat = 0;
                double scratchLng = 0;
                if(args == null || args.length() < 0){
                    LocationManager lm = (LocationManager)context.getSystemService(Context.LOCATION_SERVICE);
                    Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if(location == null){
                        callbackContext.error("LOCATION_UNAVAILABLE");
                        return true;
                    }
                    scratchLat = location.getLongitude();
                    scratchLng = location.getLatitude();
                }
                else {
                    try{
                        scratchLat  = args.getDouble(0);
                        scratchLng = args.getDouble(1);
                    }
                    catch(JSONException e){
                        LocationManager lm = (LocationManager)context.getSystemService(Context.LOCATION_SERVICE);
                        Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                        if(location == null){
                            location = lm.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                        }
                        if(location == null){
                            callbackContext.error("LOCATION_UNAVAILABLE");
                            return true;
                        }
                        scratchLng = location.getLongitude();
                        scratchLat = location.getLatitude();
                    }
                }
                final double latitude  = scratchLat;
                final double longitude = scratchLng;
                getZipCodeFromLocation(latitude, longitude, callbackContext);
            }
            catch(Throwable t){
                callbackContext.error("UNKNOWN_EXCEPTION");
            }
            return true;
        }
        return false;
    }

    public void getZipCodeFromLocation(final double latitude, final double longitude, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Geocoder geocoder = new Geocoder(context);
                String result = null;
                if(geocoder.isPresent() == false){
                    // This means we don't have the geocoder service to lookup the zipcode.
                    callbackContext.error("NO_GEOCODER");
                    return;
                }
                try {
                    List<Address> addressList = geocoder.getFromLocation(latitude, longitude, 5);
                    if (addressList != null && addressList.size() > 0) {
                        String postalCode = null;
                        for(int i = 0; i < addressList.size() && postalCode == null; i++){
                            Address address = addressList.get(i);
                            postalCode = address.getPostalCode();
                        }
                        if(postalCode == null){
                            callbackContext.error("ZIPCODE_UNAVAILABLE");
                            return;
                        }
                        StringBuilder sb = new StringBuilder();
                        sb.append(postalCode);
                        result = sb.toString();
                        callbackContext.success(result);
                    }
                } catch (IOException e) {
                    callbackContext.error("UNABLE_TO_CONNECT");
                }
            }
        });
    }
}
