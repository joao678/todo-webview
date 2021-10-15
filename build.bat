g++ main.c -mwindows -o todo.exe -I./webview/libwebview2/build/native/include -lole32 -lShlwapi -L./webview/libwebview2/build/native/x64 -lWebView2Loader
copy webview\libwebview2\build\native\x64\WebView2Loader.dll .\
todo.exe