// main .c
#include "webview/webview.h"
#include <windows.h>

#ifdef WIN32
int WINAPI WinMain(HINSTANCE hInt, HINSTANCE hPrevInst, LPSTR lpCmdLine, int nCmdShow) {
#else
int main() {
#endif
	TCHAR current_directory[PATH_MAX];
	GetCurrentDirectory( PATH_MAX, current_directory );
	char src[] = "file:///";
	char dest[] = "/assets/index.html";

	strncat(src, current_directory, strlen(current_directory));
	strncat(current_directory, dest, strlen(current_directory));

	webview_t w = webview_create(0, 1, NULL);
	webview_set_title(w, "Todo list");
	webview_set_size(w, 480, 320, WEBVIEW_HINT_NONE);
	webview_navigate(w, src);
	webview_run(w);
	webview_destroy(w);
	return 0;
}