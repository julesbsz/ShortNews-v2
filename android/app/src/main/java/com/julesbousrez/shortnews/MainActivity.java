package com.julesbousrez.shortnews;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import android.os.Bundle;
import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        registerPlugin(GoogleAuth.class);
    }
}